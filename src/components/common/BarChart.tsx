import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: Array<{ name: string; value: number; [key: string]: any }>;
  title: string;
  subtitle?: string;
  height?: number;
  gradientId?: string;
  gradientColors?: { start: string; end: string };
  strokeColor?: string;
  xAxisAngle?: number;
  xAxisHeight?: number;
  margin?: { top: number; right: number; left: number; bottom: number };
  tooltipFormatter?: (value: number, name?: string) => [string, string];
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  subtitle,
  height = 400,
  gradientId = "barGradient",
  gradientColors = { start: "#3b82f6", end: "#1d4ed8" },
  strokeColor = "#3b82f6",
  xAxisAngle = -45,
  xAxisHeight = 80,
  margin = { top: 20, right: 30, left: 20, bottom: 80 },
  tooltipFormatter,
  className = "",
}) => {
  const defaultTooltipFormatter = (value: number): [string, string] => [
    `${value.toLocaleString()}`,
    "Count",
  ];

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
        <RechartsBarChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            angle={xAxisAngle}
            textAnchor="end"
            height={xAxisHeight}
            axisLine={{ stroke: "#d1d5db" }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              backdropFilter: "blur(8px)",
            }}
            formatter={tooltipFormatter || defaultTooltipFormatter}
          />
          <Bar
            dataKey="value"
            fill={`url(#${gradientId})`}
            radius={[8, 8, 0, 0]}
            stroke={strokeColor}
            strokeWidth={1}
          />
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientColors.start} />
              <stop offset="100%" stopColor={gradientColors.end} />
            </linearGradient>
          </defs>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
