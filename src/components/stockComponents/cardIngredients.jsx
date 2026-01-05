import useSWR from "swr";
import { ItemCardStatusOrders } from "../itemCardStatusOrders.jsx";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const CardStatusOrders = ({ title, description }) => {
  const { data, error, isLoading } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/ingredients/historic",
    fetcher
  );

  const ingredients = Array.isArray(data?.ingredient) ? data.ingredient : [];

  return (
    <div
      className="
        w-full
        rounded-2xl
        border
        border-default-200
        dark:border-zinc-800
        bg-base
        dark:bg-zinc-900
        p-6
        shadow-2xs
        flex
        flex-col
        gap-6
      "
    >
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold text-default-800 dark:text-default-100">
          {title}
        </h3>
        <p className="text-sm text-default-500">{description}</p>
      </div>

      <hr className="border-default-200 dark:border-zinc-800" />

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col gap-3 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-14 rounded-lg bg-default-200 dark:bg-zinc-800"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {!isLoading && error && (
        <div className="text-sm text-primary">
          Erro ao carregar ingredientes.
        </div>
      )}

      {/* Empty */}
      {!isLoading && !error && ingredients.length === 0 && (
        <div className="text-sm text-default-500">
          Nenhum ingrediente cadastrado.
        </div>
      )}

      {/* Lista */}
      {!isLoading && !error && ingredients.length > 0 && (
        <div className="flex flex-col gap-3">
          {ingredients.map((item) => (
            <ItemCardStatusOrders
              key={item._id}
              title={item.name}
              description={item.category}
              status={item.measurement}
              info={item.currentStock}
            />
          ))}
        </div>
      )}
    </div>
  );
};
