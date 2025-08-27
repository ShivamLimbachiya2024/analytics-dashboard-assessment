import { useQuery } from "@tanstack/react-query";
import { useEVData } from "./useEVData";

export const useEVDataQuery = () => {
  const { getAllEVDataAPI } = useEVData();

  return useQuery({
    queryKey: ["evData"],
    queryFn: async () => {
      const result = await getAllEVDataAPI();

      if (result.error) {
        throw new Error(result.error);
      }

      if (!result.data) {
        throw new Error("No data received");
      }

      return result.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
