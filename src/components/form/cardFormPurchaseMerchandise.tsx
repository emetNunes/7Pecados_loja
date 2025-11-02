import { Form, Input, Button } from "@heroui/react";
import { Plus, Trash, Minus } from "lucide-react";
import { Select, SelectItem } from "@heroui/react";
import { useState, useEffect } from "react";
import { SearchableDropdown } from "../searchableDropdown";
import { fetchApi } from "../../services/api";

type Option = {
  value: string;
  label: string;
};

type AddedItem = Option & {
  quantity: number;
};
interface ApiIngredient {
  _id: string;
  name: string;
}
interface ApiResponse {
  total: number;
  page: number;
  pages: number;
  ingredient: ApiIngredient[];
}

export const location_buy = [{ key: "1", label: "Estoque principal" }];

export const select_list_category = [
  { key: "1", label: "Taças" },
  { key: "2", label: "Doces" },
];

export const CardFormPurchaseMerchandise = () => {
  const [selectIngredient, setSelectIngredient] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<AddedItem[]>([]);
  const [allItems, setAllItems] = useState<Option[]>([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        setIsLoadingIngredients(true);
        setFetchError(null);
        const data = await fetchApi<ApiResponse>(
          "/admin/stock/ingredients/historic"
        );
        const formattedOptions: Option[] = data.ingredient.map(
          (ingredient) => ({
            value: ingredient._id,
            label: ingredient.name,
          })
        );
        setAllItems(formattedOptions);
      } catch (error) {
        if (error instanceof Error) {
          setFetchError(`Erro ao carregar ingredientes: ${error.message}`);
        } else {
          setFetchError("Ocorreu um erro desconhecido.");
        }
      } finally {
        setIsLoadingIngredients(false);
      }
    };
    loadIngredients();
  }, []);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Formulário enviado com:", {
      items: addedItems,
    });
  };

  const handleAddItem = () => {
    if (!selectIngredient) return;
    const itemToAdd = allItems.find((item) => item.value === selectIngredient);
    if (!itemToAdd) return;

    const alreadyAdded = addedItems.some(
      (item) => item.value === itemToAdd.value
    );
    if (alreadyAdded) {
      alert("Este item já foi adicionado!");
      setSelectIngredient(null);
      return;
    }

    setAddedItems((prevItems) => [...prevItems, { ...itemToAdd, quantity: 1 }]);
    setSelectIngredient(null);
  };

  const handleRemoveItem = (valueToRemove: string) => {
    setAddedItems((prevItems) =>
      prevItems.filter((item) => item.value !== valueToRemove)
    );
  };

  const handleQuantityChange = (
    itemValue: string,
    direction: "increment" | "decrement"
  ) => {
    setAddedItems((prevItems) =>
      prevItems.map((item) => {
        if (item.value === itemValue) {
          let newQuantity =
            direction === "increment" ? item.quantity + 1 : item.quantity - 1;
          if (newQuantity < 1) {
            newQuantity = 1;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  return (
    <>
      <Form onSubmit={onSubmit} className="flex w-full gap-6">
        <div className="flex flex-col w-full gap-2">
          <h2 className="text-blue-500 text-center">
            -- Informações gerais --
          </h2>
          <hr className="border-default-200" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-sm text-default-700">Local da compra</h2>
              <Select
                name="locationOfPurchase"
                isRequired
                label="Escolha o local da compra"
                className="flex w-full"
                variant="bordered"
                size="sm"
              >
                {location_buy.map((list) => (
                  <SelectItem key={list.key}>{list.label}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="grid grid-cols-1 w-full gap-2">
              <div className="flex flex-col gap-2">
                <h2 className="text-sm text-default-700">Data da compra</h2>
                <Input
                  isRequired
                  labelPlacement="outside"
                  name="dateOfPurchase"
                  type="date"
                  variant="bordered"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="w-full border-default" />

        <div className="flex flex-col w-full gap-2">
          <h2 className="text-blue-500 text-center">
            -- Mercadoria comprada --
          </h2>
          <hr className="border-default-200" />
          <div className="flex flex-col gap-2">
            <h2 className="text-sm">Ingredientes</h2>
            <div>
              <div className="flex items-end gap-2">
                <div className="flex-grow">
                  {isLoadingIngredients ? (
                    <div className="h-10 flex items-center px-3 rounded-lg border border-default-200">
                      <p className="text-sm text-default-600">
                        Carregando ingredientes...
                      </p>
                    </div>
                  ) : fetchError ? (
                    <div className="h-10 flex items-center px-3 rounded-lg border border-danger">
                      <p className="text-sm text-danger">{fetchError}</p>
                    </div>
                  ) : (
                    <SearchableDropdown
                      options={allItems}
                      value={selectIngredient}
                      onChange={setSelectIngredient}
                      placeholder="Escolha um ingrediente..."
                      searchPlaceholder="Buscar..."
                    />
                  )}
                </div>
                <Button
                  onClick={handleAddItem}
                  disabled={!selectIngredient || isLoadingIngredients}
                  className="shrink-0 bg-success"
                >
                  <span className="invert">
                    <Plus className="h-5 w-5" />
                  </span>
                </Button>
              </div>

              {addedItems.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-sm">Itens Adicionados:</h2>
                  <ul className="mt-2 space-y-2">
                    {addedItems.map((item) => (
                      <li
                        key={item.value}
                        className="flex justify-between items-center py-2 px-4 bg-base rounded-2xl shadow-sm"
                      >
                        <span className="text-default-700 font-medium">
                          {item.label}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() =>
                                handleQuantityChange(item.value, "decrement")
                              }
                              size="sm"
                              className="flex rounded-full data-[disabled]:opacity-50 bg-red-400"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium w-6 text-center tabular-nums">
                              {item.quantity}
                            </span>
                            <Button
                              onClick={() =>
                                handleQuantityChange(item.value, "increment")
                              }
                              size="sm"
                              className="flex rounded-full bg-success-400"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            onClick={() => handleRemoveItem(item.value)}
                            size="sm"
                            className="rounded-full !p-1 bg-base"
                          >
                            <Trash className="h-5 w-5" />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          variant="solid"
          className="bg-primary flex w-full"
        >
          <span className="invert">Adicionar mercadoria</span>
        </Button>
      </Form>
    </>
  );
};
