import { useState } from "react";

export const useFetch = (): [
  (url: string) => Promise<{ data?: any; error?: any }>,
  { isLoading: boolean }
] => {
  // States
  const [isLoading, setIsLoading] = useState(false);

  const fetchRequest = async (url: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const result = await response.text();
      
      return { data: result };
    } catch (error: any) {
      return {
        error: error?.message || error || "An error occurred while fetching data"
      };
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchRequest, { isLoading }];
};