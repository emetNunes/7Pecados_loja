import { Image } from "lucide-react";
import { Button } from "@heroui/button";
import { useEffect, useMemo, useState } from "react";
import { ItemProduct } from "./itemProduct";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

/* ================================
   NORMALIZAÇÃO DE PREÇOS
================================ */
const normalizePrices = (product) => {
  const map = {};

  if (Array.isArray(product.prices)) {
    product.prices.forEach((p) => (map[p.size] = p.value));
  }

  if (Array.isArray(product.preços)) {
    product.preços.forEach((p) => (map[p.tamanho] = p.valor));
  }

  if (product.price || product.preço) {
    map.UNICO = product.price || product.preço;
  }

  return map;
};

function CardProduct({
  clientID,
  productID,
  category,
  name,
  description,
  product,
  onAdd,
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  const { data } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/ingredients/historic",
    fetcher
  );

  const ingredients = data?.ingredient ?? [];

  const prices = useMemo(() => normalizePrices(product), [product]);
  const availableSizes = Object.keys(prices).filter((s) => s !== "UNICO");

  useEffect(() => {
    if (availableSizes.length === 1) {
      setSelectedSize(availableSizes[0]);
    }
  }, [availableSizes]);

  const currentPrice =
    prices.UNICO ?? (selectedSize ? prices[selectedSize] : 0);

  const handleAdd = () => {
    onAdd({
      productID,
      selectedSize,
    });
  };

  const hasClient = Boolean(clientID);
  const requiresSize = !prices.UNICO;
  const hasSizeSelected = Boolean(selectedSize);

  const canAdd = hasClient && (!requiresSize || hasSizeSelected);

  return (
    <div
      className="
        group flex flex-col
        rounded-3xl
        border border-default-200 dark:border-zinc-800
        bg-base dark:bg-zinc-900
        shadow-sm hover:shadow-lg
        transition-all
        overflow-hidden
      "
    >
      {/* IMAGE / HEADER */}
      <div
        className="
          relative h-[200px]
          bg-gradient-to-br from-default-100 to-default-200
          dark:from-zinc-800 dark:to-zinc-900
          flex items-center justify-center
        "
      >
        <Image
          size={56}
          className="text-default-400 group-hover:scale-110 transition"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-5 p-6">
        {/* TITLE */}
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-foreground leading-tight">
            {name}
          </h3>
          <p className="text-sm text-default-500 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* SIZE SELECT */}
        {availableSizes.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-default-400 uppercase tracking-wide">
              Tamanho
            </span>

            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`
                    px-4 py-1.5 rounded-full text-sm font-semibold
                    border transition
                    ${
                      selectedSize === size
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "border-default-300 text-default-700 hover:border-primary"
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* PRICE */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-default-500">Preço</span>
          <span className="text-2xl font-bold text-foreground">
            R$ {Number(currentPrice).toFixed(2).replace(".", ",")}
          </span>
        </div>

        {/* CTA */}
        <Button
          className={`
            px-4 py-2 rounded-lg
            font-semibold transition-all h-[44px]
            ${
              canAdd
                ? "bg-primary text-white hover:bg-primary/80 active:scale-[0.98]"
                : "bg-default-300 text-default-500 cursor-not-allowed"
            }
          `}
          color="primary"
          disabled={!canAdd}
          onClick={() => {
            if (!canAdd) return;

            if (category === "taças") {
              setIsDetailsOpen(true);
            } else {
              handleAdd();
            }
          }}
        >
          {!hasClient
            ? "Selecione uma conta"
            : category === "taças"
              ? "Personalizar produto"
              : "Adicionar ao carrinho"}
        </Button>

        {/* DETAILS */}
        {isDetailsOpen && (
          <ItemProduct
            productID={productID}
            size={selectedSize}
            category={category}
            price={currentPrice}
            ingredients={ingredients}
            onAdd={onAdd}
            setIsDetailsOpen={setIsDetailsOpen}
          />
        )}
      </div>
    </div>
  );
}

export default CardProduct;
