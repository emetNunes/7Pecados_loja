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

  return (
    <div className="flex items-center rounded-lg gap-4">
      <div
        className={clsx(
          "p-2 rounded-lg text-base",
          {
            "text-base bg-primary dark:text-dark dark:bg-primary border-primary":
              type_movement_to_icon == "exit",
          },
          {
            "dark:text-secondary bg-secondary dark:bg-base":
              type_movement_to_icon == "entrance",
          },
        )}
      >
        {type_movement_to_icon == "exit" ? (
          <BanknoteArrowDown size={size_icon} />
        ) : (
          <BanknoteArrowUp size={size_icon} />
        )}
      </div>

      <div className="grid grid-rows-1">
        <div className="font-bold">{children}</div>
        <div className="text-[0.8rem] text-default-500">{description_item}</div>
      </div>
    </div>
  );
};
