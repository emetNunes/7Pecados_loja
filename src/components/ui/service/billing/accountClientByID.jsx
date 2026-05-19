import { useEffect, useMemo, useState } from "react";
import { Accordion, AccordionItem, Card, Divider } from "@heroui/react";
import useSWR from "swr";
import {
  HandPlatter,
  X,
  CircleX,
  Lock,
  Plus,
  ShoppingCart,
  ArrowLeftIcon,
  Circle,
  Dot,
  Divide,
} from "lucide-react";
import { ConfirmNewOrderCard } from "./ConfirmNewOrderCard";
import { Link } from "react-router-dom";
import clsx from "clsx";

const fetcher = (url) => fetch(url).then((res) => res.json());

function AccountClientByID({ clientID, onSelectClient }) {
  const [statusOn, setStatus] = useState("em_producao");
  const {
    data: ordersClient,
    error: isError,
    isLoading,
  } = useSWR(
    clientID
      ? `https://api-7pecados.onrender.com/sale/account_client/id/${clientID}`
      : null,
    fetcher,
  );

  const groupOrders =
    ordersClient?.orders?.reduce((acc, pedido) => {
      const status = pedido.status;

      if (!acc[status]) {
        acc[status] = [];
      }

      acc[status].push(pedido);

      return acc;
    }, {}) || {};

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="flex items-center justify-between px-5 py-4 border-b border-default-200 dark:border-zinc-800">
        <div>
          <p className="text-2xl font-bold text-foreground">Pedidos da conta</p>

          {!isLoading && ordersClient?.status != 500 ? (
            <div>
              <p className="text-primary font-semibold text-[17px]">
                Cliente {ordersClient?.accountClient.name}
              </p>
              <p className="text-[13px] text-zinc-500">
                ContaID: #{ordersClient?.accountClient.clientID.slice(-5)}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <Link
          onClick={() => {
            onSelectClient();
          }}
          to="/service"
          className="flex text-zinc-400/80 hove:text-primary hover:text-primary/70 cursor-pointer"
        >
          <ArrowLeftIcon /> voltar
        </Link>
      </header>
      {isLoading ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Carregando pedidos da conta…
        </div>
      ) : ordersClient?.status == 500 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Sem pedidos vinculados há essa conta!
        </div>
      ) : (
        <div className=" h-full flex flex-col">
          <main className="overflow-scroll h-[200px] lg:h-[500px] md:h-[100px]">
            {ordersClient?.orders !== "" ? (
              <div className="space-y-4">
                <div className="w-full flex flex-row gap-2 justify-between border-1 border-zinc-300 rounded-2xl bg-background">
                  {Object.entries(groupOrders).map(([status, pedidosGrupo]) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatus(status);
                      }}
                      className={clsx(
                        "p-2 rounded-2xl shadow-lg w-full text-sm font-bold cursor-pointer",
                        { "bg-primary  text-base": statusOn == status },
                        {
                          "bg-base text-secondary hover:bg-zinc-100":
                            statusOn != status,
                        },
                      )}
                    >
                      {status.toUpperCase()}
                    </button>
                  ))}
                </div>
                {Object.entries(groupOrders).map(([status, pedidosGrupo]) => (
                  <>
                    {statusOn == status && (
                      <Accordion>
                        {pedidosGrupo.map((pedido) => (
                          <AccordionItem
                            key={pedido.idOrder}
                            aria-label="Accordion 1"
                            title={"Pedido"}
                            subtitle={`OrderID: #${pedido.idOrder.slice(-5)}`}
                            classNames={{
                              title: "text-default-800 font-semibold",
                              subtitle: "text-sm text-default-500",
                              trigger:
                                " hover:bg-default-200/30  transition-all isOpen:bg-red-300",
                              indicator: "text-xl",
                            }}
                          >
                            {pedido.order.map((item) => (
                              <div
                                key={item.idItem}
                                className="flex flex-row justify-between pr-3"
                              >
                                <div className="mb-4 w-full">
                                  <div className="flex items-center w-full justify-between ">
                                    <div className="flex gap-2">
                                      <p className="">1x {item.name}</p>
                                    </div>

                                    <p className="text-primary font-bold ">
                                      R$ {item.price[0].toFixed(2)}
                                    </p>
                                  </div>
                                  <div className=" border-l-4 text-sm text-zinc-800 border-primary pl-2">
                                    <p className="font-semibold text-zinc-700 mt-2 ">
                                      Observação:
                                    </p>
                                    <div className="flex flex-row justify-between ">
                                      <p>Tamanho:</p>
                                      <p className="font-semibold">
                                        {item.size.toUpperCase() == "P"
                                          ? "100ml"
                                          : item.size.toUpperCase() == "M"
                                            ? "250ml"
                                            : "470ml"}
                                      </p>
                                    </div>

                                    {item.follow_up ? (
                                      <div className="flex flex-row justify-between">
                                        {item.follow_up.map((follow_up) => (
                                          <>
                                            <div className="mt-1">
                                              {follow_up.category}
                                            </div>
                                            <div className="font-semibold">
                                              {follow_up.name}
                                            </div>
                                          </>
                                        ))}
                                      </div>
                                    ) : (
                                      <p>Sem detalhes</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </>
                ))}
              </div>
            ) : (
              <p>Sem ordersClient cadastrados</p>
            )}
          </main>

          <footer className="p-4 border-t border-zinc-300 mt-auto   ">
            <div className="mb-5">
              <p className="text-lg mb-2 font-bold">Resumo da conta</p>
              <div className="flex flex-row justify-between">
                <p className="">Total</p>
                <p className="font-bold text-primary">R$10,00</p>
              </div>
            </div>
            <button className="w-full py-4 rounded-xl font-semibold transition bg-primary text-primary-foreground hover:bg-primary/90">
              Finalizar conta
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}

export default AccountClientByID;
