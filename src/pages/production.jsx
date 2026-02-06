import useSWR from "swr";
import DefaultLayout from "@/layouts/default";
import { ColumnsProduction } from "@/components/columnsProduction";
import { CardProduction } from "@/components/cardProduction.jsx";
import { ItemCardProduction } from "@/components/itemCardProduction.jsx";

const fetcher = (url) => fetch(url).then((res) => res.json());

/* ================================
   NORMALIZA PEDIDO
================================ */
function normalizeOrder(order) {
  const statusMap = {
    pendente: "pending",
    em_producao: "in_production",
    pronto: "ready",
    entregue: "delivered",
  };

  return {
    id: String(order.id),
    accountClientId: String(order.clientID),
    place_to_buy: order.place_to_buy,
    name_user: order.name_user,
    address: order.address || "",
    type_payment: order.type_payment,
    total_value:
      Number(
        String(order.total_value).replace("R$", "").replace(",", ".").trim()
      ) || 0,
    status: statusMap[order.status] ?? "pending",
    completion_time: order.completion_time,
    all_list_products: Array.isArray(order.all_list_products)
      ? order.all_list_products
      : [],
  };
}

export default function ProductionPage() {
  const {
    data: ordersData,
    isLoading: loadingOrders,
    error: ordersError,
    mutate,
  } = useSWR(
    "https://api-7pecados.onrender.com/sale/orders/historic",
    fetcher,
    { refreshInterval: 15000, revalidateOnFocus: true }
  );

  const { data: accountsData, isLoading: loadingAccounts } = useSWR(
    "https://api-7pecados.onrender.com/sale/account_client/historic/?isOpen=true",
    fetcher
  );

  if (loadingOrders || loadingAccounts) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center h-[60vh] text-muted-foreground">
          Carregando produção…
        </div>
      </DefaultLayout>
    );
  }

  if (ordersError) {
    return (
      <DefaultLayout>
        <div className="p-8 text-destructive">Erro ao carregar pedidos.</div>
      </DefaultLayout>
    );
  }

  const openAccountIds = new Set(
    (accountsData?.account ?? []).map((acc) => String(acc._id))
  );

  const orders = (ordersData?.orders ?? [])
    .map(normalizeOrder)
    .filter((order) => openAccountIds.has(order.accountClientId));

  const byStatus = (status) =>
    orders.filter((order) => order.status === status);

  const columns = [
    ["pending", "Pendentes"],
    ["in_production", "Em produção"],
    ["ready", "Prontos"],
    ["delivered", "Entregues"],
  ];

  console.log(orders);

  const totalOrders = orders.length;

  return (
    <DefaultLayout>
      <main className="flex flex-col gap-6 p-6">
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Produção</h1>
            <p className="text-sm text-muted-foreground">
              Acompanhamento em tempo real dos pedidos ativos
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-base shadow px-4 py-2 text-sm">
              <span className="text-muted-foreground">Pedidos ativos</span>
              <div className="font-semibold text-4xl text-primary">
                {totalOrders}
              </div>
            </div>
          </div>
        </header>

        {/* KANBAN */}
        <section
          className="
            grid gap-4
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {columns.map(([status, title]) => {
            const list = byStatus(status);

            return (
              <ColumnsProduction
                key={status}
                title={title}
                quantityOfItems={String(list.length)}
              >
                {list.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-sm text-muted-foreground">
                    Nenhum pedido aqui
                  </div>
                ) : (
                  <div className="space-y-3">
                    {list.map((order) => (
                      <CardProduction
                        key={order.id}
                        {...order}
                        onStatusChange={() => mutate()}
                      >
                        <ItemCardProduction
                          list_items={order.all_list_products}
                        />
                      </CardProduction>
                    ))}
                  </div>
                )}
              </ColumnsProduction>
            );
          })}
        </section>
      </main>
    </DefaultLayout>
  );
}
