import DefaultLayout from "@/layouts/default";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { ColumnsProduction } from "@/components/columnsProduction";
import { CardProduction } from "@/components/cardProduction";

const list_productions = [
  {
    id: "1251",
    place_to_buy: "Loja",
    name_user: "Nathalia Gomes",
    address: "Rua agostinho Gama - 42",
    type_payment: "Pagamento no cartão",
    total_value: "R$26,58",
    status: "pending",
  },
  {
    id: "1321",
    place_to_buy: "Loja",
    name_user: "Nathalia Gomes",
    address: "Rua agostinho Gama - 42",
    type_payment: "Pagamento no cartão",
    total_value: "R$30,58",
    status: "in_production",
  },
  {
    id: "1344",
    place_to_buy: "Entrega",
    name_user: "Nathalia Gomes",
    address: "Rua agostinho Gama - 42",
    type_payment: "Pagamento no cartão",
    total_value: "R$30,58",
    status: "in_production",
  },
  {
    id: "1322",
    place_to_buy: "Entrega",
    name_user: "Nathalia Gomes",
    address: "Rua agostinho Gama - 42",
    type_payment: "Pagamento no pix",
    total_value: "R$50,58",
    status: "ready",
  },
];

export default function ProductionPage() {
  const pending_list_filter_production = list_productions.filter(
    (production) => production.status === "pending"
  );
  const in_production_list_filter_production = list_productions.filter(
    (production) => production.status === "in_production"
  );
  const ready_list_filter_production = list_productions.filter(
    (production) => production.status === "ready"
  );

  return (
    <DefaultLayout>
      <main className="flex flex-col gap-6">
        <section className="flex gap-4">
          <div className="max-w-[320px]">
            <Input
              className="bg-base shadow-2xl rounded-xl"
              label="Pesquisar Cliente"
              placeholder="Digite aqui..."
              type="email"
              startContent={<Search />}
            />
          </div>
          <div>Botão aqui do lado : )</div>
        </section>
        <section className="grid grid-cols-4">
          <ColumnsProduction
            title={"Pendente"}
            quantityOfItems={"1"}
            type_rounded={"rounded-tl-xl"}
          >
            {pending_list_filter_production.map((element) => (
              <CardProduction
                id={element.id}
                place_to_buy={element.place_to_buy}
                name_user={element.name_user}
                address={element.address}
                type_payment={element.type_payment}
                total_value={element.total_value}
                status={element.status}
              >
                ITEM AQUI
              </CardProduction>
            ))}
          </ColumnsProduction>

          <ColumnsProduction
            title={"Em produção"}
            quantityOfItems={"2"}
            type_rounded={"none"}
          >
            {in_production_list_filter_production.map((element) => (
              <CardProduction
                id={element.id}
                place_to_buy={element.place_to_buy}
                name_user={element.name_user}
                address={element.address}
                type_payment={element.type_payment}
                total_value={element.total_value}
                status={element.status}
              >
                ITEM AQUI
              </CardProduction>
            ))}
          </ColumnsProduction>
          <ColumnsProduction
            title={"Prontos"}
            quantityOfItems={"3"}
            type_rounded={"none"}
          >
            {ready_list_filter_production.map((element) => (
              <CardProduction
                id={element.id}
                place_to_buy={element.place_to_buy}
                name_user={element.name_user}
                address={element.address}
                type_payment={element.type_payment}
                total_value={element.total_value}
                status={element.status}
              >
                ITEM AQUI
              </CardProduction>
            ))}
          </ColumnsProduction>
          <ColumnsProduction
            title={"Entregues"}
            quantityOfItems={"4"}
            type_rounded={"rounded-tr-xl"}
          >
            D
          </ColumnsProduction>
        </section>
      </main>
    </DefaultLayout>
  );
}
