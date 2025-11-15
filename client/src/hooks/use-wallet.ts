import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, API_ENDPOINTS } from "@/lib/api-client";

export interface WalletBalance {
  availableBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  pendingAmount: number;
  currency: string;
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'payout';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface WalletResponse {
  success: boolean;
  data: WalletBalance;
}

export interface TransactionsResponse {
  success: boolean;
  data: WalletTransaction[];
}

export interface RechargeRequest {
  amount: number;
  method: 'bank_transfer' | 'card' | 'other';
  description?: string;
}

export interface RechargeResponse {
  success: boolean;
  data: {
    transactionId: string;
    amount: number;
    status: string;
    message: string;
  };
}

// Get wallet balance
export function useWalletBalance() {
  const hasAuth = !!localStorage.getItem('zaron_token') || !!localStorage.getItem('zaron_user');

  return useQuery<WalletBalance>({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      const response = await apiClient.get<WalletResponse>(API_ENDPOINTS.WALLET_BALANCE);
      return response.data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    enabled: hasAuth,
    retry: false,
  });
}

// Get wallet transactions
export function useWalletTransactions() {
  const hasAuth = !!localStorage.getItem('zaron_token') || !!localStorage.getItem('zaron_user');

  return useQuery<WalletTransaction[]>({
    queryKey: ["wallet-transactions"],
    queryFn: async () => {
      const response = await apiClient.get<TransactionsResponse>(API_ENDPOINTS.WALLET_TRANSACTIONS);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: hasAuth,
    retry: false,
  });
}

// Recharge wallet
export function useRechargeWallet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RechargeRequest) => {
      return apiClient.post<RechargeResponse>(API_ENDPOINTS.WALLET_RECHARGE, data);
    },
    onSuccess: () => {
      // Invalidate wallet data to refetch
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
    },
  });
}
