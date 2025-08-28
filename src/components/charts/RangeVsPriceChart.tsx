import React from "react";
import type { EVData } from "../../types/evData";
import ScatterChart from "../common/ScatterChart";
import { getScatterChartData } from "../../utils/dataParser";

type Props = {
  evData: EVData[];
};

const RangeVsPriceChart: React.FC<Props> = ({ evData }) => {
  const chartData = getScatterChartData(evData);
  // format → [{ x: 250, y: 40000, z: 123, name: "Tesla Model 3" }]
  return (
    <ScatterChart
      data={chartData}
      title="Range vs Price"
      subtitle="Vehicle electric range vs MSRP"
      xLabel="Electric Range (miles)"
      yLabel="Base MSRP ($)"
      height={400}
    />
  );
};

export default RangeVsPriceChart;
