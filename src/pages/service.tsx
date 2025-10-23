import DefaultLayout from "@/layouts/default";
import { CardSearch } from "@/components/cardSearch";
import { ListFilter } from "lucide-react";
import { CardTypesProducts } from "@/components/cardTypesProducts";
import {
  Utensils,
  IceCreamBowl,
  Candy,
  Dessert,
  Beer,
  Lollipop,
} from "lucide-react";

import { CardProduct } from "@/components/cardProduct";

let size_default = 26;

const list_types_products = [
  { name: "Todos", icon: <Utensils size={size_default} /> },
  { name: "Taças", icon: <IceCreamBowl size={size_default} /> },
  { name: "Doces", icon: <Candy size={size_default} /> },
  { name: "Tortas", icon: <Dessert size={size_default} /> },
  { name: "Bebidas", icon: <Beer size={size_default} /> },
  { name: "Outros", icon: <Lollipop size={size_default} /> },
];

const list_product = [
  {
    name: "Cestinha decorada de açai",
    description: "Um pedacinho de céu em cada mordida! ⭐",
    value: "R$26,58",
    size: ["P", "M", "G"],
    flavor: ["Açai", "Sorvete"],
    border: ["Nutella", "Chocolate", "Chocolate Branco"],
    follow_up: ["Granulado Colorido", "Granulado de Chocolate"],
    fruit: ["Morango", "Banana"],
  },
  {
    name: "Cestinha decorada de açai",
    description: "Um pedacinho de céu em cada mordida! ⭐",
    value: "R$26,58",
    size: ["P", "M", "G"],
    flavor: ["Açai", "Sorvete"],
    border: ["Nutella", "Chocolate", "Chocolate Branco"],
    follow_up: ["Granulado Colorido", "Granulado de Chocolate"],
    fruit: ["Morango", "Banana"],
  },
  {
    name: "Cestinha decorada de açai",
    description: "Um pedacinho de céu em cada mordida! ⭐",
    value: "R$26,58",
    size: ["P", "M", "G"],
    flavor: ["Açai", "Sorvete"],
    border: ["Nutella", "Chocolate", "Chocolate Branco"],
    follow_up: ["Granulado Colorido", "Granulado de Chocolate"],
    fruit: ["Morango", "Banana"],
  },
];

export default function ServicePage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
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
        <div className="flex gap-4">
          {list_types_products.map((element) => (
            <CardTypesProducts title={element.name} icon={element.icon} />
          ))}
        </div>
        <div>
          <h2 className="text-lg font-bold">
            <span className="text-primary">Cardápio de</span>{" "}
            <span className="text-default-700">"Taças"</span>
          </h2>
        </div>
        <div className="flex">
          <div className="flex flex-wrap gap-4 justify-start">
            {list_product.map((element) => (
              <CardProduct
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
      </section>
    </DefaultLayout>
  );
}
