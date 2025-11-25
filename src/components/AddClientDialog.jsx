import { createPortal } from "react-dom";
import Input from "./Input";
import { Button } from "@heroui/react";
import ModelDefaultDialog from "./ModelDefaultDialog";
import { useEffect, useState } from "react";
import { mutate } from "swr";

const AddClientDialog = ({ isOpen, handleClose, refetchAccount }) => {
  const [clientName, setClientName] = useState("");
  const [creating, setCreating] = useState(false);

  const createAccountClient = async () => {
    if (!clientName.trim()) return;

    setCreating(true);

    const newClient = { name: clientName };

    try {
      await mutate(
        `https://api-7pecados.onrender.com/sale/account_client/historic/?isOpen=true`,
        async (currentData) => {
          const response = await fetch(
            `https://api-7pecados.onrender.com/sale/account_client`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newClient),
            }
          );

          if (!response.ok) throw new Error("Erro ao criar conta do cliente");

          const text = await response.text();

          let createdAccount;
          try {
            createdAccount = JSON.parse(text);
          } catch {
            createdAccount = {
              account: { _id: Math.random(), name: clientName },
            };
          }

          return {
            ...currentData,
            account: [...(currentData?.account || []), createdAccount.account],
          };
        },
        { revalidate: true }
      );
      handleClose();
      setClientName("");
    } catch (err) {
      console.error("Erro ao criar cliente:", err);
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <ModelDefaultDialog
      title_dialog="Cadastra conta do cliente"
      info_dialog="Insira as informações abaixo"
    >
      <Input
        id="place_to_buy"
        value={clientName}
        label="Nome do cliente"
        placeholder="Insira o nome"
        onChange={(e) => setClientName(e.target.value)}
      />

      <div className="flex gap-3">
        <Button
          className="bg-base text-base rounded-xl border-1 border-default-200 w-full"
          onPress={handleClose}
          disabled={creating}
        >
          <span className="default">Cancelar</span>
        </Button>
        <Button
          onClick={createAccountClient}
          className="bg-primary text-base rounded-xl w-full"
          disabled={creating}
        >
          <span className="default invert">
            {creating ? "Salvando..." : "Salvar"}
          </span>
        </Button>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
};

export default AddClientDialog;
