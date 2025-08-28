import React from "react";
import { LineChart } from "../common";
import type { YearTrendData } from "../../types/evData";

interface YearTrendChartProps {
  data: YearTrendData[];
}

const YearTrendChart: React.FC<YearTrendChartProps> = ({ data }) => {
  const tooltipFormatter = (value: number, name?: string): [string, string] => [
    `${value.toLocaleString()} vehicles`,
    name === "count" ? "Total" : name || "",
  ];

  const lines = [
    {
      dataKey: "count",
      stroke: "#8b5cf6",
      strokeWidth: 4,
      name: "Total",
    },
    {
      dataKey: "BEV",
      stroke: "#22c55e",
      strokeWidth: 3,
      name: "Battery Electric",
    },
    {
      dataKey: "PHEV",
      stroke: "#f59e0b",
      strokeWidth: 3,
      name: "Plug-in Hybrid",
    },
  ];

  return (
    <LineChart
      data={data}
      title="EV Adoption Trend by Year"
      subtitle="Growth patterns over time"
      height={400}
      lines={lines}
      xAxisKey="year"
      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      tooltipFormatter={tooltipFormatter}
      showLegend={true}
    />
  );
};

export default YearTrendChart;