import { ReactNode } from "react";

type CardTypesProductsProps = {
  title: string;
  icon: ReactNode;
  selected: boolean;
  onToggle: (title: string, isSelected: boolean) => void;
};

export const CardTypesProducts = ({
  title,
  icon,
  selected,
  onToggle,
}: CardTypesProductsProps) => {
  const handleClick = () => {
    onToggle(title, !selected);
  };

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={handleClick}
      className={`
        flex flex-col items-center gap-2
        px-5 py-4 rounded-2xl
        border transition-all duration-200
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-primary/50

        ${
          selected
            ? `
              border-primary
              bg-primary/10
              dark:bg-primary/20
            `
            : `
              border-default-200
              dark:border-zinc-800
              bg-background
              hover:border-primary/50
              hover:bg-primary/5
              dark:hover:bg-primary/10
            `
        }
      `}
    >
      {/* Ícone */}
      <div
        className={`
          p-3 rounded-xl transition-colors
          ${
            selected
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/20 text-secondary"
          }
        `}
      >
        {icon}
      </div>

      {/* Título */}
      <span
        className={`
          text-sm font-semibold transition-colors
          ${selected ? "text-primary" : "text-muted-foreground"}
        `}
      >
        {title}
      </span>
    </button>
  );
};
