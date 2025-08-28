import React from "react";
import { BarChart } from "../common";
import type { ChartDataPoint } from "../../types/evData";

interface RangeDistributionProps {
  data: ChartDataPoint[];
}

const RangeDistribution: React.FC<RangeDistributionProps> = ({ data }) => {
  const tooltipFormatter = (value: number): [string, string] => [
    `${value.toLocaleString()} vehicles`,
    "Count",
  ];

  return (
    <BarChart
      data={data}
      title="Electric Range Distribution"
      subtitle="Vehicle range capabilities"
      height={400}
      gradientId="rangeGradient"
      gradientColors={{ start: "#f97316", end: "#dc2626" }}
      strokeColor="#f97316"
      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      xAxisHeight={60}
      tooltipFormatter={tooltipFormatter}
    />
  );
};

export default RangeDistribution;