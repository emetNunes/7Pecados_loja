import { useEffect, useMemo } from "react";
import { Accordion, AccordionItem, Card } from "@heroui/react";
import useSWR from "swr";
import {
  HandPlatter,
  X,
  CircleX,
  Lock,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { ConfirmNewOrderCard } from "./ConfirmNewOrderCard";
import { CancelAccountDialog } from "./CancelAccountDialog";

const fetcher = (url) => fetch(url).then((res) => res.json());

function AccountClientByID({
  products,
  clientID,
  setPage,
  isDesktop,
  clientName,
  setPedidoClient,
  handleSubmitOrder,
  isSubmittingOrder = false,

  onCancelAccount,
  cancelDialogOpen,
  canceling,
  onConfirmCancel,
  onCloseCancelDialog,
}) {
  /* ================================
     DATA
  ================================ */
  const { data, error, isLoading } = useSWR(
    clientID
      ? `https://api-7pecados.onrender.com/sale/account_client/id/${clientID}`
      : null,
    fetcher,
  );

  const pedidos = Array.isArray(data) ? data : [];

  const { data: productsDb } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/products/historic",
    fetcher,
  );

  /* ================================
     CARRINHO
  ================================ */
  const filteredProduct = useMemo(() => {
    if (!products || !productsDb?.product) return [];
    return products
      .map((p) => {
        const match = productsDb.product.find((d) => d._id === p.productID);
        return match ? { ...match, ...p } : null;
      })
      .filter(Boolean);
  }, [products, productsDb]);

  const totalCarrinho = filteredProduct.reduce(
    (acc, p) => acc + (p.prices?.[0]?.value || 0),
    0,
  );

  const hasOrders = pedidos.length > 0;

  /* ================================
     SIDE EFFECT
  ================================ */
  useEffect(() => {
    if (!isLoading && pedidos.length > 0) {
      setPedidoClient(pedidos);
    }
  }, [isLoading, pedidos, setPedidoClient]);

  /* ================================
     STATES
  ================================ */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Carregando pedidos…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <CircleX size={48} className="text-destructive" />
        <p className="font-medium">Erro ao carregar pedidos</p>
        <button
          onClick={() => setPage("")}
          className="text-primary font-semibold hover:underline"
        >
          Voltar
        </button>
      </div>
    );
  }

  let a = 1;

  /* ================================
     UI
  ================================ */
  return (
    <div className="flex flex-col h-full bg-background dark:bg-zinc-900">
      {/* HEADER */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-default-200 dark:border-zinc-800">
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            Conta de {clientName}
          </h1>
          <p className="text-sm text-muted-foreground">
            ID do cliente: #{clientID.slice(-6)}
          </p>
        </div>

        <button
          onClick={() => setPage("")}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-default-100 dark:hover:bg-zinc-800 transition"
        >
          <X size={20} />
        </button>
      </header>

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* PEDIDOS EXISTENTES */}
        {hasOrders && (
          <Card className="p-5 border border-default-200 dark:border-zinc-800">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-base">Pedidos realizados</h2>
                <p className="text-xs text-muted-foreground">
                  Histórico de pedidos desta conta
                </p>
              </div>

              <span className="text-xs font-medium text-muted-foreground">
                {pedidos.length} pedido(s)
              </span>
            </div>

            {/* LISTA DE PEDIDOS */}
            <div className="space-y-4">
              {pedidos.map((pedido, index) => (
                <div
                  key={pedido._id}
                  className="
            rounded-xl
            border border-default-200 dark:border-zinc-800
            bg-background dark:bg-zinc-900
            p-4
            space-y-3
          "
                >
                  {/* HEADER DO PEDIDO */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        Pedido #{index + 1}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ID #{pedido._id.slice(-6)}
                      </span>
                    </div>

                    {/* STATUS */}
                    <span
                      className="
                text-xs font-semibold
                px-3 py-1 rounded-full
                bg-primary/10 text-primary
              "
                    >
                      {pedido.statusOrder}
                    </span>
                  </div>

                  {/* PRODUTOS */}
                  <ul className="space-y-2 pt-2">
                    {pedido.products.map((p) => (
                      <li
                        key={p._id}
                        className="
                  flex items-center justify-between
                  text-sm
                  border-b border-dashed border-default-200 dark:border-zinc-800
                  pb-2
                "
                      >
                        <div className="flex items-center gap-2">
                          <HandPlatter size={14} className="text-secondary" />
                          <span className="font-medium">
                            {p.productID.name}
                          </span>
                        </div>

                        <span className="font-semibold text-primary">
                          R$ {Number(p.productID.prices[0].value).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* CARRINHO */}
        <Card className="p-4 border border-default-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">
              Itens no carrinho ({filteredProduct.length})
            </h2>

            <div className="flex items-center gap-2">
              {filteredProduct.length === 0 ? (
                <span className="text-xs text-muted-foreground">
                  Aguardando itens
                </span>
              ) : (
                <button
                  onClick={() => setPage("produtos")}
                  className="
                    flex items-center gap-1.5
                    px-3 py-1.5
                    text-xs font-medium
                    text-primary
                    bg-primary/10 hover:bg-primary/20
                    rounded-lg
                    transition-colors
                  "
                  title="Adicionar mais produtos"
                >
                  <Plus size={14} />
                  Adicionar
                </button>
              )}
            </div>
          </div>
          {filteredProduct.length === 0 && !isDesktop ? (
            <div className="flex flex-col items-center justify-center py-6 gap-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <div
                  className="
                    w-16 h-16 rounded-full
                    bg-default-100 dark:bg-zinc-800
                    flex items-center justify-center
                    mb-2
                  "
                >
                  <ShoppingCart size={24} className="text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Nenhum item adicionado ainda.
                </p>
                <p className="text-xs text-muted-foreground/80">
                  Adicione produtos do cardápio para criar um novo pedido
                </p>
              </div>

              <button
                onClick={() => setPage("produtos")}
                className="
                  w-full
                  flex items-center justify-center gap-2
                  px-6 py-3
                  rounded-xl
                  bg-primary
                  text-primary-foreground
                  font-semibold
                  hover:bg-primary/90
                  active:scale-[0.98]
                  transition-all
                  shadow-sm hover:shadow-md
                "
              >
                <Plus size={18} />
                Adicionar produtos ao pedido
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {filteredProduct.map((product) => (
                <li
                  key={product._id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex items-center gap-2">
                    <HandPlatter size={16} className="text-secondary" />
                    <span className="font-medium">{product.name}</span>
                  </div>

                  <strong className="text-primary">
                    R$ {Number(product.prices[0].value).toFixed(2)}
                  </strong>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* CONFIRMAÇÃO DE PEDIDO */}
        {filteredProduct.length > 0 && (
          <ConfirmNewOrderCard
            clientName={clientName}
            productName={
              filteredProduct.length === 1
                ? filteredProduct[0].name
                : `${filteredProduct.length} itens`
            }
            total={totalCarrinho}
            onConfirm={() => handleSubmitOrder("confirmar")}
            onCancel={() => handleSubmitOrder("cancelar")}
            isLoading={isSubmittingOrder}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="sticky bottom-0 bg-background dark:bg-zinc-900 border-t border-default-200 dark:border-zinc-800 p-4 space-y-3">
        {/* FECHAR CONTA */}
        <button
          onClick={() => hasOrders && setPage("pagamento")}
          disabled={!hasOrders}
          className={`
            w-full py-4 rounded-xl font-semibold transition
            ${
              hasOrders
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-default-200 dark:bg-zinc-800 text-muted-foreground cursor-not-allowed flex items-center justify-center gap-2"
            }
          `}
        >
          {!hasOrders && <Lock size={16} />}
          Fechar conta
        </button>

        {!hasOrders && (
          <p className="text-xs text-muted-foreground text-center">
            É necessário ter ao menos um pedido para fechar a conta.
          </p>
        )}

        {/* CANCELAR CONTA */}
        <button
          onClick={onCancelAccount}
          className="
            w-full py-2.5 rounded-xl
            text-sm font-medium
            text-destructive
            border border-destructive/30
            hover:bg-destructive/10
            transition
          "
        >
          Cancelar conta
        </button>
      </footer>

      {/* MODAL */}
      <CancelAccountDialog
        isOpen={cancelDialogOpen}
        onClose={onCloseCancelDialog}
        onConfirm={onConfirmCancel}
        loading={canceling}
        clientName={clientName}
      />
    </div>
  );
}

export default AccountClientByID;
