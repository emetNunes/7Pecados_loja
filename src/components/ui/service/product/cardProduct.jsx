import { Apple, AppleIcon, Divide, Image } from "lucide-react";
import { Button } from "@heroui/button";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import clsx from "clsx";
import {
  ButtonGroupProvider,
  Divider,
  Select,
  SelectItem,
} from "@heroui/react";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// const normalizePrices = (product) => {
//   const map = {};

//   if (Array.isArray(product.prices)) {
//     product.prices.forEach((p) => (map[p.size] = p.value));
//   }

//   if (Array.isArray(product.preços)) {
//     product.preços.forEach((p) => (map[p.tamanho] = p.valor));
//   }

//   if (product.price || product.preço) {
//     map.UNICO = product.price || product.preço;
//   }

//   return map;
// };
export default function CardProduct({ productsData }) {
  const [productSelected, setProductSelected] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [fruta, setFruta] = useState("");
  const [sabor, setSabor] = useState("");
  const [borda, setBorda] = useState("");

  // const { data } = useSWR(
  //   "https://api-7pecados.onrender.com/admin/stock/ingredients/historic",
  //   fetcher,
  // );

  // const ingredients = data?.ingredient ?? [];

  // const prices = useMemo(() => normalizePrices(product), [product]);
  // const availableSizes = Object.keys(prices).filter((s) => s !== "UNICO");

  // useEffect(() => {
  //   if (availableSizes.length === 1) {
  //     setSelectedSize(availableSizes[0]);
  //   }
  // }, [availableSizes]);

  // const currentPrice =
  //   prices.UNICO ?? (selectedSize ? prices[selectedSize] : 0);

  // const handleAdd = () => {
  //   onAdd({
  //     productID,
  //     selectedSize,
  //   });
  // };

  // const hasClient = Boolean(clientID);
  // const requiresSize = !prices.UNICO;
  // const hasSizeSelected = Boolean(selectedSize);

  // const canAdd = hasClient && (!requiresSize || hasSizeSelected);

  return (
    <div className="grid grid-cols-3 items-start sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {productsData.map((product) => (
        <div
          key={product._id}
          className="
                group flex flex-col
                rounded-3xl
                border border-default-300 
                bg-base p-4
                
                dark:border-zinc-700
                dark:bg-zinc-900
                shadow-sm 
                
                transition-all
                overflow-hidden
              "
          onClick={() => {
            setProductSelected(product._id);
          }}
        >
          <div
            className="
              relative h-[200px]
              bg-gradient-to-br from-default-100 to-default-200
              dark:from-zinc-800 dark:to-zinc-900
              flex items-center justify-center
               rounded-2xl 
            "
          >
            <Image
              size={56}
              className="text-default-400 group-hover:scale-110 transition "
            />
          </div>

          <div className="flex flex-col gap-5 py-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-foreground leading-tight">
                {product.name}
              </h3>
              <p className="text-sm text-default-500 leading-relaxed line-clamp-2">
                {product.description}
              </p>
            </div>

            {productSelected == product._id && (
              <>
                <section className="flex flex-col gap-2 border-t border-dashed border-zinc-400">
                  <p className="text-medium font-bold tracking-wide my-2">
                    Tamanhos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.prices.map((size) => (
                      <button
                        key={size._id}
                        onClick={() => setSelectedSize([size._id, size.value])}
                        className={clsx(
                          "px-4 py-1.5 rounded-full text-sm font-semibold border transition border-default-300 text-default-700 hover:border-primary",
                          {
                            "bg-primary text-white border-primary shadow-sm":
                              selectedSize[0] === size._id,
                          },
                        )}
                      >
                        {size.size}
                      </button>
                    ))}
                  </div>
                </section>

                <section>
                  <div>
                    {product.ingredients !== "" ? (
                      <div className="flex gap-6">
                        {product.ingredients.Fruta &&
                          product.ingredients.Fruta.length > 0 && (
                            <div>
                              <p className="text-medium font-bold tracking-wide mb-2">
                                Frutas
                              </p>
                              {product.ingredients.Fruta.map((fruta) => (
                                <div className="flex items-center">
                                  <input
                                    key={fruta._id}
                                    id={fruta._id}
                                    name="lista-radio"
                                    type="radio"
                                    className="h-4 w-4 border-2 border-gray-300 rounded-full  
                                              checked:bg-primary checked:border-primary
                                              focus:outline-none focus:ring-2 focus:ring-primary
                                              transition duration-200"
                                  />
                                  <label
                                    for={fruta._id}
                                    className="ml-3 block text-sm font-medium text-gray-700"
                                  >
                                    {fruta.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                        {product.ingredients.Borda &&
                          product.ingredients.Borda.length > 0 && (
                            <div>
                              <p className="text-medium font-bold tracking-wide mb-2">
                                Bordas
                              </p>
                              {product.ingredients.Borda.map((borda) => (
                                <div className="flex items-center">
                                  <input
                                    key={borda._id}
                                    id={borda._id}
                                    name="lista-radio"
                                    type="radio"
                                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                  />
                                  <label
                                    for={borda._id}
                                    className="ml-3 block text-sm font-medium text-gray-700"
                                  >
                                    {borda.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ) : (
                      <p>Sem opções aqui</p>
                    )}
                  </div>
                </section>
                <section>
                  <button className="bg-primary text-base w-full p-4 rounded-2xl shadow-lg">
                    Adicionar a conta
                  </button>
                </section>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
