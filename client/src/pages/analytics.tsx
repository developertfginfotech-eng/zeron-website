import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardChart } from "@/components/dashboard-chart"
import { StatCard } from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Users, 
  Building2, 
  DollarSign,
  Download,
  Calendar
} from "lucide-react"
import { useState } from "react"

export default function Analytics() {
  // todo: remove mock functionality
  const [dateRange, setDateRange] = useState("last_30_days")

  // Mock data for charts
  const revenueData = [
    { name: 'Jan', value: 890000, growth: 12 },
    { name: 'Feb', value: 920000, growth: 8 },
    { name: 'Mar', value: 1050000, growth: 15 },
    { name: 'Apr', value: 980000, growth: -7 },
    { name: 'May', value: 1120000, growth: 14 },
    { name: 'Jun', value: 1250000, growth: 12 },
    { name: 'Jul', value: 1180000, growth: -6 },
  ]

  const propertyPerformance = [
    { name: 'Residential', value: 45, count: 12 },
    { name: 'Commercial', value: 35, count: 8 },
    { name: 'Retail', value: 15, count: 3 },
    { name: 'Mixed Use', value: 5, count: 1 },
  ]

  const userGrowth = [
    { name: 'Jan', value: 120, active: 890 },
    { name: 'Feb', value: 150, active: 1040 },
    { name: 'Mar', value: 180, active: 1220 },
    { name: 'Apr', value: 200, active: 1420 },
    { name: 'May', value: 240, active: 1660 },
    { name: 'Jun', value: 280, active: 1940 },
    { name: 'Jul', value: 320, active: 2260 },
  ]

  const investmentTrends = [
    { name: 'Week 1', investment: 450000, withdrawal: 50000 },
    { name: 'Week 2', investment: 520000, withdrawal: 75000 },
    { name: 'Week 3', investment: 480000, withdrawal: 60000 },
    { name: 'Week 4', investment: 680000, withdrawal: 90000 },
  ]

  const kycStats = [
    { name: 'Pending', value: 45 },
    { name: 'Approved', value: 185 },
    { name: 'Rejected', value: 23 },
    { name: 'Under Review', value: 12 },
  ]

  // Key metrics
  const totalRevenue = 8570000
  const monthlyGrowth = 12.5
  const activeUsers = 2847
  const userGrowthRate = 15.8
  const totalProperties = 24
  const propertyGrowth = 8.3
  const averageROI = 9.8

  const handleExportReport = () => {
    console.log('Export analytics report triggered')
    // In real app, this would export the analytics data
  }

  return (
    <div className="p-6 space-y-6" data-testid="page-analytics">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-analytics-title">Analytics & Reports</h1>
          <p className="text-muted-foreground">Platform performance insights and detailed analytics</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48" data-testid="select-date-range">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_7_days">Last 7 days</SelectItem>
              <SelectItem value="last_30_days">Last 30 days</SelectItem>
              <SelectItem value="last_90_days">Last 90 days</SelectItem>
              <SelectItem value="last_year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportReport} data-testid="button-export-report">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`SAR ${(totalRevenue / 1000000).toFixed(1)}M`}
          change={`+${monthlyGrowth}% this month`}
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Active Users"
          value={activeUsers.toLocaleString()}
          change={`+${userGrowthRate}% growth`}
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Total Properties"
          value={totalProperties.toString()}
          change={`+${propertyGrowth}% this quarter`}
          changeType="positive"
          icon={Building2}
        />
        <StatCard
          title="Average ROI"
          value={`${averageROI}%`}
          change="+0.5% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Revenue and Investment Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardChart
          title="Monthly Revenue"
          description="Platform revenue over the last 7 months"
          data={revenueData}
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

      {/* Investment Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card data-testid="card-property-performance">
          <CardHeader>
            <CardTitle>Property Type Performance</CardTitle>
            <CardDescription>Investment distribution by property type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {propertyPerformance.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="font-medium">{item.name}</span>
                    <Badge variant="outline">{item.count} properties</Badge>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-kyc-stats">
          <CardHeader>
            <CardTitle>KYC Status Distribution</CardTitle>
            <CardDescription>Current KYC verification status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {kycStats.map((item) => {
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }
                }
                
                return (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(item.name)}>
                        {item.name}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{item.value}</span>
                      <span className="text-sm text-muted-foreground ml-1">users</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment vs Withdrawal Trends */}
      <Card data-testid="card-investment-trends">
        <CardHeader>
          <CardTitle>Investment vs Withdrawal Trends</CardTitle>
          <CardDescription>Weekly comparison of investments and withdrawals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {investmentTrends.map((week) => (
              <div key={week.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{week.name}</span>
                  <div className="flex gap-4">
                    <span className="text-green-600">
                      +SAR {week.investment.toLocaleString()} invested
                    </span>
                    <span className="text-red-600">
                      -SAR {week.withdrawal.toLocaleString()} withdrawn
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 h-2">
                  <div 
                    className="bg-green-500 rounded"
                    style={{ 
                      width: `${(week.investment / (week.investment + week.withdrawal)) * 100}%` 
                    }}
                  ></div>
                  <div 
                    className="bg-red-500 rounded"
                    style={{ 
                      width: `${(week.withdrawal / (week.investment + week.withdrawal)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card data-testid="card-performance-summary">
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-600">Positive Trends</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  User registration increased by 15.8% this month
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Revenue growth maintained at 12.5% monthly average
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Property portfolio expanded with 2 new listings
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  KYC approval rate improved to 88%
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-yellow-600">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  45 KYC applications still pending review
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  Withdrawal rate increased by 8% last week
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  3 properties show below-average performance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  Customer support response time needs optimization
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}