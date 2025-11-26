import { Cell, Pie, PieChart, Legend } from "recharts";

const data = [
  { name: "Entradas", value: 1000 },
  { name: "Saídas", value: 200 },
];

const RADIAN = Math.PI / 180;
const COLORS = ["#591C27", "#A62940"];

const renderCustomizedLabel = ({
  cx = 0,
  cy = 0,
  midAngle = 0,
  innerRadius = 0,
  outerRadius = 0,
  percent = 0,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const PieChartComponent = ({ isAnimationActive = true }) => {
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
      </PieChart>
    </div>
  );
};
