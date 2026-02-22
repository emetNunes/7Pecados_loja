import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";

/* ======================================================
   Tipos
====================================================== */

export type ToastType = "success" | "error" | "warning" | "info";

export interface ShowToastParams {
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastData extends Required<Omit<ShowToastParams, "type">> {
  id: number;
  type: ToastType;
}

interface ToastContextType {
  showToast: (toast: ShowToastParams) => number;
  success: (message: string, title?: string) => number;
  error: (message: string, title?: string) => number;
  warning: (message: string, title?: string) => number;
  info: (message: string, title?: string) => number;
  removeToast: (id: number) => void;
}

/* ======================================================
   Context
====================================================== */

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

/* ======================================================
   Toast Component
====================================================== */

interface ToastProps {
  toast: ToastData;
  onRemove: (id: number) => void;
}

const Toast = ({ toast, onRemove }: ToastProps) => {
  const icons = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success:
      "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
    error:
      "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
    warning:
      "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
  };

  const iconColors = {
    success: "text-green-600 dark:text-green-400",
    error: "text-red-600 dark:text-red-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    info: "text-blue-600 dark:text-blue-400",
  };

  const Icon = icons[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={`relative flex items-start gap-3 p-4 rounded-xl border shadow-lg backdrop-blur-sm min-w-[320px] max-w-[420px] ${colors[toast.type]}`}
    >
      <Icon className={`w-5 h-5 mt-0.5 ${iconColors[toast.type]}`} />

      <div className="flex-1 min-w-0">
        {toast.title && (
          <h4 className="font-semibold text-sm mb-1">{toast.title}</h4>
        )}
        <p className="text-sm leading-relaxed">{toast.message}</p>
      </div>

      <button
        onClick={() => onRemove(toast.id)}
        className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        aria-label="Fechar notificação"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

/* ======================================================
   Provider
====================================================== */

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((toast: ShowToastParams) => {
    const id = Date.now() + Math.random();

    const newToast: ToastData = {
      id,
      type: toast.type ?? "info",
      title: toast.title ?? "",
      message: toast.message,
      duration: toast.duration ?? 4000,
    };

    setToasts((prev) => [...prev, newToast]);

    if (newToast.duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback(
    (message: string, title = "Sucesso") =>
      showToast({ type: "success", message, title }),
    [showToast],
  );

  const error = useCallback(
    (message: string, title = "Erro") =>
      showToast({ type: "error", message, title }),
    [showToast],
  );

  const warning = useCallback(
    (message: string, title = "Atenção") =>
      showToast({ type: "warning", message, title }),
    [showToast],
  );

  const info = useCallback(
    (message: string, title = "Informação") =>
      showToast({ type: "info", message, title }),
    [showToast],
  );

  return (
    <ToastContext.Provider
      value={{ showToast, success, error, warning, info, removeToast }}
    >
      {children}

      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <Toast toast={toast} onRemove={removeToast} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
