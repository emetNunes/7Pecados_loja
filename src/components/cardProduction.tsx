import { ReactNode } from "react";
import { Button } from "@heroui/button";
import { Hash, CircleCheck } from "lucide-react";

type CardProductionProps = {
  id: string;
  place_to_buy: string;
  name_user: string;
  address: string;
  type_payment: string;
  total_value: string;
  status: string;
  completion_time?: string;
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
  completion_time = "",
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
    <div
      className={`flex flex-col ${status != "delivered" ? "bg-base" : "bg-primary"} px-6 py-8 gap-4 shadow-2xs rounded-xl mx-2 mt-3`}
    >
      <div className="flex w-full justify-between items-center">
        <div
          className={`text-${status != "delivered" ? type_color : "white"} flex items-center font-bold`}
        >
          <div className={`${status != "delivered" ? "hidden" : ""}`}>
            <CircleCheck />
          </div>
          <div
            className={`flex items-center font-bold ${status === "delivered" ? "hidden" : ""}`}
          >
            <Hash size={16} strokeWidth={3} />
            {id}
          </div>
        </div>
        <div
          className={`bg-${status != "delivered" ? type_color : "white"} w-fit px-4 py-1 rounded-xl ${status != "delivered" ? "text-base" : "text-primary"} text-[0.75rem]`}
        >
          {status != "delivered" ? place_to_buy : "#" + id}
        </div>
      </div>
      <div
        className={`flex flex-col gap-2 ${status != "delivered" ? "" : "hidden"}`}
      >
        <hr className="border-gray-200" />
        <div className={`flex flex-col text-${type_color}`}>
          <div className="font-bold text-lg">{name_user}</div>
          <div className="text-xs">{address}</div>
        </div>
        <div className={`${status === "delivered" ? "hidden" : ""}`}>
          {children}
        </div>
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
      <div
        className={`flex flex-col gap-2 text-base ${status === "delivered" ? "" : "hidden"}`}
      >
        <div className="flex flex-col text-lg">
          <div>Pedido de {name_user}</div>
          <div>Entregue!</div>
        </div>
        <div className="text-sm">Concluído em {completion_time}</div>
      </div>
      <div>
        <Button
          className={`bg-primary text-base rounded-xl bg-${type_color} flex w-full ${status === "delivered" ? "hidden" : ""}`}
        >
          <span className="default invert">{title_button}</span>
        </Button>
      </div>
    </div>
  );
};
