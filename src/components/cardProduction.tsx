import { ReactNode } from "react";
import { Button } from "@heroui/button";
import { Hash } from "lucide-react";

type CardProductionProps = {
  id: string;
  place_to_buy: string;
  name_user: string;
  address: string;
  type_payment: string;
  total_value: string;
  status: string;
  children: ReactNode;
};

export const CardProduction = ({
  id,
  place_to_buy,
  name_user,
  address = "",
  type_payment,
  total_value,
  status,
  children,
}: CardProductionProps) => {
  let type_color;

  place_to_buy === "Loja"
    ? (type_color = "primary")
    : (type_color = "secondary");

  let title_button;
  switch (status) {
    case "pending":
      title_button = "Enviar para produção";
      break;
    case "in_production":
      title_button = "Finalizar pedido";
      break;
    case "ready":
      title_button = "Entregue";
      break;
  }
  return (
    <div className="flex flex-col bg-base px-6 py-8 gap-4 shadow-2xs rounded-xl mx-2 mt-3">
      <div className="flex w-full justify-between items-center">
        <div className={`text-${type_color} flex items-center font-bold`}>
          <Hash size={16} strokeWidth={3} />
          {id}
        </div>
        <div
          className={`bg-${type_color} w-fit px-4 py-1 rounded-xl text-white text-[0.75rem]`}
        >
          {place_to_buy}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <hr className="border-gray-200" />
        <div className={`flex flex-col text-${type_color}`}>
          <div className="font-bold text-lg">{name_user}</div>
          <div className="text-xs">{address}</div>
        </div>
        <div>{children}</div>
        <div>
          <hr className="border-gray-200 border-dashed border-1" />
          <div
            className={`text-${type_color} flex flex-row justify-between text-sm`}
          >
            <div>{type_payment}</div>
            <div>{total_value}</div>
          </div>
        </div>
      </div>
      <div>
        <Button
          className={`bg-primary text-base rounded-xl bg-${type_color} flex w-full`}
        >
          <span className="default invert">{title_button}</span>
        </Button>
      </div>
    </div>
  );
};
