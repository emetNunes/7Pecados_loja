import DefaultLayout from "@/layouts/default";
import { CardDefaultValue } from "@/components/cardDefaultValue";
import { CardAccess } from "@/components/cardAccess";
import { CardHistory } from "@/components/stockComponents/cardHistory";
import { Wallet, BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";
import { BarChartComponent } from "@/components/charts/barChartComponent.jsx";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useMemo } from "react";

/* ================================
   Helpers
================================ */
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const formatMoney = (value = 0) =>
  `R$ ${Number(value).toFixed(2).replace(".", ",")}`;

/* ================================
   Normalização do retorno da API
================================ */
const normalizeInventoryTransactions = (apiResponse) => {
  if (!apiResponse?.transactions) return [];

  return apiResponse.transactions.map((transaction, index) => {
    const ingredients =
      transaction.ingredients || transaction.ingredientes || [];

    const firstIngredient =
      ingredients[0]?.id_ingredient || ingredients[0]?.id_ingrediente || {};

    const title =
      firstIngredient.name || firstIngredient.nome || "Movimentação de estoque";

    const rawDate =
      transaction.date ||
      transaction.data ||
      transaction.createdAt ||
      transaction.criadoEm;

    const formattedDate = rawDate
      ? new Date(rawDate).toLocaleDateString("pt-BR")
      : "";

    const value = transaction.totalValue || transaction.valorTotal || 0;

    return {
      key: transaction._id || String(index),
      description: transaction.location || "Estoque",
      info: formattedDate,
      value: formatMoney(value),
      title,
      type_movement:
        transaction.financialTransactionID?.type === "entrace"
          ? "entrance"
          : transaction.financialTransactionID?.type || "exit",
    };
  });
};

/* ================================
   Gráfico — Saldo diário
================================ */
const buildDailyBalanceChartData = (database_list) => {
  const dailyMap = {};

  database_list.forEach((item) => {
    const date = item.info;

    const numericValue = Number(
      item.value.replace("R$", "").replace(".", "").replace(",", ".")
    );

    if (!dailyMap[date]) dailyMap[date] = 0;

    dailyMap[date] +=
      item.type_movement === "entrance" ? numericValue : -numericValue;
  });

  return Object.entries(dailyMap).map(([date, saldo]) => ({
    date,
    saldo: Number(saldo.toFixed(2)),
  }));
};

/* ================================
   Tabela
================================ */
const columns_list = [
  { key: "description2", label: "Resumo" },
  { key: "type", label: "Tipo" },
  { key: "info", label: "Data" },
  { key: "value", label: "Valor" },
];

export default function IndexPage() {
  const navigate = useNavigate();

  const { data: finance } = useSWR(
    "https://api-7pecados.onrender.com/admin/finance/historic/filter",
    fetcher
  );

  const {
    data: inventory,
    isLoading,
    error,
  } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/inventory/historic",
    fetcher
  );

  const database = useMemo(
    () => normalizeInventoryTransactions(inventory),
    [inventory]
  );

  const chartData = useMemo(
    () => buildDailyBalanceChartData(database),
    [database]
  );

  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center h-[60vh] text-default-500">
          Carregando dashboard…
        </div>
      </DefaultLayout>
    );
  }

  if (error) {
    return (
      <DefaultLayout>
        <div className="flex items-center justify-center h-[60vh] text-red-500">
          Erro ao carregar dados da dashboard.
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <main className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-10">
        {/* =========================
            CONTEÚDO PRINCIPAL
        ========================= */}
        <section className="flex flex-col gap-12">
          {/* MÉTRICAS */}
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

          {/* GRÁFICO */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Evolução do saldo</h2>
            <BarChartComponent data={chartData} />
          </div>

          {/* TABELA */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Histórico de transações</h2>
            <CardHistory database={database} columns={columns_list} />
          </div>
        </section>

        {/* =========================
            SIDEBAR / CTA
        ========================= */}
        <aside className="flex flex-col gap-6">
          <CardAccess
            title="Modo atendimento"
            description="Inicie uma nova venda ou atendimento ao cliente"
            action={() => navigate("/service", { replace: true })}
            actionLabel="Iniciar atendimento"
          />
        </aside>
      </main>
    </DefaultLayout>
  );
}
