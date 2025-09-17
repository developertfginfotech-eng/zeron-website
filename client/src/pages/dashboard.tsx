import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/stat-card"
import { DashboardChart } from "@/components/dashboard-chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react"
import { Link } from "wouter"

export default function Dashboard() {
  // todo: remove mock functionality
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    console.log('Dashboard refresh triggered')
    await new Promise(resolve => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  // todo: remove mock functionality
  const monthlyInvestments = [
    { name: 'Jan', value: 2400000 },
    { name: 'Feb', value: 2210000 },
    { name: 'Mar', value: 2290000 },
    { name: 'Apr', value: 2000000 },
    { name: 'May', value: 2181000 },
    { name: 'Jun', value: 2500000 },
    { name: 'Jul', value: 2100000 },
  ]

  const userGrowth = [
    { name: 'Jan', value: 120 },
    { name: 'Feb', value: 150 },
    { name: 'Mar', value: 180 },
    { name: 'Apr', value: 200 },
    { name: 'May', value: 240 },
    { name: 'Jun', value: 280 },
    { name: 'Jul', value: 320 },
  ]

  const recentTransactions = [
    { id: '1', user: 'Ahmed Al-Rashid', property: 'Luxury Apartments', amount: 50000, type: 'investment' },
    { id: '2', user: 'Sarah Johnson', property: 'Office Tower', amount: 75000, type: 'investment' },
    { id: '3', user: 'Mohammad Al-Zahra', property: 'Retail Complex', amount: 15000, type: 'withdrawal' },
  ]

  const pendingKyc = [
    { id: '1', name: 'Fatima Al-Qasimi', documents: 'National ID, Selfie', status: 'pending' },
    { id: '2', name: 'Omar Hassan', documents: 'Passport, Income Proof', status: 'pending' },
    { id: '3', name: 'Layla Mahmoud', documents: 'Iqama, Employment Letter', status: 'review' },
  ]

  return (
    <div className="p-6 space-y-6" data-testid="page-dashboard">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-dashboard-title">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Zaron Admin Panel</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing} data-testid="button-refresh-dashboard">
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="2,847"
          change="+12% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Active Properties"
          value="24"
          change="+3 new this week"
          changeType="positive"
          icon={Building2}
        />
        <StatCard
          title="Total Investments"
          value="SAR 14.2M"
          change="+8% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatCard
          title="Monthly Revenue"
          value="SAR 890K"
          change="-2% from last month"
          changeType="negative"
          icon={DollarSign}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="Monthly Investments"
          description="Investment volume over the last 7 months"
          data={monthlyInvestments}
          type="bar"
          dataKey="value"
        />
        <DashboardChart
          title="User Growth"
          description="New user registrations trend"
          data={userGrowth}
          type="line"
          dataKey="value"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="card-recent-transactions">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
              <CardDescription>Latest investment activity</CardDescription>
            </div>
            <Link href="/transactions">
              <Button variant="outline" size="sm" data-testid="button-view-all-transactions">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between" data-testid={`transaction-${transaction.id}`}>
                  <div>
                    <p className="font-medium">{transaction.user}</p>
                    <p className="text-sm text-muted-foreground">{transaction.property}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono">SAR {transaction.amount.toLocaleString()}</p>
                    <Badge variant={transaction.type === 'investment' ? 'default' : 'secondary'}>
                      {transaction.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-pending-kyc">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Pending KYC Reviews</CardTitle>
              <CardDescription>Documents awaiting verification</CardDescription>
            </div>
            <Link href="/users">
              <Button variant="outline" size="sm" data-testid="button-view-all-kyc">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingKyc.map((kyc) => (
                <div key={kyc.id} className="flex items-center justify-between" data-testid={`kyc-${kyc.id}`}>
                  <div>
                    <p className="font-medium">{kyc.name}</p>
                    <p className="text-sm text-muted-foreground">{kyc.documents}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {kyc.status === 'pending' ? (
                      <Clock className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                    )}
                    <Badge variant={kyc.status === 'pending' ? 'secondary' : 'default'}>
                      {kyc.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}