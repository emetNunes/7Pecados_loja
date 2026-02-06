import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import ModelDefaultDialog from "../ModelDefaultDialog";
import Input from "../Input";

const AddPaymentDialog = ({
  type,
  isOpen,
  handleClose,
  valor, // [totalPedido, totalPago]
  addPaymentsInAccount,
}) => {
  const [payment, setPayment] = useState("");

  /* ================================
     RESET AO ABRIR
  ================================ */
  useEffect(() => {
    if (isOpen) {
      setPayment("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalPedido = Number(valor?.[0] || 0);
  const totalPago = Number(valor?.[1] || 0);
  const restante = Math.max(totalPedido - totalPago, 0);

  const handleSave = () => {
    if (!payment) return;

    addPaymentsInAccount({
      method: type,
      amount: Number(payment),
    });

    handleClose();
    setPayment("");
  };

  return createPortal(
    <ModelDefaultDialog
      title_dialog="Confirmar pagamento"
      info_dialog="Informe o valor pago para registrar o pagamento."
    >
      <div className="flex flex-col gap-6">
        {/* Resumo financeiro */}
        <div
          className="
            rounded-xl p-4
            bg-default-50 dark:bg-zinc-900
            border border-default-200 dark:border-zinc-800
            space-y-1
             text-left
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
            <p className="text-primary font-bold  flex justify-between">
              <span>Valor a pagar</span>
              <span>R$ {restante.toFixed(2).replace(".", ",")}</span>
            </p>
          </div>
        </div>

        {/* Input valor */}
        <Input
          id="payment_value"
          label="Valor pago"
          placeholder="Ex: R$ 26.50"
          inputMode="decimal"
          value={payment}
          className="text-lg dark:text-black"
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");
            if (!raw) {
              setPayment("");
              return;
            }
            setPayment((Number(raw) / 100).toFixed(2));
          }}
        />

        {/* Ações */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="bordered"
            onPress={handleClose}
            className="
              w-full rounded-xl
              border-default-300 dark:border-zinc-700
              text-foreground dark:text-black dark:hover:text-white
              hover:bg-default-100 dark:hover:bg-zinc-800
              transition
            "
          >
            Cancelar
          </Button>

          <Button
            onClick={handleSave}
            disabled={!payment || Number(payment) <= 0}
            className="
              w-full rounded-xl
              bg-primary text-primary-foreground
              font-semibold
              hover:bg-primary/90
              transition
            "
          >
            Salvar pagamento
          </Button>
        </div>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
};

export default AddPaymentDialog;
