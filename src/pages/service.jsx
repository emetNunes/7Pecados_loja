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
import CardProduct from "@/components/serviceComponents/cardProduct.jsx";
import { useEffect, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

// Lists
import { listTypesProducts_ } from "../assets/constants/listTypesProducts";
import AccountClient from "@/components/serviceComponents/accountClient";
import AccountClientByID from "@/components/serviceComponents/accountClientByID";
import AddProductInAccount from "@/components/serviceComponents/AddProductInAccount";
import PaymentClientByID from "@/components/serviceComponents/PaymentById";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ServicePage() {
  const [addClientDialogIsOpen, setAddClientDialog] = useState(false);
  const [listTypesProducts] = useState(listTypesProducts_);
  const [page, setPage] = useState("");
  const [clientID, setClientID] = useState("");
  const [clientName, setClientName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [pedidoClient, setPedidoClient] = useState([]);

  const [products, setProduct] = useState([]);

  const addProductInAccount = (newProduct) => {
    setProduct((prev) => [...prev, newProduct]);
  };

  const { data, error, isLoading } = useSWR(
    `https://api-7pecados.onrender.com/admin/stock/products/historic`,
    fetcher,
    { revalidateOnFocus: true }
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

  function onSelectClient(id, name) {
    if (id.trim() !== "") {
      setClientID(id);
      setClientName(name);
      setPage("carrinho");
    }
  }

  async function addPedidoInAccount(type) {
    if (type === "cancelar") {
      setProduct([]);

      alert("Pedido cancelado!");
    } else {
      if (clientID.trim() === "") {
        alert("Nenhum cliente selecionado!");
        return;
      }

      const newOrder = {
        clientID,
        products,
        statusOrder: "em produção",
        isProduction: true,
        isDelivery: false,
      };

      try {
        await mutate(
          `https://api-7pecados.onrender.com/sale/account_client/id/${clientID}`,
          async (currentData) => {
            const response = await fetch(
              `https://api-7pecados.onrender.com/sale/order`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder),
              }
            );

            if (!response.ok) throw new Error("Erro ao criar pedido");

            const fakeOrder = {
              _id: Math.random().toString(36).slice(2),
              ...newOrder,
            };

            return {
              ...currentData,
              orderClient: [...(currentData?.orderClient || []), fakeOrder],
            };
          },
          { revalidate: true }
        );

        setProduct([]);
      } catch (err) {
        console.error("Erro ao criar pedido:", err);
      }
    }
  }

  useEffect(() => {
    if (page === "") {
      setClientID("");
      setClientName("");
      setProduct([]);
      setPedidoClient([]);
    }
  }, [page]);

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
            <div className="grid gap-8 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
              {isLoading && <p>Carregando produtos...</p>}
              {error && <p>Erro ao carregar produtos.</p>}

              {!isLoading && listProduct.length === 0 && (
                <p>Nenhum produto encontrado.</p>
              )}

              {filteredProducts.map((element) => (
                <CardProduct
                  // {...console.log(element)}
                  clientID={clientID}
                  key={element._id}
                  onAdd={addProductInAccount}
                  productID={element._id}
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
              <AccountClientByID
                products={products}
                setPedidoClient={setPedidoClient}
                clientID={clientID}
                clientName={clientName}
                setPage={setPage}
                setProduct={setProduct}
                handleAdd={addPedidoInAccount}
              />
            ) : page === "pagamento" ? (
              <PaymentClientByID
                clientID={clientID}
                setPage={setPage}
                pedidoClient={pedidoClient}
              />
            ) : (
              (setClientID(""), setPage(""))
            )}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
