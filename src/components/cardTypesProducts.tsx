import { ReactNode } from "react";

type CardTypesProductsProps = {
  title: string;
  icon: ReactNode;
};

export const CardTypesProducts = ({ title, icon }: CardTypesProductsProps) => {
  return (
    <div className="bg-base flex flex-col w-fit px-6 py-4 rounded-xl items-center shadow-2xs gap-2">
      <div className="bg-secondary p-2 rounded-md text-base">{icon}</div>
      <div className="text-secondary">{title}</div>
    </div>
  );
};
