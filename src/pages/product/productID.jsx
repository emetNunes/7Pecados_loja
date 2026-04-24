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
  CirclePlus,
  CircleX,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { useState } from "react";
import CategoryRadio from "@/components/ui/stock/CategoryRadio";
import { Input, Button, ButtonGroup } from "@heroui/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function ProductID() {
  const [searchParams] = useSearchParams();
  const [categorySelect, setCategorySelect] = useState("");
  const [description, setDescription] = useState("");

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

    if (product.description && description === "") {
      if (product.description !== "") {
        setDescription(product.description);
      }
    }
  }

  const handlerSetDescription = (event) => {
    console.log(event.target.value);
    setDescription(event.target.value);
  };

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
                      <h2 className="text-lg font-bold">Detalhes do produto</h2>
                    </div>

                    <div>
                      <div className="border-l-2 p-1 text-primary">
                        <p className="text-muted-foreground">Descrição</p>
                        <p className="mt-2 text-foreground pl-2">
                          {description}
                        </p>
                      </div>
                    </div>

                    <div className="w-full">
                      <CategoryRadio
                        categorySelect={categorySelect}
                        setCategorySelect={setCategorySelect}
                      />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="p-6 space-y-6">
                    <div className="flex gap-2 justify-between">
                      <p className="text-muted-foreground">Tabela de Preços</p>
                      {/* <a
                        href="#"
                        className="flex gap-2 hover:text-primary/80 text-primary"
                      >
                        <CirclePlus onClick={() => setAddProductOpen(true)} />
                        <p className="">Adicionar preço</p>
                      </a> */}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {product.prices.map((price) => (
                        <div
                          className="border border-foreground p-2 "
                          key={price._id}
                        >
                          <div className="flex justify-between">
                            <p className="text-sm text-muted-foreground">
                              Tamanho: {price.size}
                            </p>
                            {/* <CircleX size="20" /> */}
                          </div>
                          <p className="font-bold mt-2">
                            R${price.value.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="p-6 space-y-6">
                    <div className="flex gap-2 justify-between">
                      <p className="text-muted-foreground">
                        Ingredientes vinculados
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {product.ingredients.map((ingredient) => (
                        <div
                          className="border border-foreground p-2 "
                          key={ingredient.id_ingredient._id}
                        >
                          <div className="flex justify-between">
                            <p className="font-bold text-muted-foreground">
                              {ingredient.id_ingredient.name}
                            </p>
                          </div>
                          <p className="">
                            Categoria: {ingredient.id_ingredient.category}
                          </p>
                          <p className=" mt-2 text-sm italic text-secondary">
                            Necessario: <br />- {ingredient.quantityUsed}/
                            {ingredient.id_ingredient.measurement}
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
