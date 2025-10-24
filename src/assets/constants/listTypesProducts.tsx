import {
  Utensils,
  IceCreamBowl,
  Candy,
  Dessert,
  Beer,
  Lollipop,
} from "lucide-react";

const size_default = 26;

export const listTypesProducts_ = [
  { name: "Todos", icon: <Utensils size={size_default} /> },
  { name: "Taças", icon: <IceCreamBowl size={size_default} /> },
  { name: "Doces", icon: <Candy size={size_default} /> },
  { name: "Tortas", icon: <Dessert size={size_default} /> },
  { name: "Bebidas", icon: <Beer size={size_default} /> },
  { name: "Outros", icon: <Lollipop size={size_default} /> },
];
