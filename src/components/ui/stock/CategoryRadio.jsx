import clsx from "clsx";
import {
  Utensils,
  IceCreamBowl,
  Candy,
  Dessert,
  Beer,
  Lollipop,
} from "lucide-react";

const categoryProducts = [
  { name: "taças", icon: <IceCreamBowl size={24} /> },
  { name: "doces", icon: <Candy size={24} /> },
  { name: "tortas", icon: <Dessert size={24} /> },
  { name: "bebidas", icon: <Beer size={24} /> },
  { name: "outros", icon: <Lollipop size={24} /> },
];

export default function CategoryRadio({ categorySelect, setCategorySelect }) {
  const handleCategoryChange = (event) => {
    setCategorySelect(event.target.value);

    console.log(event);
  };

  return (
    <div className="w-full">
      <h4>Categorias</h4>
      <div className="grid grid-cols-3  grid-lg-cols-2 mt-2 gap-2">
        {categoryProducts.map((category) => (
          <div
            className={clsx(
              "rounded-2xl p-4 flex justify-between w-35 border-1 border-gray-400",
              { "border-primary border-2": categorySelect === category.name },
            )}
          >
            <div
              className={clsx("flex gap-2 pr-2 font-medium text-gray-800", {
                "text-primary font-bold": categorySelect === category.name,
              })}
            >
              {category.icon}
              <label for="category">{category.name}</label>
            </div>

            <input
              type="radio"
              id={category.name}
              name="category"
              className="text-"
              value={category.name}
              checked={categorySelect === category.name}
              onChange={handleCategoryChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
