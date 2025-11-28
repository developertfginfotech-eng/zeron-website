import { useState, useEffect } from 'react';
import { apiCall, API_ENDPOINTS } from '@/lib/api';

export interface UseInvestorsResult {
  investors: any[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useInvestors(): UseInvestorsResult {
  const [investors, setInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvestors = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all users (investors)
      const usersResponse = await apiCall('/api/users?status=active&role=user&limit=100');

      if (usersResponse.success && usersResponse.data?.users) {
        const users = usersResponse.data.users;

        // Fetch portfolio data for each user
        const investorsWithPortfolio = await Promise.all(
          users.map(async (user) => {
            try {
              // Fetch portfolio data
              const portfolioResponse = await apiCall(`/api/users/${user._id}/portfolio`);

              // Fetch investments data
              const investmentsResponse = await apiCall(`/api/investments?user=${user._id}`);

              const portfolio = portfolioResponse.success ? portfolioResponse.data : {};
              const investmentsList = investmentsResponse.success ? investmentsResponse.data : [];

              return {
                ...user,
                portfolio: {
                  id: user._id,
                  investorId: user._id,
                  totalInvestment: portfolio.summary?.totalInvestments || 0,
                  currentValue: portfolio.summary?.totalCurrentValue || 0,
                  totalReturns: portfolio.summary?.totalReturns || 0,
                  unrealizedGains: portfolio.summary?.unrealizedGains || 0,
                  realizedGains: portfolio.summary?.realizedGains || 0,
                  performanceScore: portfolio.summary?.totalReturnPercentage || 0,
                  lastUpdated: new Date(),
                },
                investments: investmentsList,
                transactions: portfolio.transactions || [],
              };
            } catch (err) {
              console.error(`Failed to fetch portfolio for user ${user._id}:`, err);
              return {
                ...user,
                portfolio: {
                  id: user._id,
                  investorId: user._id,
                  totalInvestment: 0,
                  currentValue: 0,
                  totalReturns: 0,
                  unrealizedGains: 0,
                  realizedGains: 0,
                  performanceScore: 0,
                  lastUpdated: new Date(),
                },
                investments: [],
                transactions: [],
              };
            }
          })
        );

        setInvestors(investorsWithPortfolio);
      } else {
        setInvestors([]);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch investors';
      setError(errorMessage);
      console.error('Error fetching investors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvestors();
  }, []);

  return {
    investors,
    loading,
    error,
    refetch: fetchInvestors,
  };
}
