import { Input, Button } from "@heroui/react";
import { Search } from "lucide-react";

type CardSearchProps = {
  text_label: string;
  text_button: string;
};

export const CardSearch = ({ text_label, text_button }: CardSearchProps) => {
  return (
    <section className="flex gap-4 items-center">
      <div className="max-w-[320px]">
        <Input
          className="bg-base shadow-2xl rounded-xl"
          label={text_label}
          placeholder="Digite aqui..."
          type="text"
          startContent={<Search />}
        />
      </div>
      <Button className="bg-primary">
        <span className="invert">{text_button}</span>
      </Button>
    </section>
  );
};
