import { Select, SelectItem } from "@heroui/react";
import { useMemo, useState } from "react";

export function ItemProduct({
  productID,
  size,
  price,
  ingredients,
  onAdd,
  setIsDetailsOpen,
}) {
  const [fruta, setFruta] = useState("");
  const [sabor, setSabor] = useState("");

  /* ================================
     INGREDIENTES POR CATEGORIA
  ================================ */
  const frutas = useMemo(
    () => ingredients.filter((i) => i.category === "Fruta"),
    [ingredients]
  );

  const sabores = useMemo(
    () => ingredients.filter((i) => i.category === "Sabor"),
    [ingredients]
  );

  /* ================================
     ADD
  ================================ */

  const handleAdd = () => {
    const details = [
      ...(frutas.length > 0 && fruta ? [fruta] : []),
      ...(sabores.length > 0 && sabor ? [sabor] : []),
    ];

    const sizeOption = [size];

    onAdd({
      productID,
      sizeOption,
      details, // 👈 agora é ARRAY DE IDS
    });

    setIsDetailsOpen(false);
  };

  /* ================================
     VALIDATION
  ================================ */
  const isValid =
    (frutas.length === 0 || fruta) && (sabores.length === 0 || sabor);

  return (
    <div className="mt-4 pt-4 border-t border-dashed flex flex-col gap-4">
      {/* RESUMO */}
      <div className="flex justify-between text-sm font-medium text-default-700">
        <span>
          Tamanho:{" "}
          <strong className="text-default-900">{size || "Único"}</strong>
        </span>
        <span>R$ {Number(price).toFixed(2).replace(".", ",")}</span>
      </div>

      {/* FRUTA */}
      {frutas.length > 0 && (
        <Select
          label="Fruta"
          className="max-w-full"
          selectedKeys={fruta ? [fruta] : []}
          onChange={(e) => setFruta(e.target.value)}
        >
          {frutas.map((f) => (
            <SelectItem key={f._id} value={f._id}>
              {f.name}
            </SelectItem>
          ))}
        </Select>
      )}

      {/* SABOR */}
      {sabores.length > 0 && (
        <Select
          label="Sabor"
          className="max-w-full"
          selectedKeys={sabor ? [sabor] : []}
          onChange={(e) => setSabor(e.target.value)}
        >
          {sabores.map((s) => (
            <SelectItem key={s._id} value={s._id}>
              {s.name}
            </SelectItem>
          ))}
        </Select>
      )}

      {/* AÇÕES */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          className="
            px-4 py-2 rounded-lg
            text-primary
            border border-primary/30
            hover:bg-primary/10
            transition
          "
          onClick={() => {
            setFruta("");
            setSabor("");
            setIsDetailsOpen(false);
          }}
        >
          Cancelar
        </button>

        <button
          disabled={!isValid}
          className={`
            px-4 py-2 rounded-lg
            font-semibold transition
            ${
              isValid
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-default-300 text-default-500 cursor-not-allowed"
            }
          `}
          onClick={handleAdd}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
