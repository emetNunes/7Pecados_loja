// src/components/AddedItemsList.tsx

import { Button } from "@heroui/react";
import { Trash } from "lucide-react";
import { QuantityControl } from "./quantityControl";

type AddedItem = {
  value: string;
  label: string;
  quantity: number;
};

interface AddedItemsListProps {
  items: AddedItem[];
  onRemoveItem: (value: string) => void;
  onQuantityChange: (
    value: string,
    direction: "increment" | "decrement"
  ) => void;
}

export const AddedItemsList = ({
  items,
  onRemoveItem,
  onQuantityChange,
}: AddedItemsListProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="text-sm">Itens Adicionados:</h2>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li
            key={item.value}
            className="flex justify-between items-center py-2 px-4 bg-base rounded-2xl shadow-sm"
          >
            <span className="text-default-700 font-medium">{item.label}</span>
            <div className="flex items-center gap-3">
              <QuantityControl
                quantity={item.quantity}
                onIncrement={() => onQuantityChange(item.value, "increment")}
                onDecrement={() => onQuantityChange(item.value, "decrement")}
                decrementDisabled={item.quantity <= 1}
              />
              <Button
                onClick={() => onRemoveItem(item.value)}
                size="sm"
                className="rounded-full !p-1 bg-base"
              >
                <Trash className="h-5 w-5" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
