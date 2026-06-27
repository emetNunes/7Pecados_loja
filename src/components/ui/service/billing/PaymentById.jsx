import { useState, useMemo, useRef } from "react";
import useSWR, { mutate } from "swr";
import {
  X,
  PrinterCheck,
  Coins,
  CreditCard,
  QrCode,
  Loader2,
  Trash,
  ArrowLeftIcon,
  CircleAlert,
} from "lucide-react";
import { Button, Input, NumberInput } from "@heroui/react";
import clsx from "clsx";
import AccountClient from "./accountClient";

const fetcher = (url) => fetch(url).then((res) => res.json());

const paymentsItems = [
  { label: "Dinheiro", type: "cash", icon: Coins },
  { label: "Cartão", type: "card", icon: CreditCard },
  { label: "PIX", type: "pix", icon: QrCode },
];

function PaymentClientByID({ setPageCurrent, clientID, handlerClient }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creating, setCreating] = useState(false);
  const [payment, setPayment] = useState("");
  const [paymentsGroup, setPaymentGroup] = useState([]);
  const [valorPago, setValorPago] = useState(0);

  const {
    data: ordersAccount,
    error: isError,
    isLoading,
  } = useSWR(
    clientID
      ? `https://api-7pecados.onrender.com/sale/account_client/id/${clientID}`
      : null,
    fetcher,
  );
  const pedidoClient = ordersAccount?.orders;
  const componenteRef = useRef();
  const accountClient = ordersAccount?.accountClient;

  let total = 0;
  let cancelado = 0;
  ordersAccount?.orders.map((order) => {
    if (order.status !== "cancelado") {
      total = total + order.total;
    }
    if (order.status == "cancelado") cancelado = cancelado + order.total;
  });

  let troco = valorPago - total;

  const createPaymentInAccount = async () => {
    setCreating(true);

    const userID = JSON.parse(localStorage.getItem("user"))?.id;

    const newPayment = {
      type: "entrance",
      payments: paymentsGroup,
      userID: userID,
      orderID: clientID,
    };

    try {
      await mutate(
        "https://api-7pecados.onrender.com/admin/finance/historic/filter/?type=entrace&details=true",
        async (currentData) => {
          const response = await fetch(
            "https://api-7pecados.onrender.com/admin/finance/transaction",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
              body: JSON.stringify(newPayment),
            },
          );

          if (!response.ok) throw new Error("Erro ao finalizar conta");

          const payment = await response.json();
          const paymentID =
            payment?._id || payment?.finances?._id || payment?.id;

          if (!paymentID) throw new Error("Pagamento sem ID");

          const updateRes = await fetch(
            `https://api-7pecados.onrender.com/sale/account_client/payment/${clientID}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
              body: JSON.stringify({
                clientID,
                paymentID,
                userID,
              }),
            },
          );

          if (!updateRes.ok) throw new Error("Erro ao atualizar conta");
          setPaymentGroup([]);
          setValorPago(0);
          handlerClient([]);
          setPageCurrent("viewAccounts");

          return currentData;
        },
        { revalidate: true },
      );
    } catch (err) {
      console.error("Erro ao finalizar pagamento:", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-2xl">
            <Coins className="text-primary" size={22} />
          </div>

          <div>
            <h1 className="text-xl font-bold">Pagamento da conta</h1>

            <div className="flex items-center   gap-2 mt-1">
              <span className="font-medium text-primary">Comprovante</span>

              <span className="text-zinc-300">•</span>

              <span className="text-sm text-zinc-500">Pagamento</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setPageCurrent("viewAccounts");
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-zinc-500 hover:bg-zinc-100 transition"
        >
          <ArrowLeftIcon size={18} />
          <span className="font-medium">Voltar</span>
        </button>
      </header>

      {!isLoading ? (
        <section
          ref={componenteRef}
          className="
            flex-1 overflow-y-auto p-6 w-full
            bg-background dark:bg-zinc-900
            rounded-xl shadow-sm
            max-w-md mx-auto
            area-impressao
            
          "
        >
          <div className="text-center mb-6">
            <PrinterCheck
              onClick={() => {
                printOrder(componenteRef);
              }}
              className="mx-auto hover:text-base hover:bg-primary text-primary bg-primary/10 rounded-full p-4"
              size={64}
            />
          </div>

          <div className="text-sm space-y-2">
            <p className="font-bold text-lg">7 Pecados — Loja Principal</p>
            <p className="text-muted-foreground">
              Rua Joel Rua Velha, nº 45 — RJ
            </p>
          </div>

          <div className="mt-6">
            <p className="font-semibold mb-2">Pedidos registrados</p>

            <div className="divide-y divide-zinc-400 dark:divide-zinc-800">
              {pedidoClient.map((item) =>
                item.order.map((order) => (
                  <div
                    key={order.idItem}
                    className="flex justify-between  border-b-1 border-dashed border-zinc-400 py-2 text-sm"
                  >
                    <span
                      className={clsx({
                        "text-zinc-600": item.status == "cancelado",
                      })}
                    >
                      {order.name}
                    </span>
                    <span
                      className={clsx({
                        "text-zinc-600": item.status == "cancelado",
                      })}
                    >
                      {item.status == "cancelado" && "-"} R$
                      {Number(order.price).toFixed(2)}
                    </span>
                  </div>
                )),
              )}
            </div>
          </div>

          <div className="mt-6 border-t pt-4 space-y-2">
            <p className="font-semibold mb-2">Historico financeiro</p>

            {valorPago > 0 && (
              <p className="text-[13px] text-muted-foreground">
                - Valor recebido
                <span className="float-right">
                  + R${valorPago == 0 ? "0.00" : valorPago.toFixed(2)}
                </span>
              </p>
            )}

            {valorPago > 0 && (
              <p className="text-[13px] text-muted-foreground">
                - Troco
                <span className="float-right">
                  R$
                  {(valorPago >= total && (valorPago - total).toFixed(2)) ||
                    "0.00"}
                </span>
              </p>
            )}
            <p>Pagamentos recebidos</p>
            {paymentsGroup?.length !== 0 ? (
              paymentsGroup.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2 text-sm border-b-1 border-dashed"
                >
                  <span>
                    -{" "}
                    {item.method == "cash"
                      ? "Dinheiro"
                      : item.method == "card"
                        ? "Cartão"
                        : item.method
                          ? "PIX"
                          : "PAGO"}
                  </span>
                  <span>R$ {Number(item.amount).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <>
                <p className="text-zinc-600 flex justify-between">
                  Nenhum pagamento recebido no momento.
                </p>
              </>
            )}
          </div>

          <div className="mt-6 border-t pt-4 space-y-2">
            <p className="font-semibold mb-2">Resumo da conta</p>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>R${(total + cancelado).toFixed(2)}</span>
            </div>

            {cancelado > 0 && (
              <p className="text-[13px] text-muted-foreground">
                - Cancelado
                <span className="float-right">- R${cancelado.toFixed(2)}</span>
              </p>
            )}

            <div className="flex border-t border-dashed border-default-400 pt-1 justify-between font-bold text-lg text-primary">
              <span>Total da conta</span>
              <span>R${total.toFixed(2)}</span>
            </div>
          </div>
        </section>
      ) : (
        "Carregando..."
      )}

      <footer className="p-4 border-t border-default-200 dark:border-zinc-800">
        {accountClient?.status == true ? (
          <>
            <div
              className="
            rounded-xl p-4
            bg-default-50 dark:bg-zinc-900
            border border-default-200 dark:border-zinc-800
            space-y-1
          "
            >
              <div>
                {paymentMethod.length == 0 &&
                  valorPago < total &&
                  paymentsItemsCard(setPaymentMethod)}

                {paymentMethod.length !== 0 && (
                  <>
                    <p className="font-bold mb-2 border-b-1 border-zinc-300">
                      Receber Pagamento
                    </p>
                    <p
                      className={clsx(
                        " flex justify-between",
                        { "text-primary font-bold": valorPago < total },
                        { "text-zinc-500": valorPago >= total },
                      )}
                    >
                      <span>Valor à receber</span>
                      <span>
                        R$
                        {valorPago >= total
                          ? "00.00"
                          : (total - valorPago).toFixed(2)}
                      </span>
                    </p>

                    <p
                      className={clsx(
                        " flex justify-between",
                        { "text-primary font-bold": valorPago !== total },
                        { "text-zinc-500": valorPago == total },
                      )}
                    >
                      <span>Valor recebido</span>
                      <span>R${valorPago.toFixed(2)}</span>
                    </p>
                    <p
                      className={clsx(
                        " flex justify-between",
                        { "text-primary font-bold": valorPago >= total },
                        { "text-zinc-500": valorPago < total },
                      )}
                    >
                      <span>Troco</span>
                      <span>
                        R$
                        {valorPago >= total
                          ? (valorPago - total).toFixed(2)
                          : "0.00"}
                      </span>
                    </p>
                    <div className="pt-2 border-t border-dashed border-default-400 mt-3 dark:border-zinc-700" />
                    <div className="">
                      <div className="flex flex-row mb-2 justify-between">
                        <p>
                          Pagamento em{" "}
                          <span className="text-primary">
                            '{paymentMethod[1]}'
                          </span>
                        </p>

                        <button
                          onClick={() => {
                            setPaymentMethod([]);
                          }}
                          className="p-1 rounded-full bg-zinc-300 hover:bg-zinc-400 transition"
                        >
                          <X size={15} className="text-white" />
                        </button>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <NumberInput
                          label="Preço"
                          placeholder="0,00"
                          startContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                R$
                              </span>
                            </div>
                          }
                          value={payment}
                          onValueChange={setPayment}
                          formatOptions={{
                            style: "decimal",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }}
                        />

                        <button
                          onClick={() => {
                            if (payment > 0) {
                              setPaymentGroup([
                                ...paymentsGroup,
                                { method: paymentMethod[0], amount: payment },
                              ]);

                              setValorPago(valorPago + payment);
                              setPaymentMethod([]);
                              setPayment("");
                            }
                          }}
                          className=" rounded-2xl px-3 bg-primary text-white hover:bg-primary/80 cursor-pointer"
                        >
                          Receber
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {paymentsGroup.length !== 0 && (
                  <>
                    <p className="font-bold mb-2 border-b-1 border-zinc-300">
                      Historico de pagamentos
                    </p>
                    {paymentsGroup.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center  py-2 text-sm border-b-1 border-dashed"
                      >
                        <span>
                          -{" "}
                          {item.method == "cash"
                            ? "Dinheiro"
                            : item.method == "card"
                              ? "Cartão"
                              : item.method
                                ? "PIX"
                                : "PAGO"}
                        </span>
                        <span>R$ {Number(item.amount).toFixed(2)}</span>

                        <button
                          onClick={() => {
                            setPaymentGroup(
                              paymentsGroup.filter((_, i) => i !== index),
                            );
                            setValorPago(valorPago - item.amount);
                          }}
                          className="p-1 rounded-full bg-primary/70 hover:bg-primary/90 transition"
                        >
                          <Trash size={15} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </>
                )}

                {valorPago > total && (
                  <div className="border-1 rounded-sm border-primary flex gap-2 shadow-sm font-bold text-primary p-4 mt-2">
                    <CircleAlert />
                    <div>
                      <p>Valor recebido maior que o total da conta.</p>
                      <p className="font-normal ">
                        EDITE ou REGISTRE com o troco automatico
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              disabled={creating || valorPago < total}
              onClick={() => {
                const pendentes = pedidoClient.filter(
                  (p) =>
                    p.statusOrder === "pendente" ||
                    p.statusOrder === "em produção",
                );

                if (pendentes.length > 0) return;
                createPaymentInAccount();
              }}
              className="
            w-full mt-4 py-4 rounded-xl
            bg-primary text-primary-foreground
            font-bold text-lg
            hover:bg-primary/90
            disabled:opacity-70 disabled:cursor-not-allowed
            transition-all
            flex items-center justify-center gap-2
          "
            >
              {creating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  registrando...
                </>
              ) : valorPago < total ? (
                `Total da conta R$${total.toFixed(2)}`
              ) : (
                "Finalizar conta"
              )}
            </button>
          </>
        ) : (
          <div className="border-1 rounded-sm border-primary flex gap-2 shadow-sm font-bold text-primary p-4 mt-2">
            <CircleAlert />
            <div>
              <p>Essa conta já foi fechada!</p>
              <p className="font-normal ">
                Fique a vontade para conferir os detalhes através do
                comprovante.
              </p>
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}

export default PaymentClientByID;

const paymentsItemsCard = (setPaymentMethod) => {
  const paymentsItems = [
    { label: "Dinheiro", type: "cash", icon: Coins },
    { label: "Cartão", type: "card", icon: CreditCard },
    { label: "PIX", type: "pix", icon: QrCode },
  ];

  return (
    <>
      <p className=" font-bold">Formas de pagamento</p>

      <div className="flex  w-full justify-center gap-4 mb-4 mt-4">
        {paymentsItems.map(({ label, type, icon: Icon }) => (
          <button
            key={type}
            onClick={() => {
              setPaymentMethod([type, label]);
            }}
            className={`
                    flex bg-white shadow-sm flex-col items-center py-4 w-full rounded-xl transition border-1 border-white hover:border-primary
                  `}
          >
            <div className=" bg-secondary/20 rounded-xl p-1 mb-1">
              <Icon className="mb-1 text-secondary" />
            </div>
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

const printOrder = (componenteRef) => {
  if (!componenteRef.current) return;

  const iframe = document.createElement("iframe");

  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  document.body.appendChild(iframe);

  const estilos = Array.from(
    document.querySelectorAll('link[rel="stylesheet"], style'),
  )
    .map((el) => el.outerHTML)
    .join("");

  iframe.contentDocument.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        ${estilos}
      </head>
      <body>
        ${componenteRef.current.outerHTML}
      </body>
    </html>
  `);

  iframe.contentDocument.close();

  iframe.onload = () => {
    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  };
};
