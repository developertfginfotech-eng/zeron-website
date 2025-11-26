import { useQuery } from "@tanstack/react-query";
import { apiClient, API_ENDPOINTS } from "@/lib/api-client";

interface PortfolioSummary {
  totalInvestments: number;
  totalCurrentValue: number;
  totalReturns: number;
  propertyCount: number;
  unrealizedGains: number;
  realizedGains: number;
  monthlyIncome: number;
  portfolioGrowthPercentage: number;
  totalReturnsPercentage: number;
  totalReturnPercentage: number;
}

// Get user's portfolio summary
export function usePortfolio() {
  const hasAuth = !!localStorage.getItem('zaron_token') || !!localStorage.getItem('zaron_user');

  return useQuery<PortfolioSummary>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: { summary: PortfolioSummary } }>(API_ENDPOINTS.PORTFOLIO_SUMMARY);
      // Extract summary from nested response structure
      return response.data.summary;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: hasAuth,
    retry: false, // Don't retry on auth errors
  });
}
