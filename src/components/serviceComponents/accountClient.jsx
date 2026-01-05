import { HandPlatter, X } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

import AddClientDialog from "@/components/serviceComponents/AddClientDialog";

const fetcher = (url) => fetch(url).then((res) => res.json());

function AccountClient({ onSelectClient, setPage }) {
  const [addClientDialogIsOpen, setAddClientDialog] = useState(false);

  const API_URL =
    "https://api-7pecados.onrender.com/sale/account_client/historic/?isOpen=true";

  const {
    data,
    error,
    isLoading,
    mutate: refetchAccount,
  } = useSWR(API_URL, fetcher);

  const accounts = data?.account ?? [];

  /* ================================
     LOADING
  ================================ */
  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold text-foreground">
          Carregando contas…
        </h2>
      </div>
    );
  }

  /* ================================
     ERROR
  ================================ */
  if (error) {
    return (
      <div className="p-4 flex items-center justify-between">
        <span className="text-destructive font-semibold">
          Erro ao carregar contas
        </span>
        <button
          onClick={() => setPage("")}
          className="text-muted-foreground hover:text-primary transition"
        >
          <X size={22} />
        </button>
      </div>
    );
  }

  /* ================================
     EMPTY STATE
  ================================ */
  if (accounts.length === 0) {
    return (
      <div className="p-6 flex flex-col gap-4">
        <p className="text-muted-foreground text-center">
          Nenhuma conta aberta no momento.
        </p>

        <button
          onClick={() => setAddClientDialog(true)}
          className="
            w-full py-3 rounded-xl font-semibold
            bg-primary text-primary-foreground
            hover:bg-primary/90 transition
          "
        >
          Cadastrar cliente
        </button>

        <AddClientDialog
          isOpen={addClientDialogIsOpen}
          refetchAccount={refetchAccount}
          handleClose={() => setAddClientDialog(false)}
        />
      </div>
    );
  }

  /* ================================
     DEFAULT
  ================================ */
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-default-200 dark:border-zinc-800">
        <h2 className="text-lg font-bold text-foreground">
          Clientes ativos hoje
        </h2>

        <button
          onClick={() => setPage("")}
          className="text-muted-foreground hover:text-primary transition"
        >
          <X size={22} />
        </button>
      </div>

      {/* Lista */}
      <ul className="flex-1 overflow-y-auto px-4 divide-y divide-default-200 dark:divide-zinc-800">
        {accounts.map((acc) => (
          <li
            key={acc._id}
            className="py-4 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/20 text-secondary">
                <HandPlatter size={22} />
              </div>

              <div>
                <p className="font-semibold text-foreground">{acc.name}</p>
                <span className="text-xs text-muted-foreground">
                  Conta em aberto
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectClient(acc._id, acc.name)}
              className="
                px-4 py-2 rounded-lg font-semibold text-sm
                border border-primary text-primary
                hover:bg-primary hover:text-primary-foreground
                transition
              "
            >
              Abrir
            </button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="p-4 border-t border-default-200 dark:border-zinc-800">
        <button
          onClick={() => setAddClientDialog(true)}
          className="
            w-full py-3 rounded-xl font-semibold
            bg-primary text-primary-foreground
            hover:bg-primary/90 transition
          "
        >
          Adicionar cliente
        </button>

        <AddClientDialog
          isOpen={addClientDialogIsOpen}
          refetchAccount={refetchAccount}
          handleClose={() => setAddClientDialog(false)}
        />
      </div>
    </div>
  );
}

export default AccountClient;
