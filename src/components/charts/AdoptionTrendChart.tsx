import React from "react";
import type { EVData } from "../../types/evData";
import { getAreaChartData } from "../../utils/dataParser";
import AreaChart from "../common/AreaChart";

type Props = {
  data: EVData[];
};

const AdoptionTrendChart: React.FC<Props> = ({ data }) => {
  const chartData = getAreaChartData(data);
  // format → [{ name: 2015, value: 1234 }, { name: 2016, value: 2000 }]

  return (
    <AreaChart
      data={chartData}
      title="EV Adoption Trend"
      subtitle="Growth of registrations over time"
      gradientColors={{ start: "#6366f1", end: "#312e81" }}
      strokeColor="#6366f1"
      height={400}
      className="rounded-[15px]"
    />
  );
};

export default AdoptionTrendChart;
