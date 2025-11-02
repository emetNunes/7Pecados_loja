import { Form, Input, Button } from "@heroui/react";
import { Plus } from "lucide-react";
import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { SearchableDropdown } from "./searchableDropdown";

import { useIngredients } from "../hooks/useIngredients";
import { AddedItemsList } from "./addedItemsList";

type Option = {
  value: string;
  label: string;
};

type AddedItem = Option & {
  quantity: number;
};

export const location_buy = [{ key: "1", label: "Estoque principal" }];

export const CardFormPurchaseMerchandise = () => {
  const {
    ingredients: allItems,
    isLoading: isLoadingIngredients,
    error: fetchError,
  } = useIngredients();

  const [selectIngredient, setSelectIngredient] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<AddedItem[]>([]);

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

              <AddedItemsList
                items={addedItems}
                onRemoveItem={handleRemoveItem}
                onQuantityChange={handleQuantityChange}
              />
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
