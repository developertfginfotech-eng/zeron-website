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
  Filter
} from "lucide-react"
import { StatCard } from "@/components/stat-card"

export default function WalletPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      type: "deposit",
      amount: 25000,
      currency: "SAR",
      description: "Bank Transfer - Al Rajhi Bank",
      date: "2024-09-20",
      status: "completed",
      icon: Building2
    },
    {
      id: 2,
      type: "payout",
      amount: 2150,
      currency: "SAR",
      description: "Investment Returns - Riyadh Commercial Plaza",
      date: "2024-09-15",
      status: "completed",
      icon: TrendingUp
    },
    {
      id: 3,
      type: "withdrawal",
      amount: -10000,
      currency: "SAR",
      description: "Bank Transfer - Al Rajhi Bank",
      date: "2024-09-10",
      status: "pending",
      icon: Building2
    },
    {
      id: 4,
      type: "investment",
      amount: -15000,
      currency: "SAR",
      description: "Investment - Jeddah Luxury Residences",
      date: "2024-09-05",
      status: "completed",
      icon: CreditCard
    },
    {
      id: 5,
      type: "payout",
      amount: 1800,
      currency: "SAR",
      description: "Investment Returns - Mecca Shopping Center",
      date: "2024-09-01",
      status: "completed",
      icon: TrendingUp
    }
  ]

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
          <Button className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
            <Minus className="h-4 w-4" />
            Withdraw
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Funds
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Available Balance"
            value="SAR 47,500"
            change="Ready for investment"
            changeType="positive"
            icon={Wallet}
          />
          <StatCard
            title="Pending Withdrawals"
            value="SAR 5,000"
            change="Processing 2-3 business days"
            changeType="neutral"
            icon={Clock}
          />
          <StatCard
            title="Total Deposits"
            value="SAR 125,000"
            change="Lifetime deposits"
            changeType="positive"
            icon={ArrowDownLeft}
          />
          <StatCard
            title="Total Withdrawals"
            value="SAR 72,500"
            change="Lifetime withdrawals"
            changeType="neutral"
            icon={ArrowUpRight}
          />
        </div>

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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}