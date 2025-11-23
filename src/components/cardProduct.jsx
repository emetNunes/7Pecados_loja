import { Image } from "lucide-react";
import { Button } from "@heroui/button";
import { useState } from "react";
import { ItemProduct } from "./itemProduct.jsx";

function CardProduct({ id, name, description, value, IDingredients, size }) {
  const [isDetails, setIsDetails] = useState();

  const sizeArray = ["P", "M", "G"];

  const frutas = [
    { key: "Morango", label: "Morango" },
    { key: "Banana", label: "Banana" },
    { key: "manga", label: "manga" },
    { key: "uva", label: "uva" },
  ];
  const sabores = [
    { key: "Morango", label: "Morango" },
    { key: "chocolate", label: "chocolate" },
    { key: "manga", label: "manga" },
    { key: "uva", label: "uva" },
  ];

  return (
    <div key={id}>
      <div className="flex flex-col  border-2 border-default-300 rounded-2xl bg-base">
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
          <div className="text-lg font-bold">R${value}</div>
          <Button
            className="text-base rounded-xl border-primary"
            variant="bordered"
            onClick={() => {
              if (isDetails == true) {
                setIsDetails(false);
              } else {
                setIsDetails(true);
              }
            }}
          >
            <span className="default text-primary">Ver produto</span>
          </Button>

          {isDetails ? (
            <ItemProduct size={sizeArray} sabores={sabores} frutas={frutas} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
