import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionTable } from "@/components/transaction-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { Transaction } from "@shared/schema"

export default function Transactions() {
  // todo: remove mock functionality
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      investorId: 'investor-1',
      propertyId: 'property-1',
      type: 'investment',
      amount: '50000',
      status: 'pending',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      investorId: 'investor-2',
      propertyId: 'property-2',
      type: 'payout',
      amount: '5250',
      status: 'completed',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '3',
      investorId: 'investor-1',
      propertyId: null,
      type: 'withdrawal',
      amount: '15000',
      status: 'pending',
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '4',
      investorId: 'investor-3',
      propertyId: 'property-1',
      type: 'investment',
      amount: '75000',
      status: 'rejected',
      createdAt: new Date('2024-02-05'),
    },
    {
      id: '5',
      investorId: 'investor-4',
      propertyId: 'property-3',
      type: 'investment',
      amount: '100000',
      status: 'completed',
      createdAt: new Date('2024-02-10'),
    },
    {
      id: '6',
      investorId: 'investor-2',
      propertyId: 'property-2',
      type: 'payout',
      amount: '8500',
      status: 'completed',
      createdAt: new Date('2024-02-15'),
    },
  ]

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesType && matchesStatus
  })

  const totalInvestments = mockTransactions
    .filter(t => t.type === 'investment' && t.status === 'completed')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const totalPayouts = mockTransactions
    .filter(t => t.type === 'payout' && t.status === 'completed')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const totalWithdrawals = mockTransactions
    .filter(t => t.type === 'withdrawal' && t.status === 'completed')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const handleApprove = (transactionId: string) => {
    console.log('Approved transaction:', transactionId)
    // In real app, this would update the transaction status
  }

  const handleReject = (transactionId: string) => {
    console.log('Rejected transaction:', transactionId)
    // In real app, this would update the transaction status
  }

  const handleExport = () => {
    console.log('Export transactions data triggered')
    // In real app, this would export the data as CSV/Excel
  }

  return (
    <div className="p-6 space-y-6" data-testid="page-transactions">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-transactions-title">Transaction Management</h1>
          <p className="text-muted-foreground">Review and manage all investment transactions</p>
        </div>
        <Button onClick={handleExport} data-testid="button-export-transactions">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card data-testid="card-total-investments">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Investments
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              SAR {totalInvestments.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From completed transactions
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-total-payouts">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Payouts
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              SAR {totalPayouts.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Distributed to investors
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-total-withdrawals">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Withdrawals
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              SAR {totalWithdrawals.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Withdrawn by investors
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Filter transactions by type and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48" data-testid="select-type-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="payout">Payout</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48" data-testid="select-status-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            Transactions ({filteredTransactions.length})
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline">
              {mockTransactions.filter(t => t.status === 'pending').length} Pending
            </Badge>
            <Badge variant="outline">
              {mockTransactions.filter(t => t.status === 'completed').length} Completed
            </Badge>
            <Badge variant="outline">
              {mockTransactions.filter(t => t.status === 'rejected').length} Rejected
            </Badge>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction List</CardTitle>
          <CardDescription>
            Review transaction details and approve or reject pending transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TransactionTable
            transactions={filteredTransactions}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </CardContent>
      </Card>

      {filteredTransactions.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No transactions found matching your criteria</p>
            <Button variant="outline" onClick={() => {
              setTypeFilter("all")
              setStatusFilter("all")
            }} data-testid="button-clear-filters">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}