import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AreaChartProps {
  data: Array<{ name: string; value: number }>;
  title: string;
  subtitle?: string;
  height?: number;
  gradientId?: string;
  gradientColors?: { start: string; end: string };
  strokeColor?: string;
  className?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  title,
  subtitle,
  height = 400,
  gradientId = "areaGradient",
  gradientColors = { start: "#06b6d4", end: "#0ea5e9" },
  strokeColor = "#0284c7",
  className = "",
}) => {
  return (
    <div
      className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      <div className="flex items-center mb-6 justify-center">
        <div
          className="w-3 h-8 rounded-full mr-4"
          style={{
            background: `linear-gradient(to bottom, ${gradientColors.start}, ${gradientColors.end})`,
          }}
        ></div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b7280" }} />
          <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            fill={`url(#${gradientId})`}
            strokeWidth={2}
            dot={true}
          />
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={gradientColors.start}
                stopOpacity={0.8}
              />
              <stop
                offset="100%"
                stopColor={gradientColors.end}
                stopOpacity={0.2}
              />
            </linearGradient>
          </defs>
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;
