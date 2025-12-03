import { ReactNode } from "react";
import { ItemCardStatusOrders } from "./itemCardStatusOrders.jsx";
import useSWR from "swr";

export const CardStatusOrders = ({ listInfo, title, description }) => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/ingredients/historic",
    fetcher
  );

  const ingredientsLists = Array.isArray(data?.ingredient)
    ? data.ingredient
    : [];

  return (
    <div className="bg-base px-6 py-8 rounded-xl shadow-2xs">
      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col items-start gap-2">
          <div className="text-2xl font-bold">{title}</div>
          <div className="text-md text-default-500">{description}</div>
        </div>
        <hr className="text-gray-200" />
        <div className="flex flex-col gap-4">
          {ingredientsLists.map((element) => (
            <>
              <ItemCardStatusOrders
                title={element.name}
                description={element.category}
                status={element.measurement}
                info={element.currentStock}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
