import useSWR from "swr";
import { ItemCardStatusOrders } from "./itemCardStatusOrders.jsx";
import AddIngredientDialog from "@/components/ui/stock/AddIngredientDialog";
import { useState } from "react";
import {CirclePlus, AppleIcon } from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CardIngredients  () {
  const [addIngredientOpen, setAddIngredientOpen] = useState(false);
  

  const { data, error, isLoading } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/ingredients/historic",
    fetcher
  );

  let ingredients = [];
  let ingredientTotal = 0;

  if(!isLoading || !error){
    ingredients = Array.isArray(data?.ingredient) ? data.ingredient : [];
    ingredientTotal = ingredients.length || 0
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
           <CirclePlus className="mt-[5px] text-default-800 dark:text-white" onClick={() => setAddIngredientOpen(true)}/>
        </h3>
        <p className="text-sm text-secondary">{ingredientTotal} ingredientes encontrados</p>
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
        {ingredientTotal === 0 ? (<div className="text-sm text-default-500">
          Nenhum ingrediente cadastrado.
        </div>) : (

          <div className="flex flex-col gap-3">
            {ingredients.map((item) => (
              <ItemCardStatusOrders
                key={item._id}
                id={item._id}
                title={item.name}
                description={item.category}
                status={item.measurement}
                info={item.currentStock}
              />
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
};
