import DefaultLayout from "@/layouts/default";
import { CardDefaultValue } from "@/components/cardDefaultValue";
import { CardAccess } from "@/components/cardAccess";
import CardProduct from "@/components/ui/stock/card_products";

import {
  Wallet,
  BanknoteArrowUp,
  CirclePlus,
  ScanBarcode,
  AppleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { PieChartComponent } from "@/components/charts/pieChartComponent";
import CardIngredients from "@/components/ui/stock/cardIngredients";

import AddMerchandiseDialog from "@/components/ui/stock/AddMerchandiseDialog";
import AddProductDialog from "@/components/ui/stock/AddProductDialog";

import useSWR from "swr";

export default function StockPage() {
  const [addMerchandiseOpen, setAddMerchandiseOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);

  // const products = productsData?.product ?? [];

  return (
    <DefaultLayout>
      <main className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-10">
        <section className="flex flex-col gap-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardDefaultValue
              icon={<ScanBarcode size={44} strokeWidth={2} />}
              description="Total de produtos"
              type_color="primary"
            >
              {1} produtos
            </CardDefaultValue>
          </div>

          {/* <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-default-800 dark:text-default-100">
              Informações do estoque
            </h2>
            <PieChartComponent />
          </section> */}

          <section className="flex flex-col gap-4">
            <h2 className="flex gap-3 text-2xl font-bold text-default-800 dark:text-white">
              Produtos cadastrados
              <CirclePlus
                className="mt-[7px] hover:text-primary"
                onClick={() => setAddProductOpen(true)}
              />
            </h2>

            <CardProduct />
          </section>
        </section>

        <aside className="flex flex-col gap-6">
          <CardAccess
            title="Adicionar mercadoria"
            description="Cadastre novas entradas no estoque"
            action={() => setAddMerchandiseOpen(true)}
            actionLabel="Adicionar mercadoria"
          />

          <CardIngredients />
        </aside>
      </main>

      <AddMerchandiseDialog
        isOpen={addMerchandiseOpen}
        handleClose={() => setAddMerchandiseOpen(false)}
      />
      <AddProductDialog
        isOpen={addProductOpen}
        handleClose={() => setAddProductOpen(false)}
      />
    </DefaultLayout>
  );
}
