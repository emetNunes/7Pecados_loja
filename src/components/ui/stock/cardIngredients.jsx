import useSWR from "swr";
import AddIngredientDialog from "@/components/ui/stock/AddIngredientDialog";
import { useState } from "react";
import { CirclePlus, AppleIcon } from "lucide-react";
import { Link } from "react-router-dom";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CardIngredients() {
  const [addIngredientOpen, setAddIngredientOpen] = useState(false);

  const { data, error, isLoading } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/ingredients/historic",
    fetcher,
  );

  let ingredients = [];
  let ingredientTotal = 0;

  if (!isLoading || !error) {
    ingredients = Array.isArray(data?.ingredient) ? data.ingredient : [];
    ingredientTotal = ingredients.length || 0;
  }

  return (
    <div
      className="
        w-full
        rounded-2xl
        border
        border-default-200
        dark:border-zinc-800
        bg-base
        dark:bg-zinc-900
        p-6
        shadow-2xs
        flex
        flex-col
        gap-6
      "
    >
      <div className="flex flex-col gap-1">
        <h3 className="flex gap-2 text-xl font-bold text-default-800 dark:text-white">
          Ingredientes cadastrados
          <CirclePlus
            className="mt-[5px] text-default-800 dark:text-white hover:text-primary"
            onClick={() => setAddIngredientOpen(true)}
          />
        </h3>
        <p className="text-sm text-secondary">
          {ingredientTotal} ingredientes encontrados
        </p>
      </div>

      <hr className="border-default-200 dark:border-zinc-800" />

      {isLoading ? (
        <div className="flex flex-col gap-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-14 rounded-lg bg-default-200 dark:bg-zinc-800"
            />
          ))}
        </div>
      ) : (
        <>
          {ingredientTotal === 0 ? (
            <div className="text-sm text-default-500">
              Nenhum ingrediente cadastrado.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {ingredients.map((item) => (
                // <Link to={`/ingredient/id/${item._id}`}>
                <div className="flex justify-between  items-center border-b-1 border-dashed border-gray-200 hover:bg-gray-100 pb-4 px-2 ">
                  <div className="flex gap-2 items-center">
                    <div className="bg-secondary text-base w-[52px] h-[52px] flex justify-center items-center rounded-full ">
                      <AppleIcon />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-bold text-medium">{item.name}</div>
                      <div className="text-sm text-default-500">
                        {item.category}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-medium text-secondary">
                    {item.currentStock}/{item.measurement}
                  </div>
                </div>
                // </Link>
              ))}
            </div>
          )}
        </>
      )}

      {error && (
        <div className="text-sm text-primary">
          Erro ao carregar ingredientes.
        </div>
      )}

      <AddIngredientDialog
        isOpen={addIngredientOpen}
        handleClose={() => setAddIngredientOpen(false)}
      />
    </div>
  );
}
