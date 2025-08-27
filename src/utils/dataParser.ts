import Papa from "papaparse";
import type {
  EVData,
  ProcessedEVData,
  ChartDataPoint,
  YearTrendData,
} from "../types/evData";

export const parseCSVData = (csvText: string): EVData[] => {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => {
      // Transform CSV headers to match our interface
      const headerMap: Record<string, string> = {
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
      return headerMap[header] || header;
    },
    transform: (value: string, header: string) => {
      // Transform specific fields to appropriate types
      if (
        [
          "modelYear",
          "electricRange",
          "baseMSRP",
          "legislativeDistrict",
        ].includes(header)
      ) {
        return value === "" ? 0 : parseInt(value, 10);
      }
      return value;
    },
  });

  if (result.errors.length > 0) {
    console.warn("CSV parsing errors:", result.errors);
  }

  return result.data as EVData[];
};

export const processEVData = (data: EVData[]): ProcessedEVData => {
  const totalVehicles = data.length;

  // Calculate average range (excluding 0 values)
  const validRanges = data.filter((item) => item.electricRange > 0);
  const averageRange =
    validRanges.length > 0
      ? Math.round(
          validRanges.reduce((sum, item) => sum + item.electricRange, 0) /
            validRanges.length
        )
      : 0;

  // Manufacturer counts
  const manufacturerCounts: Record<string, number> = {};
  data.forEach((item) => {
    manufacturerCounts[item.make] = (manufacturerCounts[item.make] || 0) + 1;
  });

  // Vehicle type counts
  const vehicleTypeCounts = {
    BEV: data.filter(
      (item) => item.electricVehicleType === "Battery Electric Vehicle (BEV)"
    ).length,
    PHEV: data.filter(
      (item) =>
        item.electricVehicleType === "Plug-in Hybrid Electric Vehicle (PHEV)"
    ).length,
  };

  // Year distribution
  const yearDistribution: Record<number, number> = {};
  data.forEach((item) => {
    yearDistribution[item.modelYear] =
      (yearDistribution[item.modelYear] || 0) + 1;
  });

  // County distribution
  const countyDistribution: Record<string, number> = {};
  data.forEach((item) => {
    countyDistribution[item.county] =
      (countyDistribution[item.county] || 0) + 1;
  });

  // CAFV eligibility stats
  const cafvEligibilityStats: Record<string, number> = {};
  data.forEach((item) => {
    cafvEligibilityStats[item.cafvEligibility] =
      (cafvEligibilityStats[item.cafvEligibility] || 0) + 1;
  });

  // Range distribution
  const rangeDistribution = {
    "0-50": data.filter(
      (item) => item.electricRange >= 0 && item.electricRange <= 50
    ).length,
    "51-100": data.filter(
      (item) => item.electricRange >= 51 && item.electricRange <= 100
    ).length,
    "101-200": data.filter(
      (item) => item.electricRange >= 101 && item.electricRange <= 200
    ).length,
    "201-300": data.filter(
      (item) => item.electricRange >= 201 && item.electricRange <= 300
    ).length,
    "300+": data.filter((item) => item.electricRange > 300).length,
  };

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

export const getTopManufacturers = (
  manufacturerCounts: Record<string, number>,
  limit: number = 10
): ChartDataPoint[] => {
  return Object.entries(manufacturerCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, value]) => ({ name, value }));
};

export const getVehicleTypeData = (vehicleTypeCounts: {
  BEV: number;
  PHEV: number;
}): ChartDataPoint[] => {
  const total = vehicleTypeCounts.BEV + vehicleTypeCounts.PHEV;
  return [
    {
      name: "Battery Electric Vehicle (BEV)",
      value: vehicleTypeCounts.BEV,
      percentage: Math.round((vehicleTypeCounts.BEV / total) * 100),
    },
    {
      name: "Plug-in Hybrid Electric Vehicle (PHEV)",
      value: vehicleTypeCounts.PHEV,
      percentage: Math.round((vehicleTypeCounts.PHEV / total) * 100),
    },
  ];
};

export const getYearTrendData = (data: EVData[]): YearTrendData[] => {
  const yearData: Record<number, { total: number; BEV: number; PHEV: number }> =
    {};

  data.forEach((item) => {
    if (!yearData[item.modelYear]) {
      yearData[item.modelYear] = { total: 0, BEV: 0, PHEV: 0 };
    }
    yearData[item.modelYear].total++;

    if (item.electricVehicleType === "Battery Electric Vehicle (BEV)") {
      yearData[item.modelYear].BEV++;
    } else {
      yearData[item.modelYear].PHEV++;
    }
  });

  return Object.entries(yearData)
    .map(([year, counts]) => ({
      year: parseInt(year),
      count: counts.total,
      BEV: counts.BEV,
      PHEV: counts.PHEV,
    }))
    .sort((a, b) => a.year - b.year);
};

export const getTopCounties = (
  countyDistribution: Record<string, number>,
  limit: number = 10
): ChartDataPoint[] => {
  return Object.entries(countyDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([name, value]) => ({ name, value }));
};

export const getRangeDistributionData = (
  rangeDistribution: Record<string, number>
): ChartDataPoint[] => {
  return Object.entries(rangeDistribution).map(([name, value]) => ({
    name,
    value,
  }));
};
