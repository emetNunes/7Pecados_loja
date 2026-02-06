import { createPortal } from "react-dom";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@heroui/react";

export function CancelAccountDialog({
  isOpen,
  onClose,
  onConfirm,
  loading,
  clientName,
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* BACKDROP */}
      <div
        className="
          absolute inset-0
          bg-black/40 dark:bg-black/60
          backdrop-blur-sm
          transition-opacity
        "
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        role="dialog"
        aria-modal="true"
        className="
          relative w-full max-w-md
          rounded-2xl
          bg-background dark:bg-zinc-900
          border border-default-200 dark:border-zinc-800
          shadow-xl
          animate-in fade-in zoom-in-95
        "
      >
        {/* HEADER */}
        <header
          className="
            flex items-center justify-between
            px-6 py-4
            border-b border-default-200 dark:border-zinc-800
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex items-center justify-center
                w-10 h-10 rounded-full
                bg-destructive/10 dark:bg-destructive/20
                text-destructive
              "
            >
              <AlertTriangle size={20} />
            </div>

            <h2 className="text-lg font-semibold text-foreground">
              Cancelar conta
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            aria-label="Fechar"
            className="
              p-1 rounded-md
              text-muted-foreground
              hover:text-foreground
              hover:bg-default-100 dark:hover:bg-zinc-800
              transition
            "
          >
            <X size={20} />
          </button>
        </header>

        {/* CONTENT */}
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Você está prestes a cancelar a conta de{" "}
            <strong className="text-foreground">{clientName}</strong>.
          </p>

          {/* INFO / WARNING BOX */}
          <div
            className="
              rounded-xl
              bg-destructive/5 dark:bg-destructive/10
              border border-destructive/20 dark:border-destructive/30
              px-4 py-3
              text-sm
              text-destructive
            "
          >
            <strong>Atenção:</strong> essa ação encerra a conta e remove todos
            os pedidos da produção. Essa operação não poderá ser desfeita.
          </div>
        </div>

        {/* ACTIONS */}
        <footer
          className="
            flex gap-3
            px-6 py-4
            border-t border-default-200 dark:border-zinc-800
          "
        >
          <Button
            variant="bordered"
            onPress={onClose}
            disabled={loading}
            className="
              w-full rounded-xl
              border-default-300 dark:border-zinc-700
              text-foreground
              hover:bg-default-100 dark:hover:bg-zinc-800
              transition
            "
          >
            Manter conta
          </Button>

          <Button
            onPress={onConfirm}
            disabled={loading}
            className="
              w-full rounded-xl
              bg-destructive
              text-primary
              font-semibold
              hover:bg-destructive/90
              active:scale-[0.98]
              transition
            "
          >
            {loading ? "Cancelando conta..." : "Confirmar cancelamento"}
          </Button>
        </footer>
      </div>
    </div>,
    document.body
  );
}
