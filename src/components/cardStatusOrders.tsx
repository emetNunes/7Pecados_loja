import { ReactNode } from "react";
import { ItemCardStatusOrders } from "./itemCardStatusOrders";
import { Button } from "@heroui/button";

type ListInfoItem = {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  status: string;
  info: string;
};

type CardStatusOrdersProps = {
  listInfo: ListInfoItem[];
  title: string;
  description: string;
};

export const CardStatusOrders = ({
  listInfo,
  title,
  description,
}: CardStatusOrdersProps) => {
  return (
    <div className="bg-base px-6 py-8 rounded-xl shadow-2xs">
      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col items-start gap-2">
          <div className="text-2xl font-bold">{title}</div>
          <div className="text-md text-default-500">{description}</div>
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
