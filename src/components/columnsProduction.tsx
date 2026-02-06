import { ReactNode } from "react";

type ColumnsProductionProps = {
  title: string;
  quantityOfItems: string;
  children: ReactNode;
};

const STATUS_STYLE: Record<string, string> = {
  Pendentes: "border-primary",
  "Em produção": "border-primary",
  Prontos: "border-primary",
  Entregues: "bg-primary text-base",
};

export const ColumnsProduction = ({
  title,
  quantityOfItems,
  children,
}: ColumnsProductionProps) => {
  return (
    <section
      className="
        flex flex-col
        rounded-2xl
        bg-default-50 dark:bg-zinc-900
        border border-default-200 dark:border-zinc-800
        overflow-hidden
      "
    >
      {/* HEADER */}
      <header
        className={`
          flex items-center justify-between
          px-4 py-3
          border-b
          ${STATUS_STYLE[title] || "border-default-200"}
        `}
      >
        <h3 className="font-semibold text-sm">{title}</h3>

        <span
          className="
            min-w-[28px]
            text-center
            text-xs font-semibold
            rounded-full
            text-black dark:text-white
            bg-default-200 dark:bg-zinc-800
            px-2 py-0.5
          "
        >
          {quantityOfItems}
        </span>
      </header>

      {/* BODY */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">{children}</div>
    </section>
  );
};
