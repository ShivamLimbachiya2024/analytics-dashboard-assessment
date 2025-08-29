import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface StackedBarChartProps {
  data: Array<{ name: string; [key: string]: number | string }>;
  keys: string[]; // e.g., ["BEV", "PHEV"]
  colors?: string[];
  title: string;
  subtitle?: string;
  height?: number;
  className?: string;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  keys,
  colors = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"],
  title,
  subtitle,
  height = 400,
  className = "",
}) => {
  return (
    <div
      className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      <div className="flex items-center mb-6 justify-center">
        <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
          />
          <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
          <Tooltip />
          <Legend />
          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={colors[index % colors.length]}
              radius={[6, 6, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;
