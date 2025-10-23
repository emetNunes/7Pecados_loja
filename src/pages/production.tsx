import DefaultLayout from "@/layouts/default";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { ColumnsProduction } from "@/components/columnsProduction";
import { CardProduction } from "@/components/cardProduction";
import { ItemCardProduction } from "@/components/itemCardProduction";

const list_productions = [
  {
    id: "1251",
    place_to_buy: "Loja",
    name_user: "Nathalia Gomes",
    address: "Rua agostinho Gama - 42",
    type_payment: "Pagamento no cartão",
    total_value: "R$26,58",
    status: "pending",
    all_list_products: [
      {
        id_product: "0312",
        photo_product: "default",
        title_product: "Taça do amor",
        qtd_product: "1",
        type_product: "Taça",
        total_value_product: "R$26,58",
      },
    ],
  },
  {
    id: "1321",
    place_to_buy: "Loja",
    name_user: "Nathalia Gomes",
    address: "Rua agostinho Gama - 42",
    type_payment: "Pagamento no cartão",
    total_value: "R$30,58",
    status: "in_production",
    all_list_products: [
      {
        id_product: "1312",
        photo_product: "default",
        title_product: "Taça do amor",
        qtd_product: "1",
        type_product: "Taça",
        total_value_product: "R$26,58",
      },
    ],
  },
  {
    id: "1344",
    place_to_buy: "Entrega",
    name_user: "Nathalia Gomes",
    address: "Rua agostinho Gama - 42",
    type_payment: "Pagamento no cartão",
    total_value: "R$30,58",
    status: "in_production",
    all_list_products: [
      {
        id_product: "2312",
        photo_product: "default",
        title_product: "Taça do amor",
        qtd_product: "1",
        type_product: "Taça",
        total_value_product: "R$26,58",
      },
    ],
  },
  {
    id: "1322",
    place_to_buy: "Entrega",
    name_user: "Nathalia Gomes",
    address: "Rua agostinho Gama - 42",
    type_payment: "Pagamento no pix",
    total_value: "R$50,58",
    status: "ready",
    all_list_products: [
      {
        id_product: "4312",
        photo_product: "default",
        title_product: "Taça do amor",
        qtd_product: "1",
        type_product: "Taça",
        total_value_product: "R$26,58",
      },
      {
        id_product: "8812",
        photo_product: "default",
        title_product: "Taça do amor",
        qtd_product: "1",
        type_product: "Taça",
        total_value_product: "R$26,58",
      },
    ],
  },
  {
    id: "1322",
    place_to_buy: "Entrega",
    name_user: "Nathalia Gomes",
    address: "Rua agostinho Gama - 42",
    type_payment: "Pagamento no pix",
    total_value: "R$50,58",
    status: "delivered",
    completion_time: "15 minutos",
    all_list_products: [
      {
        id_product: "4312",
        photo_product: "default",
        title_product: "Taça do amor",
        qtd_product: "1",
        type_product: "Taça",
        total_value_product: "R$26,58",
      },
      {
        id_product: "8812",
        photo_product: "default",
        title_product: "Taça do amor",
        qtd_product: "1",
        type_product: "Taça",
        total_value_product: "R$26,58",
      },
    ],
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
  const delivered_filter_production = list_productions.filter(
    (production) => production.status === "delivered"
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
          {/* Pendente */}
          <ColumnsProduction
            title={"Pendente"}
            quantityOfItems={String(pending_list_filter_production.length)}
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
                <ItemCardProduction list_items={element.all_list_products} />
              </CardProduction>
            ))}
          </ColumnsProduction>
          {/* Em produção */}
          <ColumnsProduction
            title={"Em produção"}
            quantityOfItems={String(
              in_production_list_filter_production.length
            )}
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
                <ItemCardProduction list_items={element.all_list_products} />
              </CardProduction>
            ))}
          </ColumnsProduction>
          {/* Prontos */}
          <ColumnsProduction
            title={"Prontos"}
            quantityOfItems={String(ready_list_filter_production.length)}
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
                <ItemCardProduction list_items={element.all_list_products} />
              </CardProduction>
            ))}
          </ColumnsProduction>
          {/* Entregues */}
          <ColumnsProduction
            title={"Entregues"}
            quantityOfItems={String(delivered_filter_production.length)}
            type_rounded={"rounded-tr-xl"}
          >
            {delivered_filter_production.map((element) => (
              <CardProduction
                id={element.id}
                place_to_buy={element.place_to_buy}
                name_user={element.name_user}
                address={element.address}
                type_payment={element.type_payment}
                total_value={element.total_value}
                status={element.status}
                completion_time={element.completion_time}
              >
                <ItemCardProduction list_items={element.all_list_products} />
              </CardProduction>
            ))}
          </ColumnsProduction>
        </section>
      </main>
    </DefaultLayout>
  );
}
