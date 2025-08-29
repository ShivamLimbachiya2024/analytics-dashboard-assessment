import React from "react";
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";

interface ScatterChartProps {
  data: Array<{ x: number; y: number; z?: number; name?: string }>;
  title: string;
  subtitle?: string;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  className?: string;
}

const ScatterChart: React.FC<ScatterChartProps> = ({
  data,
  title,
  subtitle,
  height = 400,
  xLabel = "X",
  yLabel = "Y",
  className = "",
}) => {
  return (
    <div
      className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      <div className="flex items-center mb-6 justify-center">
        <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-4"></div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="x"
            name={xLabel}
            tick={{ fontSize: 11, fill: "#6b7280" }}
          />
          <YAxis
            dataKey="y"
            name={yLabel}
            tick={{ fontSize: 11, fill: "#6b7280" }}
          />
          {data.some((d) => d.z) && <ZAxis dataKey="z" range={[60, 400]} />}
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter data={data} fill="#8b5cf6" />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScatterChart;
