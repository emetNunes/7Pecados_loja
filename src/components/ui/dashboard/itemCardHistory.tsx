import type { ReactNode } from "react";
import {
  BanknoteArrowUp,
  BanknoteArrowDown,
  ShoppingBasket,
} from "lucide-react";
import clsx from "clsx";



type ItemCardHistoryProps = {
  children: ReactNode;
  description_item?: string;
  type_movement_to_icon: string;
};

export const ItemCardHistory = ({
  children,
  description_item,
  type_movement_to_icon,
}: ItemCardHistoryProps) => {
  let size_icon = 32;
  let setIconDiv;

  if (type_movement_to_icon == "") {
    setIconDiv = (
      <div className="p-2 rounded-lg text-base  ">
        <BanknoteArrowUp size={size_icon} />
      </div>
    );
  }
  if (type_movement_to_icon == "exit") {
    setIconDiv = (
      <div className="p-2 ">
        <BanknoteArrowDown size={size_icon} />
      </div>
    );
  }
  if (type_movement_to_icon == "buy") {
    setIconDiv = (
      <div className=" ">
      </div>
    );
  }

  return (
    <div className="flex items-center rounded-lg  border-2 gap-4">
      {setIconDiv}
      {clsx("p-2 rounded-lg text-base ",
        {"bg-secondary" : type_movement_to_icon == 'buy'},
        {"text-primary dark:text-primary border-primary" : type_movement_to_icon == 'exit'},
        {"dark:text-dark bg-primary dark:bg-primary" : type_movement_to_icon == 'entrance' },
      )}
      <div className="grid grid-rows-1">
        <div className="font-bold">{children}</div>
        <div className="text-[0.8rem] text-default-500">{description_item}</div>
      </div>
    </div>
  );
};
