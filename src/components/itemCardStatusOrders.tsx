import type { ReactNode } from "react";

type ItemCardStatusOrdersProps = {
  icon: ReactNode;
  title: string;
  description: string;
  status: string;
  info: string;
};

export const ItemCardStatusOrders = ({
  icon,
  title,
  description,
  status,
  info,
}: ItemCardStatusOrdersProps) => {
  return (
    <div className="flex justify-between items-center border-b-1 border-dashed border-gray-200 pb-4">
      <div className="flex gap-2 items-center">
        <div className="bg-secondary text-base w-[52px] h-[52px] flex justify-center items-center rounded-full ">
          {icon}
        </div>
        <div className="flex flex-col">
          <div className="font-bold text-medium">{title}</div>
          <div className="text-sm text-default-500">{description}</div>
          <div className="text-sm text-secondary">{status}</div>
        </div>
      </div>
      <div className="font-bold text-medium text-secondary">{info}</div>
    </div>
  );
};
