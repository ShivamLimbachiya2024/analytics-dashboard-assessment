import React from "react";
import { BarChart } from "../common";
import type { EVData } from "../../types/evData";
import { getRangeDistributionCounts, getRangeDistributionData } from "../../utils/dataParser";

interface RangeDistributionProps {
  data: EVData[];
}

const RangeDistribution: React.FC<RangeDistributionProps> = ({ data }) => {
  // Process data within the component
  const rangeDistribution = getRangeDistributionCounts(data);
  const chartData = getRangeDistributionData(rangeDistribution);

  const tooltipFormatter = (value: number): [string, string] => [
    `${value.toLocaleString()} vehicles`,
    "Count",
  ];

  return (
    <BarChart
      data={chartData}
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