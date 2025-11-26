import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useWalletBalance, useWalletTransactions } from "@/hooks/use-wallet"
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
  Minus
} from "lucide-react"

export default function InvestorWallet() {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [isDepositOpen, setIsDepositOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [isDepositing, setIsDepositing] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const queryClient = useQueryClient()
  const { toast } = useToast()

  // Fetch data from backend
  const { data: walletData, isLoading: balanceLoading } = useWalletBalance()
  const { data: transactions = [], isLoading: transactionsLoading } = useWalletTransactions()
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

  // Show loading state
  if (balanceLoading || transactionsLoading) {
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
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-600 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-24 translate-x-24" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">My Wallet</h1>
              <p className="text-emerald-100 text-lg">Manage your funds and track returns</p>
            </div>

            <div className="flex gap-3">
              <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-emerald-700 hover:bg-white/90 font-semibold px-6 h-auto">
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
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-emerald-100 text-sm mb-1">Available Balance</p>
              <p className="text-3xl font-mono font-bold">SAR {balance.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-emerald-100 text-sm mb-1">Total Returns</p>
              <p className="text-3xl font-mono font-bold text-green-300">+SAR {totalReturns.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-emerald-100 text-sm mb-1">Pending</p>
              <p className="text-3xl font-mono font-bold">SAR {pendingBalance.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Available Balance */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 p-1 shadow-lg hover:shadow-2xl transition-all">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 rounded-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                  <WalletIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available Balance</p>
                <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                  SAR {balance.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-600 mt-1">Ready to invest</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Returns */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-1 shadow-lg hover:shadow-2xl transition-all">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Returns</p>
                <p className="text-2xl font-mono font-bold text-green-600">
                  +SAR {totalReturns.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-600 mt-1">From all investments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Unrealized Gains */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg hover:shadow-2xl transition-all">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unrealized Gains</p>
                <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                  SAR {unrealizedGains.toLocaleString()}
                </p>
                <p className="text-xs text-blue-600 mt-1">Current investments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Realized Gains */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 p-1 shadow-lg hover:shadow-2xl transition-all">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/10 dark:to-pink-900/10 rounded-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Realized Gains</p>
                <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                  SAR {realizedGains.toLocaleString()}
                </p>
                <p className="text-xs text-orange-600 mt-1">Withdrawn returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="returns">Property Returns</TabsTrigger>
          <TabsTrigger value="actions">Quick Actions</TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                Transaction History
              </CardTitle>
              <CardDescription>View all your wallet transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No transactions yet</p>
                    <p className="text-sm text-muted-foreground">Your transactions will appear here</p>
                  </div>
                ) : (
                  transactions.map((transaction: any) => {
                    // Determine if this is money IN (+) or OUT (-)
                    const isMoneyIn = transaction.type === 'deposit' || transaction.type === 'recharge' || transaction.type === 'payout'
                    const isMoneyOut = transaction.type === 'withdrawal' || transaction.type === 'investment'
                    const displayAmount = isMoneyOut ? -Math.abs(transaction.amount) : Math.abs(transaction.amount)

                    return (
                      <div key={transaction.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/50 dark:to-slate-900/50 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            isMoneyIn ? 'bg-green-100 dark:bg-green-900/30' :
                            isMoneyOut ? 'bg-red-100 dark:bg-red-900/30' :
                            'bg-blue-100 dark:bg-blue-900/30'
                          }`}>
                            {isMoneyIn && <ArrowDownLeft className="h-5 w-5 text-green-600" />}
                            {isMoneyOut && <ArrowUpRight className="h-5 w-5 text-red-600" />}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {transaction.description || transaction.type}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.date || new Date(transaction.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-xl font-mono font-bold ${isMoneyIn ? 'text-green-600' : 'text-red-600'}`}>
                            {displayAmount > 0 ? '+' : ''}SAR {Math.abs(displayAmount).toLocaleString()}
                          </p>
                          <Badge variant={transaction.status === 'completed' || transaction.status === 'confirmed' ? 'default' : 'secondary'}>
                            {transaction.status === 'completed' || transaction.status === 'confirmed' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {transaction.status}
                          </Badge>
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Property-wise Returns
              </CardTitle>
              <CardDescription>Detailed breakdown of returns from each property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {propertyReturns.length === 0 ? (
                  <div className="text-center py-8">
                    <Building className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No property investments yet</p>
                    <p className="text-sm text-muted-foreground">Start investing to see returns</p>
                  </div>
                ) : (
                  propertyReturns.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 border border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                          <Building className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{item.property}</p>
                          <p className="text-sm text-muted-foreground">
                            Invested: SAR {item.investedAmount.toLocaleString()} • Yield: {item.rentalYield}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-mono font-bold text-green-600">
                          +SAR {item.returns.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-500 font-medium">
                          +{item.returnRate.toFixed(2)}% return
                        </p>
                      </div>
                    </div>
                  ))
                )}

                {propertyReturns.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Returns</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-emerald-600">Unrealized: SAR {unrealizedGains.toLocaleString()}</span>
                          <span className="text-xs text-blue-600">Realized: SAR {realizedGains.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-mono font-bold text-green-600">
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
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                  Deposit Funds
                </CardTitle>
                <CardDescription>Add money to your wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Funds
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ArrowUpRight className="w-5 h-5 text-orange-600" />
                  Withdraw Funds
                </CardTitle>
                <CardDescription>Transfer money to your bank</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={balance < 1000}
                    >
                      <Minus className="w-4 h-4 mr-2" />
                      Withdraw Funds
                    </Button>
                  </DialogTrigger>
                </Dialog>
                {balance < 1000 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Minimum balance SAR 1,000 required
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Payment Methods
                </CardTitle>
                <CardDescription>Manage payment options</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" disabled>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add Method
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Coming soon</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
