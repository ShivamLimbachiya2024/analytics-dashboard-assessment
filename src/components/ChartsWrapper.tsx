import React from "react";
import KeyMetrics from "./metrics/KeyMetrics";
import ManufacturerChart from "./charts/ManufacturerChart";
import VehicleTypeChart from "./charts/VehicleTypeChart";
import YearTrendChart from "./charts/YearTrendChart";
import RangeDistribution from "./charts/RangeDistribution";
import GeographicChart from "./charts/GeographicChart";
import type { EVData } from "../types/evData";
import {
  processEVData,
  getTopManufacturers,
  getVehicleTypeData,
  getYearTrendData,
  getTopCounties,
  getRangeDistributionData,
} from "../utils/dataParser";

interface ChartsWrapperProps {
  data: EVData[];
}

const ChartsWrapper: React.FC<ChartsWrapperProps> = ({ data }) => {
  // Process the raw data
  const processedData = processEVData(data);

  // Generate chart-specific data
  const manufacturerData = getTopManufacturers(
    processedData.manufacturerCounts,
    10
  );
  const vehicleTypeData = getVehicleTypeData(processedData.vehicleTypeCounts);
  const yearTrendData = getYearTrendData(data);
  const countyData = getTopCounties(processedData.countyDistribution, 10);
  const rangeData = getRangeDistributionData(processedData.rangeDistribution);

  return (
    <>
      {/* Key Metrics */}
      <div className="mb-16">
        <KeyMetrics data={processedData} />
      </div>

      {/* Charts Grid */}
      <div className="space-y-16">
        {/* First Row - Main Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <ManufacturerChart data={manufacturerData} />
          </div>
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <VehicleTypeChart data={vehicleTypeData} />
          </div>
        </div>

        {/* Second Row - Trend Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <YearTrendChart data={yearTrendData} />
          </div>
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <RangeDistribution data={rangeData} />
          </div>
        </div>

        {/* Third Row - Geographic Chart */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl transform hover:scale-[1.01] transition-all duration-300">
            <GeographicChart data={countyData} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-16 border-t border-gray-200/50">
        <div className="text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-10 shadow-lg border border-gray-200/50 max-w-lg mx-auto">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Electric Vehicle Analytics Dashboard
            </h3>
            <p className="text-gray-600 text-lg">
              Analyzing{" "}
              <span className="font-bold text-blue-600">
                {processedData.totalVehicles.toLocaleString()}
              </span>{" "}
              electric vehicles
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ChartsWrapper;
