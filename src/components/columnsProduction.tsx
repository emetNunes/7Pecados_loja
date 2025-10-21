import { ReactNode } from "react";

type ColumnsProductionProps = {
  title: string;
  quantityOfItems: string;
  children: ReactNode;
  type_rounded: string;
};

export const ColumnsProduction = ({
  title,
  quantityOfItems,
  children,
  type_rounded,
}: ColumnsProductionProps) => {
  // Lógica dos estilos :>
  const style_header = "py-4 font-md text-center font-bold border-b-2";
  let bg_style_header;
  let border_style_header;
  if (title == "Entregues") {
    bg_style_header = "bg-primary text-base";
  } else {
    bg_style_header = "bg-base text-secondary";
  }
  if (title == "Em produção" || title == "Prontos") {
    border_style_header = "border-l-2";
  }

  return (
    <>
      <div>
        <div
          className={`${type_rounded} ${style_header} ${bg_style_header} ${border_style_header}`}
        >
          <div className="flex justify-center">
            <div>{title}</div>
            <div>({quantityOfItems})</div>
          </div>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
};
