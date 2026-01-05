// ServicePage.jsx
import DefaultLayout from "@/layouts/default";
import { CardSearch } from "@/components/cardSearch";
import { CardTypesProducts } from "@/components/cardTypesProducts";
import CardProduct from "@/components/serviceComponents/cardProduct.jsx";

import { useEffect, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

import { listTypesProducts_ } from "../assets/constants/listTypesProducts";
import AccountClient from "@/components/serviceComponents/accountClient";
import AccountClientByID from "@/components/serviceComponents/accountClientByID";
import PaymentClientByID from "@/components/serviceComponents/PaymentById";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ServicePage() {
  /* ================================
     ESTADOS
  ================================ */
  const [page, setPage] = useState("");
  const [clientID, setClientID] = useState("");
  const [clientName, setClientName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [pedidoClient, setPedidoClient] = useState([]);

  /* ================================
     PRODUTOS
  ================================ */
  const { data, error, isLoading } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/products/historic",
    fetcher,
    { revalidateOnFocus: true }
  );

  const listProduct = data?.product || [];

  /* ================================
     AÇÕES
  ================================ */
  const addProductInAccount = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleToggleCategory = (title, isSelected) => {
    setSelectedTypes((prev) =>
      isSelected ? [...prev, title] : prev.filter((t) => t !== title)
    );
  };

  function onSelectClient(id, name) {
    if (!id) return;
    setClientID(id);
    setClientName(name);
    setPage("carrinho");
  }

  async function handleOrder(type) {
    if (type === "cancelar") {
      setProducts([]);
      alert("Conta cancelada!");
      return;
    }

    if (!clientID) {
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
            "https://api-7pecados.onrender.com/sale/order",
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

      setProducts([]);
    } catch (err) {
      console.error("Erro ao criar pedido:", err);
    }
  }

  /* ================================
     FILTRO + BUSCA
  ================================ */
  const filteredProducts = useMemo(() => {
    let filtered = listProduct;

    if (search.trim()) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          (p.name || p.nome)?.toLowerCase().includes(s) ||
          p.description?.toLowerCase().includes(s)
      );
    }

    const hasAll = selectedTypes.includes("Todos");
    if (selectedTypes.length && !hasAll) {
      filtered = filtered.filter((p) =>
        selectedTypes.some((t) =>
          p.category?.toLowerCase().includes(t.toLowerCase())
        )
      );
    }

    return filtered;
  }, [listProduct, search, selectedTypes]);

  /* ================================
     RESET
  ================================ */
  useEffect(() => {
    if (!page) {
      setClientID("");
      setClientName("");
      setProducts([]);
      setPedidoClient([]);
    }
  }, [page]);

  /* ================================
     UI
  ================================ */
  return (
    <DefaultLayout>
      <section className="flex flex-col lg:flex-row gap-6">
        {/* COLUNA PRINCIPAL */}
        <div className="w-full lg:w-3/4 p-4 space-y-6">
          {/* BUSCA */}
          <CardSearch
            value={search}
            text_label="Pesquisar produto"
            text_button="Pesquisar"
            onChange={setSearch}
            onSearch={() => {}}
          />

          {/* CATEGORIAS */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {listTypesProducts_.map((type) => (
              <CardTypesProducts
                key={type.name}
                title={type.name}
                icon={type.icon}
                selected={selectedTypes.includes(type.name)}
                onToggle={handleToggleCategory}
              />
            ))}
          </div>

          {/* HEADER */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              <span className="text-primary">Cardápio de</span>{" "}
              <span className="opacity-80">
                {selectedTypes.join(", ") || "Todos"}
              </span>
            </h2>

            <span className="text-sm text-primary">
              {filteredProducts.length} resultados
            </span>
          </div>

          {/* GRID */}
          <div className="grid gap-8 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
            {isLoading && <p className="text-muted-foreground">Carregando…</p>}
            {error && <p className="text-destructive">Erro ao carregar.</p>}
            {!isLoading && filteredProducts.length === 0 && (
              <p className="text-muted-foreground">
                Nenhum produto encontrado.
              </p>
            )}

            {filteredProducts.map((product) => (
              <CardProduct
                key={product._id}
                clientID={clientID}
                product={product}
                productID={product._id}
                name={product.name || product.nome}
                description={product.description}
                onAdd={addProductInAccount}
              />
            ))}
          </div>
        </div>

        {/* SIDEBAR */}
        <aside
          className="
          w-full lg:w-1/4
          bg-background dark:bg-zinc-900
          border border-default-200 dark:border-zinc-800
          lg:fixed lg:right-0 lg:top-20
          lg:h-[calc(100vh-80px)]
          rounded-xl shadow-sm p-4
        "
        >
          {page === "" && (
            <AccountClient onSelectClient={onSelectClient} setPage={setPage} />
          )}

          {page === "carrinho" && (
            <AccountClientByID
              products={products}
              setPedidoClient={setPedidoClient}
              clientID={clientID}
              clientName={clientName}
              setPage={setPage}
              setProduct={setProducts}
              handleAdd={handleOrder}
            />
          )}

          {page === "pagamento" && (
            <PaymentClientByID
              clientID={clientID}
              pedidoClient={pedidoClient}
              setPage={setPage}
            />
          )}
        </aside>
      </section>
    </DefaultLayout>
  );
}
