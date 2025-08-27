export interface EVData {
  vin: string;
  county: string;
  city: string;
  state: string;
  postalCode: string;
  modelYear: number;
  make: string;
  model: string;
  electricVehicleType: 'Battery Electric Vehicle (BEV)' | 'Plug-in Hybrid Electric Vehicle (PHEV)';
  cafvEligibility: string;
  electricRange: number;
  baseMSRP: number;
  legislativeDistrict: number;
  dolVehicleId: string;
  vehicleLocation: string;
  electricUtility: string;
  censusTract: string;
}

export interface ProcessedEVData {
  totalVehicles: number;
  averageRange: number;
  manufacturerCounts: Record<string, number>;
  vehicleTypeCounts: {
    BEV: number;
    PHEV: number;
  };
  yearDistribution: Record<number, number>;
  countyDistribution: Record<string, number>;
  cafvEligibilityStats: Record<string, number>;
  rangeDistribution: {
    '0-50': number;
    '51-100': number;
    '101-200': number;
    '201-300': number;
    '300+': number;
  };
}

export interface ChartDataPoint {
  name: string;
  value: number;
  percentage?: number;
}

export interface YearTrendData {
  year: number;
  count: number;
  BEV: number;
  PHEV: number;
}