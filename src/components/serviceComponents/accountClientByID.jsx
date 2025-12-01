import { useEffect, useState } from "react";
import { Accordion, AccordionItem, useSwitch } from "@heroui/react";
import useSWR from "swr";
import { useMemo } from "react";
import {
  CircleX,
  HandPlatter,
  XIcon,
  X,
  ShoppingCart,
  CirclePlus,
} from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

function AccountClientByID({
  handleAdd,
  products,
  clientID,
  setPage,
  clientName,
  setProduct,
  setPedidoClient,
}) {
  const {
    data: account,
    error,
    isLoading,
  } = useSWR(
    clientID
      ? `https://api-7pecados.onrender.com/sale/account_client/id/${clientID}`
      : null,
    fetcher
  );

  const pedidos = Array.isArray(account) ? account : [];

  const name = clientName.trim() === "" ? "Cliente" : clientName;
  const total = pedidos.reduce((acc, p) => acc + (p.priceTotal || 0), 0);

  const itemClasses = {
    base: "py-0 w-full",
    title: "font-bold text-medium   text-primary",
    trigger: "px-2 py-0 data-[hover=true]: rounded-lg h-8 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  const {
    data: productsDb,
    errorProduct,
    isLoadingProduct,
  } = useSWR(
    `https://api-7pecados.onrender.com/admin/stock/products/historic`,
    fetcher
  );

  const filteredProduct = useMemo(() => {
    if (!products || !productsDb) return [];

    const productDbArray = productsDb?.product ?? [];

    return products
      .map((p) => {
        const match = productDbArray.find((db) => db._id === p.productID);
        if (!match) return null;

        return {
          ...match,
          size: p.size,
          details: p.details,
        };
      })
      .filter(Boolean);
  }, [products, productsDb]);

  useEffect(() => {
    if (!isLoading && pedidos.length > 0) {
      setPedidoClient(pedidos);
    }
  }, [isLoading, pedidos]);

  if (isLoading)
    return (
      <div className="p-2 ">
        <div className="font-bold text-2xl flex  justify-between">
          <h1>Carregando pedidos...</h1>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 sm:p-6 max-w-sm mx-auto">
        <div className="flex justify-between items-center mb-6">
          <p className="font-bold text-2xl text-primary"></p>

          <button
            className="text-gray-400 hover:text-primary transition duration-150 p-1 rounded-full hover:bg-gray-100" // Botão de fechar mais suave
            onClick={() => {
              setPage("");
            }}
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex justify-center flex-col text-center">
          <CircleX className="mx-auto mb-6 text-primary w-32 h-32 sm:w-40 sm:h-40" />
          <p className="font-semibold text-lg text-gray-700 mb-6">
            Error ao procurar pedidos
          </p>
          <button className="bg-primary hover:bg-white text-white  hover:outline-2 hover:outline-offset-2 hover:outline-solid hover:text-primary text-white font-semibold w-full text-lg py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
            Voltar
          </button>
        </div>
      </div>
    );

  if (pedidos.length === 0)
    return (
      <>
        <div className="p-2 ">
          <div className="font-bold text-2xl flex justify-between">
            <h1>Carrinho do cliente</h1>
            <div
              className="text-2xl  hover:text-primary"
              onClick={() => {
                setPage("");
              }}
            >
              <XIcon />
            </div>
          </div>
        </div>

        <div className="flex justify-center flex-col text-center p-4">
          {filteredProduct?.length > 0 ? (
            <div>
              <Accordion
                defaultExpandedKeys={["1"]}
                className="p-2 flex flex-col gap-1"
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
                <AccordionItem
                  key="1"
                  aria-label="Accordion 1"
                  title={`Produtos selecionados(${filteredProduct.length})`}
                >
                  <ul>
                    {filteredProduct.map((product) => (
                      <li
                        key={product._id}
                        className="bg-base flex  justify-between border-dashed border-b-1 py-4  gap-2"
                      >
                        <div className="flex justify-start w-full">
                          <HandPlatter className="bg-secondary mr-3 w-15 h-15 p-2 rounded-full text-base" />
                          <div className="flex flex-col w-full">
                            <div className="flex justify-between w-full ">
                              <div className="font-bold text-xl text-left  text-black">
                                {product.name}
                              </div>

                              <div className="text-lg text-primary ">
                                R${product.price}
                              </div>
                            </div>

                            <div className=" text-left flex flex-col text-dark break-all w-5/6">
                              <span className="">Fruta: Morango </span>
                              <span>Sabor: Chocolate Branco</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionItem>
              </Accordion>

              <div className="gap-2 flex justify-start p-4  border-gray-300 border-b-1">
                <button
                  onClick={() => handleAdd("confirmar")}
                  className="bg-primary text-white rounded-lg p-2 px-4 transition hover:bg-primary/80"
                >
                  Adicionar pedido
                </button>
                <button
                  onClick={() => handleAdd("cancelar")}
                  className="outline-1 outline-primary rounded-lg p-2 px-4 text-primary transition hover:bg-primary/10"
                >
                  cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <XIcon className="mx-auto mb-6 w-25 h-25 p-2 bg-primary text-white  rounded-full" />
              <p className="font-semibold text-lg text-center text-primary mb-6">
                Nenhum pedido registrado nessa conta!
              </p>
            </>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex flex-col p-2">
            <ul className="mt-4 p-2">
              <h1 className="font-bold text-3xl">Cliente da conta</h1>
              <li
                key={1}
                className="bg-base flex  justify-between   py-4 items-center  gap-2"
              >
                <div className="flex w-full">
                  <HandPlatter className="bg-secondary mr-3 w-15 h-15 rounded-full p-2 text-base" />
                  <div>
                    <p className="font-bold  text-xl text-primary">{name}</p>
                    <p className="text-sm text-slate-600">
                      {true ? "Cliente registrado" : "Cliente novo"}
                    </p>
                  </div>
                </div>
              </li>
            </ul>

            <div className="border-t-1 flex justify-between p-2"></div>
            <div className="text-center p-2">
              <button
                onClick={() => setPage("pagamento")}
                className="bg-primary hover:bg-white text-white  hover:outline-2 hover:outline-offset-2 hover:outline-solid hover:text-primary w-full text-2xl my-4 font-bold rounded-md p-6"
              >
                Cancelar conta
              </button>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="p-2">
        <div className="font-bold text-2xl flex justify-between">
          <h1>Carrinho do cliente</h1>
          <div
            className="text-2xl  hover:text-primary"
            onClick={() => {
              setPage("");
            }}
          >
            <XIcon />
          </div>
        </div>
      </div>

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
        {pedidos.map((acc, index) => (
          <AccordionItem
            key={acc._id}
            aria-label={`Accordion ${index}`}
            title={`${index + 1}º Pedido - ${acc.statusOrder}`}
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
                      <p className="text-lg text-primary">
                        R${product.productID.price}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="p-4">
        <a
          href="#"
          onClick={() => handleAdd("confirmar")}
          className="text-primary  flex  transition hover:text-primary/80 font-bold  border-dashed border-t-1 pt-2"
        >
          <CirclePlus className="mr-2 font-bold" /> Adicionar pedido
        </a>
      </div>

      <div className="mt-auto flex flex-col p-2">
        <ul className="mt-4 p-2">
          <h1 className="font-bold text-3xl">Cliente da conta</h1>
          <li
            key={1}
            className="bg-base flex  justify-between   py-4 items-center  gap-2"
          >
            <div className="flex w-full">
              <HandPlatter className="bg-secondary mr-3 w-15 h-15 rounded-full p-2 text-base" />
              <div>
                <p className="font-bold  text-xl text-primary">{name}</p>
                <p className="text-sm text-slate-600">
                  {true ? "Cliente registrado" : "Cliente novo"}
                </p>
              </div>
            </div>
          </li>
        </ul>

        <div className="border-t-1 flex justify-between p-2">
          <div className="my-3 font-bold text-2xl">Total do pedido</div>
          <div className="my-3 font-bold text-3xl text-primary">
            R${total.toFixed(2)}
          </div>
        </div>
        <div className="text-center p-2">
          <button
            onClick={() => setPage("pagamento")}
            className="bg-primary hover:bg-white text-white  hover:outline-2 hover:outline-offset-2 hover:outline-solid hover:text-primary w-full text-2xl my-4 font-bold rounded-md p-6"
          >
            Fechar conta do cliente
          </button>

          <a
            href="#"
            className="text-center text-primary hover:text-red-500 hover:border-b-2"
          >
            Cancelar conta
          </a>
        </div>
      </div>
    </>
  );
}

export default AccountClientByID;
