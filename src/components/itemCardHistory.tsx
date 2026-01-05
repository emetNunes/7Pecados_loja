import type { ReactNode } from "react";
import {
  BanknoteArrowUp,
  BanknoteArrowDown,
  ShoppingBasket,
} from "lucide-react";
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

  //   : )
  if (type_movement_to_icon == "entrance") {
    setIconDiv = (
      <div className="p-2 rounded-lg text-base bg-secondary">
        <BanknoteArrowUp size={size_icon} />
      </div>
    );
  }
  if (type_movement_to_icon == "exit") {
    setIconDiv = (
      <div className="p-2 rounded-lg text-base bg-primary">
        <BanknoteArrowDown size={size_icon} />
      </div>
    );
  }
  if (type_movement_to_icon == "buy") {
    setIconDiv = (
      <div className="p-2 rounded-lg text-base bg-secondary">
        <ShoppingBasket size={size_icon} />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {setIconDiv}
      <div className="grid grid-rows-1">
        <div className="font-bold">{children}</div>
        <div className="text-[0.8rem] text-default-500">{description_item}</div>
      </div>
    </div>
  );
};
