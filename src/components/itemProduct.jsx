import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/react";

export function ItemProduct({ size, frutas, sabores }) {
  return (
    <div>
      <div className="flex border-t-1 border-dashed flex-col">
        <div className=" flex flex-row justify-between w-full  py-4">
          <div>tamanho</div>
          <div className="flex gap-2">
            <button className=" bg-primary text-white  rounded-large px-1  font-semibold text-xl ">
              <div className="p-2">P</div>
            </button>
            <button className=" bg-primary text-white  rounded-large px-1  font-semibold text-xl ">
              <div className="p-2">M</div>
            </button>
            <button className=" bg-primary text-white  rounded-large px-1  font-semibold text-xl ">
              <div className="p-2">G</div>
            </button>
          </div>
        </div>

        <div className="gap-2 flex py-4 border-t-1 border-dashed">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select className="max-w-xs" label="Frutas">
              {frutas.map((fruta) => (
                <SelectItem key={fruta.key}>{fruta.label}</SelectItem>
              ))}
            </Select>
            <Select className="max-w-xs" label="Sabor">
              {sabores.map((sabor) => (
                <SelectItem key={sabor.key}>{sabor.label}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="gap-2 flex justify-end py-4 border-t-1 border-dashed">
          <button className="outline-1 outline-primary rounded-lg p-2 px-4 text-primary">
            cancelar
          </button>
          <button className="bg-primary text-white rounded-lg p-2 px-4">
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
