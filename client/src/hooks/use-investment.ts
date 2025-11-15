import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, API_ENDPOINTS } from "@/lib/api-client";

export interface InvestmentRequest {
  propertyId: string;
  amount: number;
  shares?: number;
}

export interface InvestmentResponse {
  success: boolean;
  data: {
    investmentId: string;
    propertyId: string;
    amount: number;
    shares: number;
    status: string;
    investedAt: string;
    message: string;
  };
}

// Create investment
export function useCreateInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InvestmentRequest) => {
      return apiClient.post<InvestmentResponse>(API_ENDPOINTS.INVEST, data);
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["my-investments"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
    },
  });
}
