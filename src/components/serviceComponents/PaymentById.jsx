import { useState, useMemo } from "react";
import { mutate } from "swr";
import { X, PrinterCheck, Coins, CreditCard, QrCode } from "lucide-react";

import AddPaymentDialog from "./AddPaymentDialog";

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

  /* ================================
     TOTAL
  ================================ */
  const total = useMemo(() => {
    return pedidoClient.reduce((acc, item) => acc + (item.priceTotal || 0), 0);
  }, [pedidoClient]);

  /* ================================
     ADD PAYMENT
  ================================ */
  const addPaymentsInAccount = (newPayment) => {
    const totalPagamentos = payments.reduce((acc, p) => acc + p.amount, 0);

    const novoSubTotal = totalPagamentos + newPayment.amount;

    if (novoSubTotal >= Number(total.toFixed(2))) {
      setIsDebit(true);
    }

    if (novoSubTotal > total) return;

    setSubTotal(novoSubTotal);
    setPayments((prev) => [...prev, newPayment]);
  };

  /* ================================
     FINALIZAR PAGAMENTO
  ================================ */
  const createPaymentInAccount = async () => {
    setCreating(true);

    const newPayment = {
      type: "entrance",
      payments,
      userID: JSON.parse(localStorage.getItem("user"))?.id,
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
            }
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
              body: JSON.stringify({ paymentID }),
            }
          );

          if (!updateRes.ok) throw new Error("Erro ao atualizar conta");

          setPage("");
          return currentData;
        },
        { revalidate: true }
      );
    } catch (err) {
      console.error("Erro ao finalizar pagamento:", err);
    } finally {
      setCreating(false);
    }
  };

  /* ================================
     FINALIZAR
  ================================ */
  const handleFinish = () => {
    const pendentes = pedidoClient.filter(
      (p) => p.statusOrder === "pendente" || p.statusOrder === "em produção"
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
        <h2 className="text-xl font-bold text-foreground">
          Comprovante fiscal
        </h2>
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
                  <span>R$ {Number(prod.productID.price).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Resumo */}
        <div className="mt-6 border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg text-primary">
            <span>Total</span>
            <span>{total.toFixed(2)}</span>
          </div>
        </div>
      </section>

      {/* Pagamento */}
      <footer className="p-4 border-t border-default-200 dark:border-zinc-800">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Total do pedido</p>
          <p className="text-xl font-bold text-primary">
            R$ {total.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-4">
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

        <AddPaymentDialog
          isOpen={addPaymentDialogOpen}
          handleClose={() => setAddPaymentDialog(false)}
          addPaymentsInAccount={addPaymentsInAccount}
          type={paymentMethod}
          valor={[total, subTotal]}
        />

        <button
          disabled={creating}
          onClick={handleFinish}
          className="
            w-full mt-4 py-4 rounded-xl
            bg-primary text-primary-foreground
            font-bold text-lg
            hover:bg-primary/90
          "
        >
          {creating ? "Salvando..." : "Finalizar compra"}
        </button>
      </footer>
    </div>
  );
}

export default PaymentClientByID;
