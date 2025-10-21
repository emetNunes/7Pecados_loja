import { Plus } from "lucide-react";

export const CardMakePurchase = () => {
  return (
    <div className="flex flex-col bg-base w-full px-6 py-8 rounded-xl gap-4 shadow-2xs items-center justify-center">
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
