import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Button, Divider } from "@heroui/react";
import { mutate } from "swr";
import { Loader2 } from "lucide-react";

import Input from "../../../Input";
import ModelDefaultDialog from "../../../ModelDefaultDialog";

export default function CreateAccount({ setPageCurrent }) {
  const [clientName, setClientName] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setClientName("");
    setCreating(false);
    setError("");
  }, []);

  async function createAccountClient() {
    if (!clientName.trim() || creating)
      return setError("É necessario informar um nome!");

    setCreating(true);
    setError("");

    try {
      await mutate(
        "https://api-7pecados.onrender.com/sale/account_client/historic/?isOpen=true",
        async (currentData) => {
          const response = await fetch(
            "https://api-7pecados.onrender.com/sale/account_client",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: clientName.trim() }),
            },
          );

          if (!response.ok) {
            throw new Error("Erro ao criar conta");
          }

          // // 🔒 DEFENSIVO: pode não ser JSON
          // const text = await response.text();
          // let createdAccount = null;

          // try {
          //   const parsed = JSON.parse(text);
          //   createdAccount = parsed.account ?? parsed;
          // } catch {
          //   // Backend respondeu string → cria fallback
          //   createdAccount = {
          //     _id: Math.random().toString(36).slice(2),
          //     name: clientName.trim(),
          //     isOpen: true,
          //   };
          // }

          return {
            ...currentData,
            account: [...(currentData?.account || []), response.json()],
          };
        },
        { revalidate: false },
      );
    } catch (err) {
      console.error("Erro ao criar cliente:", err);
      setError("Não foi possível criar a conta. Tente novamente.");
    } finally {
      setCreating(false);
      setPageCurrent("viewAccounts");
    }
  }

  return (
    <div className="px-4 py-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground">Criar nova conta</p>
          <p className="text-zinc-500 text-sm">
            Informe o nome do cliente para abrir uma nova conta.
          </p>
        </div>
      </header>
      <Divider className="my-2" />
      <div className="flex flex-col gap-5">
        <Input
          id="client_name"
          autoFocus
          value={clientName}
          label="Nome do cliente"
          placeholder="Ex: João da Silva"
          onChange={(e) => setClientName(e.target.value)}
          disabled={creating}
        />

        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            variant="bordered"
            onClick={() => {
              setPageCurrent("viewAccounts");
            }}
            disabled={creating}
            className="w-full rounded-xl"
          >
            Cancelar
          </Button>

          <Button
            onClick={createAccountClient}
            disabled={creating || !clientName.trim()}
            className="
              w-full rounded-xl
              bg-primary text-primary-foreground
              font-semibold
              hover:bg-primary/90
              disabled:opacity-70 disabled:cursor-not-allowed
              transition
            "
          >
            {creating ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Criando...
              </span>
            ) : (
              "Criar conta"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
