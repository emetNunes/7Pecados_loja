import type { ReactNode } from "react";
import { BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";

type ItemCardHistoryProps = {
    children: ReactNode;
    description_item?: string;
    type_movement_to_icon: string;
}

export const ItemCardHistory = ({
    children,
    description_item,
    type_movement_to_icon,
}: ItemCardHistoryProps) => {
    let size_icon = 32
    return (
        <div className="flex items-center gap-4">
            <div className={`p-2 rounded-lg text-base ${type_movement_to_icon == "entrance" ? "bg-secondary" : "bg-primary"}`}>
                {type_movement_to_icon == "entrance" ? <BanknoteArrowUp size={size_icon} /> : <BanknoteArrowDown size={size_icon} />}
            </div>
            <div className="grid grid-rows-2">
                <div className="font-bold">
                    {children}
                </div>
                <div className="text-[0.8rem] text-default-500">
                    {description_item}
                </div>
            </div>
        </div>
    )
}