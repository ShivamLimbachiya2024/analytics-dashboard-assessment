import Papa from "papaparse";
import _ from "lodash";
import type {
  EVData,
  ProcessedEVData,
  ChartDataPoint,
  YearTrendData,
} from "../types/evData";

// Constants for better maintainability
const CSV_HEADER_MAP: Record<string, string> = {
  "VIN (1-10)": "vin",
  County: "county",
  City: "city",
  State: "state",
  "Postal Code": "postalCode",
  "Model Year": "modelYear",
  Make: "make",
  Model: "model",
  "Electric Vehicle Type": "electricVehicleType",
  "Clean Alternative Fuel Vehicle (CAFV) Eligibility": "cafvEligibility",
  "Electric Range": "electricRange",
  "Base MSRP": "baseMSRP",
  "Legislative District": "legislativeDistrict",
  "DOL Vehicle ID": "dolVehicleId",
  "Vehicle Location": "vehicleLocation",
  "Electric Utility": "electricUtility",
  "2020 Census Tract": "censusTract",
};

const NUMERIC_FIELDS = [
  "modelYear",
  "electricRange",
  "baseMSRP",
  "legislativeDistrict",
];

const VEHICLE_TYPES = {
  BEV: "Battery Electric Vehicle (BEV)",
  PHEV: "Plug-in Hybrid Electric Vehicle (PHEV)",
} as const;

/**
 * Parses CSV data and transforms it into EVData array
 */
export const parseCSVData = (csvText: string): EVData[] => {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => CSV_HEADER_MAP[header] || header,
    transform: (value: string, header: string) => {
      if (NUMERIC_FIELDS.includes(header)) {
        return _.isEmpty(value) ? 0 : _.toInteger(value);
      }
      return value;
    },
  });

  if (!_.isEmpty(result.errors)) {
    console.warn("CSV parsing errors:", result.errors);
  }

  return result.data as EVData[];
};

/**
 * Calculates manufacturer distribution from EV data
 */
export const getManufacturerCounts = (data: EVData[]): Record<string, number> => {
  return _.countBy(data, "make");
};

/**
 * Calculates vehicle type distribution from EV data
 */
export const getVehicleTypeCounts = (data: EVData[]): { BEV: number; PHEV: number } => {
  const vehicleTypeGroups = _.groupBy(data, "electricVehicleType");
  return {
    BEV: _.get(vehicleTypeGroups, VEHICLE_TYPES.BEV, []).length,
    PHEV: _.get(vehicleTypeGroups, VEHICLE_TYPES.PHEV, []).length,
  };
};

/**
 * Calculates county distribution from EV data
 */
export const getCountyDistribution = (data: EVData[]): Record<string, number> => {
  return _.countBy(data, "county");
};

/**
 * Calculates range distribution from EV data
 */
export const getRangeDistributionCounts = (data: EVData[]): {
  "0-50": number;
  "51-100": number;
  "101-200": number;
  "201-300": number;
  "300+": number;
} => {
  return {
    "0-50": _.filter(
      data,
      (item) => item.electricRange >= 0 && item.electricRange <= 50
    ).length,
    "51-100": _.filter(
      data,
      (item) => item.electricRange >= 51 && item.electricRange <= 100
    ).length,
    "101-200": _.filter(
      data,
      (item) => item.electricRange >= 101 && item.electricRange <= 200
    ).length,
    "201-300": _.filter(
      data,
      (item) => item.electricRange >= 201 && item.electricRange <= 300
    ).length,
    "300+": _.filter(data, (item) => item.electricRange > 300).length,
  };
};

/**
 * Processes raw EV data and returns key metrics and distributions
 */
