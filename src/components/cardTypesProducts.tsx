import { ReactNode, useState } from "react";

type CardTypesProductsProps = {
  title: string;
  icon: ReactNode;
  selected?: boolean;
  onToggle: (title: string, isSelected: boolean) => void;
};

export const CardTypesProducts = ({
  title,
  icon,
  selected = false,
  onToggle,
}: CardTypesProductsProps) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handleClick = () => {
    const newState = !isSelected;
    setIsSelected(newState);
    onToggle(title, newState);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col w-fit px-6 py-4 bg-white rounded-xl items-center shadow-2xs gap-2 border-2 transition-all duration-200
        ${
          isSelected
            ? "border-primary bg-primary/10"
            : "border-transparent hover:border-primary/40"
        }`}
    >
      <div
        className={`p-2 rounded-md text-base transition-all ${
          isSelected ? "bg-primary text-white" : "bg-secondary text-base"
        }`}
      >
        {icon}
      </div>
      <div
        className={`text-sm font-medium transition-all ${
          isSelected ? "text-primary" : "text-secondary"
        }`}
      >
        {title}
      </div>
    </button>
  );
};
