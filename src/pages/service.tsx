import DefaultLayout from "@/layouts/default";
import { CardSearch } from "@/components/cardSearch";
import { ListFilter } from "lucide-react";
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
        <div className="flex items-center gap-4 justify-start">
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
        <div className="flex gap-6">
          {listTypesProducts.map((element) => (
            <CardTypesProducts title={element.name} icon={element.icon} />
          ))}
        </div>
        <div className="flex gap-2 items-center">
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
      </section>
    </DefaultLayout>
  );
}
