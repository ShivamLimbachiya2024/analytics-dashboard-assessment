import React, { Suspense, lazy } from "react";
import KeyMetrics from "./metrics/KeyMetrics";
import type { EVData } from "../types/evData";
import ChartCard from "./cards/ChardCard";
import {
  BarChart,
  Car,
  DollarSign,
  LineChart,
  MapPin,
  PieChart,
  TrendingUp,
  Zap,
} from "lucide-react";
import ChartLoader from "./cards/ChartLoader";

// Lazy load all charts using barrel exports
const ManufacturerChart = lazy(() =>
  import("./charts").then((module) => ({ default: module.ManufacturerChart }))
);
const VehicleTypeChart = lazy(() =>
  import("./charts").then((module) => ({ default: module.VehicleTypeChart }))
);
const YearTrendChart = lazy(() =>
  import("./charts").then((module) => ({ default: module.YearTrendChart }))
);
const RangeDistribution = lazy(() =>
  import("./charts").then((module) => ({ default: module.RangeDistribution }))
);
const GeographicChart = lazy(() =>
  import("./charts").then((module) => ({ default: module.GeographicChart }))
);
const AdoptionTrendChart = lazy(() =>
  import("./charts").then((module) => ({ default: module.AdoptionTrendChart }))
);
const RangeVsPriceChart = lazy(() =>
  import("./charts").then((module) => ({ default: module.RangeVsPriceChart }))
);
const CountyEVTypeChart = lazy(() =>
  import("./charts").then((module) => ({ default: module.CountyEVTypeChart }))
);

interface ChartsWrapperProps {
  data: EVData[];
}

const ChartsWrapper: React.FC<ChartsWrapperProps> = ({ data }) => {
  return (
    <>
      {/* Key Metrics */}
      <div className="mb-16">
        <KeyMetrics data={data} />
      </div>

      <div className="space-y-16">
        {/* Primary Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 lg:gap-12 xl:gap-16">
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <ChartCard title="Top Manufacturers" icon={BarChart}>
                <ManufacturerChart data={data} />
              </ChartCard>
            </Suspense>
          </div>

          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <ChartCard title="Vehicle Types" icon={PieChart}>
                <VehicleTypeChart data={data} />
              </ChartCard>
            </Suspense>
          </div>
        </div>
        <div className="transform hover:scale-[1.02] transition-all duration-300">
          <Suspense fallback={<ChartLoader />}>
            <ChartCard title="Year Trends" icon={LineChart}>
              <YearTrendChart data={data} />
            </ChartCard>
          </Suspense>
        </div>
        {/* Secondary Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10 lg:gap-12 xl:gap-16">
          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <ChartCard title="Range Distribution" icon={Zap}>
                <RangeDistribution data={data} />
              </ChartCard>
            </Suspense>
          </div>

          <div className="transform hover:scale-[1.02] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <ChartCard title="Adoption Trends" icon={TrendingUp}>
                <AdoptionTrendChart data={data} />
              </ChartCard>
            </Suspense>
          </div>
        </div>
        <div className="transform hover:scale-[1.02] transition-all duration-300">
          <Suspense fallback={<ChartLoader />}>
            <ChartCard title="County EV Types" icon={Car}>
              <CountyEVTypeChart data={data} />
            </ChartCard>
          </Suspense>
        </div>

        {/* Full-Width Charts with Enhanced Spacing */}
        <div className="space-y-16">
          <div className="transform hover:scale-[1.01] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <ChartCard
                title="Geographic Distribution"
                icon={MapPin}
                fullWidth
              >
                <GeographicChart data={data} />
              </ChartCard>
            </Suspense>
          </div>

          <div className="transform hover:scale-[1.01] transition-all duration-300">
            <Suspense fallback={<ChartLoader />}>
              <ChartCard
                title="Range vs Price Analysis"
                icon={DollarSign}
                fullWidth
              >
                <RangeVsPriceChart data={data} />
              </ChartCard>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartsWrapper;
