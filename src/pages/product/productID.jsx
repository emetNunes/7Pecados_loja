import DefaultLayout from "@/layouts/default";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Utensils,
  IceCreamBowl,
  Candy,
  Dessert,
  Beer,
  Lollipop,
} from "lucide-react";
import { Button, ButtonGroup } from "@heroui/button";
import { Link, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { useState } from "react";
import CategoryRadio from "@/components/ui/stock/CategoryRadio";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductID() {
  const [searchParams] = useSearchParams();
  const [categorySelect, setCategorySelect] = useState("");

  const id = searchParams.get("id");

  const { data, isLoading, error } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/products/historic",
    fetcher,
  );

  let product = [];
  if (!isLoading && !error) {
    product = data.product.filter((p) => p._id == id);
    product = product[0];

    console.log(product.category);

    if (product.category && categorySelect === "") {
      if (product.category !== "") {
        setCategorySelect(product.category);
      }
    }
  }

  // const listTypesProducts_ = [
  //   { name: "Todos", icon: <Utensils size={size_default} /> },
  //   { name: "Taças", icon: <IceCreamBowl size={size_default} /> },
  //   { name: "Doces", icon: <Candy size={size_default} /> },
  //   { name: "Tortas", icon: <Dessert size={size_default} /> },
  //   { name: "Bebidas", icon: <Beer size={size_default} /> },
  //   { name: "Outros", icon: <Lollipop size={size_default} /> },
  // ];

  return (
    <DefaultLayout>
      {isLoading ? (
        <div className="py-10 text-center text-sm text-default-500">
          Carregando produto...
        </div>
      ) : (
        <>
          {product.length == 0 ? (
            <div className="py-10 text-center text-sm text-default-500">
              Produto não encontrado!
            </div>
          ) : (
            <div
              key={product._id}
              className="p-6 max-w-6xl mx-auto space-y-6 bg-base rounded-2xl shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Link to="/stock" variant="ghost" size="icon">
                    <ArrowLeft />
                  </Link>
                  <div>
                    <h1 className="text-2xl font-semibold text-primary">
                      {product.name}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Detalhes do produto
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center text-secondary hover:text-secondary/80 gap-2"
                  >
                    <Edit size={16} /> Editar
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex items-center bg-primary text-base hover:bg-primary/80 gap-2"
                  >
                    <Trash2 size={16} /> Excluir
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="md:col-span-2">
                  <div className="p-6 space-y-6">
                    <div>
                      <h2 className="text-lg font-bold">Informações Gerais</h2>
                    </div>

                    <div className="w-full">
                      <CategoryRadio
                        categorySelect={categorySelect}
                        setCategorySelect={setCategorySelect}
                      />
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Descrição</p>
                      <p className="mt-1">{product.description}</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="p-6 space-y-6">
                    <div>
                      <h2 className="text-lg font-bold">Tabela de Preços</h2>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      {product.prices.map((price) => (
                        <div key={price._id}>
                          <p className="text-sm text-muted-foreground">
                            Tamanho: {price.size}
                          </p>
                          <p className="font-medium">
                            Preço: R${price.value.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </DefaultLayout>
  );
}
