import React from "react";
import { BarChart } from "../common";
import type { EVData } from "../../types/evData";
import { getManufacturerCounts, getTopManufacturers } from "../../utils/dataParser";

interface ManufacturerChartProps {
  data: EVData[];
}

const ManufacturerChart: React.FC<ManufacturerChartProps> = ({ data }) => {
  // Process data within the component
  const manufacturerCounts = getManufacturerCounts(data);
  const chartData = getTopManufacturers(manufacturerCounts, 10);

  return (
    <BarChart
      data={chartData}
      title="Top Manufacturers"
      subtitle="Leading EV brands by volume"
      height={400}
      gradientId="manufacturerGradient"
      gradientColors={{ start: "#3b82f6", end: "#1d4ed8" }}
      strokeColor="#3b82f6"
      margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
    />
  );
};

export default ManufacturerChart;
