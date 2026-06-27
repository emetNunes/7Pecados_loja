import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useEffect, useMemo, useState } from "react";
import { mutate } from "swr";

import DefaultLayout from "@/layouts/default";
import ProductSection from "@/components/ui/service/product/ProductSection";
import ServiceMobile from "@/components/ui/service/serviceMobile";
import BillingSection from "@/components/ui/service/billing/BillingSection";

export default function ServicePage() {
  const [clientSelect, setClientSelect] = useState([]);

  const [order, setOrder] = useState([]);
  const [ingredientsGroup, setIngredientsGroup] = useState([]);
  const isDesktop = true;

  const ConfirmNewOrderCard = async (clientID, order) => {
    try {
      const payload = {
        clientID: clientID,
        products: order,
      };

      await mutate(
        `https://api-7pecados.onrender.com/sale/account_client/id/${clientID}`,

        async (currentData) => {
          const response = await fetch(
            "https://api-7pecados.onrender.com/sale/order",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            },
          );

          if (!response.ok) {
            throw new Error("Erro ao adicionar pedido há conta.");
          }

          const updateRes = await fetch(
            `https://api-7pecados.onrender.com/admin/stock/inventory`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
              body: JSON.stringify({
                ingredients: ingredientsGroup,
                type: "exit",
                paymentID: "6a3ebde9bd58adf572f756c3",
                location: "Loja principal",
                date: "2024-07-20T10:00:00Z",
                totalValue: 1,
              }),
            },
          );

          if (!updateRes.ok) throw new Error("Erro ao atualizar conta");

          setOrder([]);
        },
        {
          revalidate: true,
        },
      );
    } catch (err) {
      console.error("Erro ao criar pedido:", err);
    }
  };

  return (
    <DefaultLayout>
      <main className="flex gap-4 items-start">
        {isDesktop ? (
          <>
            <div className="flex-1">
              <ProductSection
                clientSelect={clientSelect}
                sendOrder={(order) => {
                  setOrder((orders) => [...orders, order]);
                }}
                sendIngredientsGroup={(item) => {
                  setIngredientsGroup((ingredientsGroup) => [
                    ...ingredientsGroup,
                    item,
                  ]);
                }}
              />
            </div>

            <div className="w-[30%]">
              <div className="fixed top-4 w-[28%] h-screen ">
                <div className="bg-base p-4 rounded-2xl h-[95%] overflow-auto">
                  <BillingSection
                    sendOrder={order}
                    cancelNewOrder={() => {
                      setOrder([]);
                    }}
                    onChangeNewOrder={(index) => {
                      setOrder(order.filter((_, i) => i !== index));
                    }}
                    clientSelect={clientSelect}
                    ConfirmNewOrderCard={() => {
                      ConfirmNewOrderCard(clientSelect[0], order);
                    }}
                    handlerClient={(client) => {
                      setClientSelect(client);
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <ServiceMobile />
        )}
      </main>
    </DefaultLayout>
  );
}
