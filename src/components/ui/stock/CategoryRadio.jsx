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
      <p className="text-muted-foreground">Categorias</p>
      <div className="grid grid-cols-3  grid-lg-cols-2 mt-2 gap-2">
        {categoryProducts.map((category) => (
          <div
            className={clsx(
              "rounded-2xl p-4 flex justify-between border-1 border-foreground",
              {
                "border-primary border-2 bg-primary/10":
                  categorySelect === category.name,
              },
            )}
          >
            <div
              className={clsx(
                "flex gap-2 pr-2 font-medium text-muted-foreground",
                {
                  "text-primary font-bold ": categorySelect === category.name,
                },
              )}
            >
              {category.icon}
              <label for="category">{category.name}</label>
            </div>

            <input
              type="radio"
              id={category.name}
              name="category"
              className="appearance-none
                          h-5 w-5
                          border-2 border-gray-300 rounded-full
                          checked:bg-primary checked:border-primary
                          focus:outline-none focus:ring-2 focus:ring-primary
                          transition duration-200"
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
