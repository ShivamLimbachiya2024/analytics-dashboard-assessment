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
        filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))"
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-3 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-4"></div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Vehicle Type Distribution
          </h3>
          <p className="text-sm text-gray-600">BEV vs PHEV breakdown</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            stroke="#ffffff"
            strokeWidth={3}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                style={{
                  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
                }}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              backdropFilter: "blur(8px)",
            }}
            formatter={(value: number, name: string) => [
              `${value.toLocaleString()} vehicles`,
              name.replace("(BEV)", "").replace("(PHEV)", "").trim(),
            ]}
          />
          <Legend
            wrapperStyle={{ 
              paddingTop: "20px",
              fontSize: "14px",
              fontWeight: "500"
            }}
            formatter={(value: string) =>
              value
                .replace("Battery Electric Vehicle (BEV)", "Battery Electric (BEV)")
                .replace("Plug-in Hybrid Electric Vehicle (PHEV)", "Plug-in Hybrid (PHEV)")
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VehicleTypeChart;
