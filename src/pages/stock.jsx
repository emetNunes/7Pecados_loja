import DefaultLayout from "@/layouts/default";
import { CardDefaultValue } from "@/components/cardDefaultValue";
import { CardAccess } from "@/components/cardAccess";
import { CardHistory } from "@/components/cardHistory";
import { Wallet, BanknoteArrowUp, Lollipop, IceCreamBowl } from "lucide-react";
import { PieChartComponent } from "@/components/charts/pieChartComponent";
import { CardStatusOrders } from "@/components/cardStatusOrders";
import { CardMakePurchase } from "@/components/cardMakePurchase";
import { DrawerComponent } from "@/components/drawerComponent";
import { CardFormPurchaseMerchandise } from "@/components/cardFormPurchaseMerchandise";
import { useState } from "react";
import { Button } from "@heroui/button";
import AddMerchandiseDialog from "@/components/stockComponents/AddMerchandiseDialog";
import AddIngredientDialog from "@/components/stockComponents/AddIngredientDialog";
import AddProductDialog from "@/components/stockComponents/AddProductDialog";
// Lista para cardHistory
const database_list = [
  {
    key: "1",
    description: "Categoria - Fruta",
    info: "20 unidades",
    value: "R$ 6,00",
    title: "Morango",
    type_movement: "buy",
  },
  {
    key: "2",
    description: "Categoria - Perecível",
    info: "1 unidade",
    value: "R$ 12,00",
    title: "Nutella",
    type_movement: "buy",
  },
  {
    key: "3",
    description: "Categoria - Fruta",
    info: "20 unidades",
    value: "R$ 6,00",
    title: "Morango",
    type_movement: "buy",
  },
  {
    key: "4",
    description: "Categoria - Perecível",
    info: "1 unidade",
    value: "R$ 12,00",
    title: "Nutella",
    type_movement: "buy",
  },
  {
    key: "5",
    description: "Categoria - Fruta",
    info: "20 unidades",
    value: "R$ 6,00",
    title: "Morango",
    type_movement: "buy",
  },
  {
    key: "6",
    description: "Categoria - Perecível",
    info: "1 unidade",
    value: "R$ 12,00",
    title: "Nutella",
    type_movement: "buy",
  },
  {
    key: "7",
    description: "Categoria - Fruta",
    info: "20 unidades",
    value: "R$ 6,00",
    title: "Morango",
    type_movement: "buy",
  },
];

const columns_list = [
  {
    key: "description",
    label: "Produto",
  },
  {
    key: "info",
    label: "Quantidade",
  },
  {
    key: "value",
    label: "Preço",
  },
];

// Lista para o componente cardStatusOrders
const listInfo_list = [
  {
    id: "1",
    icon: <IceCreamBowl />,
    title: "Taça do amor",
    description: "Categoria - Taça",
    status: "",
    info: "20/Mês",
  },
  {
    id: "2",
    icon: <IceCreamBowl />,
    title: "Taça da perdi.",
    description: "Categoria - Taça",
    status: "",
    info: "15/Mês",
  },
  {
    id: "3",
    icon: <Lollipop />,
    title: "Bolo de Brownwin",
    description: "Categoria - Docess",
    status: "",
    info: "10/Mês",
  },
  {
    id: "4",
    icon: <IceCreamBowl />,
    title: "Taça do amor",
    description: "Categoria - Taça",
    status: "",
    info: "10/Mês",
  },
  {
    id: "5",
    icon: <IceCreamBowl />,
    title: "Taça do amor",
    description: "Categoria - Taça",
    status: "",
    info: "10/Mês",
  },
];

export default function StockPage() {
  let icon_size = 48;
  let icon_stroke = 2;

  const [addMerchandiseDialogIsOpen, setAddMerchandiseDialog] = useState(false);
  const [addIngredientDialogIsOpen, setAddIngredientDialog] = useState(false);
  const [addProductDialogIsOpen, setAddProductDialog] = useState(false);

  return (
    <DefaultLayout>
      <main className="w-full grid grid-cols-[auto_380px] gap-8">
        <section className="flex flex-col gap-12 max-w-[1380px]">
          <div className="flex gap-6">
            <CardDefaultValue
              icon={<Wallet size={icon_size} strokeWidth={icon_stroke} />}
              description={"Total de produtos"}
              type_color={"primary"}
            >
              123 produtos
            </CardDefaultValue>
            <CardDefaultValue
              icon={
                <BanknoteArrowUp size={icon_size} strokeWidth={icon_stroke} />
              }
              description={"Total de vendas"}
              type_color={"secondary"}
            >
              +100 vendas
            </CardDefaultValue>
            <div className="flex w-full">
              <CardAccess
                title="Adicione mercadoria em seu estoque"
                description="Clique no botão abaixo para cadastrar mercadoria"
                clickbutton={
                  <Button
                    className="bg-primary text-base rounded-xl"
                    onPress={() => setAddMerchandiseDialog(true)}
                  >
                    <span className="default invert">Adicionar mercadoria</span>
                  </Button>
                }
              ></CardAccess>
              <AddMerchandiseDialog
                isOpen={addMerchandiseDialogIsOpen}
                handleClose={() => {
                  setAddMerchandiseDialog(false);
                }}
              />
            </div>
          </div>
          <div>
            <label className="text-2xl font-bold">Informação do estoque</label>
            <div className="flex flex-row gap-6 mt-4">
              <PieChartComponent />
              <div className="flex flex-col justify-between gap-6">
                <CardAccess
                  title="Adicione ingrediente"
                  description="Clique no botão abaixo para cadastrar um ingrediente"
                  clickbutton={
                    <Button
                      className="bg-primary text-base rounded-xl"
                      onPress={() => setAddIngredientDialog(true)}
                    >
                      <span className="default invert">
                        Adicionar ingredientes
                      </span>
                    </Button>
                  }
                ></CardAccess>
                <AddIngredientDialog
                  isOpen={addIngredientDialogIsOpen}
                  handleClose={() => {
                    setAddIngredientDialog(false);
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-2xl font-bold">
              Inventário de mercadoria
            </label>
            <CardHistory database={database_list} columns={columns_list} />
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <CardAccess
            title="Quer cadastrar um novo produto?"
            description="Clique no botão abaixo para efetuar o cadastro de um novo produto para venda"
            clickbutton={
              <Button
                className="bg-primary text-base rounded-xl"
                onPress={() => setAddProductDialog(true)}
              >
                <span className="default invert">Adicionar Produto</span>
              </Button>
            }
          ></CardAccess>

          <AddProductDialog
            isOpen={addProductDialogIsOpen}
            handleClose={() => {
              setAddProductDialog(false);
            }}
          />

          <CardStatusOrders
            listInfo={listInfo_list}
            title="Ingredients cadastrados"
            description="Últimos 5 pedidos"
          />
        </section>
      </main>
    </DefaultLayout>
  );
}