export const processEVData = (data: EVData[]): ProcessedEVData => {
  const totalVehicles = data.length;

  // Calculate average range using lodash for better performance
  const averageRange =
    _.chain(data)
      .filter((item) => item.electricRange > 0)
      .meanBy("electricRange")
      .round()
      .value() || 0;

  // Calculate CAFV eligibility stats
  const cafvEligibilityStats = _.countBy(data, "cafvEligibility");
  
  // Convert year distribution keys to numbers
  const yearDistributionRaw = _.countBy(data, "modelYear");
  const yearDistribution: Record<number, number> = {};
  _.forEach(yearDistributionRaw, (count, year) => {
    yearDistribution[_.toInteger(year)] = count;
  });

  // Get distributions using separate functions
  const manufacturerCounts = getManufacturerCounts(data);
  const vehicleTypeCounts = getVehicleTypeCounts(data);
  const countyDistribution = getCountyDistribution(data);
  const rangeDistribution = getRangeDistributionCounts(data);

  return {
    totalVehicles,
    averageRange,
    manufacturerCounts,
    vehicleTypeCounts,
    yearDistribution,
    countyDistribution,
    cafvEligibilityStats,
    rangeDistribution,
  };
};

/**
 * Gets top manufacturers sorted by count
 */
export const getTopManufacturers = (
  manufacturerCounts: Record<string, number>,
  limit: number = 10
): ChartDataPoint[] => {
  return _.chain(manufacturerCounts)
    .toPairs()
    .orderBy([1], ["desc"])
    .take(limit)
    .map(([name, value]) => ({ name, value }))
    .value();
};

/**
 * Transforms vehicle type counts into chart data with percentages
 */
export const getVehicleTypeData = (vehicleTypeCounts: {
  BEV: number;
  PHEV: number;
}): ChartDataPoint[] => {
  const total = _.sum(_.values(vehicleTypeCounts));

  return _.map(vehicleTypeCounts, (count, type) => ({
    name: VEHICLE_TYPES[type as keyof typeof VEHICLE_TYPES],
    value: count,
    percentage: _.round((count / total) * 100),
  }));
};

/**
 * Processes year trend data with vehicle type breakdown
 */
export const getYearTrendData = (data: EVData[]): YearTrendData[] => {
  return _.chain(data)
    .groupBy("modelYear")
    .map((yearData, year) => {
      const vehicleTypeGroups = _.groupBy(yearData, "electricVehicleType");

      return {
        year: _.toInteger(year),
        count: yearData.length,
        BEV: _.get(vehicleTypeGroups, VEHICLE_TYPES.BEV, []).length,
        PHEV: _.get(vehicleTypeGroups, VEHICLE_TYPES.PHEV, []).length,
      };
    })
    .orderBy("year")
    .value();
};

/**
 * Gets top counties sorted by vehicle count
 */
export const getTopCounties = (
  countyDistribution: Record<string, number>,
  limit: number = 10
): ChartDataPoint[] => {
  return _.chain(countyDistribution)
    .toPairs()
    .orderBy([1], ["desc"])
    .take(limit)
    .map(([name, value]) => ({ name, value }))
    .value();
};

/**
 * Transforms range distribution data for chart display
 */
export const getRangeDistributionData = (
  rangeDistribution: Record<string, number>
): ChartDataPoint[] => {
  // Ensure proper ordering of range categories
  const orderedKeys = ["0-50", "51-100", "101-200", "201-300", "300+"];

  return _.chain(orderedKeys)
    .map((key) => ({
      name: key,
      value: rangeDistribution[key] || 0,
    }))
    .value();
};

/**
 * Utility function to get summary statistics
 */
export const getDataSummary = (data: EVData[]) => {
  const validRanges = _.filter(data, (item) => item.electricRange > 0);

  return {
    totalRecords: data.length,
    uniqueManufacturers: _.uniq(_.map(data, "make")).length,
    uniqueCounties: _.uniq(_.map(data, "county")).length,
    yearRange: {
      min: _.minBy(data, "modelYear")?.modelYear || 0,
      max: _.maxBy(data, "modelYear")?.modelYear || 0,
    },
    rangeStats: {
      min: _.minBy(validRanges, "electricRange")?.electricRange || 0,
      max: _.maxBy(validRanges, "electricRange")?.electricRange || 0,
      median:
        _.chain(validRanges)
          .map("electricRange")
          .sort()
          .thru((arr) => {
            const mid = Math.floor(arr.length / 2);
            return arr.length % 2 === 0
              ? (arr[mid - 1] + arr[mid]) / 2
              : arr[mid];
          })
          .value() || 0,
    },
  };
};

