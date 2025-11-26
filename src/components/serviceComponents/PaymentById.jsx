import React from "react";
import {
  CircleX,
  HandPlatter,
  XIcon,
  X,
  ShoppingCart,
  CirclePlus,
  PrinterCheckIcon,
  Coins,
  CreditCard,
  QrCode,
} from "lucide-react";

function PaymentClientByID({ id, setPage }) {
  return (
    <>
      <div className="p-2">
        <div className="font-bold text-2xl flex justify-between">
          <h1>Comprovante fiscal</h1>
          <div
            className="text-2xl  hover:text-primary"
            onClick={() => {
              setPage("");
            }}
          >
            <XIcon />
          </div>
        </div>
      </div>

      <div className="p-2 h-2/4 overflow-y-auto overscroll-contain scroll-smooth [WebkitOverflowScrolling:touch] w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-md text-sm">
        {/* Ícone */}
        <div className="flex justify-center flex-col text-center p-4">
          <PrinterCheckIcon className="mx-auto mb-6 w-24 h-24 p-2 bg-primary text-white rounded-full" />
        </div>

        {/* Cabeçalho da Loja */}
        <div className="text-left leading-tight">
          <h1 className="font-bold text-lg">Loja</h1>
          <p className="font-semibold mt-1">
            COMPROVANTE FISCAL — 7Pecados S.A (Loja Principal)
          </p>
          <p>Rua Joel Rua Velha, nº 45 — Rio de Janeiro/RJ</p>
          <p>CNPJ: 11.111.111/1111-12 | IE: 1112123 | IM: 112123456</p>
        </div>

        <div className="mb-6 mt-2">
          <h1 className="font-bold text-lg">Cliente</h1>
          <p>
            Nome: Bruna Goias de Sousa —{" "}
            <span className="font-semibold">#21234</span>
          </p>
          <p>Local de compra: Loja Principal (05/10/2025 — 13:00)</p>
        </div>

        {/* Itens */}
        <div>
          <h2 className="font-bold text-base mb-2">Itens</h2>

          <div className="grid grid-cols-4 text-left font-semibold border-b pb-1">
            <span>Item</span>
            <span className="text-center">Qtd.</span>
            <span className="text-center">Vlr. Unit.</span>
            <span className="text-right">Subtotal</span>
          </div>

          {/* Linha do item */}
          <div className="divide-y">
            {[1, 2, 3].map((i) => (
              <div key={i} className="grid grid-cols-4 py-2">
                <span>Taça do Amor</span>
                <span className="text-center">1</span>
                <span className="text-center">26,56</span>
                <span className="text-right">26,56</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-bold text-base mb-2">Resumo do pedido</h2>

          <div className="flex justify-between py-1">
            <span>Subtotal</span>
            <span className="font-semibold">79,74</span>
          </div>

          <div className="flex justify-between py-1 text-primary">
            <span>Desconto</span>
            <span className="font-semibold">-34,18</span>
          </div>

          <div className="flex justify-between py-2 border-t mt-2 text-lg font-bold">
            <span>Total</span>
            <span>45,56</span>
          </div>
        </div>
      </div>

      <div className="mt-auto flex flex-col p-2">
        <h1 className="font-bold text-2xl">Registrar pagamento</h1>

        <div className="bg-base flex text-center justify-between py-4 items-center  gap-2 w-full p-2">
          <div className="flex flex-col p-2 px-4 border-2 border-secondary rounded-2xl">
            <Coins className=" w-15 h-15   text-secondary" />
            <p className="text-secondary">Dinheiro</p>
          </div>
          <div className="flex flex-col p-2 px-4 border-2 border-secondary rounded-2xl">
            <CreditCard className=" w-15 h-15  text-secondary" />
            <p className="text-secondary">Cartão</p>
          </div>
          <div className="flex flex-col p-2 px-4 border-2 border-secondary rounded-2xl">
            <QrCode className=" w-15 h-15  text-secondary" />
            <p className="text-secondary">Pix</p>
          </div>
        </div>

        <div className="text-center p-2">
          <button
            onClick={() => setPage("pagamento")}
            className="bg-primary hover:bg-white text-white  hover:outline-2 hover:outline-offset-2 hover:outline-solid hover:text-primary w-full text-2xl my-4 font-bold rounded-md p-6"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </>
  );
}

export default PaymentClientByID;
