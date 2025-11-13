import { useState, useEffect } from 'react'

interface WalletBalance {
  availableBalance: number
  pendingWithdrawals: number
  totalDeposits: number
  totalWithdrawals: number
  currency: string
}

interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'payout' | 'investment'
  amount: number
  currency: string
  description: string
  date: string
  status: 'completed' | 'pending' | 'failed'
}

interface WalletState {
  balance: WalletBalance | null
  transactions: Transaction[]
  loading: boolean
  error: string | null
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    balance: null,
    transactions: [],
    loading: true,
    error: null,
  })

  const getAuthToken = (): string | null => {
    return (
      localStorage.getItem('zaron_token') ||
      localStorage.getItem('authToken') ||
      sessionStorage.getItem('authToken') ||
      sessionStorage.getItem('token')
    )
  }

  // Fetch wallet balance
  const fetchBalance = async () => {
    try {
      const token = getAuthToken()
      if (!token) {
        setWallet(prev => ({
          ...prev,
          error: 'Not authenticated',
          loading: false,
        }))
        return
      }

      const response = await fetch('http://13.50.13.193:5000/api/wallet/balance', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch balance')
      }

      setWallet(prev => ({
        ...prev,
        balance: result.data,
        error: null,
      }))
    } catch (error: any) {
      console.error('Error fetching wallet balance:', error)
      setWallet(prev => ({
        ...prev,
        error: error.message,
      }))
    }
  }

  // Fetch transactions
  const fetchTransactions = async (limit = 10, skip = 0, type?: string) => {
    try {
      const token = getAuthToken()
      if (!token) {
        setWallet(prev => ({
          ...prev,
          error: 'Not authenticated',
          loading: false,
        }))
        return
      }

      const params = new URLSearchParams()
      params.append('limit', limit.toString())
      params.append('skip', skip.toString())
      if (type) params.append('type', type)

      const response = await fetch(
        `http://13.50.13.193:5000/api/wallet/transactions?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch transactions')
      }

      setWallet(prev => ({
        ...prev,
        transactions: result.data,
        error: null,
      }))
    } catch (error: any) {
      console.error('Error fetching transactions:', error)
      setWallet(prev => ({
        ...prev,
        error: error.message,
      }))
    } finally {
      setWallet(prev => ({
        ...prev,
        loading: false,
      }))
    }
  }

  // Add funds to wallet
  const addFunds = async (amount: number, method: string = 'bank_transfer', description?: string) => {
    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error('Not authenticated')
      }

      setWallet(prev => ({
        ...prev,
        loading: true,
        error: null,
      }))

      const response = await fetch('http://13.50.13.193:5000/api/wallet/recharge', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          method,
          description,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add funds')
      }

      // Refresh balance and transactions after successful recharge
      await fetchBalance()
      await fetchTransactions()

      return result.data
    } catch (error: any) {
      console.error('Error adding funds:', error)
      setWallet(prev => ({
        ...prev,
        error: error.message,
        loading: false,
      }))
      throw error
    }
  }

  // Withdraw funds from wallet
  const withdrawFunds = async (amount: number, accountDetails?: any, description?: string) => {
    try {
      const token = getAuthToken()
      if (!token) {
        throw new Error('Not authenticated')
      }

      setWallet(prev => ({
        ...prev,
        loading: true,
        error: null,
      }))

      const response = await fetch('http://13.50.13.193:5000/api/wallet/withdraw', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          accountDetails,
          description,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to withdraw funds')
      }

      // Refresh balance and transactions after successful withdrawal
      await fetchBalance()
      await fetchTransactions()

      return result.data
    } catch (error: any) {
      console.error('Error withdrawing funds:', error)
      setWallet(prev => ({
        ...prev,
        error: error.message,
        loading: false,
      }))
      throw error
    }
  }

  // Fetch both balance and transactions on mount
  useEffect(() => {
    const loadWalletData = async () => {
      setWallet(prev => ({
        ...prev,
        loading: true,
      }))

      await Promise.all([
        fetchBalance(),
        fetchTransactions(),
      ])

      setWallet(prev => ({
        ...prev,
        loading: false,
      }))
    }

    loadWalletData()
  }, [])

  return {
    balance: wallet.balance,
    transactions: wallet.transactions,
    loading: wallet.loading,
    error: wallet.error,
    fetchBalance,
    fetchTransactions,
    addFunds,
    withdrawFunds,
    refetch: () => {
      fetchBalance()
      fetchTransactions()
    },
  }
}
