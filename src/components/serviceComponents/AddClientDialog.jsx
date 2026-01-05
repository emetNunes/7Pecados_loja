import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { mutate } from "swr";

import Input from "../Input";
import ModelDefaultDialog from "../ModelDefaultDialog";

const AddClientDialog = ({ isOpen, handleClose }) => {
  const [clientName, setClientName] = useState("");
  const [creating, setCreating] = useState(false);

  /* ================================
     RESET AO ABRIR
  ================================ */
  useEffect(() => {
    if (isOpen) {
      setClientName("");
    }
  }, [isOpen]);

  /* ================================
     CRIAR CLIENTE
  ================================ */
  const createAccountClient = async () => {
    if (!clientName.trim() || creating) return;

    setCreating(true);

    const newClient = { name: clientName.trim() };

    try {
      await mutate(
        "https://api-7pecados.onrender.com/sale/account_client/historic/?isOpen=true",
        async (currentData) => {
          const response = await fetch(
            "https://api-7pecados.onrender.com/sale/account_client",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newClient),
            }
          );

          if (!response.ok) {
            throw new Error("Erro ao criar conta do cliente");
          }

          const createdAccount = await response.json();

          return {
            ...currentData,
            account: [
              ...(currentData?.account || []),
              createdAccount.account ?? createdAccount,
            ],
          };
        },
        { revalidate: true }
      );

      handleClose();
    } catch (err) {
      console.error("Erro ao criar cliente:", err);
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <ModelDefaultDialog
      title_dialog="Cadastrar cliente"
      info_dialog="Informe o nome do cliente para abrir a conta"
    >
      {/* Conteúdo */}
      <div className="flex flex-col gap-6">
        {/* Input */}
        <Input
          id="client_name"
          autoFocus
          value={clientName}
          label="Nome do cliente"
          placeholder="Ex: João da Silva"
          onChange={(e) => setClientName(e.target.value)}
          disabled={creating}
        />

        {/* Ações */}
        <div className="flex gap-3">
          <Button
            variant="bordered"
            onPress={handleClose}
            disabled={creating}
            className="
              w-full rounded-xl
              border-default-300 dark:border-zinc-700
              text-foreground
              bg-background
              hover:bg-default-100 dark:hover:bg-zinc-800
              transition
            "
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
              shadow-sm
              hover:bg-primary/90
              transition
            "
          >
            {creating ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
};

export default AddClientDialog;
