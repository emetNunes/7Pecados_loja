import type { ReactNode } from "react";

type CardDefaultValueProps = {
  icon: ReactNode;
  description: string;
  type_color: string;
  children: ReactNode;
};

export const CardDefaultValue = ({
  icon,
  description,
  type_color,
  children,
}: CardDefaultValueProps) => {
  let bgColorsType = "";
  let textColorsType = "";

  switch (type_color) {
    case "primary":
      bgColorsType = "bg-secondary";
      textColorsType = "text-base";
      break;
    case "secondary":
      bgColorsType = "bg-base";
      textColorsType = "text-secondary";
      break;
    case "tertiary":
      bgColorsType = "bg-base";
      textColorsType = "text-primary";
      break;
    default:
      break;
  }
  return (
    <div
      className={`grid grid-rows-2 bg-base w-full px-6 py-8 rounded-xl gap-4 shadow-2xs ${bgColorsType}`}
    >
      <div className={textColorsType}>{icon}</div>
      <div>
        <div
          className={`font-bold text-sm ${textColorsType == "text-base" ? "text-base" : ""}`}
        >
          {description}
        </div>
        <div className={`font-bold text-xl ${textColorsType}`}>{children}</div>
      </div>
    </div>
  );
};
