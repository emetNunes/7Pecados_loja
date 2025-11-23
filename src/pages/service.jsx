import DefaultLayout from "@/layouts/default";
import { CardSearch } from "@/components/cardSearch";
import { CardTypesProducts } from "@/components/cardTypesProducts";
import {
  ClosedCaption,
  ClosedCaptionIcon,
  HandPlatter,
  ListFilter,
  XIcon,
} from "lucide-react";
import CardProduct from "@/components/cardProduct.jsx";
import { useMemo, useState } from "react";

import useSWR from "swr";

// Lists
import { listTypesProducts_ } from "../assets/constants/listTypesProducts";
import AccountClient from "@/components/serviceComponents/accountClient";
import AccountClientByID from "@/components/serviceComponents/accountClientByID";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ServicePage() {
  const [listTypesProducts] = useState(listTypesProducts_);
  const [page, setPage] = useState("");
  const [clientID, setClientID] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const { data, error, isLoading } = useSWR(
    `https://api-7pecados.onrender.com/admin/stock/products/historic`,
    fetcher,
    { revalidateOnFocus: false }
  );

  // pesquisa e filtro.

  const listProduct = data?.product || [];
  const totalProduct = data?.total || 0;

  const handleToggle = (title, isSelected) => {
    setSelectedTypes((prev) =>
      isSelected ? [...prev, title] : prev.filter((t) => t !== title)
    );
  };
  const filteredProducts = useMemo(() => {
    let filtered = listProduct;

    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower)
      );
    }

    var continuar = false;
    selectedTypes.map((item) => {
      if (item === "Todos") return (continuar = true);
    });

    if (selectedTypes.length > 0 && !continuar) {
      filtered = filtered.filter((item) => {
        return selectedTypes.some((selectedType) =>
          item.category.toLowerCase().includes(selectedType.toLowerCase())
        );
      });
    }

    return filtered;
  }, [listProduct, search, selectedTypes]);

  function onSelectClient(id) {
    if (id.trim() !== "") {
      setClientID(id);
      setPage("carrinho");
    }
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col gap-8 overflow-hidden">
        <div className="flex ">
          <div className="w-3/4 p-4">
            <div className="flex items-center gap-4 justify-start mb-4">
              <div>
                <CardSearch
                  value={search}
                  text_label="Pesquisar produto"
                  text_button="Pesquisar"
                  onChange={setSearch}
                  onSearch={() => {}}
                />
              </div>
            </div>

            <div className="flex gap-6 ">
              {listTypesProducts.map((element) => (
                <CardTypesProducts
                  key={element.name}
                  title={element.name}
                  icon={element.icon}
                  onToggle={handleToggle}
                />
              ))}
            </div>

            <div className="flex gap-2 items-center justify-between my-4">
              <div>
                <h2 className="text-lg font-bold">
                  <span className="text-primary">Cardápio de</span>{" "}
                  <span className="text-default-700">
                    "{selectedTypes.join(", ") || "Todos"}"
                  </span>
                </h2>
              </div>
              <div className="text-lg text-primary">
                ({filteredProducts.length} resultados encontrados)
              </div>
            </div>
            <div className="grid gap-8 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
              {isLoading && <p>Carregando produtos...</p>}
              {error && <p>Erro ao carregar produtos.</p>}

              {!isLoading && listProduct.length === 0 && (
                <p>Nenhum produto encontrado.</p>
              )}

              {filteredProducts.map((element) => (
                <CardProduct
                  // {...console.log(element)}
                  key={element.id}
                  id={element.id}
                  name={element.name}
                  description={element.description}
                  value={element.price}
                  ingredients={element.ingredients.id_ingredients}
                />
              ))}
            </div>
          </div>

          <div className="bg-white fixed top-20 right-0 h-9/10 rounded-l-xl shadow p-2 w-1/4 flex flex-col ">
            {page === "" ? (
              <AccountClient
                key={1}
                onSelectClient={onSelectClient}
                setPage={setPage}
              />
            ) : page === "carrinho" ? (
              <AccountClientByID clientID={clientID} setPage={setPage} />
            ) : page === "pagamento" ? (
              "PAGAMENTO"
            ) : (
              "COMPROVANTE"
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
