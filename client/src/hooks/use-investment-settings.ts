import { useQuery } from "@tanstack/react-query";
import type { InvestmentSettings } from "@shared/schema";
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-client";

export function useInvestmentSettings() {
  return useQuery<InvestmentSettings>({
    queryKey: ["investment-settings"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.INVESTMENT_SETTINGS}`);
      if (!response.ok) {
        throw new Error("Failed to fetch investment settings");
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useInvestmentCalculation(investmentAmount: number) {
  return useQuery({
    queryKey: ["investment-calculation", investmentAmount],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CALCULATE_RETURNS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ investmentAmount }),
      });
      if (!response.ok) {
        throw new Error("Failed to calculate investment returns");
      }
      return response.json();
    },
    enabled: investmentAmount > 0,
    staleTime: 5 * 60 * 1000,
  });
}
