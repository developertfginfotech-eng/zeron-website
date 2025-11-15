import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, API_ENDPOINTS } from "@/lib/api-client";

interface Investment {
  _id: string;
  user: string;
  property: any;
  shares: number;
  amount: number;
  pricePerShare: number;
  status: string;
  maturityDate?: Date;
  exitDate?: Date;
  rentalYieldRate?: number;
  appreciationRate?: number;
  penaltyRate?: number;
  maturityPeriodYears?: number;
  investmentDurationYears?: number;
  createdAt: Date;
}

interface InvestmentSettings {
  rentalYieldPercentage: number;
  appreciationRatePercentage: number;
  maturityPeriodYears: number;
  investmentDurationYears: number;
  earlyWithdrawalPenaltyPercentage: number;
  platformFeePercentage: number;
  minInvestmentAmount: number;
  maxInvestmentAmount: number;
  isActive: boolean;
}

// Get user's investments
export function useMyInvestments() {
  const hasAuth = !!localStorage.getItem('zaron_token') || !!localStorage.getItem('zaron_user');

  return useQuery<Investment[]>({
    queryKey: ["my-investments"],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: Investment[] }>(API_ENDPOINTS.MY_INVESTMENTS);
      // Extract data from response object
      return response.data || [];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: hasAuth,
    retry: false,
  });
}

// Get investment settings
export function useInvestmentSettings() {
  return useQuery<InvestmentSettings>({
    queryKey: ["investment-settings"],
    queryFn: async () => {
      return apiClient.get<InvestmentSettings>(API_ENDPOINTS.INVESTMENT_SETTINGS);
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Calculate investment returns
export function useCalculateReturns(investmentAmount: number) {
  return useQuery({
    queryKey: ["calculate-returns", investmentAmount],
    queryFn: async () => {
      return apiClient.post(API_ENDPOINTS.CALCULATE_RETURNS, { investmentAmount });
    },
    enabled: investmentAmount > 0,
    staleTime: 5 * 60 * 1000,
  });
}

// Make investment mutation
export function useInvest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      propertyId: string;
      shares: number;
      amount: number;
    }) => {
      return apiClient.post(API_ENDPOINTS.INVEST, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-investments"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
}

// Withdraw investment mutation
export function useWithdrawInvestment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (investmentId: string) => {
      return apiClient.post(API_ENDPOINTS.WITHDRAW(investmentId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-investments"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });
}
