import DefaultLayout from "@/layouts/default";
import { CardDefaultValue } from "@/components/cardDefaultValue";
import { CardAccess } from "@/components/cardAccess";
import { CardHistory } from "@/components/cardHistory";
import { Wallet, BanknoteArrowUp, BanknoteArrowDown, User } from "lucide-react";
import { BarChartComponent } from "@/components/charts/barChartComponent";
import { CardStatusOrders } from "@/components/cardStatusOrders";

// Lista para cardHistory
const database_list = [
  {
    key: "1",
    description: "Rua tal, nº 100",
    info: "22/08/2025",
    value: "R$ 80,96",
    title: "Feita na loja",
    type_movement: "entrance",
  },
  {
    key: "2",
    description: "Rua tal, nº 100",
    info: "22/08/2025",
    value: "R$ 80,96",
    title: "Feita na loja",
    type_movement: "exit",
  },
  {
    key: "3",
    description: "Rua tal, nº 100",
    info: "22/08/2025",
    value: "R$ 80,96",
    title: "Feita na loja",
    type_movement: "exit",
  },
  {
    key: "4",
    description: "Rua tal, nº 100",
    info: "22/08/2025",
    value: "R$ 80,96",
    title: "Feita na loja",
    type_movement: "exit",
  },
  {
    key: "5",
    description: "Rua tal, nº 100",
    info: "22/08/2025",
    value: "R$ 80,96",
    title: "Feita na loja",
    type_movement: "entrance",
  },
  {
    key: "6",
    description: "Rua tal, nº 100",
    info: "22/08/2025",
    value: "R$ 80,96",
    title: "Feita na loja",
    type_movement: "entrance",
  },
  {
    key: "7",
    description: "Rua tal, nº 100",
    info: "22/08/2025",
    value: "R$ 80,96",
    title: "Feita na loja",
    type_movement: "entrance",
  },
];

const columns_list = [
  {
    key: "description",
    label: "Resumo",
  },
  {
    key: "info",
    label: "Data",
  },
  {
    key: "value",
    label: "Valor",
  },
];

// Lista para o componente cardStatusOrders
const listInfo_list = [
  {
    id: "1",
    icon: <User />,
    title: "Maria Jose",
    description: "Rua das Jacas, n°160",
    status: "Finalizado em 15min",
    info: "R$245,90",
  },
  {
    id: "2",
    icon: <User />,
    title: "Maria Jose",
    description: "Rua das Jacas, n°160",
    status: "Finalizado em 15min",
    info: "R$245,90",
  },
  {
    id: "3",
    icon: <User />,
    title: "Maria Jose",
    description: "Rua das Jacas, n°160",
    status: "Finalizado em 15min",
    info: "R$245,90",
  },
  {
    id: "4",
    icon: <User />,
    title: "Maria Jose",
    description: "Rua das Jacas, n°160",
    status: "Finalizado em 15min",
    info: "R$245,90",
  },
  {
    id: "5",
    icon: <User />,
    title: "Maria Jose",
    description: "Rua das Jacas, n°160",
    status: "Finalizado em 15min",
    info: "R$245,90",
  },
];

export default function IndexPage() {
  let icon_size = 48;
  let icon_stroke = 2;

  return (
    <DefaultLayout>
      <main className="w-full grid grid-cols-[auto_380px] gap-8">
        <section className="flex flex-col gap-12 max-w-[1380px]">
          <div className="flex gap-6">
            <CardDefaultValue
              icon={<Wallet size={icon_size} strokeWidth={icon_stroke} />}
              description={"Saldo Total"}
              type_color={"primary"}
            >
              R$720,00
            </CardDefaultValue>
            <CardDefaultValue
              icon={
                <BanknoteArrowUp size={icon_size} strokeWidth={icon_stroke} />
              }
              description={"Entradas"}
              type_color={"secondary"}
            >
              R$1.400,00
            </CardDefaultValue>
            <CardDefaultValue
              icon={
                <BanknoteArrowDown size={icon_size} strokeWidth={icon_stroke} />
              }
              description={"Saídas"}
              type_color={"tertiary"}
            >
              R$452,00
            </CardDefaultValue>
          </div>
          <div>
            <label className="text-2xl font-bold">Extrato recente</label>
            <div>
              <BarChartComponent />
            </div>
          </div>
          <div>
            <label className="text-2xl font-bold">Histórico de conta</label>
            <CardHistory database={database_list} columns={columns_list} />
          </div>
        </section>
        <section className="flex flex-col gap-6">
          <CardAccess
            title="Vai efetuar uma venda em sua loja?"
            description="Clique no botão abaixo para iniciar o modo atendimento"
          >
            Modo atendimento
          </CardAccess>
          <CardStatusOrders listInfo={listInfo_list} />
        </section>
      </main>
    </DefaultLayout>
  );
}
