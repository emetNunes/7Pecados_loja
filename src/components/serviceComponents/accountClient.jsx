import { HandPlatter, X, Users } from "lucide-react";
import { useState, useMemo } from "react";
import useSWR from "swr";

import AddClientDialog from "@/components/serviceComponents/AddClientDialog";

const fetcher = (url) => fetch(url).then((res) => res.json());

function AccountClient({ onSelectClient, setPage }) {
  const [addClientDialogIsOpen, setAddClientDialog] = useState(false);

  const API_URL =
    "https://api-7pecados.onrender.com/sale/account_client/historic/?isOpen=true";

  const { data, error, isLoading, mutate } = useSWR(API_URL, fetcher);

  const accounts = data?.account ?? [];

  const handleCloseDialogClient = () => {
    setAddClientDialog(false);
    mutate();
  };

  /* ================================
     LOADING
  ================================ */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Carregando contas abertas…
      </div>
    );
  }

  /* ================================
     ERROR
  ================================ */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="font-semibold text-destructive">
          Erro ao carregar contas
        </p>
        <button
          onClick={() => setPage("")}
          className="text-primary font-semibold hover:underline"
        >
          Voltar
        </button>
      </div>
    );
  }

  /* ================================
     EMPTY STATE
  ================================ */
  if (accounts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
        <div className="w-14 h-14 rounded-full bg-secondary/20 text-secondary flex items-center justify-center">
          <Users />
        </div>

        <div className="text-center">
          <h3 className="font-semibold text-lg">Nenhuma conta aberta hoje</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Cadastre um cliente para iniciar um atendimento.
          </p>
        </div>

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
          refetchAccount={mutate}
          handleClose={handleCloseDialogClient}
        />
      </div>
    );
  }

  /* ================================
     DEFAULT
  ================================ */
  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <header className="flex items-center justify-between px-4 py-4 border-b">
        <div>
          <h2 className="text-lg font-bold">Clientes ativos</h2>
          <span className="text-xs text-muted-foreground">
            Contas abertas hoje
          </span>
        </div>

        <button
          onClick={() => setPage("")}
          className="text-muted-foreground hover:text-primary transition"
        >
          <X size={22} />
        </button>
      </header>

      {/* LISTA */}
      <ul className="flex-1 overflow-y-auto divide-y">
        {accounts.map((acc) => (
          <li
            key={acc._id}
            className="
              px-4 py-4
              flex items-center justify-between
              hover:bg-default-100 dark:hover:bg-zinc-800
              transition cursor-pointer
            "
            onClick={() => onSelectClient(acc._id, acc.name)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-secondary/20 text-secondary">
                <HandPlatter size={20} />
              </div>

              <div>
                <p className="font-semibold">{acc.name}</p>
                <span className="text-xs text-muted-foreground">
                  Conta em aberto
                </span>
              </div>
            </div>

            <span className="text-sm font-semibold text-primary">Abrir →</span>
          </li>
        ))}
      </ul>

      {/* FOOTER */}
      <footer className="p-4 border-t">
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
          refetchAccount={mutate}
          handleClose={handleCloseDialogClient}
        />
      </footer>
    </div>
  );
}

export default AccountClient;
