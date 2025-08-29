import React from "react";
import StackedBarChart from "../common/StackedBarChart";
import type { EVData } from "../../types/evData";
import { getStackedBarData } from "../../utils/dataParser";

type Props = {
  data: EVData[];
};

const CountyEVTypeChart: React.FC<Props> = ({ data }) => {
  const chartData = getStackedBarData(data);
  // format → [{ name: "King", BEV: 1234, PHEV: 456 }]
  return (
    <StackedBarChart
      data={chartData}
      keys={["BEV", "PHEV"]}
      title="County-wise EV Distribution"
      subtitle="BEV vs PHEV by county"
      colors={["#22c55e", "#3b82f6"]}
      height={400}
      className="rounded-[15px]"
    />
  );
};

export default CountyEVTypeChart;
