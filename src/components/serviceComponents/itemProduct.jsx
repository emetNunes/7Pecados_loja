import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";

export function ItemProduct({ productID, size, price, ingredients, onAdd }) {
  const [fruta, setFruta] = useState("");
  const [sabor, setSabor] = useState("");

  const handleAdd = () => {
    onAdd({
      productID,
      size,
      price,
      details: { fruta, sabor },
    });
  };

  return (
    <div className="mt-4 pt-4 border-t border-dashed flex flex-col gap-4">
      {/* Resumo */}
      <div className="flex justify-between text-sm font-medium text-default-700">
        <span>
          Tamanho:{" "}
          <strong className="text-default-900">{size || "Único"}</strong>
        </span>
        <span>R$ {Number(price).toFixed(2).replace(".", ",")}</span>
      </div>

      {/* Fruta */}
      <Select
        label="Fruta"
        className="max-w-full"
        onChange={(e) => setFruta(e.target.value)}
      >
        {ingredients
          .filter((i) => i.category === "Fruta")
          .map((f) => (
            <SelectItem key={f._id}>{f.name}</SelectItem>
          ))}
      </Select>

      {/* Sabor */}
      <Select
        label="Sabor"
        className="max-w-full"
        onChange={(e) => setSabor(e.target.value)}
      >
        {ingredients
          .filter((i) => i.category === "Sabor")
          .map((s) => (
            <SelectItem key={s._id}>{s.name}</SelectItem>
          ))}
      </Select>

      {/* Ações */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          className="px-4 py-2 rounded-lg text-primary border border-primary/30 hover:bg-primary/10 transition"
          onClick={() => {
            setFruta("");
            setSabor("");
          }}
        >
          Cancelar
        </button>

        <button
          className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/80 transition"
          onClick={() => {
            if (!fruta || !sabor) {
              alert("Selecione fruta e sabor");
              return;
            }
            handleAdd();
          }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
