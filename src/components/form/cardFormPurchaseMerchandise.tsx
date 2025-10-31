import { Form, Input, Button } from "@heroui/react";
import { Plus } from "lucide-react";
import { Select, SelectItem } from "@heroui/react";

export const select_list_location_buy = [
  { key: "1", label: "Local a" },
  { key: "2", label: "Local b" },
];

export const select_list_category = [
  { key: "1", label: "Taças" },
  { key: "2", label: "Doces" },
];

export const select_list_ingredient = [
  { key: "1", label: "Morango" },
  { key: "2", label: "Banana" },
];

export const CardFormPurchaseMerchandise = () => {
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  return (
    <>
      <Form onSubmit={onSubmit} className="flex w-full">
        <div className="flex flex-col w-full gap-2">
          <h2>Informações gerais</h2>
          <hr className="border-default-200" />
          <div>
            {/* Local da compra */}
            <div className="hidden">
              <h2 className="text-sm">Local da compra</h2>
              <Select
                name="locationOfPurchase"
                isRequired
                label="Escolha o local da compra"
                className="flex w-full"
                variant="bordered"
                size="sm"
              >
                {select_list_location_buy.map((list) => (
                  <SelectItem key={list.key}>{list.label}</SelectItem>
                ))}
              </Select>
            </div>
            <div className="grid grid-cols-1 w-full gap-2">
              <div>
                <h2 className="text-sm">Data da compra</h2>
                <Input
                  isRequired
                  labelPlacement="outside"
                  name="dateOfPurchase"
                  type="date"
                  variant="bordered"
                  size="lg"
                />
              </div>
              {/* Categoria */}
              <div className="hidden">
                <h2 className="text-sm">Categoria</h2>
                <Select
                  name="categoryOfPurchase"
                  isRequired
                  label="Escolha..."
                  className="flex w-full"
                  variant="bordered"
                  size="sm"
                >
                  {select_list_category.map((list) => (
                    <SelectItem key={list.key}>{list.label}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h2>Mercadoria comprada</h2>
          <hr className="border-default-200" />
          <div>
            <h2 className="text-sm">Ingrediente</h2>
            {/* Mudar para input */}
            <Select
              isRequired
              label="Informe o ingrediente"
              className="flex w-full"
              variant="bordered"
              size="sm"
            >
              {select_list_ingredient.map((list) => (
                <SelectItem key={list.key}>{list.label}</SelectItem>
              ))}
            </Select>
            <Button className="text-danger" variant="light">
              <div className="flex justify-center items-center gap-2">
                <Plus size={18} />
                Adicionar novo ingrediente
              </div>
            </Button>
          </div>
        </div>
        <div>Lista novo ingrediente...</div>
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
