import { createPortal } from "react-dom";
import { Image } from "lucide-react";
import { Button } from "@heroui/button";

import { ItemProduct } from "./itemProduct";

type AddInfoProductProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
  name: string;
  description: string;
  value: string;
  size: string[];
  flavor: string[];
  border: string[];
  follow_up: string[];
  fruit: string[];
};

export const AddInfoProduct = ({
  isOpen,
  onClose,
  id,
  name,
  description,
  value,
  size,
  flavor,
  border,
  follow_up,
  fruit,
}: AddInfoProductProps) => {
  if (!isOpen) return null;
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div
      className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-xs z-100 animate-appearance-in"
      onClick={handleBackdropClick}
    >
      <div className="rounded-xl bg-base p-5 text-center shadow">
        <div>
          <div
            key={id}
            className="flex flex-col bg-base shadow-2xs rounded-xl p-6 gap-8"
          >
            {/* Image / Title */}
            <div className="flex flex-row gap-6 items-center">
              <div className="text-base">
                <div className="flex w-[100px] h-[120px] justify-center items-center bg-primary rounded-lg">
                  <Image size={48} />
                </div>
              </div>
              <div className="flex flex-col text-start">
                <div className="text-primary text-xl font-bold">{name}</div>
                <div className="text-default-600 text-sm">{description}</div>
                <div className="text-xl font-bold">{value}</div>
              </div>
            </div>
            <hr className="text-default-400" />
            <div className="flex flex-col items-center gap-6">
              <div className="flex gap-8 justify-between">
                <ItemProduct title="Tamanho" listArray={size} />
                <ItemProduct title="Sabor" listArray={flavor} />
              </div>
              <div>
                <ItemProduct title="Borda da Taça" listArray={border} />
              </div>
              <div>
                <ItemProduct title="Acompanhamento" listArray={follow_up} />
              </div>
              <div>
                <ItemProduct title="Frutas" listArray={fruit} />
              </div>
            </div>
            <Button className="bg-success-500 text-base rounded-xl">
              <span className="invert">Adicionar ao Carrinho</span>
            </Button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 rounded bg-danger px-4 py-2 text-white"
        >
          Fechar
        </button>
      </div>
    </div>,
    document.body
  );
};
