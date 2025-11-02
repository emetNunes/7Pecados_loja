import { Form, Input, Button } from "@heroui/react";
import { Plus, Trash, Minus } from "lucide-react";
import { Select, SelectItem } from "@heroui/react";
import { useState, useEffect } from "react";
import { SearchableDropdown } from "./searchableDropdown";
import { fetchApi } from "../services/api";
type IngredientOption = {
  _id: string;
  name: string;
  unitCost: number;
  measurement: string;
};

type AddedItem = IngredientOption & {
  quantity: number;
};
interface ApiIngredient {
  _id: string;
  name: string;
  unitCost: number;
  measurement: string;
}
interface ApiResponse {
  total: number;
  page: number;
  pages: number;
  ingredient: ApiIngredient[];
}

export const location_buy = [{ key: "1", label: "Estoque principal" }];

export const CardFormPurchaseMerchandise = () => {
  const [selectIngredient, setSelectIngredient] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<AddedItem[]>([]);
  // CORRIGIDO: Usa o novo tipo
  const [allItems, setAllItems] = useState<IngredientOption[]>([]);
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
        console.log(data);
        const formattedOptions: IngredientOption[] = data.ingredient.map(
          (ingredient) => ({
            _id: ingredient._id,
            name: ingredient.name,
            unitCost: ingredient.unitCost,
            measurement: ingredient.measurement,
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

  const handleAddItem = () => {
    if (!selectIngredient) return;
    const itemToAdd = allItems.find((item) => item._id === selectIngredient);
    if (!itemToAdd) return;
    const alreadyAdded = addedItems.some((item) => item._id === itemToAdd._id);
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
      prevItems.filter((item) => item._id !== valueToRemove)
    );
  };

  const handleQuantityChange = (
    itemValue: string,
    direction: "increment" | "decrement"
  ) => {
    setAddedItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === itemValue) {
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulário enviado com:", {
      items: addedItems,
    });
  };

  const dropdownOptions = allItems.map((item) => ({
    value: item._id,
    label: item.name,
  }));

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
                      options={dropdownOptions}
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
                        key={item._id}
                        className="flex justify-between items-center py-2 px-4 bg-base rounded-2xl shadow-sm"
                      >
                        <div>
                          <span className="text-default-700 font-medium">
                            {item.name}
                          </span>
                          <p className="text-sm text-default-500">
                            R$ {(item.unitCost * item.quantity).toFixed(2)}
                            <span className="ml-2 text-default-400">
                              (R$ {item.unitCost.toFixed(2)} /{" "}
                              {item.measurement})
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() =>
                                handleQuantityChange(item._id, "decrement")
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
                                handleQuantityChange(item._id, "increment")
                              }
                              size="sm"
                              className="flex rounded-full bg-success-400"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            onClick={() => handleRemoveItem(item._id)}
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