/**
 * Advanced filtering function for data exploration
 */
export const filterEVData = (
  data: EVData[],
  filters: {
    manufacturers?: string[];
    vehicleTypes?: string[];
    yearRange?: { min: number; max: number };
    counties?: string[];
    minRange?: number;
    maxRange?: number;
  }
): EVData[] => {
  return _.chain(data)
    .filter((item) => {
      if (
        filters.manufacturers &&
        !_.includes(filters.manufacturers, item.make)
      ) {
        return false;
      }
      if (
        filters.vehicleTypes &&
        !_.includes(filters.vehicleTypes, item.electricVehicleType)
      ) {
        return false;
      }
      if (filters.yearRange) {
        if (
          item.modelYear < filters.yearRange.min ||
          item.modelYear > filters.yearRange.max
        ) {
          return false;
        }
      }
      if (filters.counties && !_.includes(filters.counties, item.county)) {
        return false;
      }
      if (filters.minRange && item.electricRange < filters.minRange) {
        return false;
      }
      if (filters.maxRange && item.electricRange > filters.maxRange) {
        return false;
      }
      return true;
    })
    .value();
};

/**
 * Performance optimized function to get aggregated data by multiple fields
 */
export const getAggregatedData = (
  data: EVData[],
  groupByFields: (keyof EVData)[],
  aggregateField: keyof EVData = "electricRange"
) => {
  return _.chain(data)
    .groupBy((item) => groupByFields.map((field) => item[field]).join("|"))
    .mapValues((group) => ({
      count: group.length,
      avgValue: _.meanBy(group, aggregateField),
      minValue: _.minBy(group, aggregateField)?.[aggregateField] || 0,
      maxValue: _.maxBy(group, aggregateField)?.[aggregateField] || 0,
      items: group,
    }))
    .value();
};

/**
 * Memoized function for expensive calculations
 */
export const getMemoizedProcessedData = _.memoize(
  processEVData,
  (data: EVData[]) => `${data.length}-${_.sumBy(data, "modelYear")}`
);
export function getStackedBarData(evData: EVData[]) {
  // Group by county
  const grouped = _.groupBy(evData, "county");

  return Object.entries(grouped)
    .map(([county, vehicles]) => {
      const bevCount = vehicles.filter(
        (v) => v.electricVehicleType === "Battery Electric Vehicle (BEV)"
      ).length;
      const phevCount = vehicles.filter(
        (v) =>
          v.electricVehicleType === "Plug-in Hybrid Electric Vehicle (PHEV)"
      ).length;

      return {
        county,
        BEV: bevCount,
        PHEV: phevCount,
      };
    })
    .map((item) => ({
      name: item.county, // ✅ add name
      BEV: item.BEV,
      PHEV: item.PHEV,
    }))
    .sort((a, b) => b.BEV + b.PHEV - a.BEV - a.PHEV); // sort by BEV (desc) + PHEV (desc)
}
export const getAreaChartData = (evData: EVData[]) => {
  return _(evData)
    .groupBy("modelYear")
    .map((items, year) => ({
      name: year, // ✅ match chart schema
      value: items.length, // ✅ match chart schema
    }))
    .sortBy("name")
    .value();
};

export function getScatterChartData(evData: EVData[]) {
  // Group by (range, msrp) pair to count duplicates
  const grouped = _.groupBy(evData, (v) => `${v.electricRange}_${v.baseMSRP}`);

  return Object.entries(grouped)
    .map(([key, vehicles]) => {
      const [range, msrp] = key.split("_").map(Number);

      return {
        y: range, // electric range
        x: msrp, // base MSRP
        size: vehicles.length, // bubble size
        make: vehicles[0].make,
        model: vehicles[0].model,
      };
    })
    .filter((item) => item.x > 0) // remove baseMSRP = 0
    .sort((a, b) => a.x - b.x); // sort by range (asc)
}
