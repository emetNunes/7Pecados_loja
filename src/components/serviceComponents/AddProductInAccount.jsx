import { createPortal } from "react-dom";
import Input from "../Input";
import { Button } from "@heroui/react";
import ModelDefaultDialog from "../ModelDefaultDialog";
import { useEffect, useState } from "react";

const AddProductInAccount = ({ isOpen, handleClose, getAccouts }) => {
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
          disable={creating}
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

export default AddProductInAccount;
