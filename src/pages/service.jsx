import DefaultLayout from "@/layouts/default";
import CardSearch from "@/components/ui/service/search_bar";
import AccountClient from "@/components/ui/service/accountClient";
import AccountClientByID from "@/components/ui/service/accountClientByID";
import PaymentClientByID from "@/components/ui/service/PaymentById";

import { X, ArrowLeft, ShoppingBag } from "lucide-react";

import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useEffect, useMemo, useState } from "react";
import ProductSection from "@/components/ui/service/ProductSection";
import ServiceMobile from "@/components/ui/service/serviceMobile";

export default function ServicePage() {
  const [page, setPage] = useState("");
  const [clientID, setClientID] = useState("");
  const [clientName, setClientName] = useState("");

  const [products, setProducts] = useState([]);
  const [pedidoClient, setPedidoClient] = useState([]);

  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // const isDesktop = useIsDesktop();
  const isDesktop = true;

  // const productsWithDetails = useMemo(() => {
  //   if (!products.length || !listProduct.length) return [];

  //   return products
  //     .map((item) => {
  //       const productData = listProduct.find((p) => p._id === item.productID);
  //       if (!productData) return null;

  //       return {
  //         ...item,
  //         name: productData.name,
  //         price: productData.prices?.[0]?.value || 0,
  //       };
  //     })
  //     .filter(Boolean);
  // }, [products, listProduct]);

  // const totalPedido = productsWithDetails.reduce((acc, p) => acc + p.price, 0);

  // const addProductInAccount = (newProduct) => {
  //   if (!newProduct?.productID) return;

  //   const productData = listProduct.find((p) => p._id === newProduct.productID);
  //   const productName = productData?.name || "Produto";
  //   const productPrice = productData?.prices?.[0]?.value || 0;

  //   setProducts((prev) => [...prev, newProduct]);
  // };

  // const removeProductFromAccount = (index) => {
  //   const productToRemove = productsWithDetails[index];
  //   const productName = productToRemove?.name || "Produto";

  //   setProducts((prev) => prev.filter((_, i) => i !== index));
  // };

  // function onSelectClient(id, name) {
  //   if (!id) return;
  //   setClientID(id);
  //   setClientName(name);
  //   setPage("carrinho");
  // }

  // async function handleSubmitOrder(action) {
  //   if (!clientID) return;

  //   if (action === "cancelar") {
  //     const itemCount = products.length;
  //     setProducts([]);
  //     if (!isDesktop) {
  //       setPage("carrinho");
  //     } else {
  //       setPage("produto");
  //     }

  //     return;
  //   }

  //   if (action === "confirmar") {
  //     if (!products.length) {
  //       return;
  //     }

  //     setIsSubmittingOrder(true);
  //     const newOrder = {
  //       clientID,
  //       products,
  //       statusOrder: "em produção",
  //     };

  //     try {
  //       await mutate(
  //         `https://api-7pecados.onrender.com/sale/account_client/id/${clientID}`,
  //         async (currentData) => {
  //           const response = await fetch(
  //             "https://api-7pecados.onrender.com/sale/order",
  //             {
  //               method: "POST",
  //               headers: { "Content-Type": "application/json" },
  //               body: JSON.stringify(newOrder),
  //             },
  //           );

  //           if (!response.ok) {
  //             throw new Error("Erro ao criar pedido");
  //           }

  //           return currentData;
  //         },
  //         { revalidate: true },
  //       );
  //       const itemCount = products.length;
  //       setProducts([]);
  //       setPage("carrinho");
  //     } catch (err) {
  //       console.error("Erro ao confirmar pedido:", err);
  //       toast.error(
  //         "Não foi possível criar o pedido. Tente novamente.",
  //         "Erro ao confirmar pedido",
  //       );
  //     } finally {
  //       setIsSubmittingOrder(false);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   if (!page) {
  //     setClientID("");
  //     setClientName("");
  //     setProducts([]);
  //     setPedidoClient([]);
  //   }
  // }, [page]);

  return (
    <DefaultLayout>
      <main className=" max-h-[1800px] min-h-[1000px] flex flex-row justify-between gap-4 ">
        {isDesktop ? (
          <>
            <ProductSection />

            <div className="bg-blue-400">Sou Desktop PDV!</div>
          </>
        ) : (
          <ServiceMobile />
        )}

        {/* BARRA DE CONTAS */}
        {/* <div className="w-1/3 lg:overflow-y-auto ">
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
          </div> */}
      </main>
    </DefaultLayout>
  );
}
