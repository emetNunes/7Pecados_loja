import DefaultLayout from "@/layouts/default";
import { CardDefaultValue } from "@/components/cardDefaultValue";
import { CardAccess } from "@/components/cardAccess";
import CardHistoryTransaction from "@/components/ui/dashboard/cardHistoryTransaction";
import {
  Wallet,
  BanknoteArrowUp,
  BanknoteArrowDown,
  Feather,
} from "lucide-react";
import { BarChartComponent } from "@/components/charts/barChartComponent.jsx";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useEffect, useMemo } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const formatMoney = (value = 0) =>
  `R$ ${Number(value).toFixed(2).replace(".", ",")}`;



export default  function IndexPage() {
  const navigate = useNavigate();

  const { data: finance } = useSWR(
    "https://api-7pecados.onrender.com/admin/finance/historic/filter",
    fetcher,
  );

  const {
    data: inventory,
    isLoading,
    error,
  } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/inventory/historic",
    fetcher,
  );


  let dataInventory = [];
  if(!isLoading && !error){
    dataInventory = inventory.formatted;
  }
  
  return (
    
    <DefaultLayout>
      <>
      { isLoading ? 
        (
        <div className="flex items-center justify-center h-[60vh] text-default-500">
          Carregando dashboard…
        </div>
        ) : (
          <main className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-10">
            <section className="flex flex-col gap-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CardDefaultValue
                  icon={<Wallet size={40} />}
                  description="Saldo total"
                  type_color="primary"
                >
                  {formatMoney(finance?.balance)}
                </CardDefaultValue>

                <CardDefaultValue
                  icon={<BanknoteArrowUp size={40} />}
                  description="Entradas"
                  type_color="secondary"
                >
                  {formatMoney(finance?.totalEntrances)}
                </CardDefaultValue>

                <CardDefaultValue
                  icon={<BanknoteArrowDown size={40} />}
                  description="Saídas"
                  type_color="tertiary"
                >
                  {formatMoney(finance?.totalExits)}
                </CardDefaultValue>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Evolução do saldo</h2>
                <BarChartComponent data={dataInventory} />
              </div>

              <div className="flex flex-col">
                <h2 className="text-2xl font-bold">Histórico de transações</h2>
                <CardHistoryTransaction />
              </div>

            </section>

            <aside className="flex flex-col gap-6">
              <CardAccess
                title="Modo atendimento"
                description="Inicie uma nova venda ou atendimento ao cliente"
                action={() => navigate("/service", { replace: true })}
                actionLabel="Iniciar atendimento"
              />
            </aside>
          </main>
        )}
      </>
    </DefaultLayout>
  );
}
