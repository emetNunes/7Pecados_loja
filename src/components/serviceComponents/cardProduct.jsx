import { Image } from "lucide-react";
import { Button } from "@heroui/button";
import { useEffect, useMemo, useState } from "react";
import { ItemProduct } from "./itemProduct";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

/* ================================
   Normalização de preços da API
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

  // Seleciona automaticamente se existir apenas um tamanho
  useEffect(() => {
    if (availableSizes.length === 1) {
      setSelectedSize(availableSizes[0]);
    }
  }, [availableSizes]);

  const currentPrice =
    prices.UNICO ?? (selectedSize ? prices[selectedSize] : 0);

  return (
    <div className="flex flex-col border border-default-200 rounded-3xl bg-base shadow-sm hover:shadow-md transition">
      {/* Imagem */}
      <div className="bg-default-100 h-[200px] rounded-t-3xl flex items-center justify-center">
        <Image className="opacity-40" size={48} />
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col p-6 gap-4">
        <div>
          <h3 className="font-semibold text-lg text-primary">{name}</h3>
          <p className="text-sm text-default-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Seleção de tamanho */}
        {availableSizes.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-default-500">
              Tamanho
            </span>
            <div className="flex gap-2">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition
                    ${
                      selectedSize === size
                        ? "bg-primary text-white border-primary"
                        : "border-default-300 text-default-700 hover:border-primary"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Preço */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-default-500">Preço</span>
          <span className="text-xl font-bold text-default-900">
            R$ {Number(currentPrice).toFixed(2).replace(".", ",")}
          </span>
        </div>

        {/* CTA */}
        <Button
          variant="bordered"
          className="rounded-xl border-primary text-primary"
          disabled={!clientID || (!selectedSize && !prices.UNICO)}
          onClick={() => setIsDetailsOpen(true)}
        >
          {clientID ? "Adicionar ao carrinho" : "Selecione uma conta"}
        </Button>

        {/* Detalhes */}
        {isDetailsOpen && (
          <ItemProduct
            productID={productID}
            size={selectedSize}
            price={currentPrice}
            ingredients={ingredients}
            onAdd={onAdd}
          />
        )}
      </div>
    </div>
  );
}

export default CardProduct;
