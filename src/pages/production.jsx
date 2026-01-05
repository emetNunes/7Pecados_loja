import useSWR from "swr";
import DefaultLayout from "@/layouts/default";
import { ColumnsProduction } from "@/components/columnsProduction";
import { CardProduction } from "@/components/cardProduction.jsx";
import { ItemCardProduction } from "@/components/itemCardProduction.jsx";

function normalizeOrder(order) {
  const statusMap = {
    pendente: "pending",
    em_producao: "in_production",
    pronto: "ready",
    entregue: "delivered",
  };

  return {
    id: order.id,
    place_to_buy: order.place_to_buy,
    name_user: order.name_user,
    address: order.address || "",
    type_payment: order.type_payment,
    total_value: order.total_value,
    status: statusMap[order.status] ?? "pending",
    completion_time: order.completion_time,
    all_list_products: Array.isArray(order.all_list_products)
      ? order.all_list_products
      : [],
  };
}

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductionPage() {
  const { data, isLoading, error, mutate } = useSWR(
    "https://api-7pecados.onrender.com/sale/orders/historic",
    fetcher
  );

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="p-8 text-default-500">Carregando produção…</div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <div className="p-8 text-red-500">Erro ao carregar pedidos.</div>
      </DefaultLayout>
    );
  }

  const orders = (data?.orders ?? []).map(normalizeOrder);

  const byStatus = (status) =>
    orders.filter((order) => order.status === status);

  const columns = [
    ["pending", "Pendente"],
    ["in_production", "Em produção"],
    ["ready", "Prontos"],
    ["delivered", "Entregues"],
  ];

  return (
    <DefaultLayout>
      <main className="flex flex-col gap-6 p-4">
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {columns.map(([status, title]) => {
            const list = byStatus(status);

            return (
              <ColumnsProduction
                key={status}
                title={title}
                quantityOfItems={String(list.length)}
              >
                {list.map((order) => (
                  <CardProduction
                    key={order.id}
                    {...order}
                    onStatusChange={() => mutate()}
                  >
                    <ItemCardProduction list_items={order.all_list_products} />
                  </CardProduction>
                ))}
              </ColumnsProduction>
            );
          })}
        </section>
      </main>
    </DefaultLayout>
  );
}
