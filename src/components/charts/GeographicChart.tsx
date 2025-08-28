import React from "react";
import { BarChart } from "../common";
import type { ChartDataPoint } from "../../types/evData";

interface GeographicChartProps {
  data: ChartDataPoint[];
}

const GeographicChart: React.FC<GeographicChartProps> = ({ data }) => {
  const tooltipFormatter = (value: number): [string, string] => [
    `${value.toLocaleString()} vehicles`,
    "Count",
  ];

  return (
    <BarChart
      data={data}
      title="Top Counties by EV Count"
      subtitle="Geographic distribution of electric vehicles"
      height={450}
      gradientId="geographicGradient"
      gradientColors={{ start: "#06b6d4", end: "#0891b2" }}
      strokeColor="#0891b2"
      margin={{ top: 20, right: 40, left: 40, bottom: 100 }}
      xAxisHeight={100}
      tooltipFormatter={tooltipFormatter}
    />
  );
};

export default GeographicChart;