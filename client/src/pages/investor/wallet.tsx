import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle
} from "lucide-react"

export default function InvestorWallet() {
  const [balance] = useState(50000)
  const [pendingBalance] = useState(5000)

  const transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: 10000,
      status: 'completed',
      date: '2024-01-15',
      description: 'Bank Transfer'
    },
    {
      id: 2,
      type: 'investment',
      amount: -5000,
      status: 'completed',
      date: '2024-01-14',
      description: 'Investment in Test Property 3'
    },
    {
      id: 3,
      type: 'withdrawal',
      amount: -2000,
      status: 'pending',
      date: '2024-01-13',
      description: 'Bank Withdrawal'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/50 dark:from-gray-900 dark:to-emerald-950/50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-emerald-600 dark:from-gray-100 dark:to-emerald-400 bg-clip-text text-transparent mb-4">
            My Wallet
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your funds and transactions
          </p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-blue-600 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <WalletIcon className="h-5 w-5" />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">
                SAR {balance.toLocaleString()}
              </div>
              <p className="text-emerald-100 text-sm">Ready to invest</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-pink-600 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Clock className="h-5 w-5" />
                Pending Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">
                SAR {pendingBalance.toLocaleString()}
              </div>
              <p className="text-orange-100 text-sm">Processing transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your wallet funds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600">
                <ArrowDownLeft className="h-4 w-4 mr-2" />
                Deposit Funds
              </Button>
              <Button variant="outline">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Withdraw Funds
              </Button>
              <Button variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View all your wallet transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'deposit' ? 'bg-green-100 dark:bg-green-900/30' :
                        transaction.type === 'withdrawal' ? 'bg-red-100 dark:bg-red-900/30' :
                        'bg-blue-100 dark:bg-blue-900/30'
                      }`}>
                        {transaction.type === 'deposit' && <ArrowDownLeft className="h-4 w-4 text-green-600" />}
                        {transaction.type === 'withdrawal' && <ArrowUpRight className="h-4 w-4 text-red-600" />}
                        {transaction.type === 'investment' && <TrendingUp className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div>
                        <p className="font-semibold">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : ''}SAR {Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
