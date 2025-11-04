import DefaultLayout from "@/layouts/default";
import { CardSearch } from "@/components/cardSearch";
import { HandPlatter, ListFilter } from "lucide-react";
import { CardTypesProducts } from "@/components/cardTypesProducts";

import { CardProduct } from "@/components/cardProduct";
import { useState } from "react";

// Lists
import { listTypesProducts_ } from "../assets/constants/listTypesProducts";
import { listProduct_ } from "../assets/constants/listProduct";

export default function ServicePage() {
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
            <div className="mt-4 p-2">
              <p className="font-bold text-primary">Pedidos em andamento</p>
              <div className="bg-base flex  justify-between border-dashed border-b-1 py-4 items-center  gap-2">
                <div className="flex w-full">
                  <HandPlatter className="bg-secondary mr-3 w-15 h-15 rounded-full p-2 text-base" />
                  <div>
                    <p className="font-bold  text-xl text-black">
                      Marcelo aragão
                    </p>
                    <p className="text-sm text-primary">Cliente cadastrado</p>
                  </div>
                </div>
                <div>
                  <div>
                    <button className=" hover:text-white hover:outline-none hover:bg-primary outline-2 outline-offset-2 outline-solid w-35 text-primary font-bold rounded-md p-4">
                      Abrir conta
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto flex flex-col border-t-1 p-2">
              <h1 className="font-bold text-primary text-xl py-2">
                27 pedidos em andamento
              </h1>
              <button className="bg-primary hover:bg-white hover:outline-2 hover:outline-offset-2 hover:outline-solid hover:text-primary w-full text-2xl my-4 text-white font-bold rounded-md p-6">
                Adicionar novo cliente
              </button>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
