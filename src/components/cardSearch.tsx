import { Input, Button } from "@heroui/react";
import { Search } from "lucide-react";

type CardSearchProps = {
  value: string;
  text_label: string;
  text_button?: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export const CardSearch = ({
  value,
  text_label,
  text_button = "Buscar",
  onChange,
  onSearch,
}: CardSearchProps) => {
  return (
    <section className="w-full">
      <div
        className="
          flex flex-col sm:flex-row gap-3
          items-stretch sm:items-end
          w-full
        "
      >
        {/* SEARCH INPUT */}
        <div className="w-full sm:max-w-md">
          <Input
            aria-label={text_label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={text_label}
            type="text"
            startContent={
              <Search
                size={18}
                className="text-default-400 dark:text-default-500"
              />
            }
            classNames={{
              base: "w-full",
              inputWrapper: `
                h-[44px]
                rounded-xl
                bg-background
                border border-default-200
                dark:border-zinc-800
                shadow-sm
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
          />
        </div>

        {/* ACTION BUTTON */}
        <Button
          aria-label={text_button}
          onPress={onSearch}
          className="
            h-[44px]
            rounded-xl
            px-6
            bg-primary text-primary-foreground
            font-semibold text-sm
            hover:bg-primary/90
            transition
            shadow-sm
          "
        >
          {text_button}
        </Button>
      </div>
    </section>
  );
};
