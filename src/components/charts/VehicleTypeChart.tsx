import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { ChartDataPoint } from "../../types/evData";

interface VehicleTypeChartProps {
  data: ChartDataPoint[];
}

const COLORS = ["#22c55e", "#3b82f6"];

const VehicleTypeChart: React.FC<VehicleTypeChartProps> = ({ data }) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percentage,
  }: any) => {
    const RADIAN = Math.PI / 180;
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
        fontSize={14}
        fontWeight="bold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Vehicle Type Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value: number, name: string) => [
              `${value.toLocaleString()} vehicles`,
              name.replace("(BEV)", "").replace("(PHEV)", "").trim(),
            ]}
          />
          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            formatter={(value: string) =>
              value
                .replace("Battery Electric Vehicle (BEV)", "BEV")
                .replace("Plug-in Hybrid Electric Vehicle (PHEV)", "PHEV")
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VehicleTypeChart;
