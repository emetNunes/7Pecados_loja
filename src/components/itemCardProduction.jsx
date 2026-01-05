import { Accordion, AccordionItem } from "@heroui/accordion";
import { Image as ImageIcon } from "lucide-react";

export const ItemCardProduction = ({ list_items = [] }) => {
  if (!list_items.length) {
    return (
      <div className="text-xs text-default-500">Nenhum item neste pedido.</div>
    );
  }

  return (
    <Accordion variant="splitted">
      {list_items.map((item) => (
        <AccordionItem
          key={item.id_product}
          title={
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-lg bg-default-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                <ImageIcon size={20} />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold">{item.title_product}</span>
                <div className="text-xs text-default-500 flex gap-2">
                  <span>x{item.qtd_product}</span>
                  <span>•</span>
                  <span>{item.type_product}</span>
                </div>
              </div>
            </div>
          }
        >
          <div className="text-sm text-default-600 dark:text-default-400">
            Produto incluído no pedido.
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
