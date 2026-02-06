import { Button } from "@heroui/button";
import { Hash, CircleCheck, Loader2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/contexts/ToastContext";

/* ================================
   LABELS
================================ */
const ACTION_LABEL = {
  pending: "Enviar para produção",
  in_production: "Marcar como pronto",
  ready: "Marcar como entregue",
};

/* ================================
   STATUS MAP (front → api)
================================ */
const NEXT_STATUS_API = {
  pending: "em_producao",
  in_production: "pronto",
  ready: "entregue",
};

export const CardProduction = ({
  id,
  place_to_buy,
  name_user,
  address,
  type_payment,
  total_value,
  status,
  completion_time,
  children,
  onStatusChange,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const toast = useToast();

  const isDelivered = currentStatus === "delivered";

  function mapApiStatusToFront(apiStatus) {
    switch (apiStatus) {
      case "em_producao":
        return "in_production";
      case "pronto":
        return "ready";
      case "entregue":
        return "delivered";
      default:
        return "pending";
    }
  }

  /* ================================
     AVANÇAR STATUS
  ================================ */
  async function handleChangeStatus() {
    const nextStatusApi = NEXT_STATUS_API[currentStatus];
    if (!nextStatusApi) return;

    try {
      setLoading(true);

      const res = await fetch(
        `https://api-7pecados.onrender.com/sale/order_client/status/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: nextStatusApi }),
        }
      );

      if (!res.ok) throw new Error();

      const statusLabels = {
        em_producao: "Em produção",
        pronto: "Pronto",
        entregue: "Entregue",
      };

      setCurrentStatus(mapApiStatusToFront(nextStatusApi));
      toast.success(
        `Pedido #${id.slice(-6)} atualizado para "${statusLabels[nextStatusApi]}"`,
        "Status atualizado"
      );
      onStatusChange?.();
    } catch (err) {
      console.error(err);
      toast.error(
        "Não foi possível atualizar o status do pedido",
        "Erro ao atualizar"
      );
    } finally {
      setLoading(false);
    }
  }

  /* ================================
     RESTAURAR PEDIDO (ENTREGUE → PRODUÇÃO)
  ================================ */
  async function handleRestoreOrder() {
    try {
      setLoading(true);

      const res = await fetch(
        `https://api-7pecados.onrender.com/sale/order_client/status/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "em_producao" }),
        }
      );

      if (!res.ok) throw new Error();

      setCurrentStatus("in_production");
      toast.success(
        `Pedido #${id.slice(-6)} restaurado para produção`,
        "Pedido restaurado"
      );
      onStatusChange?.();
    } catch (err) {
      console.error(err);
      toast.error(
        "Não foi possível restaurar o pedido",
        "Erro ao restaurar"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <article
      className={`
        rounded-2xl
        border
        px-5 py-4
        shadow-sm
        transition
        ${
          isDelivered
            ? "bg-primary text-white border-primary/40"
            : "bg-background dark:bg-zinc-900 border-default-200 dark:border-zinc-800"
        }
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-semibold">
          {isDelivered ? (
            <CircleCheck size={16} />
          ) : (
            <>
              <Hash size={14} />
              <span>#{id.slice(-6)}</span>
            </>
          )}
        </div>

        <span
          className={`
            px-2 py-0.5 rounded-full text-[11px] font-semibold
            ${
              isDelivered
                ? "bg-white/20"
                : "bg-secondary text-secondary-foreground"
            }
          `}
        >
          #{id.slice(-6)}
        </span>
      </div>

      {/* BODY */}
      {!isDelivered && (
        <>
          {/* CLIENT */}
          <div className="mb-3">
            <p className="font-semibold">{name_user}</p>
            {address && (
              <p className="text-xs text-muted-foreground">{address}</p>
            )}
          </div>

          {/* PRODUCTS */}
          <div className="mb-3">{children}</div>

          {/* FOOTER INFO */}
          <div className="flex justify-between text-sm border-t pt-3">
            <span className="text-muted-foreground">{type_payment}</span>
            <strong>R$ {total_value.toFixed(2)}</strong>
          </div>
        </>
      )}

      {/* DELIVERED STATE */}
      {isDelivered && (
        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-wide text-white/70">
            Pedido entregue
          </p>
          <p className="text-lg font-semibold">{name_user}</p>
          {completion_time && (
            <p className="text-xs text-white/60">
              Concluído em {completion_time}
            </p>
          )}

          {/* RESTORE */}
          <div className="pt-3">
            <Button
              variant="bordered"
              onClick={handleRestoreOrder}
              disabled={loading}
              className="
                border-white/40 text-white
                hover:bg-white/10
                rounded-xl
                text-sm font-medium
                flex items-center gap-2
                mx-auto
              "
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <>
                  <RotateCcw size={14} />
                  Restaurar pedido
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* ACTION */}
      {ACTION_LABEL[currentStatus] && (
        <Button
          onClick={handleChangeStatus}
          disabled={loading}
          className="
            mt-4 w-full rounded-xl
            bg-primary text-primary-foreground
            font-semibold
            hover:bg-primary/90
            flex items-center justify-center gap-2
          "
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {ACTION_LABEL[currentStatus]}
        </Button>
      )}
    </article>
  );
};
