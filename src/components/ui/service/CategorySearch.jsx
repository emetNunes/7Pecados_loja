import clsx from "clsx";
import { ReactNode, useState } from "react";

import {
  Utensils,
  IceCreamBowl,
  Candy,
  Dessert,
  Beer,
  Lollipop,
} from "lucide-react";

export default function CategorySearch({ onToggle, selected }) {
  const listCategory = [
    { name: "Todos", icon: <Utensils size={26} /> },
    { name: "Taças", icon: <IceCreamBowl size={26} /> },
    { name: "Doces", icon: <Candy size={26} /> },
    { name: "Tortas", icon: <Dessert size={26} /> },
    { name: "Bebidas", icon: <Beer size={26} /> },
    { name: "Outros", icon: <Lollipop size={26} /> },
  ];

  return (
    <div className="flex gap-2">
      {listCategory.map((category) => (
        <button
          type="button"
          onClick={() => {
            onToggle(category.name);
          }}
          className={clsx(
            "flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border border-default-200 shadow-sm dark:border-zinc-800 bg-background hover:border-primary/50",
            {
              "border-primary/0 bg-primary/50 text-blue-100  dark:bg-primary/60 dark:":
                selected == category.name,
            },
          )}
        >
          <div
            className={`
              p-3 rounded-xl transition-colors
              ${
                selected == category.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/20 text-secondary"
              }
            `}
          >
            {category.icon}
          </div>

          <span
            className={clsx(
              "text-sm font-semibold transition-colors text-muted-foreground",
              { "text-primary": selected == category.name },
            )}
          >
            {category.name}
          </span>
        </button>
      ))}
    </div>
  );
}
