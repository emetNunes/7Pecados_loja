import DefaultLayout from "@/layouts/default";
import { CardSearch } from "@/components/cardSearch";
import { CardTypesProducts } from "@/components/cardTypesProducts";
import { ListFilter } from "lucide-react";
import { CardProduct } from "@/components/cardProduct";
import { useState } from "react";

// Lists
import { listTypesProducts_ } from "../assets/constants/listTypesProducts";
import { listProduct_ } from "../assets/constants/listProduct";
import AccountClient from "@/components/serviceComponents/accountClient";
import AddClientDialog from "@/components/AddClientDialog";

export default function ServicePage() {
  const [addClientDialogIsOpen, setAddClientDialog] = useState(false);
  const [listTypesProducts] = useState(listTypesProducts_);
  const [listProduct] = useState(listProduct_);

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
          <div className="bg-white fixed top-20 right-0 h-9/10 rounded-l-xl shadow p-2 w-1/4 flex flex-col ">
            <div className="p-2">
              <h1 className="font-bold text-2xl">
                Registro de clientes - Hoje
              </h1>
            </div>
            {/* cliente com conta aberta vai ficar aqui */}

            <AccountClient key={1} isOpen={true} />
            <div className="mt-auto flex flex-col border-t-1 p-2">
              <h1 className="font-bold text-primary text-xl py-2">
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
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
