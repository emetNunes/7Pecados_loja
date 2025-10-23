import { Accordion, AccordionItem } from "@heroui/accordion";
import { Image } from "lucide-react";

type Item = {
  id_product: string;
  photo_product: string;
  title_product: string;
  qtd_product: string;
  type_product: string;
  total_value_product: string;
};

type ItemCardProductionProps = {
  list_items: Item[];
};

export const ItemCardProduction = ({ list_items }: ItemCardProductionProps) => {
  return list_items.map((element) => (
    <Accordion>
      <AccordionItem
        key={element.id_product}
        startContent={
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <div className="w-[46px] h-[46px] bg-gray-200 flex justify-center items-center rounded-md">
                {element.photo_product === "default" ? (
                  <Image strokeWidth={3} />
                ) : (
                  element.photo_product
                )}
              </div>
              <div className="flex flex-col">
                <div className="font-bold flex">{element.title_product}</div>
                <div className="flex text-sm gap-2">
                  <div>x{element.qtd_product} -</div>
                  <div>{element.total_value_product}</div>
                  <div className="flex bg-gray-200 rounded-sm">
                    {element.type_product}
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      >
        Mais detalhes do produto aqui
      </AccordionItem>
    </Accordion>
  ));
};
