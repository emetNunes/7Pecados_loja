import { Button } from "@heroui/react";
import { Plus, Minus } from "lucide-react";

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  decrementDisabled?: boolean;
}

export const QuantityControl = ({
  quantity,
  onIncrement,
  onDecrement,
  decrementDisabled = false,
}: QuantityControlProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={onDecrement}
        size="sm"
        className="flex rounded-full data-[disabled]:opacity-50 bg-red-400"
        disabled={decrementDisabled}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="font-medium w-6 text-center tabular-nums">
        {quantity}
      </span>
      <Button
        onClick={onIncrement}
        size="sm"
        className="flex rounded-full bg-success-400"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};
