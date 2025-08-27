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
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        EV Adoption Trend by Year
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value: number, name: string) => [
              `${value.toLocaleString()} vehicles`,
              name === "count" ? "Total" : name,
            ]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ fill: "#22c55e", strokeWidth: 2, r: 4 }}
            name="Total"
          />
          <Line
            type="monotone"
            dataKey="BEV"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
            name="BEV"
          />
          <Line
            type="monotone"
            dataKey="PHEV"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ fill: "#f59e0b", strokeWidth: 2, r: 3 }}
            name="PHEV"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearTrendChart;
