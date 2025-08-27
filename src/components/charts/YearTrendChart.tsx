import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { YearTrendData } from "../../types/evData";

interface YearTrendChartProps {
  data: YearTrendData[];
}

const YearTrendChart: React.FC<YearTrendChartProps> = ({ data }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full mr-4"></div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            EV Adoption Trend by Year
          </h3>
          <p className="text-sm text-gray-600">Growth patterns over time</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
          <XAxis 
            dataKey="year" 
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#d1d5db' }}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#d1d5db' }}
          />
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
              name === "count" ? "Total" : name,
            ]}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: "20px",
              fontSize: "14px",
              fontWeight: "500"
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8b5cf6"
            strokeWidth={4}
            dot={{ fill: "#8b5cf6", strokeWidth: 3, r: 6, filter: "drop-shadow(0 2px 4px rgba(139, 92, 246, 0.3))" }}
            name="Total"
            activeDot={{ r: 8, stroke: "#8b5cf6", strokeWidth: 2, fill: "#ffffff" }}
          />
          <Line
            type="monotone"
            dataKey="BEV"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ fill: "#22c55e", strokeWidth: 2, r: 4, filter: "drop-shadow(0 2px 4px rgba(34, 197, 94, 0.3))" }}
            name="Battery Electric"
            activeDot={{ r: 6, stroke: "#22c55e", strokeWidth: 2, fill: "#ffffff" }}
          />
          <Line
            type="monotone"
            dataKey="PHEV"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4, filter: "drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))" }}
            name="Plug-in Hybrid"
            activeDot={{ r: 6, stroke: "#f59e0b", strokeWidth: 2, fill: "#ffffff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearTrendChart;
