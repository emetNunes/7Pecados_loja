import { createPortal } from "react-dom";
import Input from "./Input";
import { Button } from "@heroui/react";
import ModelDefaultDialog from "./ModelDefaultDialog";
import { useEffect, useState } from "react";
import { mutate } from "swr";

const AddPaymentDialog = ({
  type,
  isOpen,
  handleClose,
  valor,
  addPaymentsInAccount,
}) => {
  const [payment, setPayment] = useState("");
  const [value, setValue] = useState("");

  const [incorretValue, setIncorretValue] = useState(false);
  if (!isOpen) return null;

  return createPortal(
    <ModelDefaultDialog
      title_dialog="Confirmar pagamento"
      info_dialog="Informe os dados necessários para registrar o pagamento."
    >
      <div className="space-y-1 text-left mb-4">
        <p className="text-sm text-gray-500 font-bold">
          Total do pedido R$ {Number(valor[0]).toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">
          Total pago: R$ {Number(valor[1]).toFixed(2)}
        </p>

        <p className="text-lg font-semibold text-primary">
          Valor a pagar: R${" "}
          {parseFloat(
            Number(valor[0]).toFixed(2) - Number(valor[1]).toFixed(2)
          ).toFixed(2)}
        </p>
      </div>
      <Input
        id="payment_value"
        value={payment}
        label="Adicionar pagamento"
        placeholder="Ex: 26.50"
        inputMode="decimal"
        onChange={(e) => {
          const raw = e.target.value.replace(/\D/g, "");

          if (!raw) {
            setPayment("");
            return;
          }
          const formatted = (parseFloat(raw, 10) / 100).toFixed(2);

          setPayment(formatted);
        }}
        className="text-lg"
      />

      <div className="flex gap-3">
        <Button
          className="w-full rounded-xl border border-default-300 bg-white text-default-700 hover:bg-default-100 transition-colors"
          onPress={handleClose}
        >
          Cancelar
        </Button>

        <Button
          onClick={() => {
            if (!payment || payment.length === 0) {
              console.warn("O pagamento está vazio!");
              return;
            }

            addPaymentsInAccount({
              method: type,
              amount: parseFloat(payment),
            });
            handleClose();
            setPayment("");
          }}
          className="w-full rounded-xl bg-primary text-white hover:opacity-90 transition-opacity"
        >
          Salvar
        </Button>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
};

export default AddPaymentDialog;
