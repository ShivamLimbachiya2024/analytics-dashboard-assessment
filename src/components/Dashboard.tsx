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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Electric Vehicle Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Comprehensive analysis of EV population data
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Data Source</p>
              <p className="text-sm font-medium text-gray-700">
                EV Population Dataset
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <KeyMetrics data={processedData} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ManufacturerChart data={manufacturerData} />
          <VehicleTypeChart data={vehicleTypeData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <YearTrendChart data={yearTrendData} />
          <RangeDistribution data={rangeData} />
        </div>

        <div className="grid grid-cols-1 gap-8">
          <GeographicChart data={countyData} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-500 text-sm">
            <p>Electric Vehicle Analytics Dashboard</p>
            <p className="mt-1">
              Analyzing {processedData.totalVehicles.toLocaleString()} electric
              vehicles
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
