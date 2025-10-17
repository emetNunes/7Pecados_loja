import { ItemCardStatusOrders } from "./itemCardStatusOrders";
import { User } from "lucide-react";
import { Button } from "@heroui/button";

const listInfo = [
  {
    id: "1",
    icon: <User />,
    title: "Maria Jose",
    description: "Rua das Jacas, n°160",
    status: "Finalizado em 15min",
    info: "R$245,90",
  },
  {
    id: "2",
    icon: <User />,
    title: "Maria Jose",
    description: "Rua das Jacas, n°160",
    status: "Finalizado em 15min",
    info: "R$245,90",
  },
  {
    id: "3",
    icon: <User />,
    title: "Maria Jose",
    description: "Rua das Jacas, n°160",
    status: "Finalizado em 15min",
    info: "R$245,90",
  },
  {
    id: "4",
    icon: <User />,
    title: "Maria Jose",
    description: "Rua das Jacas, n°160",
    status: "Finalizado em 15min",
    info: "R$245,90",
  },
  {
    id: "5",
    icon: <User />,
    title: "Maria Jose",
    description: "Rua das Jacas, n°160",
    status: "Finalizado em 15min",
    info: "R$245,90",
  },
];

export const CardStatusOrders = () => {
  return (
    <div className="bg-base px-6 py-8 rounded-xl shadow-2xs">
      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col items-start gap-2">
          <div className="text-2xl font-bold">Pedidos Finalizados</div>
          <div className="text-md text-default-500">Últimos 5 pedidos</div>
        </div>
        <hr className="text-gray-200" />
        <div className="flex flex-col gap-4">
          {listInfo.map((element) => (
            <ItemCardStatusOrders
              icon={element.icon}
              title={element.title}
              description={element.description}
              status={element.status}
              info={element.info}
            />
          ))}
          <Button className="bg-primary text-base rounded-xl">
            <span className="default invert">Clique para ver mais</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
