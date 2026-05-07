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
import ProductDetails from "./ProductDetails";

export default function CardProduct({ productsData, clientSelect }) {
  const [productSelected, setProductSelected] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);

  function handlerAddProduct() {
    const payload = {};
  }

  return (
    <div>
      <div className="grid grid-cols-3 w items-start sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 ">
        {productsData.map((product) => (
          <div
            key={product._id}
            className="
                relative
                group flex flex-col
                rounded-3xl
                border border-default-400/60 -,

                bg-base p-4
                
                dark:border-zinc-700
                dark:bg-zinc-900
                shadow-sm 
                
                transition-all
                overflow-hidden
              "
            onClick={() => {
              if (product._id != productSelected && clientSelect.length > 0) {
                setProductSelected(product._id);

                selectedSize.length > 0 && setSelectedSize([]);
              }
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
                <h3 className="text-2xl font-semibold text-foreground leading-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-default-500 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              {productSelected == product._id && (
                <div className="">
                  <section className="flex flex-col gap-2 border-t border-dashed border-zinc-400">
                    <p className="text-[12px] font-bold text-zinc-500 tracking-wide mt-3">
                      TAMANHO
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.prices.map((size) => (
                        <button
                          key={size._id}
                          onClick={() =>
                            setSelectedSize([size._id, size.value])
                          }
                          className={clsx(
                            "px-6 py-3 rounded-full text-sm font-semibold border border-dashed transition border-default-300 text-default-700 hover:border-primary",
                            {
                              "bg-primary text-white border-primary shadow-sm":
                                selectedSize[0] === size._id,
                            },
                          )}
                        >
                          {clsx(
                            { "100ml": size.size == "P" },
                            { "250ml": size.size == "M" },
                            { "470ml": size.size == "G" },
                          )}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section>
                    <div>
                      {product.ingredients !== "" ? (
                        <div>
                          {product.ingredients.Fruta &&
                            product.ingredients.Fruta.length > 0 && (
                              <ProductDetails
                                title={"Frutas"}
                                detailsData={product.ingredients.Fruta}
                              />
                            )}
                          {product.ingredients.Borda &&
                            product.ingredients.Borda.length > 0 && (
                              <ProductDetails
                                title={"Bordas"}
                                detailsData={product.ingredients.Borda}
                              />
                            )}
                        </div>
                      ) : (
                        <p>Sem opções aqui</p>
                      )}
                    </div>
                  </section>
                  <section>
                    <div
                      className="inline-flex w-full rounded-2xl shadow-sm"
                      role="group"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          handlerAddProduct();
                        }}
                        className="px-4 py-2 text-sm font-medium  bg-primary
                          text-white
                          p-5 
                          rounded-l-2xl 
                          shadow-lg
                          hover:opacity-90
                          transition"
                      >
                        R$
                        {selectedSize.length == 0
                          ? "00,00"
                          : selectedSize[1].toFixed(2)}
                      </button>
                      <button
                        type="button"
                        className="px-4 py-3 text-sm font-medium  bg-primary w-full p-5 text-white border-l-1 border-base/30 rounded-r-2xl shadow-lg
                                hover:opacity-90 transition"
                      >
                        Adicionar a conta
                      </button>
                    </div>
                  </section>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
