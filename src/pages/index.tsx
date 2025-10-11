import DefaultLayout from "@/layouts/default";
import { CardDefaultValue } from "@/components/cardDefaultValue";
import { Wallet, BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";

export default function IndexPage() {
  let icon_size = 48;
  let icon_stroke = 2;

  return (
    <DefaultLayout>
      <main className="w-full grid grid-cols-[70%_1fr] gap-8">
        <section className="flex flex-col gap-12">
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
          </div>
          <div>
            <label className="text-2xl font-bold">Histórico de conta</label>
          </div>
        </section>
        <section>OUTRA SECTION</section>
      </main>
    </DefaultLayout>
  );
}
