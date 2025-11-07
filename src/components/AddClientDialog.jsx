import { createPortal } from "react-dom";
import Input from "./Input";
import { Button } from "@heroui/react";
import ModelDefaultDialog from "./ModelDefaultDialog";
import { useEffect, useState } from "react";

const AddClientDialog = ({ isOpen, handleClose }) => {
  const [clientName, setClientName] = useState("");
  const [successCreate, setSuccessCreate] = useState("");
  const createAccountClient = async () => {
    try {
      const response = await fetch(
        `https://api-7pecados.onrender.com/sale/account_client`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: clientName }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar conta do cliente");
      }

      const text = await response.text();
      console.log("Resposta:", text);
    } catch (error) {
      console.error("Error ao criar o cliente:", error);
    }
  };

  const onAddNewClient = async (clientName) => {
    if (!clientName.trim()) return;
    await createAccountClient();
    handleClose();
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
        >
          <span className="default">Cancelar</span>
        </Button>
        <Button
          onClick={() => {
            if (clientName.trim() == "") {
              return "O nome do cliente não pode ser vazio";
            }

            onAddNewClient(clientName);
          }}
          className="bg-primary text-base rounded-xl w-full"
        >
          <span className="default invert">Salvar</span>
        </Button>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
};

export default AddClientDialog;
