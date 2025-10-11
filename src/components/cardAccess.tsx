import { Button } from "@heroui/react";
import type { ReactNode } from "react";

type CardAccessProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export const CardAccess = ({
  title,
  description,
  children,
}: CardAccessProps) => {
  return (
    <div className="flex flex-col bg-base px-6 py-8 gap-8 shadow-2xs rounded-xl">
      <div className="text-primary font-bold text-xl">{title}</div>
      <div className="defaut text-sm">{description}</div>
      <Button className="bg-primary text-base rounded-xl">
        <span className="default invert">{children}</span>
      </Button>
    </div>
  );
};
