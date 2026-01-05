import { useEffect, useMemo } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import useSWR from "swr";
import { HandPlatter, X, CirclePlus, CircleX } from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

function AccountClientByID({
  handleAdd,
  products,
  clientID,
  setPage,
  clientName,
  setProduct,
  setPedidoClient,
}) {
  const { data, error, isLoading } = useSWR(
    clientID
      ? `https://api-7pecados.onrender.com/sale/account_client/id/${clientID}`
      : null,
    fetcher
  );

  const pedidos = Array.isArray(data) ? data : [];
  const name = clientName?.trim() || "Cliente";

  const total = pedidos.reduce((acc, p) => acc + (p.priceTotal || 0), 0);

  /* ================================
     Produtos adicionados no carrinho
  ================================ */
  const { data: productsDb } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/products/historic",
    fetcher
  );

  const filteredProduct = useMemo(() => {
    if (!products || !productsDb) return [];
    const db = productsDb.product ?? [];

    return products
      .map((p) => {
        const match = db.find((d) => d._id === p.productID);
        if (!match) return null;
        return { ...match, ...p };
      })
      .filter(Boolean);
  }, [products, productsDb]);

  useEffect(() => {
    if (!isLoading && pedidos.length > 0) {
      setPedidoClient(pedidos);
    }
  }, [isLoading, pedidos, setPedidoClient]);

  /* ================================
     LOADING
  ================================ */
  if (isLoading) {
    return (
      <div className="p-4 text-foreground">
        <h2 className="text-xl font-semibold">Carregando pedidos…</h2>
      </div>
    );
  }

  /* ================================
     ERROR
  ================================ */
  if (error) {
    return (
      <div className="p-6 text-center">
        <CircleX className="mx-auto mb-4 text-primary" size={64} />
        <p className="font-semibold text-lg text-foreground mb-4">
          Erro ao carregar pedidos
        </p>
        <button
          onClick={() => setPage("")}
          className="text-primary font-semibold hover:underline"
        >
          Voltar
        </button>
      </div>
    );
  }

  /* ================================
     CARRINHO VAZIO
  ================================ */
  if (pedidos.length === 0) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-default-200 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-foreground">
            Carrinho do cliente
          </h2>
          <button
            onClick={() => setPage("")}
            className="text-muted-foreground hover:text-primary"
          >
            <X />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredProduct.length > 0 ? (
            <Accordion>
              <AccordionItem
                key="1"
                title={`Produtos selecionados (${filteredProduct.length})`}
              >
                <ul className="space-y-3">
                  {filteredProduct.map((product) => (
                    <li
                      key={product._id}
                      className="flex gap-3 items-start border-b border-dashed pb-3"
                    >
                      <div className="p-2 rounded-full bg-secondary/20 text-secondary">
                        <HandPlatter />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-semibold text-foreground">
                            {product.name}
                          </p>
                          <span className="text-primary font-semibold">
                            R$ {Number(product.price).toFixed(2)}
                          </span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p>Fruta: {product.details?.fruta}</p>
                          <p>Sabor: {product.details?.sabor}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            </Accordion>
          ) : (
            <p className="text-center text-muted-foreground">
              Nenhum produto adicionado ainda.
            </p>
          )}
        </div>

        {/* Ações */}
        <div className="p-4 border-t border-default-200 dark:border-zinc-800 flex gap-2">
          <button
            onClick={() => handleAdd("confirmar")}
            className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90"
          >
            Confirmar pedido
          </button>
          <button
            onClick={() => handleAdd("cancelar")}
            className="flex-1 border border-primary text-primary py-3 rounded-xl font-semibold hover:bg-primary/10"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  /* ================================
     PEDIDOS EXISTENTES
  ================================ */
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-default-200 dark:border-zinc-800">
        <h2 className="text-lg font-bold text-foreground">
          Carrinho do cliente
        </h2>
        <button
          onClick={() => setPage("")}
          className="text-muted-foreground hover:text-primary"
        >
          <X />
        </button>
      </div>

      {/* Lista de pedidos */}
      <Accordion className="flex-1 overflow-y-auto p-2">
        {pedidos.map((acc, index) => (
          <AccordionItem
            key={acc._id}
            title={`${index + 1}º Pedido — ${acc.statusOrder}`}
          >
            <ul className="space-y-3">
              {acc.products.map((p) => (
                <li
                  key={p.productID._id}
                  className="flex gap-3 items-center border-b border-dashed pb-3"
                >
                  <div className="p-2 rounded-full bg-secondary/20 text-secondary">
                    <HandPlatter />
                  </div>

                  <div className="flex justify-between w-full">
                    <p className="font-semibold text-foreground">
                      {p.productID.name}
                    </p>
                    <span className="text-primary font-semibold">
                      R$ {Number(p.productID.price).toFixed(2)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Footer */}
      <div className="p-4 border-t border-default-200 dark:border-zinc-800 space-y-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">R$ {total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => setPage("pagamento")}
          className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold hover:bg-primary/90"
        >
          Fechar conta do cliente
        </button>

        <button
          onClick={() => handleAdd("cancelar")}
          className="w-full text-sm text-muted-foreground hover:text-destructive"
        >
          Cancelar conta
        </button>
      </div>
    </div>
  );
}

export default AccountClientByID;
