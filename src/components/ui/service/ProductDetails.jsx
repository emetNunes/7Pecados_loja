import clsx from "clsx";
import { Cpu } from "lucide-react";
import { useMemo, useState } from "react";

export default function ProductDetails({ productDetail }) {
  console.log(productDetail);
  return;
  const product = productDetail[0];

  // const frutas = useMemo(
  //   () => ingredients.filter((i) => i.category === "Fruta"),
  //   [ingredients],
  // );

  // console.log(ingredients);
  return;

  return (
    <main className="border-t border-dashed border-zinc-400">
      <section className="grid grid-cols-2 mt-5">
        <div>
          <p className="text-xs font-medium text-default-400 uppercase tracking-wide mb-2">
            Bordas
          </p>
          <div className="gap-2 flex flex-row">
            {bordas.length > 0 && (
              <Select
                label="Borda"
                className="max-w-full"
                // selectedKeys={bordas ? [bordas] : []}
                // onChange={(e) => setFruta(e.target.value)}
              >
                {bordas.map((f) => (
                  <SelectItem key={f._id} value={f._id}>
                    {f.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-default-400 uppercase tracking-wide">
            Frutas
          </p>
          {/* {frutas.length > 0 && (
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
          )} */}
        </div>
      </section>

      {/* <button>Confirmar</button> */}
    </main>
  );
}
