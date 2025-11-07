import { HandPlatter, ListFilter } from "lucide-react";
import { useEffect, useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";

function AccountClientByID({ clientID }) {
  const [account, setAccount] = useState([]);

  const getAccouts = async () => {
    try {
      const response = await fetch(
        `https://api-7pecados.onrender.com/sale/account_client/id/${clientID}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao carregar os pedidos por API");
      }

      const accountGet = await response.json();

      setAccount(accountGet || []);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    getAccouts();
  }, [account]);

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-bold text-medium   text-primary",
    trigger: "px-2 py-0 data-[hover=true]: rounded-lg h-8 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };
  return (
    <Accordion
      className="p-2 flex flex-col gap-1 "
      itemClasses={itemClasses}
      showDivider={true}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            height: "auto",
            overflowY: "unset",
            transition: {
              height: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                duration: 1,
              },
              opacity: {
                easings: "ease",
                duration: 1,
              },
            },
          },
          exit: {
            y: -10,
            opacity: 0,
            height: 0,
            overflowY: "hidden",
            transition: {
              height: {
                easings: "ease",
                duration: 0.25,
              },
              opacity: {
                easings: "ease",
                duration: 0.3,
              },
            },
          },
        },
      }}
    >
      {account.map((acc, index) => (
        <AccordionItem
          key={acc._id}
          aria-label={`Accordion ${index}`}
          title={`${index} Pedido - ${acc.statusOrder}`}
        >
          <ul className="">
            {acc.products.map((product) => (
              <li
                key={product.productID._id}
                className="bg-base flex  justify-between border-dashed border-b-1 py-4 items-center  gap-2"
              >
                <div className="flex w-full">
                  <HandPlatter className="bg-secondary mr-3 w-15 h-15 rounded-full p-2 text-base" />
                  <div>
                    <p className="font-bold  text-xl text-black">
                      {product.productID.name}
                    </p>
                    <p className="text-lg text-primary">1x</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default AccountClientByID;
