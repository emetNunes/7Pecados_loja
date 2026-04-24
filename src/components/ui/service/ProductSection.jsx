import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

import CardSearch from "./search_bar";
import CategorySearch from "./CategorySearch";
import CardProduct from "./cardProduct";
import { CirclePlus } from "lucide-react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductSection() {
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
    let filtered = listProduct ? listProduct.product : [];

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
    <main className="">
      <section className=" space-y-4 ">
        <CardSearch
          value={search}
          text_label="Pesquisar produto"
          text_button="Pesquisar"
          onChange={setSearch}
        />
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <CategorySearch
            onToggle={setCategorySelected}
            selected={categorySelected}
          />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 bg-yellow-500 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.length > 0 ? (
            <CardProduct productsData={filteredProducts} />
          ) : (
            <div className="bg-red-300 ">
              <CirclePlus />
              Nenhum produto encontrado
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
