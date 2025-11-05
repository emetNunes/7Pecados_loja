import { Cell, Pie, PieChart, PieLabelRenderProps, Legend } from "recharts";

const data = [
  { name: "Entradas", value: 1000 },
  { name: "Saídas", value: 200 },
];

const RADIAN = Math.PI / 180;
const COLORS = ["#591C27", "#A62940"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  // @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  // @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  // @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      // @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {/* @ts-expect-error type unknown https://github.com/recharts/recharts/issues/6380 */}
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export const PieChartComponent = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => {
  return (
    <div className="bg-base rounded-xl shadow-2xs w-full flex flex-row items-center justify-center">
      <PieChart
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "500px",
          maxHeight: "320px",
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          fill="#8884d8"
          dataKey="value"
          isAnimationActive={isAnimationActive}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>{" "}
    </div>
  );
};
