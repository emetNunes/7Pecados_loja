import { Plus } from "lucide-react";
import React from "react";

interface CardMakePurchaseProps {
  onPress?: () => void;
}

export const CardMakePurchase: React.FC<CardMakePurchaseProps> = ({
  onPress,
}) => {
  return (
    <div
      className="flex flex-col bg-base w-full px-6 py-8 rounded-xl gap-4 shadow-2xs items-center justify-center"
      onClick={onPress}
      style={{ cursor: "pointer" }}
    >
      <div className="w-[32] h-[32] bg-primary text-base p-4 rounded-full">
        <Plus size={32} strokeWidth={3} />
      </div>
      <div className="flex flex-col text-center">
        <h2 className="text-primary font-extrabold text-xl">Efetuar compra</h2>
        <p className="text-sm text-gray-500">de mercadoria</p>
      </div>
    </div>
  );
};
