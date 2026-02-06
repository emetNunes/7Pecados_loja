import { useState, useMemo } from "react";
import { mutate } from "swr";
import { X, PrinterCheck, Coins, CreditCard, QrCode, Loader2 } from "lucide-react";

import AddPaymentDialog from "./AddPaymentDialog";
import { useToast } from "@/contexts/ToastContext";

/* =====================================================
   COMPONENT
===================================================== */
function PaymentClientByID({ setPage, clientID, pedidoClient = [] }) {
  /* ================================
     STATES
  ================================ */
  const [payments, setPayments] = useState([]);
  const [addPaymentDialogOpen, setAddPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creating, setCreating] = useState(false);
  const [isDebit, setIsDebit] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const toast = useToast();

  /* ================================
     TOTAL
  ================================ */
  const total = useMemo(() => {
    return pedidoClient.reduce((acc, item) => acc + (item.priceTotal || 0), 0);
  }, [pedidoClient]);

  const totalPedido = Number(total);
  const totalPago = Number(subTotal);
  const restante = Math.max(totalPedido - totalPago, 0);

  /* ================================
     ADD PAYMENT
  ================================ */
  const addPaymentsInAccount = (newPayment) => {
    const totalPagamentos = payments.reduce((acc, p) => acc + p.amount, 0);

    const novoSubTotal = totalPagamentos + newPayment.amount;

    if (novoSubTotal >= Number(total.toFixed(2))) {
      setIsDebit(true);
    }

    if (novoSubTotal > total) {
      toast.warning("O valor do pagamento excede o total da conta", "Valor inválido");
      return;
    }

    setSubTotal(novoSubTotal);
    setPayments((prev) => [...prev, newPayment]);
    
    // Feedback visual
    const paymentMethodName = {
      dinheiro: "Dinheiro",
      pix: "PIX",
      cartao_debito: "Cartão de Débito",
      cartao_credito: "Cartão de Crédito",
    }[newPayment.method] || "Pagamento";
    
    toast.success(
      `${paymentMethodName} de R$ ${Number(newPayment.amount).toFixed(2).replace(".", ",")} adicionado`,
      "Pagamento registrado"
    );
  };

  /* ================================
     PEDIDO DO CLIENTE PADRONIZADO
  ================================ */
  function buildSoldProducts(orders = []) {
    const map = {};

    orders.forEach((order) => {
      order.products?.forEach((item) => {
        const productId =
          typeof item.productID === "object"
            ? item.productID._id
            : item.productID;

        if (!productId) return;

        if (!map[productId]) {
          map[productId] = {
            productID: productId,
            quantity: 0,
          };
        }

        map[productId].quantity += 1;
      });
    });

    return Object.values(map);
  }

  const soldProducts = buildSoldProducts(pedidoClient);
  console.log(soldProducts);

  /* ================================
     FINALIZAR PAGAMENTO
  ================================ */
  const userID = JSON.parse(localStorage.getItem("user"))?.id;
  const createPaymentInAccount = async () => {
    setCreating(true);

    const newPayment = {
      type: "entrance",
      payments,
      userID,
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
                paymentID,
                soldProducts,
                userID,
              }),
            },
          );

          if (!updateRes.ok) throw new Error("Erro ao atualizar conta");

          toast.success(
            `Conta fechada com sucesso! Total: R$ ${totalPedido.toFixed(2).replace(".", ",")}`,
            "Pagamento finalizado"
          );
          setPage("");
          return currentData;
        },
        { revalidate: true },
      );
    } catch (err) {
      console.error("Erro ao finalizar pagamento:", err);
      toast.error(
        "Não foi possível finalizar o pagamento. Tente novamente.",
        "Erro ao fechar conta"
      );
    } finally {
      setCreating(false);
    }
  };

  /* ================================
     FINALIZAR
  ================================ */
  const handleFinish = () => {
    const pendentes = pedidoClient.filter(
      (p) => p.statusOrder === "pendente" || p.statusOrder === "em produção",
    );

    if (pendentes.length > 0) return;
    createPaymentInAccount();
  };

  /* ================================
     UI
  ================================ */
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-default-200 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            Comprovante fiscal
          </h2>
          <p className="text-primary text-small">#{clientID}</p>
        </div>
        <button
          onClick={() => setPage("carrinho")}
          className="text-muted-foreground hover:text-primary"
        >
          <X />
        </button>
      </header>

      {/* Comprovante */}
      <section
        className="
        flex-1 overflow-y-auto p-6
        bg-background dark:bg-zinc-900
        rounded-xl shadow-sm
        max-w-md mx-auto
      "
      >
        <div className="text-center mb-6">
          <PrinterCheck
            className="mx-auto text-primary bg-primary/10 rounded-full p-4"
            size={64}
          />
        </div>

        <div className="text-sm space-y-2">
          <p className="font-bold text-lg">7 Pecados — Loja Principal</p>
          <p className="text-muted-foreground">
            Rua Joel Rua Velha, nº 45 — RJ
          </p>
        </div>

        {/* Itens */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Itens</h3>

          <div className="divide-y divide-default-200 dark:divide-zinc-800">
            {pedidoClient.map((item) =>
              item.products.map((prod) => (
                <div
                  key={prod._id}
                  className="flex justify-between py-2 text-sm"
                >
                  <span>{prod.productID.name}</span>
                  <span>
                    R$ {Number(prod.productID.prices[0].value).toFixed(2)}
                  </span>
                </div>
              )),
            )}
          </div>
        </div>

        <div className="mt-6 border-t pt-4 space-y-2">
          <p>Pagamentos</p>
          {payments?.length !== 0 ? (
            payments.map((item) => (
              <div
                key={payments.indexOf()}
                className="flex justify-between py-2 text-sm"
              >
                <span>
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
              <p className="text-primary font-bold flex justify-between">
                <span>Nenhum pagamento registrado!</span>
              </p>
            </>
          )}
        </div>

        {/* Resumo */}

        <div className="mt-6 border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg text-primary">
            <span>Total</span>
            <span>{total.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {/* Pagamento */}
      <footer className="p-4 border-t border-default-200 dark:border-zinc-800">
        {/* <div className="mb-4">
          <p className="text-sm text-muted-foreground">Total do pedido</p>
          <p className="text-xl font-bold text-primary">
            R$ {total.toFixed(2)}
          </p>
        </div> */}

        <div
          className="
            rounded-xl p-4
            bg-default-50 dark:bg-zinc-900
            border border-default-200 dark:border-zinc-800
            space-y-1
          "
        >
          <p className="text-sm text-muted-foreground font-medium">
            Total do pedido
            <span className="float-right font-semibold">
              R$ {totalPedido.toFixed(2).replace(".", ",")}
            </span>
          </p>

          <p className="text-sm text-muted-foreground">
            Total pago
            <span className="float-right">
              R$ {totalPago.toFixed(2).replace(".", ",")}
            </span>
          </p>

          <div className="pt-2 border-t border-dashed border-default-300 dark:border-zinc-700">
            <p className="text-primary font-bold flex justify-between">
              <span>Valor a pagar</span>
              <span>R$ {restante.toFixed(2).replace(".", ",")}</span>
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-4 mt-4">
            {[
              { label: "Dinheiro", type: "cash", icon: Coins },
              { label: "Cartão", type: "card", icon: CreditCard },
              { label: "PIX", type: "pix", icon: QrCode },
            ].map(({ label, type, icon: Icon }) => (
              <button
                key={type}
                disabled={isDebit}
                onClick={() => {
                  setPaymentMethod(type);
                  setAddPaymentDialog(true);
                }}
                className={`
                flex flex-col items-center px-6 py-4 rounded-xl border
                border-secondary transition
                ${
                  isDebit
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-secondary/10"
                }
              `}
              >
                <Icon className="mb-1 text-secondary" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <AddPaymentDialog
          isOpen={addPaymentDialogOpen}
          handleClose={() => setAddPaymentDialog(false)}
          addPaymentsInAccount={addPaymentsInAccount}
          type={paymentMethod}
          valor={[total, subTotal]}
        />

        <button
          disabled={creating || restante > 0}
          onClick={handleFinish}
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
              Finalizando...
            </>
          ) : restante > 0 ? (
            `Falta R$ ${restante.toFixed(2).replace(".", ",")}`
          ) : (
            "Finalizar compra"
          )}
        </button>
      </footer>
    </div>
  );
}

export default PaymentClientByID;
