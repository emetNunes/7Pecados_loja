import { Input, Button } from "@heroui/react";
import { Search } from "lucide-react";

type CardSearchProps = {
  value: string;
  text_label: string;
  text_button: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export const CardSearch = ({
  value,
  text_label,
  text_button,
  onChange,
  onSearch,
}: CardSearchProps) => {
  return (
    <section className="flex gap-4 items-center">
      <div className="w-[420px]">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-base shadow-2xl rounded-xl"
          label={text_label}
          placeholder="Pesquisar produto aqui..."
          type="text"
          startContent={<Search />}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
      </div>
      <Button onClick={onSearch} className="bg-primary">
        <span className="invert">{text_button}</span>
      </Button>
    </section>
  );
};
