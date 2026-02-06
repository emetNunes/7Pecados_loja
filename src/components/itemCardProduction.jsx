import { Accordion, AccordionItem } from "@heroui/accordion";
import { Image as ImageIcon } from "lucide-react";

export const ItemCardProduction = ({ list_items = [] }) => {
  if (!list_items.length) {
    return (
      <p className="text-xs text-muted-foreground">Nenhum item neste pedido.</p>
    );
  }

  return (
    <Accordion variant="splitted">
      {list_items.map((item) => (
        <AccordionItem
          key={item.id_product}
          title={
            <div className="flex items-center gap-3">
              <div
                className="
                  h-10 w-10 rounded-lg
                  bg-default-200 dark:bg-zinc-800
                  flex items-center justify-center
                "
              >
                <ImageIcon size={18} />
              </div>

              <div className="flex flex-col">
                <span className="font-semibold text-sm">
                  {item.title_product}
                </span>
                <span className="text-xs text-muted-foreground">
                  x{item.qtd_product} • {item.type_product}
                </span>
              </div>
            </div>
          }
        >
          <p className="text-sm text-muted-foreground">
            Produto incluído no pedido.
          </p>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
