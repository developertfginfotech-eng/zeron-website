import { useState, useEffect } from 'react'

export interface PortfolioInvestment {
  id: string
  _id: string
  propertyId: string
  propertyName: string
  amount: number
  shares: number
  status: string
  createdAt: string
  investedAt: string
  returns: number
  rentalYieldRate: number
  appreciationRate: number
  penaltyRate: number
  maturityDate: string
  maturityPeriodYears: number
  property?: {
    title: string
    location: {
      city: string
    }
    images?: Array<{
      url: string
      isPrimary: boolean
    }>
  }
}

interface PortfolioState {
  investments: PortfolioInvestment[]
  loading: boolean
  error: string | null
  totalInvested: number
  totalReturns: number
  portfolioValue: number
}

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioState>({
    investments: [],
    loading: true,
    error: null,
    totalInvested: 0,
    totalReturns: 0,
    portfolioValue: 0,
  })

  const getAuthToken = (): string | null => {
    return (
      localStorage.getItem('zaron_token') ||
      localStorage.getItem('authToken') ||
      sessionStorage.getItem('authToken') ||
      sessionStorage.getItem('token')
    )
  }

  // Fetch user's investments
  const fetchInvestments = async () => {
    try {
      const token = getAuthToken()
      if (!token) {
        setPortfolio(prev => ({
          ...prev,
          error: 'Not authenticated',
          loading: false,
        }))
        return
      }

      const response = await fetch('http://13.50.13.193:5000/api/investments/my-investments', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch investments')
      }

      if (result.success && result.data) {
        const investments = result.data

        // Calculate totals
        const totalInvested = investments.reduce((sum: number, inv: PortfolioInvestment) => sum + inv.amount, 0)
        const totalReturns = investments.reduce((sum: number, inv: PortfolioInvestment) => sum + inv.returns, 0)
        const portfolioValue = totalInvested + totalReturns

        setPortfolio({
          investments,
          loading: false,
          error: null,
          totalInvested,
          totalReturns,
          portfolioValue,
        })
      }
    } catch (error: any) {
      console.error('Error fetching portfolio:', error)
      setPortfolio(prev => ({
        ...prev,
        error: error.message,
        loading: false,
      }))
    }
  }

  // Fetch investments on mount
  useEffect(() => {
    fetchInvestments()
  }, [])

  return {
    investments: portfolio.investments,
    loading: portfolio.loading,
    error: portfolio.error,
    totalInvested: portfolio.totalInvested,
    totalReturns: portfolio.totalReturns,
    portfolioValue: portfolio.portfolioValue,
    refetch: fetchInvestments,
  }
}
