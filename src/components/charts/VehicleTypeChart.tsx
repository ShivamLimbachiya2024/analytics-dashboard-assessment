import React from "react";
import { PieChart } from "../common";
import type { EVData } from "../../types/evData";
import { getVehicleTypeCounts, getVehicleTypeData } from "../../utils/dataParser";

interface VehicleTypeChartProps {
  data: EVData[];
}

const VehicleTypeChart: React.FC<VehicleTypeChartProps> = ({ data }) => {
  // Process data within the component
  const vehicleTypeCounts = getVehicleTypeCounts(data);
  const chartData = getVehicleTypeData(vehicleTypeCounts);

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
      data={chartData}
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