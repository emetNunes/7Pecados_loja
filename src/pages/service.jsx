// ServicePage.jsx
import DefaultLayout from "@/layouts/default";
import { CardSearch } from "@/components/cardSearch";
import { CardTypesProducts } from "@/components/cardTypesProducts";
import CardProduct from "@/components/serviceComponents/cardProduct";

import { useEffect, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

import { listTypesProducts_ } from "../assets/constants/listTypesProducts";
import AccountClient from "@/components/serviceComponents/accountClient";
import AccountClientByID from "@/components/serviceComponents/accountClientByID";
import PaymentClientByID from "@/components/serviceComponents/PaymentById";

import { X, ArrowLeft, ShoppingBag } from "lucide-react";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useToast } from "@/contexts/ToastContext";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ServicePage() {
  /* =====================================================
     ESTADOS
  ===================================================== */
  const [page, setPage] = useState(""); // "", "produtos", "carrinho", "pagamento"
  const [clientID, setClientID] = useState("");
  const [clientName, setClientName] = useState("");

  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [products, setProducts] = useState([]); // [{ productID }]
  const [pedidoClient, setPedidoClient] = useState([]);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  /* =====================================================
     RESPONSIVO (REATIVO)
  ===================================================== */
  const isDesktop = useIsDesktop();
  const toast = useToast();

  /* =====================================================
     PRODUTOS (ESTOQUE)
  ===================================================== */
  const { data } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/products/historic",
    fetcher,
    { revalidateOnFocus: true },
  );

  const listProduct = data?.product || [];

  /* =====================================================
     JOIN PRODUTOS DO PEDIDO + ESTOQUE
  ===================================================== */
  const productsWithDetails = useMemo(() => {
    if (!products.length || !listProduct.length) return [];

    return products
      .map((item) => {
        const productData = listProduct.find((p) => p._id === item.productID);
        if (!productData) return null;

        return {
          ...item,
          name: productData.name,
          price: productData.prices?.[0]?.value || 0,
        };
      })
      .filter(Boolean);
  }, [products, listProduct]);

  const totalPedido = productsWithDetails.reduce((acc, p) => acc + p.price, 0);

  /* =====================================================
     AÇÕES
  ===================================================== */
  const addProductInAccount = (newProduct) => {
    if (!newProduct?.productID) return;

    // Encontrar o nome do produto para a notificação
    const productData = listProduct.find((p) => p._id === newProduct.productID);
    const productName = productData?.name || "Produto";
    const productPrice = productData?.prices?.[0]?.value || 0;

    setProducts((prev) => [...prev, newProduct]);

    // Feedback visual com informações do produto
    toast.success(
      `${productName} adicionado ao carrinho`,
      `R$ ${Number(productPrice).toFixed(2).replace(".", ",")}`,
    );
  };

  const removeProductFromAccount = (index) => {
    const productToRemove = productsWithDetails[index];
    const productName = productToRemove?.name || "Produto";

    setProducts((prev) => prev.filter((_, i) => i !== index));

    // Feedback visual
    toast.info(`${productName} removido do carrinho`, "Produto removido");
  };

  function onSelectClient(id, name) {
    if (!id) return;
    setClientID(id);
    setClientName(name);
    setPage("carrinho");
  }

  const handleToggleCategory = (title, isSelected) => {
    setSelectedTypes((prev) =>
      isSelected ? [...prev, title] : prev.filter((t) => t !== title),
    );
  };

  /* =====================================================
     CONFIRMAR / CANCELAR PEDIDO
  ===================================================== */
  async function handleSubmitOrder(action) {
    if (!clientID) return;

    if (action === "cancelar") {
      const itemCount = products.length;
      setProducts([]);
      if (!isDesktop) {
        setPage("carrinho");
      } else {
        setPage("produto");
      }
      toast.warning(
        `${itemCount} item(ns) removido(s) do carrinho`,
        "Pedido cancelado",
      );
      return;
    }

    if (action === "confirmar") {
      if (!products.length) {
        toast.warning(
          "Adicione produtos ao carrinho antes de confirmar",
          "Carrinho vazio",
        );
        return;
      }

      setIsSubmittingOrder(true);
      const newOrder = {
        clientID,
        products,
        statusOrder: "em produção",
      };

      try {
        await mutate(
          `https://api-7pecados.onrender.com/sale/account_client/id/${clientID}`,
          async (currentData) => {
            const response = await fetch(
              "https://api-7pecados.onrender.com/sale/order",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder),
              },
            );

            if (!response.ok) {
              throw new Error("Erro ao criar pedido");
            }

            return currentData;
          },
          { revalidate: true },
        );

        const itemCount = products.length;
        setProducts([]);
        setPage("carrinho");

        toast.success(
          `Pedido confirmado com ${itemCount} item(ns) para ${clientName}`,
          "Pedido criado com sucesso!",
        );
      } catch (err) {
        console.error("Erro ao confirmar pedido:", err);
        toast.error(
          "Não foi possível criar o pedido. Tente novamente.",
          "Erro ao confirmar pedido",
        );
      } finally {
        setIsSubmittingOrder(false);
      }
    }
  }

  /* =====================================================
     FILTRO + BUSCA
  ===================================================== */
  const filteredProducts = useMemo(() => {
    let filtered = listProduct;

    if (search.trim()) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s),
      );
    }

    if (selectedTypes.length && !selectedTypes.includes("Todos")) {
      filtered = filtered.filter((p) =>
        selectedTypes.some((t) =>
          p.category?.toLowerCase().includes(t.toLowerCase()),
        ),
      );
    }

    return filtered;
  }, [listProduct, search, selectedTypes]);

  /* =====================================================
     RESET
  ===================================================== */
  useEffect(() => {
    if (!page) {
      setClientID("");
      setClientName("");
      setProducts([]);
      setPedidoClient([]);
    }
  }, [page]);

  /* =====================================================
     UI - MOBILE FIRST
  ===================================================== */
  return (
    <DefaultLayout>
      <div className="w-full min-h-screen">
        {/* ================= LAYOUT MOBILE-FIRST ================= */}
        {/* Mobile: Stack vertical | Desktop: Side-by-side */}
        <div className="flex flex-col justify-between lg:flex-row gap-4 lg:gap-2 mx-4">
          {/* ===== ÁREA PRINCIPAL (PRODUTOS) ===== */}

          {/* Mobile: Full width | Desktop: 3/4 width  */}
          <div className="w-full">
            {/* Página de seleção de cliente (mobile) */}

            {!isDesktop && page === "" && (
              <div className="p-4 sm:p-6">
                <AccountClient
                  onSelectClient={onSelectClient}
                  setPage={setPage}
                />
              </div>
            )}

            {/* Página de pagamento (mobile) */}
            {!isDesktop && page === "pagamento" && (
              <div className="p-4 sm:p-6">
                <PaymentClientByID
                  clientID={clientID}
                  pedidoClient={pedidoClient}
                  setPage={setPage}
                />
              </div>
            )}
            {/* Página de carrinho (mobile) */}
            {!isDesktop && page === "carrinho" && (
              <div className="p-4 sm:p-6">
                <AccountClientByID
                  products={products}
                  clientID={clientID}
                  isDesktop={isDesktop}
                  clientName={clientName}
                  setPedidoClient={setPedidoClient}
                  setPage={setPage}
                  handleSubmitOrder={handleSubmitOrder}
                  onCancelAccount={() => setCancelDialogOpen(true)}
                  cancelDialogOpen={cancelDialogOpen}
                  canceling={canceling}
                  onConfirmCancel={() => {}}
                  onCloseCancelDialog={() => setCancelDialogOpen(false)}
                />
              </div>
            )}
            {/* Página de produtos */}
            {/* Mobile: só mostra quando page === "produtos" | Desktop: sempre mostra exceto quando page === "pagamento" */}
            {((!isDesktop && page === "produtos") ||
              isDesktop) /*&& page !== "pagamento")*/ && (
              <section className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <CardSearch
                  value={search}
                  text_label="Pesquisar produto"
                  text_button="Pesquisar"
                  onChange={setSearch}
                />

                {/* Categorias - Scroll horizontal em mobile */}
                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {listTypesProducts_.map((type) => (
                    <CardTypesProducts
                      key={type.name}
                      title={type.name}
                      icon={type.icon}
                      selected={selectedTypes.includes(type.name)}
                      onToggle={handleToggleCategory}
                    />
                  ))}
                </div>

                {/* Grid de produtos - Responsivo */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {filteredProducts.map((product) => (
                    <CardProduct
                      key={product._id}
                      product={product}
                      productID={product._id}
                      category={product.category}
                      name={product.name}
                      description={product.description}
                      clientID={clientID}
                      onAdd={addProductInAccount}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ===== SIDEBAR (DESKTOP) / BOTTOM BAR (MOBILE) ===== */}
          {/* Desktop: Sidebar fixo à direita */}

          {isDesktop && (
            <div className="w-1/3 lg:overflow-y-auto ">
              <div className="w-1/4 h-[80%] fixed p-4 lg:p-6 border rounded-xl bg-background/50 backdrop-blur-sm">
                {page === "" && (
                  <AccountClient
                    onSelectClient={onSelectClient}
                    setPage={setPage}
                  />
                )}

                {page === "carrinho" && (
                  <AccountClientByID
                    products={products}
                    isDesktop={isDesktop}
                    clientID={clientID}
                    clientName={clientName}
                    setPedidoClient={setPedidoClient}
                    setPage={setPage}
                    handleSubmitOrder={handleSubmitOrder}
                    isSubmittingOrder={isSubmittingOrder}
                  />
                )}

                {page === "pagamento" && (
                  <PaymentClientByID
                    clientID={clientID}
                    pedidoClient={pedidoClient}
                    setPage={setPage}
                  />
                )}
              </div>
            </div>
          )}

          {/* Mobile: Bottom bar fixo (apenas na página de produtos) */}
          {!isDesktop && clientID && page === "produtos" && (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
              <div className="p-4 space-y-3 max-h-[60vh] flex flex-col">
                {/* Header do bottom bar */}
                <div className="flex justify-between items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-xs text-muted-foreground block">
                      Cliente
                    </span>
                    <p className="text-sm font-semibold truncate">
                      {clientName}
                    </p>
                  </div>
                  <span className="font-bold text-lg text-primary whitespace-nowrap">
                    R$ {totalPedido.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                {/* Lista de produtos */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  {productsWithDetails.length === 0 ? (
                    <p className="text-xs text-muted-foreground text-center py-4">
                      Nenhum produto adicionado
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {productsWithDetails.map((p, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center gap-2 text-sm border-b border-dashed border-border pb-2"
                        >
                          <span className="truncate flex-1 text-left">
                            {p.name}
                          </span>
                          <button
                            onClick={() => removeProductFromAccount(index)}
                            className="text-destructive hover:text-destructive/80 flex-shrink-0 p-1"
                            aria-label="Remover produto"
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Botões de ação */}
                {productsWithDetails.length === 0 ? (
                  <button
                    onClick={() => setPage("carrinho")}
                    className="
                      w-full
                      flex items-center justify-center gap-2
                      py-3 rounded-lg
                      border-2 border-primary/30
                      bg-primary/5 dark:bg-primary/10
                      hover:bg-primary/10 dark:hover:bg-primary/20
                      text-primary font-semibold
                      transition-colors
                    "
                  >
                    <ArrowLeft size={18} />
                    Voltar para Pedidos
                  </button>
                ) : (
                  <button
                    onClick={() => setPage("carrinho")}
                    className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-opacity hover:opacity-90 active:opacity-75 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    Ver Pedidos ({productsWithDetails.length})
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Espaçamento para o bottom bar no mobile */}
        {!isDesktop && clientID && page === "produtos" && (
          <div className="h-48" />
        )}
      </div>
    </DefaultLayout>
  );
}
