import { createPortal } from "react-dom";
import Input from "./Input";
import { Button } from "@heroui/react";
import ModelDefaultDialog from "./ModelDefaultDialog";

const AddMerchandiseDialog = ({ isOpen, handleClose }) => {
  if (!isOpen) return null;
  return createPortal(
    <ModelDefaultDialog
      title_dialog="Adicionar mercadoria"
      info_dialog="Insira as informações abaixo"
    >
      <Input
        id="place_to_buy"
        label="Local da compra"
        placeholder="Insira um local de compra"
      />
      <Input id="date" label="Escolha uma data" placeholder="Data" />
      <Input
        id="ingredient"
        label="Ingrediente"
        placeholder="Escolha um ingrediente"
      />
      <div className="flex gap-3">
        <Button
          className="bg-base text-base rounded-xl border-1 border-default-200 w-full"
          onPress={handleClose}
        >
          <span className="default">Cancelar</span>
        </Button>
        <Button className="bg-primary text-base rounded-xl w-full">
          <span className="default invert">Salvar</span>
        </Button>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
};

export default AddMerchandiseDialog;
