import { Image } from "lucide-react";
import { Button } from "@heroui/button";

type CardProductProps = {
  name: string;
  description: string;
  value: string;
  size: string[];
  flavor: string[];
  border: string[];
  follow_up: string[];
  fruit: string[];
};

export const CardProduct = ({
  name,
  description,
  value,
  size,
  flavor,
  border,
  follow_up,
  fruit,
}: CardProductProps) => {
  const style_select_default =
    "border-2 border-secondary text-secondary font-bold p-2 rounded-md text-center text-sm";
  const style_image_items_default = "w-[32px] h-[32px]";

  return (
    <div className="flex flex-col bg-base shadow-2xs rounded-xl p-6 max-w-[380px] gap-4">
      {/* Image / Title */}
      <div className="grid grid-cols-[auto_auto] gap-2 items-center">
        <div className="bg-primary text-base rounded-xl">
          <div className="flex h-full justify-center items-center px-3 py-4">
            <Image size={48} />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-primary text-xl font-bold">{name}</div>
          <div className="text-default-600 text-sm">{description}</div>
          <div className="text-xl font-bold">{value}</div>
        </div>
      </div>
      {/* Items */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between items-start gap-2">
          <div>
            <h2 className="text-default-600">Tamanho</h2>
            <div className="flex gap-2">
              {size.map((element) => (
                <div
                  className={`${style_select_default} w-[2.4rem] h-[2.4rem] flex justify-center items-center`}
                >
                  {element}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-default-600">Sabor</h2>
            <div className="flex flex-row gap-2">
              {flavor.map((element) => (
                <div className={`flex flex-col items-center`}>
                  <div className={`${style_image_items_default}`}>
                    <Image size={32} />
                  </div>
                  <div className={`${style_select_default} `}>{element}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-default-600">Borda da taça</h2>
          <div className="flex gap-2 items-end">
            {border.map((element) => (
              <div className={`flex flex-col items-center`}>
                <div className={`${style_image_items_default}`}>
                  <Image size={32} />
                </div>
                <div className={`${style_select_default}`}>{element}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-default-600">Acompanhamento</h2>
          <div className="flex gap-2">
            {follow_up.map((element) => (
              <div className={`flex flex-col items-center`}>
                <div className={`${style_image_items_default}`}>
                  <Image size={32} />
                </div>
                <div className={`${style_select_default}`}>{element}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-default-600">Fruta</h2>
          <div className="flex gap-2">
            {fruit.map((element) => (
              <div className={`flex flex-col items-center`}>
                <div className={`${style_image_items_default}`}>
                  <Image size={32} />
                </div>
                <div className={`${style_select_default}`}>{element}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button className="bg-primary text-base rounded-xl">
        <span className="default invert">Adicionar ao Carrinho</span>
      </Button>
    </div>
  );
};
