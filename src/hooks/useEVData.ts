import type { EVData } from "../types/evData";
import { parseCSVData } from "../utils/dataParser";
import { useFetch } from "./useFetch";

interface EVDataResponse {
  data?: EVData[];
  error?: any;
}

export const useEVData = () => {
  const [fetchRequest, { isLoading }] = useFetch();

  const getAllEVDataAPI = async (): Promise<EVDataResponse> => {
    const { data, error } = await fetchRequest(
      "/Electric_Vehicle_Population_Data.csv"
    );
    if (data && !error) {
      const parsedData = parseCSVData(data);
      return {
        data: parsedData,
        error: null,
      };
    }

    return {
      error: error?.message || error || "An error occurred",
      data: undefined,
    };
  };

  return { getAllEVDataAPI, isLoading };
};
