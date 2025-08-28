import React from "react";
import { BarChart } from "../common";
import type { ChartDataPoint } from "../../types/evData";

interface ManufacturerChartProps {
  data: ChartDataPoint[];
}

const ManufacturerChart: React.FC<ManufacturerChartProps> = ({ data }) => {
  return (
    <BarChart
      data={data}
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
