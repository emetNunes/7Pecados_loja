import DefaultLayout from "@/layouts/default";
import { CardSearch } from "@/components/cardSearch";
import { CardTypesProducts } from "@/components/cardTypesProducts";
import { HandPlatter, ListFilter, XIcon } from "lucide-react";
import { CardProduct } from "@/components/cardProduct";
import { useState } from "react";

// Lists
import { listTypesProducts_ } from "../assets/constants/listTypesProducts";
import { listProduct_ } from "../assets/constants/listProduct";
import AccountClient from "@/components/serviceComponents/accountClient";
import AddClientDialog from "@/components/AddClientDialog";
import AccountClientByID from "@/components/serviceComponents/accountClientByID";

export default function ServicePage() {
  const [addClientDialogIsOpen, setAddClientDialog] = useState(false);
  const [listTypesProducts] = useState(listTypesProducts_);
  const [listProduct] = useState(listProduct_);
  const [clientID, setClientID] = useState("");

  function onSelectClient(id) {
    if (id.trim() !== "") {
      setClientID(id);
    }
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col gap-8 overflow-hidden">
        <div className="flex ">
          <div className="w-3/4 p-4">
            <div className="flex items-center gap-4 justify-start mb-4">
              <div className="bg-primary p-2 rounded-xl text-base">
                <ListFilter size={24} strokeWidth={3} />
              </div>
              <div>
                <CardSearch
                  text_label={"Pesquisar produto"}
                  text_button={"Pesquisar"}
                />
              </div>
            </div>
            <div className="flex gap-6 ">
              {listTypesProducts.map((element) => (
                <CardTypesProducts title={element.name} icon={element.icon} />
              ))}
            </div>
            <div className="flex gap-2 items-center justify-between my-4">
              <div>
                <h2 className="text-lg font-bold">
                  <span className="text-primary">Cardápio de</span>{" "}
                  <span className="text-default-700">"Taças"</span>
                </h2>
              </div>
              <div className="text-lg text-primary">
                (14 resultados encontrados)
              </div>
            </div>
            <div className="grid gap-8 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
              {listProduct.map((element) => (
                <CardProduct
                  id={element.id}
                  name={element.name}
                  description={element.description}
                  value={element.value}
                  size={element.size}
                  flavor={element.flavor}
                  border={element.border}
                  follow_up={element.follow_up}
                  fruit={element.fruit}
                />
              ))}
            </div>
          </div>
          <div className="bg-white  fixed top-20 right-0 h-9/10 rounded-l-xl shadow p-2 w-1/4 flex flex-col ">
            <div className="p-2 ">
              <div className="font-bold text-2xl flex justify-between">
                {clientID === "" ? (
                  "Registro de clientes - Hoje"
                ) : (
                  <>
                    <h1>Carrinho do cliente</h1>{" "}
                    <div
                      className="text-2xl  hover:text-primary"
                      onClick={() => {
                        setClientID("");
                      }}
                    >
                      <XIcon />
                    </div>
                  </>
                )}
              </div>
            </div>

            {clientID === "" ? (
              <AccountClient
                key={1}
                isOpen={true}
                onSelectClient={onSelectClient}
              />
            ) : (
              <AccountClientByID clientID={clientID} />
            )}

            <div className="mt-auto flex flex-col  p-2">
              {clientID === "" ? (
                <>
                  <h1 className="font-bold text-primary border-t-1 text-xl py-2">
                    27 pedidos em andamento
                  </h1>
                  <button
                    onClick={() => setAddClientDialog(true)}
                    className="bg-primary hover:bg-white hover:outline-2 hover:outline-offset-2 hover:outline-solid hover:text-primary w-full text-2xl my-4 text-white font-bold rounded-md p-6"
                  >
                    Adicionar novo cliente
                  </button>
                  <AddClientDialog
                    isOpen={addClientDialogIsOpen}
                    handleClose={() => {
                      setAddClientDialog(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <ul className="mt-4 p-2">
                    <h1 className="font-bold text-3xl">Cliente da conta</h1>
                    <li
                      key={clientID}
                      className="bg-base flex  justify-between   py-4 items-center  gap-2"
                    >
                      <div className="flex w-full">
                        <HandPlatter className="bg-secondary mr-3 w-15 h-15 rounded-full p-2 text-base" />
                        <div>
                          <p className="font-bold  text-xl text-primary">
                            Matheus Nunes
                          </p>
                          <p className="text-sm text-slate-600">
                            Cliente cadastrado
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <div className="border-t-1 flex justify-between p-2">
                    <div className="my-3 font-bold text-2xl">
                      Total do pedido
                    </div>
                    <div className="my-3 font-bold text-3xl text-primary">
                      R$123,00
                    </div>
                  </div>
                  <div className="text-center p-2">
                    <button className="bg-primary hover:bg-white hover:outline-2 hover:outline-offset-2 hover:outline-solid hover:text-primary w-full text-2xl my-4 text-white font-bold rounded-md p-6">
                      fechar conta do cliente
                    </button>
                    <a href="#" className="text-center text-primary">
                      Emitir comprovante do cliente
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
