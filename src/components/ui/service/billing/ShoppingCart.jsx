import { Accordion, AccordionItem, Card, Divider } from "@heroui/react";
import { ArrowLeftIcon, ShoppingBag, Trash, X } from "lucide-react";

export default function Shopping({
  pedidosGrupo,
  cancelNewOrder,
  ConfirmNewOrderCard,
  onChangeNewOrder,
}) {
  const totalOrder = pedidosGrupo.reduce(
    (acumulador, item) => acumulador + item.price,
    0,
  );

  return (
    <div className=" h-full flex flex-col">
      <main className="overflow-scroll overflow-x-hidden">
        <div className="space-y-4">
          <div className="pt-2 pl-2 flex flex-col">
            <span className="font-semibold text-sm">Carinho da conta:</span>
            <span className="text-xs text-default-500">
              {pedidosGrupo.length} selecionados
            </span>
          </div>
          <Accordion
            showDivider={false}
            itemClasses={{
              base: "border-none",
            }}
          >
            {pedidosGrupo.map((pedido, index) => {
              const followUp =
                pedido.follow_up && pedido.follow_up !== ""
                  ? JSON.parse(pedido.follow_up)
                  : {};

              return (
                <AccordionItem
                  key={index}
                  textValue={pedido.name}
                  startContent={
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <ShoppingBag className="text-primary" size={18} />
                    </div>
                  }
                  title={
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p className="font-semibold text-sm">
                          {pedido.quantity}x {pedido.name}
                        </p>

                        <p className="text-xs text-default-500">
                          Produto #{pedido.productID.slice(-5)}
                        </p>
                      </div>

                      <p className="font-bold text-primary text-lg">
                        R$ {pedido.price.toFixed(2)}
                      </p>
                    </div>
                  }
                  indicator={
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onChangeNewOrder(index);
                      }}
                      className="p-1 rounded-full bg-zinc-300 hover:bg-zinc-400 transition"
                    >
                      <X size={15} className="text-white" />
                    </button>
                  }
                  classNames={{
                    base: "border border-divider rounded-2xl mb-3",
                    trigger: "px-4 py-3",
                    content: "px-4 pb-4",
                  }}
                >
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">
                          {pedido.name.toUpperCase()}
                        </p>

                        <span className="inline-flex mt-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {pedido.size.toUpperCase()} ·{" "}
                          {pedido.size.toUpperCase() === "P"
                            ? "100ml"
                            : pedido.size.toUpperCase() === "M"
                              ? "250ml"
                              : "470ml"}
                        </span>
                      </div>

                      <p className="font-bold">R$ {pedido.price.toFixed(2)}</p>
                    </div>

                    {Object.keys(followUp).length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-wide text-default-500 mb-2">
                          Acompanhamentos
                        </p>

                        <div className="flex flex-col gap-1">
                          {Object.entries(followUp).map(([category, name]) => (
                            <div key={category} className="flex gap-2 text-sm">
                              <span className="text-zinc-400">•</span>

                              <span>{category}:</span>

                              <span className="font-medium">{name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {pedido.obs && (
                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-wide text-default-500 mb-2">
                          Observação
                        </p>

                        <div className="rounded-lg bg-white border border-zinc-200 p-3 text-sm">
                          {pedido.obs}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </main>

      <footer className="p-4 mt-auto border-t-1 border-dashed border-zinc-400">
        <div className="flex gap-2">
          <button
            onClick={() => {
              ConfirmNewOrderCard();
            }}
            className="
              flex-1
              flex items-center justify-between
              rounded-2xl
              overflow-hidden
              bg-primary
              text-primary-foreground
              shadow-lg shadow-primary/20
              hover:bg-primary/90
              transition
            "
          >
            <div className="px-5 py-4 text-left">
              <p className="text-xs opacity-80">Total</p>

              <p className="font-bold text-xl">R$ {totalOrder.toFixed(2)}</p>
            </div>

            <div
              className="
                    h-full px-6 py-5
                    font-semibold
                    flex items-center
                  "
            >
              Finalizar
              <ArrowLeftIcon size={18} className="ml-2 rotate-180" />
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}
