import React from "react";
import { BarChart } from "../common";
import type { EVData } from "../../types/evData";
import { getCountyDistribution, getTopCounties } from "../../utils/dataParser";

interface GeographicChartProps {
  data: EVData[];
}

const GeographicChart: React.FC<GeographicChartProps> = ({ data }) => {
  // Process data within the component
  const countyDistribution = getCountyDistribution(data);
  const chartData = getTopCounties(countyDistribution, 10);

  const tooltipFormatter = (value: number): [string, string] => [
    `${value.toLocaleString()} vehicles`,
    "Count",
  ];

  return (
    <BarChart
      data={chartData}
      title="Top Counties by EV Count"
      subtitle="Geographic distribution of electric vehicles"
      height={450}
      gradientId="geographicGradient"
      gradientColors={{ start: "#06b6d4", end: "#0891b2" }}
      strokeColor="#0891b2"
      margin={{ top: 20, right: 40, left: 40, bottom: 100 }}
      xAxisHeight={100}
      tooltipFormatter={tooltipFormatter}
      className="rounded-[15px]"
    />
  );
};

export default GeographicChart;
