import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { Alert } from "@heroui/alert";

export function ItemProduct({ productID, sizes, ingredients, onAdd }) {
  const [size, setSize] = useState("");
  const [frutaSelect, setFruta] = useState("");
  const [saborSelect, setSabor] = useState("");

  const handleAdd = () => {
    onAdd({
      productID: productID,
      size: size.toLowerCase(),
      details: [frutaSelect, saborSelect],
    });
  };

  return (
    <div>
      <div className="flex border-t-1 border-dashed flex-col">
        <div className=" flex flex-row justify-between w-full  py-4">
          <div>tamanho</div>
          <div className="flex gap-2">
            {sizes.map((s) => {
              const isSelected = size === s;
              return (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={
                    isSelected
                      ? "bg-primary text-white rounded-large px-1 font-semibold text-xl"
                      : "border-2 border-primary text-primary rounded-large px-1 font-semibold text-xl"
                  }
                >
                  <div className="p-2">{s}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="gap-2 flex py-4 border-t-1 border-dashed">
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select
              onChange={(e) => {
                setFruta(e.target.value);
              }}
              className="max-w-xs"
              label="Frutas"
            >
              {ingredients
                .filter((i) => i.category === "Fruta")
                .map((f) => (
                  <SelectItem key={f._id} value={f._id}>
                    {f.name}
                  </SelectItem>
                ))}
            </Select>
            <Select
              onChange={(e) => {
                setSabor(e.target.value);
              }}
              className="max-w-xs"
              label="Sabor"
            >
              {ingredients
                .filter((i) => i.category === "Sabor")
                .map((s) => (
                  <SelectItem key={s._id} value={s._id}>
                    {s.name}
                  </SelectItem>
                ))}
            </Select>
          </div>
        </div>

        <div className="gap-2 flex justify-end py-4 border-t-1 border-dashed">
          <button
            className={
              "outline outline-1 outline-primary rounded-lg p-2 px-4 text-primary transition hover:bg-primary/10"
            }
          >
            cancelar
          </button>

          <button
            onClick={() => {
              if (!size || !frutaSelect || !saborSelect) {
                return alert("Fruta, sabor ou tamanho vazios");
              }

              handleAdd();
            }}
            className={
              "bg-primary text-white rounded-lg p-2 px-4 transition hover:bg-primary/80"
            }
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
