import DefaultLayout from "@/layouts/default";
import { CardDefaultValue } from "@/components/cardDefaultValue";
import { CardAccess } from "@/components/cardAccess";
import { CardHistory } from "@/components/cardHistory";
import { Wallet, BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";
import { BarChartComponent } from "@/components/charts/barChartComponent";
import { CardStatusOrders } from "@/components/cardStatusOrders";

export default function StockPage() {
  let icon_size = 48;
  let icon_stroke = 2;

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
            <CardDefaultValue
              icon={
                <BanknoteArrowDown size={icon_size} strokeWidth={icon_stroke} />
              }
              description={"Efetuar compra"}
              type_color={"tertiary"}
            >
              de mercadoria
            </CardDefaultValue>
          </div>
          <div>
            <label className="text-2xl font-bold">Informação do estoque</label>
            <div>
              <BarChartComponent />
            </div>
          </div>
          <div>
            <label className="text-2xl font-bold">
              Inventário de mercadoria
            </label>
            <CardHistory />
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <CardAccess
            title="Quer cadastrar um novo produto?"
            description="Clique no botão abaixo para efetuar o cadastro de um novo produto para venda"
          >
            Cadastrar produto
          </CardAccess>
          <CardStatusOrders></CardStatusOrders>
        </section>
      </main>
    </DefaultLayout>
  );
}
