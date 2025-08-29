import React, { Suspense, lazy } from "react";
import KeyMetrics from "./metrics/KeyMetrics";
import type { EVData } from "../types/evData";

// Lazy load all charts using barrel exports
const ManufacturerChart = lazy(() => import("./charts").then(module => ({ default: module.ManufacturerChart })));
const VehicleTypeChart = lazy(() => import("./charts").then(module => ({ default: module.VehicleTypeChart })));
const YearTrendChart = lazy(() => import("./charts").then(module => ({ default: module.YearTrendChart })));
const RangeDistribution = lazy(() => import("./charts").then(module => ({ default: module.RangeDistribution })));
const GeographicChart = lazy(() => import("./charts").then(module => ({ default: module.GeographicChart })));
const AdoptionTrendChart = lazy(() => import("./charts").then(module => ({ default: module.AdoptionTrendChart })));
const RangeVsPriceChart = lazy(() => import("./charts").then(module => ({ default: module.RangeVsPriceChart })));
const CountyEVTypeChart = lazy(() => import("./charts").then(module => ({ default: module.CountyEVTypeChart })));

interface ChartsWrapperProps {
  data: EVData[];
}

// Loading component for lazy-loaded charts
const ChartLoader: React.FC = () => (
  <div className="flex items-center justify-center h-64 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p className="text-gray-600 text-sm">Loading chart...</p>
    </div>
  </div>
);

const ChartsWrapper: React.FC<ChartsWrapperProps> = ({ data }) => {

  return (
    <>
      {/* Key Metrics */}
      <div className="mb-16">
        <KeyMetrics data={data} />
      </div>

      {/* Charts Grid */}
      <div className="space-y-16">
        {/* First Row - Main Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <ManufacturerChart data={data} />
            </Suspense>
          </div>
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <VehicleTypeChart data={data} />
            </Suspense>
          </div>
        </div>

        {/* Second Row - Trend Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <YearTrendChart data={data} />
            </Suspense>
          </div>
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <RangeDistribution data={data} />
            </Suspense>
          </div>
        </div>

        {/* Third Row - Geographic Chart */}
        <div className="flex justify-center">
          <div className="w-full max-w-6xl transform hover:scale-[1.01] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <GeographicChart data={data} />
            </Suspense>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-6xl transform hover:scale-[1.01] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <AdoptionTrendChart data={data} />
            </Suspense>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-6xl transform hover:scale-[1.01] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <CountyEVTypeChart data={data} />
            </Suspense>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-6xl transform hover:scale-[1.01] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <RangeVsPriceChart data={data} />
            </Suspense>
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
                {data.length.toLocaleString()}
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
