import { useEffect, useMemo, useState } from "react";
import { Accordion, AccordionItem, Button, Card, Divider } from "@heroui/react";
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
  Trash,
  Minus,
  ShoppingBag,
  AnchorIcon,
  EllipsisIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Shopping from "./ShoppingCart";

const fetcher = (url) => fetch(url).then((res) => res.json());

const cancelOrder = async (id) => {
  try {
    const res = await fetch(
      `https://api-7pecados.onrender.com/sale/order_client/status/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelado" }),
      },
    );

    if (!res.ok) throw new Error();
  } catch (err) {
    console.error(err);
  }
};

function AccountClientByID({
  clientID,
  handlerClient,
  onChangeNewOrder,
  sendOrder,
  ConfirmNewOrderCard,
  cancelNewOrder,
  setPageCurrent,
}) {
  const [statusOn, setStatus] = useState("");
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

  const totalOrder = ordersClient?.orders.reduce(
    (acumulador, item) => acumulador + item.total,
    0,
  );

  const groupOrders =
    ordersClient?.orders?.reduce((acc, pedido) => {
      const status =
        pedido.status == "pendente" || pedido.status == "em_producao"
          ? "Pendente"
          : pedido.status == "pronto" || pedido.status == "entregue"
            ? "Pronto"
            : "Cancelado";

      if (!acc[status]) {
        acc[status] = [];
      }

      acc[status].push(pedido);

      return acc;
    }, {}) || {};

  if (ordersClient?.orders.length > 0 && statusOn === "") {
    if (Object.keys(groupOrders).length > 1) {
      Object.keys(groupOrders).map((status, index) =>
        status == "Pendente"
          ? setStatus(Object.keys(groupOrders)[index])
          : setStatus(Object.keys(groupOrders)[0]),
      );
    } else {
      setStatus(Object.keys(groupOrders)[0]);
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <ShoppingBag className="text-primary" size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              {sendOrder.length !== 0
                ? "Carrinho da conta"
                : "Pedidos da conta"}
            </h1>

            {!isLoading && ordersClient?.status !== 500 && (
              <div className="flex items-center gap-2 mt-1">
                <span className="font-medium text-primary">
                  {ordersClient?.accountClient?.name || "Sem nome"}
                </span>

                <span className="text-zinc-300">•</span>

                <span className="text-sm text-zinc-500">
                  #{ordersClient?.accountClient?.clientID.slice(-5)}
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            handlerClient([]);
            cancelNewOrder();
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-500 hover:bg-zinc-100 transition"
        >
          <ArrowLeftIcon size={18} />
          <span className="font-medium">Voltar</span>
        </button>
      </header>

      {isLoading ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Carregando pedidos da conta…
        </div>
      ) : sendOrder.length === 0 && ordersClient?.orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <CircleX size={100} className="text-primary" />
          <p className="font-bold text-[20px]">Nenhum pedido encontrado</p>
          <p className="text-center text-zinc-600">
            Selecione e adicione um produto há conta desse cliente.
          </p>
        </div>
      ) : sendOrder.length !== 0 &&
        ordersClient?.accountClient?.status == true ? (
        <Shopping
          pedidosGrupo={sendOrder}
          cancelNewOrder={cancelNewOrder}
          onChangeNewOrder={onChangeNewOrder}
          ConfirmNewOrderCard={ConfirmNewOrderCard}
        />
      ) : (
        <div className=" h-full flex flex-col ">
          <div className="flex p-1 bg-zinc-100 rounded-2xl gap-1 items-center">
            {Object.entries(groupOrders).map(([status, pedidosGrupo]) => (
              <button
                key={status}
                onClick={() => setStatus(status)}
                className={clsx(
                  "flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  {
                    "bg-white shadow text-primary": statusOn === status,
                  },
                  {
                    "text-zinc-500 hover:text-zinc-700": statusOn !== status,
                  },
                )}
              >
                {status}
                <span
                  className={clsx(
                    "text-xs px-2 py-0.5 rounded-full mx-2",
                    statusOn === status
                      ? "bg-primary/10 text-primary"
                      : "bg-zinc-200 text-zinc-500",
                  )}
                >
                  {pedidosGrupo.length}
                </span>
              </button>
            ))}
          </div>

          <main className="overflow-y-scroll  max-h-[500px] overflow-x-hidden">
            {ordersClient?.orders.length > 0 && (
              <div key={1} className="space-y-4">
                {cardPedidos(groupOrders, statusOn)}
              </div>
            )}
          </main>

          <footer className="p-4 mt-auto border-t-1 border-dashed border-zinc-400">
            <button
              onClick={() => {
                setPageCurrent("paymentClient");
              }}
              className="
              w-full flex items-center justify-between
              rounded-2xl overflow-hidden
              bg-primary text-primary-foreground
              shadow-lg shadow-primary/20
              transition hover:bg-primary/90
            "
            >
              <div className="px-5 py-4 flex flex-col items-start">
                <span className="text-xs opacity-80">Total</span>

                <span className="text-xl font-bold">
                  R$ {totalOrder.toFixed(2)}
                </span>
              </div>
              <div
                className="
                    h-full px-6 py-5
                    font-semibold
                    flex items-center
                  "
              >
                Finalizar
                <ArrowLeftIcon size={18} className="ml-2 rotate-180" />
              </div>
            </button>
          </footer>
        </div>
      )}
    </div>
  );
}

export default AccountClientByID;

const cardPedidos = (groupOrders, statusOn) => {
  return Object.entries(groupOrders).map(([status, pedidosGrupo]) => (
    <div className="mt-3">
      {statusOn == status && (
        <Accordion
          showDivider={false}
          itemClasses={{
            base: "border-none",
          }}
        >
          {pedidosGrupo.map((pedido) => (
            <AccordionItem
              textValue={`Pedido ${pedido.idOrder.slice(-5)}`}
              key={pedido.idOrder}
              startContent={
                <div className="bg-primary/10 p-2 rounded-xl">
                  <ShoppingBag className="text-primary" size={18} />
                </div>
              }
              title={
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="font-semibold text-sm">
                      {pedido.order.length}{" "}
                      {pedido.order.length > 1 ? "Itens" : "Item"}
                    </p>

                    <p className="text-xs text-default-500">
                      Pedido #{pedido.idOrder.slice(-5)}
                    </p>
                  </div>

                  <p className="font-bold text-primary text-lg">
                    R$ {pedido.total.toFixed(2)}
                  </p>
                </div>
              }
              indicator={
                status !== "Cancelado" &&
                status !== "Pronto" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelOrder(pedido.idOrder);
                    }}
                    className="p-1 rounded-full bg-zinc-300 hover:bg-zinc-400 transition"
                  >
                    <X size={15} className="text-white" />
                  </button>
                )
              }
              classNames={{
                base: "border border-divider border-dashed rounded-2xl mb-3",
                trigger: "px-4 py-3",
                content: "px-4 pb-4",
              }}
            >
              <div className="flex flex-col gap-3">
                {pedido.order.map((item) => (
                  <div
                    key={item.idItem}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">
                          {item.name.toUpperCase()}
                        </p>

                        <span className="inline-flex mt-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {item.size.toUpperCase()} ·{" "}
                          {item.size.toUpperCase() === "P"
                            ? "100ml"
                            : item.size.toUpperCase() === "M"
                              ? "250ml"
                              : "470ml"}
                        </span>
                      </div>

                      <p className="font-bold">R$ {item.price.toFixed(2)}</p>
                    </div>

                    {item.follow_up &&
                      Object.keys(item.follow_up).length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs uppercase tracking-wide text-default-500 mb-2">
                            Acompanhamentos
                          </p>

                          <div className="flex flex-col gap-1">
                            {Object.entries(item.follow_up).map(
                              ([category, name]) => (
                                <div
                                  key={category}
                                  className="flex gap-2 text-sm"
                                >
                                  <span className="text-zinc-400">•</span>
                                  <span className="">{category}:</span>
                                  <span className="font-medium">{name}</span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    {item.obs !== "" && (
                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-wide text-default-500 mb-2">
                          Observação
                        </p>

                        <div className="rounded-lg bg-white border border-zinc-200 p-3 text-sm">
                          {item.obs}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  ));
};
