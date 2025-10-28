import { Image } from "lucide-react";
import { Button } from "@heroui/button";
import { AddInfoProduct } from "./addInfoProduct";
import { useState } from "react";

type CardProductProps = {
  id: string;
  name: string;
  description: string;
  value: string;
  size: string[];
  flavor: string[];
  border: string[];
  follow_up: string[];
  fruit: string[];
};

export const CardProduct = ({
  id,
  name,
  description,
  value,
  size,
  flavor,
  border,
  follow_up,
  fruit,
}: CardProductProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div key={id}>
      <div className="flex flex-col border-2 border-default-300 rounded-2xl bg-base">
        <div className="bg-default-200 w-full h-[220px] rounded-2xl">
          <div className="flex justify-center items-center h-full text-base">
            <Image />
          </div>
        </div>
        <div className="flex flex-col p-6 gap-4">
          <div>
            <div className="font-bold text-lg text-primary">{name}</div>
            <div className="text-default-600">{description}</div>
          </div>
          <div className="text-lg font-bold">{value}</div>
          <Button
            className="text-base rounded-xl border-primary"
            variant="bordered"
            onClick={openModal}
          >
            <span className="default text-primary">Ver produto</span>
          </Button>
        </div>
      </div>
      <AddInfoProduct
        isOpen={isModalOpen}
        onClose={closeModal}
        id={id}
        name={name}
        description={description}
        value={value}
        size={size}
        flavor={flavor}
        border={border}
        follow_up={follow_up}
        fruit={fruit}
      />
    </div>
  );
};
