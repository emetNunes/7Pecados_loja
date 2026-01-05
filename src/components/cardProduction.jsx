import { Button } from "@heroui/button";
import { Hash, CircleCheck, Loader2 } from "lucide-react";
import { useState } from "react";

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

  const isDelivered = currentStatus === "delivered";

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

      if (!res.ok) throw new Error("Erro ao restaurar pedido");

      setCurrentStatus("in_production");
      onStatusChange?.();
    } catch (err) {
      console.error(err);
      alert("Não foi possível restaurar o pedido.");
    } finally {
      setLoading(false);
    }
  }

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
     HANDLE STATUS CHANGE
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

      if (!res.ok) throw new Error("Erro ao atualizar status");

      // 🔥 Atualiza o status local corretamente
      setCurrentStatus(mapApiStatusToFront(nextStatusApi));

      // 🔥 Atualiza a lista (SWR)
      onStatusChange?.();
    } catch (err) {
      console.error(err);
      alert("Não foi possível atualizar o status do pedido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`
        flex flex-col gap-5
        rounded-2xl px-6 py-5 my-4
        shadow-2xs transition-all
        ${isDelivered ? "bg-primary text-white" : "bg-base dark:bg-zinc-900"}
      `}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          {isDelivered ? (
            <CircleCheck className="opacity-90" />
          ) : (
            <>
              <Hash size={14} />
              <span>{id}</span>
            </>
          )}
        </div>

        <span
          className={`
            text-[11px] font-semibold px-3 py-1 rounded-full
            ${
              isDelivered
                ? "bg-white/20 text-white"
                : "bg-secondary text-secondary-foreground"
            }
          `}
        >
          {place_to_buy}
        </span>
      </div>

      {/* BODY */}
      {!isDelivered && (
        <>
          {/* CLIENT */}
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-sm">{name_user}</span>
            {address && (
              <span className="text-xs text-default-500 leading-tight">
                {address}
              </span>
            )}
          </div>

          {/* PRODUCTS */}
          <div className="pt-2">{children}</div>

          {/* FOOTER INFO */}
          <div className="pt-3 mt-2 border-t border-dashed border-default-200 dark:border-zinc-800 flex items-center justify-between text-sm">
            <span className="text-default-500">{type_payment}</span>
            <span className="font-semibold">{total_value}</span>
          </div>
        </>
      )}

      {/* DELIVERED */}
      {/* DELIVERED STATE */}
      {isDelivered && (
        <div>
          {/* Title */}
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-sm uppercase tracking-wide text-white/70">
              Pedido de
            </span>

            <span className="text-lg font-semibold tracking-tight">
              {name_user}
            </span>

            <span className="text-sm text-white/80">Entregue com sucesso</span>

            {completion_time && (
              <span className="text-xs text-white/60 mt-1">
                Concluído em {completion_time}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/20 my-3" />

          {/* Restore action */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white/70">
              Pedido finalizado por engano?
            </span>

            <Button
              variant="bordered"
              disabled={loading}
              className="
          border-white/40 text-white
          hover:bg-white/10
          rounded-xl
          text-sm font-medium
          px-4
        "
              onClick={handleRestoreOrder}
            >
              {loading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                "Restaurar pedido"
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
            mt-2 w-full rounded-xl
            bg-primary text-white
            font-semibold tracking-wide
            flex items-center justify-center gap-2
          "
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {ACTION_LABEL[currentStatus]}
        </Button>
      )}
    </div>
  );
};
