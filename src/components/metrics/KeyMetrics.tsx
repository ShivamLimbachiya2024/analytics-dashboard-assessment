import React from "react";
import type { EVData } from "../../types/evData";
import { processEVData } from "../../utils/dataParser";

interface KeyMetricsProps {
  data: EVData[];
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ data }) => {
  // Process the raw data internally
  const processedData = processEVData(data);

  const topManufacturer = Object.entries(processedData.manufacturerCounts).sort(
    ([, a], [, b]) => b - a
  )[0];

  const bevPercentage = Math.round(
    (processedData.vehicleTypeCounts.BEV / processedData.totalVehicles) * 100
  );

  const metrics = [
    {
      title: "Total EVs",
      value: processedData.totalVehicles.toLocaleString(),
      icon: "🚗",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Average Range",
      value: `${processedData.averageRange} miles`,
      icon: "⚡",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Top Manufacturer",
      value: topManufacturer ? topManufacturer[0] : "N/A",
      icon: "🏭",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "BEV Percentage",
      value: `${bevPercentage}%`,
      icon: "🔋",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${metric.color} rounded-lg p-6 text-white shadow-lg transform hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">
                  {metric.title}
                </p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <div className="text-3xl opacity-80">{metric.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default KeyMetrics;
