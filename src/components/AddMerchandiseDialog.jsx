import { useRef } from "react";
import { createPortal } from "react-dom";
import Input from "./Input";
import { Button } from "@heroui/react";

const AddMerchandiseDialog = ({ isOpen, handleClose }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm z-100">
      {/* DIALOG */}
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-[#35383E]">
          Adicionar mercadoria
        </h2>
        <p className="mb-4 mt-1 text-sm text-[#9A9C9F]">
          Insira as informações abaixo
        </p>
        <div className="flex w-[336px] flex-col space-y-4">
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
              size="large"
              className="w-full"
              variant="secondary"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button size="large" className="w-full">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddMerchandiseDialog;
