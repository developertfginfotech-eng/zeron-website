import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Minus,
  TrendingUp,
  Clock,
  CreditCard,
  Building2,
  CheckCircle,
  Clock3,
  Calendar,
  Filter,
  Loader2,
  AlertCircle
} from "lucide-react"
import { StatCard } from "@/components/stat-card"
import { useWallet } from "@/hooks/use-wallet"

export default function WalletPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const { balance, transactions, loading, error, addFunds, withdrawFunds } = useWallet()

  const filteredTransactions = transactions.filter(transaction => {
    if (activeFilter === "all") return true
    if (activeFilter === "deposit") return transaction.type === "deposit"
    if (activeFilter === "withdraw") return transaction.type === "withdrawal"
    return true
  })

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return ArrowDownLeft
      case "withdrawal":
        return ArrowUpRight
      case "payout":
        return TrendingUp
      case "investment":
        return CreditCard
      default:
        return CreditCard
    }
  }

  const getTransactionColor = (type: string, amount: number) => {
    if (amount > 0) return "text-green-600 dark:text-green-400"
    if (amount < 0) return "text-red-600 dark:text-red-400"
    return "text-muted-foreground"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Wallet
              </h1>
              <p className="text-muted-foreground">Manage your funds, deposits, and withdrawals</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            onClick={() => {
              // TODO: Open withdrawal modal
              withdrawFunds(1000) // Example
            }}
            disabled={loading}
          >
            <Minus className="h-4 w-4" />
            Withdraw
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            onClick={() => {
              // TODO: Open add funds modal
              addFunds(1000, 'bank_transfer') // Example
            }}
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
            Add Funds
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
            <CardContent className="pt-6 flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {loading && !balance ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : balance ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Available Balance"
                value={`${balance?.currency || 'SAR'} ${(balance?.availableBalance || 0).toLocaleString()}`}
                change="Ready for investment"
                changeType="positive"
                icon={Wallet}
              />
              <StatCard
                title="Pending Withdrawals"
                value={`${balance?.currency || 'SAR'} ${(balance?.pendingWithdrawals || 0).toLocaleString()}`}
                change="Processing 2-3 business days"
                changeType="neutral"
                icon={Clock}
              />
              <StatCard
                title="Total Deposits"
                value={`${balance?.currency || 'SAR'} ${(balance?.totalDeposits || 0).toLocaleString()}`}
                change="Lifetime deposits"
                changeType="positive"
                icon={ArrowDownLeft}
              />
              <StatCard
                title="Total Withdrawals"
                value={`${balance?.currency || 'SAR'} ${(balance?.totalWithdrawals || 0).toLocaleString()}`}
                change="Lifetime withdrawals"
                changeType="neutral"
                icon={ArrowUpRight}
              />
            </div>
          </>
        ) : null}

        {/* Transactions Section */}
        <Card className="enhanced-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Transactions
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Your recent wallet activity and transactions
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-auto">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                    <TabsTrigger value="deposit" className="text-xs">Deposit</TabsTrigger>
                    <TabsTrigger value="withdraw" className="text-xs">Withdraw</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : filteredTransactions.length > 0 ? (
              <div className="space-y-4">
                <div className="text-sm font-medium text-muted-foreground mb-4">
                  Transaction History
                </div>

                {filteredTransactions.map((transaction) => {
                  const IconComponent = getTransactionIcon(transaction.type)
                  const StatusIcon = transaction.status === "completed" ? CheckCircle : Clock3

                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-muted-foreground">
                              {formatDate(transaction.date)}
                            </p>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${getStatusColor(transaction.status)}`}
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {transaction.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`font-bold text-lg ${getTransactionColor(transaction.type, transaction.amount)}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.currency} {Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {transaction.type}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-muted-foreground">No transactions yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}