import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";


const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;

  return (
    <div
      className="
        rounded-lg px-4 py-2 text-sm font-medium
        bg-base shadow-md border
        border-default-200 dark:border-zinc-700
      "
    >
      <div className="text-default-500 mb-1">{label}</div>

      <div className="font-semibold text-primary">
        {value >= 0 ? "+" : "-"} R${" "}
        {Math.abs(Number(value)).toFixed(2).replace(".", ",")}
      </div>
    </div>
  );
};


const buildDailyBalanceChartData = (database_list) => {
  const dailyMap = {};

  console.log(database_list)

  database_list.forEach((item) => {
    const date = item.info;

    const numericValue = Number(
      item.value.replace("R$", "").replace(".00", "").replace(",", "."),
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


export const BarChartComponent = ({ data = [] }) => {


  
  data = useMemo(
    () => buildDailyBalanceChartData(data),
    [data],
  );
  

  const maxAbsValue = Math.max(...data.map((d) => Math.abs(d.value || 0)), 10);

  
  return (  
    <div className="w-full h-[350px] bg-base px-8 pt-8 pb-6 rounded-xl shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-default-500 uppercase tracking-wide">
          Saldo diário
        </h3>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap={10} 
          barGap={1} 
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 28, 
          }}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            strokeOpacity={0.25}
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickMargin={16} 
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[-maxAbsValue, maxAbsValue]}
            tickFormatter={(v) =>
              `R$ ${Math.abs(v).toFixed(0).replace(".", ",")}`
            }
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fillOpacity: 0.06 }} />

          <Bar
            dataKey="saldo"
            barSize={50}
            radius={[10, 10, 10, 10]}
            minPointSize={6}
            isAnimationActive
          >
            {data.map((entry, index) => {
              const isPositive = entry.saldo >= 0;

              return (
                <Cell
                  key={`cell-${index}`}
                  fill={isPositive ? "#A62940" : "transparent"}
                  stroke="#A62940"
                  strokeWidth={isPositive ? 0 : 2}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
