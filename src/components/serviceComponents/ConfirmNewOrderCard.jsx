import { AlertTriangle, CirclePlus, CircleX, Loader2 } from "lucide-react";

export function ConfirmNewOrderCard({
  clientName,
  total,
  productName,
  onConfirm,
  onCancel,
  isLoading = false,
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-primary/30
        bg-primary/5 dark:bg-primary/10
        my-4
        p-5
        shadow-sm
        flex flex-col gap-4
      "
    >
      {/* HEADER */}
      <div className="flex items-start gap-3">
        <div
          className="
            flex items-center justify-center
            w-10 h-10 rounded-full
            bg-primary/15 text-primary
          "
        >
          <AlertTriangle size={20} />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-base text-foreground">
            Novo pedido para {clientName}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            Deseja confirmar{" "}
            <strong className="text-primary">{productName}</strong> ou cancelar
            os itens adicionados?
          </p>
        </div>
      </div>

      {/* TOTAL */}
      <div
        className="
          flex items-center justify-between
          rounded-xl
          bg-background dark:bg-zinc-900
          border border-default-200 dark:border-zinc-800
          px-4 py-3
        "
      >
        <span className="text-sm text-muted-foreground">{productName}</span>
        <span className="font-semibold text-primary text-lg">
          R$ {total.toFixed(2)}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="
             px-4 py-2 rounded-lg
            text-primary
            border border-primary/30
            hover:bg-primary/10
            disabled:opacity-50 disabled:cursor-not-allowed
            transition
          "
        >
          Cancelar
        </button>

        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="
            flex-1
            flex items-center justify-center gap-2
            rounded-xl
            bg-primary
            text-primary-foreground
            py-3
            font-semibold
            hover:bg-primary/90
            disabled:opacity-70 disabled:cursor-not-allowed
            transition
          "
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processando...
            </>
          ) : (
            "Confirmar novo pedido"
          )}
        </button>
      </div>
    </div>
  );
}
