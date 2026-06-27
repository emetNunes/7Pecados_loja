import { useEffect, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

import CardSearch from "./search_bar";
import CategorySearch from "./CategorySearch";
import ProductSkeleton from "./ProductSkeleton";
import CardProduct from "./cardProduct";
import { CircleAlert, CirclePlus, User, UserIcon } from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductSection({
  clientSelect,
  sendOrder,
  setIngredientsGroup,
}) {
  const [categorySelected, setCategorySelected] = useState("Todos");
  const [search, setSearch] = useState("");

  const {
    data: listProduct,
    error,
    isLoading,
  } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/products/historic",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    },
  );

  const filteredProducts = useMemo(() => {
    let filtered = listProduct ? listProduct.products : [];

    if (search.trim()) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name?.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s),
      );
    }

    if (categorySelected.trim() !== "" && categorySelected !== "Todos") {
      filtered = filtered.filter((p) =>
        p.category?.toLowerCase().includes(categorySelected.toLowerCase()),
      );
    }

    return filtered;
  }, [listProduct, search, categorySelected]);

  return (
    <main className="w-full">
      {isLoading ? (
        <ProductSkeleton />
      ) : (
        <>
          <section>
            <CardSearch value={search} onChange={setSearch} />
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <CategorySearch
                onToggle={setCategorySelected}
                selected={categorySelected}
              />
            </div>
          </section>

          <section className=" dark:bg-zinc-800/20 rounded-2xl w-full">
            {filteredProducts.length > 0 ? (
              <>
                {categorySelected == "Todos" ? (
                  <div className="flex justify-between">
                    <p className="text-[20px] font-bold py-3">
                      Cardapio de Produtos
                    </p>
                    <p className="text-[15px] text-primary font-bold  py-3 pr-4">
                      {filteredProducts.length} produtos
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <p className="text-[20px] font-bold py-3">
                      Cardapio de{" "}
                      <span className="text-primary">'{categorySelected}'</span>
                    </p>
                    <p className="text-[15px] text-primary font-bold  py-3">
                      {filteredProducts.length} produtos
                    </p>
                  </div>
                )}
                <CardProduct
                  productsData={filteredProducts}
                  clientSelect={clientSelect}
                  sendOrder={(prodc) => {
                    sendOrder(prodc);
                  }}
                  setIngredientsGroup={setIngredientsGroup}
                />
              </>
            ) : (
              <div className="p-10 grid bg-base rounded-2xl shadow-sm text-primary grid-1-col justify-items-center ">
                <CircleAlert size={50} />
                <p className="font-bold">Nenhum produto encontrado!</p>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}
