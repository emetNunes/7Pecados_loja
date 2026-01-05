import { Cell, Pie, PieChart, Legend, ResponsiveContainer } from "recharts";
import useSWR from "swr";

const COLORS = ["#A62940", "#591C27"];
const fetcher = (url) => fetch(url).then((res) => res.json());

export const PieChartComponent = ({ isAnimationActive = true }) => {
  const { data, error, isLoading } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/inventory/historic",
    fetcher
  );

  if (isLoading) {
    return (
      <div className="h-[320px] w-full flex items-center justify-center rounded-2xl bg-base shadow-2xs">
        <span className="text-sm text-default-500">Carregando gráfico…</span>
      </div>
    );
  }

  if (error || !data?.transactions) {
    return (
      <div className="h-[320px] w-full flex items-center justify-center rounded-2xl bg-base shadow-2xs">
        <span className="text-sm text-primary">Erro ao carregar dados</span>
      </div>
    );
  }

  const entrances = data.transactions.filter(
    (t) => t.type === "entrace"
  ).length;

  const exits = data.transactions.filter((t) => t.type === "exit").length;

  const chartData = [
    { name: "Entradas", value: entrances },
    { name: "Saídas", value: exits },
  ].filter((item) => item.value > 0);

  // 🔴 Se não houver dados, não renderiza o Pie
  if (chartData.length === 0) {
    return (
      <div className="h-[320px] w-full flex flex-col items-center justify-center rounded-2xl bg-base shadow-2xs gap-2">
        <span className="text-sm font-medium text-default-600">
          Nenhuma movimentação
        </span>
        <span className="text-xs text-default-400">
          Não há entradas ou saídas registradas
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-base shadow-2xs p-6">
      <h3 className="text-lg font-bold mb-1">Movimentação do estoque</h3>
      <p className="text-sm text-default-500 mb-4">Entradas x Saídas</p>

      {/* ALTURA FIXA E SEGURA */}
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={4}
              isAnimationActive={isAnimationActive}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
