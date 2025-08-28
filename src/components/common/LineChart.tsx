import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface LineConfig {
  dataKey: string;
  stroke: string;
  strokeWidth?: number;
  name: string;
  strokeDasharray?: string;
}

interface LineChartProps {
  data: Array<{ [key: string]: any }>;
  title: string;
  subtitle?: string;
  height?: number;
  lines: LineConfig[];
  xAxisKey: string;
  margin?: { top: number; right: number; left: number; bottom: number };
  tooltipFormatter?: (value: number, name?: string) => [string, string];
  showLegend?: boolean;
  className?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  subtitle,
  height = 400,
  lines,
  xAxisKey,
  margin = { top: 20, right: 30, left: 20, bottom: 20 },
  tooltipFormatter,
  showLegend = true,
  className = "",
}) => {
  const defaultTooltipFormatter = (value: number, name?: string): [string, string] => [
    `${value.toLocaleString()} vehicles`,
    name || "",
  ];

  return (
    <div className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 hover:shadow-2xl transition-all duration-300 ${className}`}>
      <div className="flex items-center mb-6">
        <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full mr-4"></div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={margin}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
          <XAxis 
            dataKey={xAxisKey} 
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
            formatter={tooltipFormatter || defaultTooltipFormatter}
          />
          {showLegend && (
            <Legend 
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "14px",
                fontWeight: "500"
              }}
            />
          )}
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.stroke}
              strokeWidth={line.strokeWidth || (index === 0 ? 4 : 3)}
              strokeDasharray={line.strokeDasharray}
              dot={{ 
                fill: line.stroke, 
                strokeWidth: index === 0 ? 3 : 2, 
                r: index === 0 ? 6 : 4, 
                filter: `drop-shadow(0 2px 4px ${line.stroke}30)` 
              }}
              name={line.name}
              activeDot={{ 
                r: index === 0 ? 8 : 6, 
                stroke: line.stroke, 
                strokeWidth: 2, 
                fill: "#ffffff" 
              }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;