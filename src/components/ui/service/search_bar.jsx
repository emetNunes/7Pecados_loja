import { Input, Button } from "@heroui/react";
import { Search } from "lucide-react";
import { useState } from "react";

export default function CardSearch({ value, onChange }) {
  return (
    <Input
      aria-label="Pesquisar item no cardapio..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Pesquisar item no cardapio..."
      type="text"
      endContent={
        <Search size={25} className="text-default-800 dark:text-default-500" />
      }
      classNames={{
        base: "w-full",
        inputWrapper: `
                h-[60px]
                rounded-xl
                bg-base
                border border-default-200
                dark:border-zinc-800
                shadow-sm
                px-5
                transition-all
                focus-within:border-primary
                focus-within:ring-2
                focus-within:ring-primary/30
              `,
        input: `
                text-sm
                text-foreground
                placeholder:text-default-400
              `,
      }}
    />
  );
}
