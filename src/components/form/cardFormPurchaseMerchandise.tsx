import { Form, Input, Button } from "@heroui/react";
import { Plus, Trash } from "lucide-react";
import { Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { SearchableDropdown } from "../searchableDropdown";

type Option = {
  value: string;
  label: string;
};

const allItems: Option[] = [
  { value: "banana", label: "Banana" },
  { value: "morango", label: "Morango" },
];

export const location_buy = [{ key: "1", label: "Estoque principal" }];

export const select_list_category = [
  { key: "1", label: "Taças" },
  { key: "2", label: "Doces" },
];

export const CardFormPurchaseMerchandise = () => {
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const [selectedFramework, setSelectedFramework] = useState<string | null>(
    null
  );

  const [addedItems, setAddedItems] = useState<Option[]>([]);

  const handleAddItem = () => {
    if (!selectedFramework) return;

    const itemToAdd = allItems.find((item) => item.value === selectedFramework);
    if (!itemToAdd) return;

    const alreadyAdded = addedItems.some(
      (item) => item.value === itemToAdd.value
    );
    if (alreadyAdded) {
      alert("Este item já foi adicionado!");
      setSelectedFramework(null);
      return;
    }

    setAddedItems((prevItems) => [...prevItems, itemToAdd]);
    setSelectedFramework(null);
  };

  const handleRemoveItem = (valueToRemove: string) => {
    setAddedItems((prevItems) =>
      prevItems.filter((item) => item.value !== valueToRemove)
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
            {/* Local da compra */}
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
                  <SearchableDropdown
                    options={allItems}
                    value={selectedFramework}
                    onChange={setSelectedFramework}
                    placeholder="Escolha um ingrediente..."
                    searchPlaceholder="Buscar..."
                  />
                </div>
                <Button
                  onClick={handleAddItem}
                  disabled={!selectedFramework}
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
                        <Button
                          onClick={() => handleRemoveItem(item.value)}
                          size="sm"
                          className="rounded-full !p-1 bg-base"
                        >
                          <Trash />
                        </Button>
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
