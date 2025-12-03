import { Image } from "lucide-react";
import { Button } from "@heroui/button";
import { useState } from "react";
import { ItemProduct } from "@/components/serviceComponents/itemProduct";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());

function CardProduct({
  clientID,
  productID,
  name,
  description,
  value,
  IDingredients,
  size,

  onAdd,
}) {
  const [isDetails, setIsDetails] = useState();
  const [selectdProduct, setSelectProduct] = useState(false);

  const sizeArray = ["P", "M", "G"];

  const {
    data,
    mutate: refreshIngredient,
    error,
    isLoading,
  } = useSWR(
    `https://api-7pecados.onrender.com/admin/stock/ingredients/historic`,
    fetcher,
    { revalidateOnFocus: true }
  );

  const ingredients = data?.ingredient || [];

  if (clientID === "" && isDetails) {
    setIsDetails(false);
  }

  return (
    <div key={productID}>
      <div className="flex flex-col  border-2 border-default-300 rounded-2xl bg-base">
        <div className="bg-default-200 w-full h-[220px] rounded-2xl ">
          <div className="flex justify-center items-center h-full text-base">
            <Image />
          </div>
        </div>

        <div className="flex flex-col p-6 gap-4 ">
          <div>
            <div className="font-bold text-lg text-primary">{name}</div>
            <div className="text-default-600">{description}</div>
          </div>
          <div className="text-lg font-bold">R${value}</div>
          <Button
            className="text-base rounded-xl border-primary"
            variant="bordered"
            onClick={() => {
              if (clientID.trim() !== "") {
                if (isDetails == true) {
                  setIsDetails(false);
                } else {
                  setIsDetails(true);
                }
              }
            }}
          >
            {clientID === "" ? (
              <>
                <span className="default text-primary disabled">
                  Selecione uma conta
                </span>
              </>
            ) : (
              <span className="default text-primary">
                Adicionar ao carrinho
              </span>
            )}
          </Button>

          {isDetails ? (
            <ItemProduct
              clientID={clientID}
              productID={productID}
              sizes={sizeArray}
              ingredients={ingredients}
              onAdd={onAdd}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
