import React, { useState, useMemo } from "react";
import { mutate } from "swr";
import {
  XIcon,
  PrinterCheckIcon,
  Coins,
  CreditCard,
  QrCode,
} from "lucide-react";
import AddPaymentDialog from "../AddPaymentDialog";

function PaymentClientByID({ id, setPage, clientID, pedidoClient = [] }) {
  const [payments, setPayments] = useState([]);
  const [addClientDialogIsOpen, setAddClientDialog] = useState(false);
  const [paymentFormatSet, setPaymentFormat] = useState("");
  const [creating, setCreating] = useState(false);
  const [isDebit, setIsDebit] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  // ----------------------------------------------------
  // CALCULAR TOTAL COM SEGURANÇA
  // ----------------------------------------------------
  const total = useMemo(() => {
    return pedidoClient.reduce((acc, item) => acc + item.priceTotal, 0);
  }, [pedidoClient]);

  // ----------------------------------------------------
  // ADICIONAR PAGAMENTO
  // ----------------------------------------------------
  const addPaymentsInAccount = (newPayment) => {
    const totalPagamentos = payments.reduce((acc, p) => acc + p.amount, 0);
    const novoSubTotal = totalPagamentos + newPayment.amount;
    if (novoSubTotal == Number(parseFloat(total).toFixed(2))) {
      console.log("teste");
      setIsDebit(true);
    }

    if (novoSubTotal > total) {
      console.warn("Pagamento ultrapassa o total da conta.");
      return;
    }

    setSubTotal(novoSubTotal);
    setPayments((prev) => [...prev, newPayment]);
  };

  // ----------------------------------------------------
  // FINALIZAR PAGAMENTO
  // ----------------------------------------------------
  const createPaymentInAccount = async () => {
    setCreating(true);

    const newPayment = {
      type: "entrance",
      payments,
      userID: JSON.parse(localStorage.getItem("user")).id,
      orderID: clientID,
    };

    try {
      await mutate(
        `https://api-7pecados.onrender.com/admin/finance/historic/filter/?type=entrace&details=true`,
        async (currentData) => {
          // 1 — Criar pagamento
          const response = await fetch(
            `https://api-7pecados.onrender.com/admin/finance/transaction`,
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

          if (!paymentID) throw new Error("API não retornou o ID do pagamento");

          // 2 — Atualizar conta do cliente
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

          if (!updateRes.ok)
            throw new Error("Erro ao atualizar conta do cliente");

          await updateRes.json();

          // Fecha página
          setPage("");

          return {
            ...currentData,
          };
        },
        { revalidate: true }
      );
    } catch (err) {
      console.error("Erro ao finalizar conta:", err);
    } finally {
      setCreating(false);
    }
  };

  // ----------------------------------------------------
  // BOTÃO PAGAMENTOS PENDENTES
  // ----------------------------------------------------
  const handleFinish = () => {
    let pendentes = pedidoClient.filter(
      (pc) => pc.statusOrder === "pendente" || pc.statusOrder === "em produção"
    );

    if (pendentes.length > 0) {
      console.log("Não é possível finalizar: produtos pendentes.");
      return;
    }

    createPaymentInAccount();
  };

  return (
    <>
      <div className="p-2">
        <div className="font-bold text-2xl flex justify-between">
          <h1>Comprovante fiscal</h1>

          <div
            className="text-2xl hover:text-primary cursor-pointer"
            onClick={() => setPage("carrinho")}
          >
            <XIcon />
          </div>
        </div>
      </div>

      <div className="h-2/4 overflow-y-auto w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-md text-sm">
        {/* Ícone */}
        <div className="flex justify-center flex-col text-center p-4">
          <PrinterCheckIcon className="mx-auto mb-6 w-24 h-24 p-2 bg-primary text-white rounded-full" />
        </div>

        <div className="text-left mb-6 leading-tight">
          <h1 className="font-bold text-lg">Loja</h1>
          <p className="font-semibold mt-1">
            COMPROVANTE FISCAL — 7Pecados S.A (Loja Principal)
          </p>
          <p>Rua Joel Rua Velha, nº 45 — Rio de Janeiro/RJ</p>
          <p>CNPJ: 11.111.111/1111-12 | IE: 1112123 | IM: 112123456</p>
        </div>

        {/* Cabeçalho */}
        {pedidoClient.length > 0 && (
          <div className="text-left leading-tight">
            <h1 className="font-bold text-lg">Cliente</h1>
            <p>
              Nome: {pedidoClient[0].clientID.name} —{" "}
              <span className="font-semibold">
                #{pedidoClient[0].clientID._id}
              </span>
            </p>
          </div>
        )}

        {/* Itens */}
        <div className="mt-6">
          <h2 className="font-bold  mb-2">Itens</h2>

          <div className="grid grid-cols-4 text-left font-semibold border-b pb-1">
            <span>Item</span>
            <span className="text-center">Qtd.</span>
            <span className="text-center">Unit.</span>
            <span className="text-right">Subtotal</span>
          </div>

          <div className="divide-y">
            {pedidoClient.map((item) =>
              item.products.map((prod) => (
                <div key={prod._id} className="grid grid-cols-4 py-2">
                  <span>{prod.productID.name}</span>
                  <span className="text-center">1</span>
                  <span className="text-center">
                    {Number(prod.productID.price).toFixed(2)}
                  </span>
                  <span className="text-right">
                    {Number(prod.productID.price).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Resumo */}
        <div className="mt-6">
          <h2 className="font-bold  mb-2">Resumo do pedido</h2>

          <div className="flex justify-between py-1">
            <span>Subtotal</span>
            <span className="font-semibold">{total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-1 text-primary">
            <span>Desconto</span>
            <span className="font-semibold">0.00</span>
          </div>

          <div className="flex justify-between py-2 border-t mt-2 text-lg font-bold">
            <span>Total</span>
            <span>{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Pagamento */}
      <div className="mt-auto flex flex-col p-2 w-full">
        <h1 className="font-bold text-2xl">Registrar pagamento</h1>

        <div className="space-y-1 text-left mb-4 mt-2">
          <p className="text-sm text-gray-500 font-bold">
            Total do pedido R$ {parseFloat(total).toFixed(2)}
          </p>

          {payments.map((pay) => (
            <p className="text-sm text-gray-500">
              Total pago: R$ {parseFloat(pay.amount).toFixed(2)} -
              {pay.method == "cash"
                ? "Dinheiro"
                : pay.method == "card"
                  ? "Cartão"
                  : "PIX"}
            </p>
          ))}

          <p className="text-lg font-semibold text-primary">
            Valor a pagar: R$ {parseFloat(total - subTotal).toFixed(2)}
          </p>
        </div>

        <div className="flex gap-4 mx-auto py-4 items-center">
          {[
            { label: "Dinheiro", type: "cash", icon: Coins },
            { label: "Cartão", type: "card", icon: CreditCard },
            { label: "Pix", type: "pix", icon: QrCode },
          ].map(({ label, type, icon: Icon }) => (
            <button
              key={type}
              disabled={isDebit}
              onClick={() => {
                setPaymentFormat(type);
                setAddClientDialog(true);
              }}
              className={`
        flex flex-col items-center p-4 px-6 rounded-2xl border-2 border-secondary 
        transition-all duration-200
        ${isDebit ? "opacity-40 cursor-not-allowed" : "hover:bg-secondary/10"}
      `}
            >
              <Icon className="w-10 h-10 text-secondary mb-1" />
              <p className="text-secondary font-medium">{label}</p>
            </button>
          ))}
        </div>

        <AddPaymentDialog
          isOpen={addClientDialogIsOpen}
          handleClose={() => setAddClientDialog(false)}
          addPaymentsInAccount={addPaymentsInAccount}
          type={paymentFormatSet}
          valor={[total, subTotal]}
        />

        <div className="text-center p-2">
          <button
            disabled={creating}
            onClick={handleFinish}
            className="bg-primary hover:bg-[#b95265] text-white  w-full text-2xl my-4 font-bold rounded-md p-6"
          >
            {creating ? "Salvando..." : "Finalizar compra"}
          </button>
        </div>
      </div>
    </>
  );
}

export default PaymentClientByID;
