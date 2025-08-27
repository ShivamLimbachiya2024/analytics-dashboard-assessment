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

interface ManufacturerChartProps {
  data: ChartDataPoint[];
}

const ManufacturerChart: React.FC<ManufacturerChartProps> = ({ data }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Top Manufacturers
          </h3>
          <p className="text-sm text-gray-600">Leading EV brands by volume</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: '#6b7280' }}
            angle={-45}
            textAnchor="end"
            height={80}
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
          />
          <Bar 
            dataKey="value" 
            fill="url(#manufacturerGradient)" 
            radius={[8, 8, 0, 0]}
            stroke="#3b82f6"
            strokeWidth={1}
          />
          <defs>
            <linearGradient id="manufacturerGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ManufacturerChart;
