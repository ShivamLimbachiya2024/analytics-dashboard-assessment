import React from "react";
import { PieChart } from "../common";
import type { ChartDataPoint } from "../../types/evData";

interface VehicleTypeChartProps {
  data: ChartDataPoint[];
}

const VehicleTypeChart: React.FC<VehicleTypeChartProps> = ({ data }) => {
  const tooltipFormatter = (value: number, name?: string): [string, string] => [
    `${value.toLocaleString()} vehicles`,
    name ? name.replace("(BEV)", "").replace("(PHEV)", "").trim() : "",
  ];

  const legendFormatter = (value: string) =>
    value
      .replace("Battery Electric Vehicle (BEV)", "Battery Electric (BEV)")
      .replace("Plug-in Hybrid Electric Vehicle (PHEV)", "Plug-in Hybrid (PHEV)");

  return (
    <PieChart
      data={data}
      title="Vehicle Type Distribution"
      subtitle="BEV vs PHEV breakdown"
      height={400}
      colors={["#22c55e", "#3b82f6"]}
      outerRadius={120}
      innerRadius={40}
      showLabels={true}
      showLegend={true}
      tooltipFormatter={tooltipFormatter}
      legendFormatter={legendFormatter}
    />
  );
};

export default VehicleTypeChart;