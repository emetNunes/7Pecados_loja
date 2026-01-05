import DefaultLayout from "@/layouts/default";
import { CardDefaultValue } from "@/components/cardDefaultValue";
import { CardAccess } from "@/components/cardAccess";
import { CardHistory } from "@/components/stockComponents/cardHistory";
import { Wallet, BanknoteArrowUp } from "lucide-react";
import { PieChartComponent } from "@/components/charts/pieChartComponent";
import { CardStatusOrders } from "@/components/stockComponents/cardIngredients";

import AddMerchandiseDialog from "@/components/stockComponents/AddMerchandiseDialog";
import AddIngredientDialog from "@/components/stockComponents/AddIngredientDialog";
import AddProductDialog from "@/components/stockComponents/AddProductDialog";

import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

/* ================================
   Configuração da tabela
================================ */
const columns_list = [
  { key: "description", label: "Produto" },
  { key: "prices", label: "Preços" },
];

export default function StockPage() {
  const [addMerchandiseOpen, setAddMerchandiseOpen] = useState(false);
  const [addIngredientOpen, setAddIngredientOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);

  const { data: productsData, isLoading } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/products/historic",
    fetcher
  );

  const products = productsData?.product ?? [];
  const totalProducts = productsData?.total ?? 0;

  const iconSize = 44;
  const iconStroke = 2;

  return (
    <DefaultLayout>
      <main className="mx-auto w-full max-w-[1600px] px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-8">
          {/* ======================
              CONTEÚDO PRINCIPAL
          ====================== */}
          <section className="flex flex-col gap-12">
            {/* MÉTRICAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <CardDefaultValue
                icon={<Wallet size={iconSize} strokeWidth={iconStroke} />}
                description="Total de produtos"
                type_color="primary"
              >
                {totalProducts} produtos
              </CardDefaultValue>

              <CardDefaultValue
                icon={
                  <BanknoteArrowUp size={iconSize} strokeWidth={iconStroke} />
                }
                description="Total de vendas"
                type_color="secondary"
              >
                +100 vendas
              </CardDefaultValue>

              <CardAccess
                title="Adicionar mercadoria"
                description="Cadastre novas entradas no estoque"
                action={() => setAddMerchandiseOpen(true)}
                actionLabel="Adicionar mercadoria"
              />
            </div>

            {/* ESTOQUE */}
            <section className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-default-800 dark:text-default-100">
                Informações do estoque
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-[580px_1fr] gap-6 items-start">
                <PieChartComponent />

                <CardAccess
                  title="Adicionar ingrediente"
                  description="Cadastre novos ingredientes no estoque"
                  action={() => setAddIngredientOpen(true)}
                  actionLabel="Adicionar ingrediente"
                />
              </div>
            </section>

            {/* PRODUTOS */}
            <section className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold text-default-800 dark:text-default-100">
                Produtos cadastrados
              </h2>

              <CardHistory
                database={products}
                columns={columns_list}
                isLoading={isLoading}
              />
            </section>
          </section>

          {/* ======================
              SIDEBAR
          ====================== */}
          <aside className="flex flex-col gap-6">
            <CardAccess
              title="Cadastrar produto"
              description="Crie novos produtos para venda"
              action={() => setAddProductOpen(true)}
              actionLabel="Adicionar produto"
            />

            <CardStatusOrders
              title="Ingredientes cadastrados"
              description="Últimos ingredientes adicionados"
            />
          </aside>
        </div>
      </main>

      {/* ======================
          DIALOGS
      ====================== */}
      <AddMerchandiseDialog
        isOpen={addMerchandiseOpen}
        handleClose={() => setAddMerchandiseOpen(false)}
      />

      <AddIngredientDialog
        isOpen={addIngredientOpen}
        handleClose={() => setAddIngredientOpen(false)}
      />

      <AddProductDialog
        isOpen={addProductOpen}
        handleClose={() => setAddProductOpen(false)}
      />
    </DefaultLayout>
  );
}
