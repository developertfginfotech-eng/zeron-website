import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useWalletBalance, useWalletTransactions, useWithdrawalRequests } from "@/hooks/use-wallet"
import { useMyInvestments } from "@/hooks/use-investments"
import { usePortfolio } from "@/hooks/use-portfolio"
import { apiClient, API_ENDPOINTS } from "@/lib/api-client"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  Loader2,
  Building,
  Plus,
  Minus,
  RefreshCw
} from "lucide-react"

export default function InvestorWallet() {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [isDepositing, setIsDepositing] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const queryClient = useQueryClient()
  const { toast } = useToast()

  // Refresh all wallet data
  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await queryClient.invalidateQueries({ queryKey: ["wallet-balance"] })
      await queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] })
      await queryClient.invalidateQueries({ queryKey: ["withdrawal-requests"] })
      await queryClient.invalidateQueries({ queryKey: ["portfolio"] })
      toast({
        title: "Refreshed",
        description: "Wallet data updated"
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  // Fetch data from backend
  const { data: walletData, isLoading: balanceLoading } = useWalletBalance()
  const { data: transactions = [], isLoading: transactionsLoading } = useWalletTransactions()
  const { data: withdrawalRequests = [], isLoading: withdrawalRequestsLoading } = useWithdrawalRequests()
  const { data: investments = [], isLoading: investmentsLoading } = useMyInvestments()
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio()

  const balance = walletData?.availableBalance || 0
  const pendingBalance = walletData?.pendingAmount || 0
  const totalReturns = portfolio?.totalReturns || 0
  const unrealizedGains = portfolio?.unrealizedGains || 0
  const realizedGains = portfolio?.realizedGains || 0

  // Handle deposit
  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount)

    if (isNaN(amount) || amount < 1000) {
      toast({
        title: "Invalid Amount",
        description: "Minimum deposit amount is SAR 1,000",
        variant: "destructive"
      })
      return
    }

    if (amount > 1000000) {
      toast({
        title: "Invalid Amount",
        description: "Maximum deposit amount is SAR 1,000,000",
        variant: "destructive"
      })
      return
    }

    setIsDepositing(true)
    try {
      await apiClient.post(API_ENDPOINTS.WALLET_RECHARGE, {
        amount,
        method: 'bank_transfer',
        description: 'Wallet recharge'
      })

      toast({
        title: "Success",
        description: `Successfully deposited SAR ${amount.toLocaleString()}`
      })
      setIsDepositOpen(false)
      setDepositAmount("")

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] })
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to deposit funds",
        variant: "destructive"
      })
    } finally {
      setIsDepositing(false)
    }
  }

  // Handle withdrawal
  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount)

    if (isNaN(amount) || amount < 1000) {
      toast({
        title: "Invalid Amount",
        description: "Minimum withdrawal amount is SAR 1,000",
        variant: "destructive"
      })
      return
    }

    if (amount > 1000000) {
      toast({
        title: "Invalid Amount",
        description: "Maximum withdrawal amount is SAR 1,000,000",
        variant: "destructive"
      })
      return
    }

    if (amount > balance) {
      toast({
        title: "Insufficient Balance",
        description: `You only have SAR ${balance.toLocaleString()} available`,
        variant: "destructive"
      })
      return
    }

    setIsWithdrawing(true)
    try {
      await apiClient.post(API_ENDPOINTS.WITHDRAW_WALLET, {
        amount,
        description: 'Wallet withdrawal'
      })

      toast({
        title: "Success",
        description: `Successfully withdrew SAR ${amount.toLocaleString()}`
      })
      setIsWithdrawOpen(false)
      setWithdrawAmount("")

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["wallet-balance"] })
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] })
      queryClient.invalidateQueries({ queryKey: ["portfolio"] })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to withdraw funds",
        variant: "destructive"
      })
    } finally {
      setIsWithdrawing(false)
    }
  }

  // Calculate property-wise returns
  const propertyReturns = Array.isArray(investments) ? investments.map((inv: any) => {
    const currentValue = inv.currentValue || inv.amount
    const returns = inv.returns || (currentValue - inv.amount)
    const returnRate = inv.amount > 0 ? (returns / inv.amount) * 100 : 0

    return {
      id: inv._id,
      property: inv.property?.title || inv.propertyName || 'Property',
      investedAmount: inv.amount || 0,
      returns: returns,
      returnRate: returnRate,
      rentalYield: inv.rentalYieldRate || 0,
      status: inv.status
    }
  }) : []

  // Combine withdrawal requests with transactions
  const allItems = [
    ...withdrawalRequests.map((req: any) => ({
      id: req._id,
      type: 'withdrawal' as const,
      amount: req.amount,
      description: `Withdrawal from ${req.propertyId?.title || 'Property'}`,
      date: req.requestedAt,
      createdAt: req.requestedAt,
      status: req.status,
      isWithdrawalRequest: true,
      request: req
    })),
    ...transactions
  ].sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime())

  // Show loading state
  if (balanceLoading || transactionsLoading || withdrawalRequestsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
          <p className="text-muted-foreground">Loading wallet data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800 p-6 space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 p-8 text-white shadow-2xl border border-teal-200 dark:border-teal-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-24 translate-x-24" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 uppercase tracking-wide">My Wallet</h1>
              <p className="text-teal-100 text-lg">Manage your funds and track returns</p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold px-6 h-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Funds
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Deposit Funds</DialogTitle>
                    <DialogDescription>
                      Add money to your wallet to invest in properties
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="deposit-amount">Amount (SAR)</Label>
                      <Input
                        id="deposit-amount"
                        type="number"
                        placeholder="Enter amount (min: 1,000)"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        min={1000}
                        max={1000000}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Minimum: SAR 1,000 • Maximum: SAR 1,000,000
                      </p>
                    </div>
                    <Button
                      onClick={handleDeposit}
                      disabled={isDepositing}
                      className="w-full"
                    >
                      {isDepositing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-2" />
                          Deposit Funds
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-semibold px-6 h-auto"
                    disabled={balance < 1000}
                  >
                    <Minus className="w-4 h-4 mr-2" />
                    Withdraw
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                    <DialogDescription>
                      Transfer money from your wallet to your bank account
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Available Balance: <span className="font-bold">SAR {balance.toLocaleString()}</span>
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="withdraw-amount">Amount (SAR)</Label>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        placeholder="Enter amount (min: 1,000)"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        min={1000}
                        max={balance}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Minimum: SAR 1,000 • Maximum: SAR {balance.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      onClick={handleWithdraw}
                      disabled={isWithdrawing}
                      className="w-full"
                    >
                      {isWithdrawing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Minus className="w-4 h-4 mr-2" />
                          Withdraw Funds
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-teal-700/50 backdrop-blur-sm rounded-2xl p-4 border border-teal-600/30">
              <p className="text-white text-sm mb-1 uppercase">Available Balance</p>
              <p className="text-3xl font-mono font-bold">SAR {balance.toLocaleString()}</p>
            </div>
            <div className="bg-teal-700/50 backdrop-blur-sm rounded-2xl p-4 border border-teal-600/30">
              <p className="text-white text-sm mb-1 uppercase">Total Returns</p>
              <p className="text-3xl font-mono font-bold text-yellow-400">+SAR {totalReturns.toLocaleString()}</p>
            </div>
            <div className="bg-teal-700/50 backdrop-blur-sm rounded-2xl p-4 border border-teal-600/30">
              <p className="text-white text-sm mb-1 uppercase">Pending</p>
              <p className="text-3xl font-mono font-bold">SAR {pendingBalance.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Available Balance */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-teal-800/90 backdrop-blur-sm border border-teal-200 dark:border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-600 dark:bg-teal-700/50 flex items-center justify-center border border-teal-500 dark:border-teal-600/30">
                <WalletIcon className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-700 dark:text-teal-200 uppercase tracking-wide">Available Balance</p>
              <p className="text-2xl font-mono font-bold text-teal-900 dark:text-white">
                SAR {balance.toLocaleString()}
              </p>
              <p className="text-xs text-teal-600 dark:text-teal-300 mt-1 uppercase">Ready to invest</p>
            </div>
          </div>
        </div>

        {/* Total Returns */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-teal-800/90 backdrop-blur-sm border border-teal-200 dark:border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-600 dark:bg-teal-700/50 flex items-center justify-center border border-teal-500 dark:border-teal-600/30">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-700 dark:text-teal-200 uppercase tracking-wide">Total Returns</p>
              <p className="text-2xl font-mono font-bold text-yellow-400">
                +SAR {totalReturns.toLocaleString()}
              </p>
              <p className="text-xs text-teal-600 dark:text-teal-300 mt-1 uppercase">From all investments</p>
            </div>
          </div>
        </div>

        {/* Unrealized Gains */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-teal-800/90 backdrop-blur-sm border border-teal-200 dark:border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-600 dark:bg-teal-700/50 flex items-center justify-center border border-teal-500 dark:border-teal-600/30">
                <DollarSign className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-700 dark:text-teal-200 uppercase tracking-wide">Unrealized Gains</p>
              <p className="text-2xl font-mono font-bold text-teal-900 dark:text-white">
                SAR {unrealizedGains.toLocaleString()}
              </p>
              <p className="text-xs text-teal-600 dark:text-teal-300 mt-1 uppercase">Current investments</p>
            </div>
          </div>
        </div>

        {/* Realized Gains */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-teal-800/90 backdrop-blur-sm border border-teal-200 dark:border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-600 dark:bg-teal-700/50 flex items-center justify-center border border-teal-500 dark:border-teal-600/30">
                <CheckCircle className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-700 dark:text-teal-200 uppercase tracking-wide">Realized Gains</p>
              <p className="text-2xl font-mono font-bold text-teal-900 dark:text-white">
                SAR {realizedGains.toLocaleString()}
              </p>
              <p className="text-xs text-teal-600 dark:text-teal-300 mt-1 uppercase">Withdrawn returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-teal-800/90 border border-teal-200 dark:border-teal-700/50">
          <TabsTrigger value="transactions" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">Transactions</TabsTrigger>
          <TabsTrigger value="returns" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">Property Returns</TabsTrigger>
          <TabsTrigger value="actions" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">Quick Actions</TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-white dark:bg-teal-800/90 border border-teal-200 dark:border-teal-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-900 dark:text-white">
                <Clock className="w-5 h-5 text-yellow-400" />
                Transaction History
              </CardTitle>
              <CardDescription className="text-teal-700 dark:text-teal-200">View all your wallet transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allItems.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                    <p className="text-teal-900 dark:text-white">No transactions yet</p>
                    <p className="text-sm text-teal-700 dark:text-teal-200">Your transactions will appear here</p>
                  </div>
                ) : (
                  allItems.map((item: any) => {
                    // Determine if this is money IN (+) or OUT (-)
                    const isMoneyIn = item.type === 'deposit' || item.type === 'recharge' || item.type === 'payout'
                    const isMoneyOut = item.type === 'withdrawal' || item.type === 'investment'
                    const displayAmount = isMoneyOut ? -Math.abs(item.amount) : Math.abs(item.amount)

                    // Determine status display for withdrawal requests
                    const statusLabel = item.isWithdrawalRequest ?
                      (item.status === 'pending' ? 'Pending Approval' :
                       item.status === 'approved' ? 'Approved' :
                       item.status === 'processing' ? 'Processing' :
                       item.status === 'completed' ? 'Completed' :
                       item.status === 'rejected' ? 'Rejected' : item.status) : item.status

                    return (
                      <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-teal-100 dark:bg-teal-700/50 border border-teal-300 dark:border-teal-600/30">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            isMoneyIn ? 'bg-green-100 dark:bg-green-900/30' :
                            isMoneyOut && item.isWithdrawalRequest && (item.status === 'pending' || item.status === 'processing') ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                            isMoneyOut ? 'bg-red-100 dark:bg-red-900/30' :
                            'bg-blue-100 dark:bg-blue-900/30'
                          }`}>
                            {isMoneyIn && <ArrowDownLeft className="h-5 w-5 text-yellow-600" />}
                            {isMoneyOut && <ArrowUpRight className={`h-5 w-5 ${item.isWithdrawalRequest && (item.status === 'pending' || item.status === 'processing') ? 'text-yellow-600' : 'text-red-600'}`} />}
                          </div>
                          <div>
                            <p className="font-semibold text-teal-900 dark:text-white">
                              {item.description || item.type}
                            </p>
                            <p className="text-sm text-teal-700 dark:text-teal-200">
                              {new Date(item.date || item.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-mono font-bold ${
                            isMoneyIn ? 'text-yellow-600 dark:text-yellow-400' :
                            isMoneyOut && item.isWithdrawalRequest && (item.status === 'pending' || item.status === 'processing') ? 'text-yellow-600 dark:text-yellow-400' :
                            'text-red-600 dark:text-red-400'
                          }`}>
                            {displayAmount > 0 ? '+' : ''}SAR {Math.abs(displayAmount).toLocaleString()}
                          </p>
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mt-2 ${
                            item.isWithdrawalRequest && (item.status === 'pending' || item.status === 'processing')
                              ? 'bg-yellow-500/20 border-yellow-400/30' :
                            item.status === 'completed' || item.status === 'confirmed' || item.status === 'approved'
                              ? 'bg-green-500/20 border-green-400/30'
                              : 'bg-blue-500/20 border-blue-400/30'
                          }`}>
                            {item.isWithdrawalRequest && (item.status === 'pending' || item.status === 'processing') ? (
                              <Clock className="h-3 w-3 text-yellow-600 dark:text-yellow-300" />
                            ) : item.status === 'completed' || item.status === 'confirmed' || item.status === 'approved' ? (
                              <CheckCircle className="h-3 w-3 text-yellow-600 dark:text-yellow-300" />
                            ) : (
                              <Clock className="h-3 w-3 text-blue-600 dark:text-blue-300" />
                            )}
                            <span className={`text-xs font-semibold ${
                              item.isWithdrawalRequest && (item.status === 'pending' || item.status === 'processing')
                                ? 'text-yellow-700 dark:text-yellow-300' :
                              item.status === 'completed' || item.status === 'confirmed' || item.status === 'approved'
                                ? 'text-yellow-700 dark:text-yellow-300'
                                : 'text-blue-700 dark:text-blue-300'
                            }`}>
                              {statusLabel}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Property Returns Tab */}
        <TabsContent value="returns" className="space-y-6">
          <Card className="bg-white dark:bg-teal-800/90 border border-teal-200 dark:border-teal-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-900 dark:text-white">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                Property-wise Returns
              </CardTitle>
              <CardDescription className="text-teal-700 dark:text-teal-200">Detailed breakdown of returns from each property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {propertyReturns.length === 0 ? (
                  <div className="text-center py-8">
                    <Building className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                    <p className="text-teal-900 dark:text-white">No property investments yet</p>
                    <p className="text-sm text-teal-700 dark:text-teal-200">Start investing to see returns</p>
                  </div>
                ) : (
                  propertyReturns.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 border border-teal-700/50">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center">
                          <Building className="w-5 h-5 text-gray-900" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{item.property}</p>
                          <p className="text-sm text-teal-200">
                            Invested: SAR {item.investedAmount.toLocaleString()} • Yield: {item.rentalYield}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-mono font-bold text-white">
                          +SAR {item.returns.toLocaleString()}
                        </p>
                        <p className="text-sm text-yellow-400 font-semibold">
                          +{item.returnRate.toFixed(2)}% return
                        </p>
                      </div>
                    </div>
                  ))
                )}

                {propertyReturns.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-teal-700/50">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 border border-teal-700/50">
                      <div>
                        <p className="text-sm font-medium text-white uppercase">Total Returns</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-teal-200 font-medium">Unrealized: SAR {unrealizedGains.toLocaleString()}</span>
                          <span className="text-xs text-teal-200 font-medium">Realized: SAR {realizedGains.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-mono font-bold text-yellow-400">
                          +SAR {totalReturns.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quick Actions Tab */}
        <TabsContent value="actions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all bg-white dark:bg-teal-800/90 border border-teal-200 dark:border-teal-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-teal-900 dark:text-white">
                  <ArrowDownLeft className="w-5 h-5 text-yellow-400" />
                  Deposit Funds
                </CardTitle>
                <CardDescription className="text-teal-700 dark:text-teal-200">Add money to your wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Funds
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all bg-white dark:bg-teal-800/90 border border-teal-200 dark:border-teal-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-teal-900 dark:text-white">
                  <ArrowUpRight className="w-5 h-5 text-yellow-400" />
                  Withdraw Funds
                </CardTitle>
                <CardDescription className="text-teal-700 dark:text-teal-200">Transfer money to your bank</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full bg-teal-700/50 border-teal-600/50 text-white hover:bg-yellow-400 hover:text-gray-900 hover:border-yellow-500"
                      disabled={balance < 1000}
                    >
                      <Minus className="w-4 h-4 mr-2" />
                      Withdraw Funds
                    </Button>
                  </DialogTrigger>
                </Dialog>
                {balance < 1000 && (
                  <p className="text-xs text-teal-600 dark:text-teal-300 mt-2">
                    Minimum balance SAR 1,000 required
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all bg-white dark:bg-teal-800/90 border border-teal-200 dark:border-teal-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-teal-900 dark:text-white">
                  <CreditCard className="w-5 h-5 text-yellow-400" />
                  Payment Methods
                </CardTitle>
                <CardDescription className="text-teal-700 dark:text-teal-200">Manage payment options</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-teal-700/50 border-teal-600/50 text-teal-600 dark:text-teal-300" disabled>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add Method
                </Button>
                <p className="text-xs text-teal-600 dark:text-teal-300 mt-2">Coming soon</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
