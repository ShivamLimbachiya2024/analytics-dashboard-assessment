import React, { useState, useEffect } from "react";
import KeyMetrics from "./metrics/KeyMetrics";
import ManufacturerChart from "./charts/ManufacturerChart";
import VehicleTypeChart from "./charts/VehicleTypeChart";
import YearTrendChart from "./charts/YearTrendChart";
import RangeDistribution from "./charts/RangeDistribution";
import GeographicChart from "./charts/GeographicChart";
import type { EVData, ProcessedEVData } from "../types/evData";
import {
  parseCSVData,
  processEVData,
  getTopManufacturers,
  getVehicleTypeData,
  getYearTrendData,
  getTopCounties,
  getRangeDistributionData,
} from "../utils/dataParser";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<EVData[]>([]);
  const [processedData, setProcessedData] = useState<ProcessedEVData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Load the CSV file
        const response = await fetch(
          "/data-to-visualize/Electric_Vehicle_Population_Data.csv"
        );
        if (!response.ok) {
          throw new Error("Failed to load data file");
        }

        const csvText = await response.text();
        const parsedData = parseCSVData(csvText);
        const processed = processEVData(parsedData);

        setData(parsedData);
        setProcessedData(processed);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while loading data"
        );
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading EV data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Data
          </h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!processedData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No data available</p>
        </div>
      </div>
    );
  }

  const manufacturerData = getTopManufacturers(
    processedData.manufacturerCounts,
    10
  );
  const vehicleTypeData = getVehicleTypeData(processedData.vehicleTypeCounts);
  const yearTrendData = getYearTrendData(data);
  const countyData = getTopCounties(processedData.countyDistribution, 10);
  const rangeData = getRangeDistributionData(processedData.rangeDistribution);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8 w-[90%] mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 rounded-t-2xl">
          <div className="px-8 sm:px-12 lg:px-16 py-10">
            <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Electric Vehicle Analytics Dashboard
                </h1>
                <p className="text-gray-600 mt-4 text-lg">
                  Comprehensive analysis of EV population data with interactive
                  insights
                </p>
              </div>
              <div className="text-center lg:text-right">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-xl shadow-lg">
                  <p className="text-sm font-medium opacity-90">Data Source</p>
                  <p className="text-lg font-bold">EV Population Dataset</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="bg-white/30 backdrop-blur-sm rounded-b-2xl shadow-lg">
          <div className="px-8 sm:px-12 lg:px-16 py-12">
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
