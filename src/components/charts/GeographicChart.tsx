import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ChartDataPoint } from "../../types/evData";

interface GeographicChartProps {
  data: ChartDataPoint[];
}

const GeographicChart: React.FC<GeographicChartProps> = ({ data }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-center mb-8">
        <div className="w-3 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full mr-4"></div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800">
            Top Counties by EV Count
          </h3>
          <p className="text-sm text-gray-600 mt-1">Geographic distribution of electric vehicles</p>
        </div>
        <div className="w-3 h-8 bg-gradient-to-b from-cyan-500 to-blue-600 rounded-full ml-4"></div>
      </div>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 40, left: 40, bottom: 100 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            angle={-45}
            textAnchor="end"
            height={100}
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
            formatter={(value: number) => [
              `${value.toLocaleString()} vehicles`,
              "Count",
            ]}
          />
          <Bar 
            dataKey="value" 
            fill="url(#geographicGradient)" 
            radius={[8, 8, 0, 0]}
            stroke="#0891b2"
            strokeWidth={1}
          />
          <defs>
            <linearGradient id="geographicGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GeographicChart;
