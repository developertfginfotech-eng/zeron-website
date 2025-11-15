import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { DashboardChart } from "@/components/dashboard-chart"
import { usePortfolio } from "@/hooks/use-portfolio"
import { useMyInvestments } from "@/hooks/use-investments"
import {
  Building,
  TrendingUp,
  Calendar,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  MapPin,
  Percent,
  Loader2
} from "lucide-react"

export default function InvestorPortfolio() {
  const { user } = useAuth()

  // Fetch real data from backend API
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio()
  const { data: backendInvestments = [], isLoading: investmentsLoading } = useMyInvestments()

  // Show loading state
  if (portfolioLoading || investmentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your portfolio...</p>
        </div>
      </div>
    )
  }

  // Use real portfolio data from backend
  const portfolioSummary = {
    totalValue: portfolio?.totalCurrentValue || 0,
    totalInvested: portfolio?.totalInvestments || 0,
    totalReturns: portfolio?.totalReturns || 0,
    returnRate: portfolio?.totalInvestments > 0
      ? ((portfolio?.totalReturns || 0) / (portfolio?.totalInvestments || 1)) * 100
      : 0,
    activeInvestments: portfolio?.propertyCount || 0
  }

  // Map real investments from backend - safely handle array
  const investments = Array.isArray(backendInvestments) ? backendInvestments.map((inv: any) => {
    const currentValue = inv.amount + (inv.amount * ((inv.rentalYieldRate || 0) / 100))
    const returns = currentValue - inv.amount
    const returnRate = inv.amount > 0 ? (returns / inv.amount) * 100 : 0

    // Safely convert dates with fallback
    let investmentDate = 'N/A'
    if (inv.createdAt) {
      try {
        const dateObj = new Date(inv.createdAt)
        if (!isNaN(dateObj.getTime())) {
          investmentDate = dateObj.toISOString().split('T')[0]
        }
      } catch (error) {
        investmentDate = 'N/A'
      }
    }

    let nextPayoutDate = 'N/A'
    if (inv.maturityDate) {
      try {
        const dateObj = new Date(inv.maturityDate)
        if (!isNaN(dateObj.getTime())) {
          nextPayoutDate = dateObj.toISOString().split('T')[0]
        }
      } catch (error) {
        nextPayoutDate = 'N/A'
      }
    }

    return {
      id: inv._id,
      property: inv.property?.title || 'Property',
      type: inv.property?.propertyType || 'Property',
      location: `${inv.property?.location?.address || ''}, ${inv.property?.location?.city || ''}`,
      investedAmount: inv.amount || 0,
      currentValue: currentValue,
      returns: returns,
      returnRate: returnRate,
      status: inv.status === 'completed' ? 'Completed' : 'Active',
      investmentDate: investmentDate,
      nextPayout: nextPayoutDate,
      payoutAmount: inv.status === 'completed' ? 0 : (inv.amount * ((inv.rentalYieldRate || 0) / 100) / 12)
    }
  }) : []

  // Performance chart data - TODO: Get historical data from backend
  const performanceData = [
    { name: 'Jan', value: portfolioSummary.totalInvested * 0.85 },
    { name: 'Feb', value: portfolioSummary.totalInvested * 0.92 },
    { name: 'Mar', value: portfolioSummary.totalInvested * 0.98 },
    { name: 'Apr', value: portfolioSummary.totalInvested * 1.05 },
    { name: 'May', value: portfolioSummary.totalInvested * 1.15 },
    { name: 'Jun', value: portfolioSummary.totalInvested * 1.20 },
    { name: 'Jul', value: portfolioSummary.totalValue },
  ]

  // Calculate asset allocation from real investments
  const assetAllocation = investments.reduce((acc: any, inv: any) => {
    const type = inv.type || 'Unknown'
    const existing = acc.find((a: any) => a.type === type) || { type, amount: 0 }
    const updated = { ...existing, amount: existing.amount + inv.investedAmount }
    return acc.some((a: any) => a.type === type)
      ? acc.map((a: any) => (a.type === type ? updated : a))
      : [...acc, updated]
  }, []).map((alloc: any) => ({
    ...alloc,
    percentage: portfolioSummary.totalInvested > 0
      ? Math.round((alloc.amount / portfolioSummary.totalInvested) * 100)
      : 0
  }))

  // Calculate next payout from real data
  const upcomingPayouts = backendInvestments
    .filter((inv: any) => inv.status !== 'completed')
    .map((inv: any) => {
      const monthlyPayout = (inv.amount || 0) * ((inv.rentalYieldRate || 0) / 100) / 12
      return {
        amount: monthlyPayout,
        date: inv.maturityDate || new Date()
      }
    })

  const nextPayoutDate = upcomingPayouts.length > 0
    ? new Date(upcomingPayouts[0].date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : 'N/A'

  const nextPayoutAmount = upcomingPayouts.length > 0
    ? upcomingPayouts.reduce((sum: number, p: any) => sum + p.amount, 0)
    : 0

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800"
      case "Completed": return "bg-blue-100 text-blue-800"
      case "Pending": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8" data-testid="investor-portfolio">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
          <p className="text-muted-foreground">
            Track your real estate investments and returns
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2">
            <Building className="w-4 h-4" />
            {portfolioSummary.activeInvestments} Active Investments
          </Badge>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card data-testid="card-total-value">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR {portfolioSummary.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3 text-green-500" />
              +{portfolioSummary.returnRate}% from invested
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-total-invested">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR {portfolioSummary.totalInvested.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across {portfolioSummary.activeInvestments} properties
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-total-returns">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">SAR {portfolioSummary.totalReturns.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {portfolioSummary.returnRate}% average return
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-next-payout">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SAR {nextPayoutAmount.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">
              {nextPayoutDate !== 'N/A' ? `Expected ${nextPayoutDate}` : 'No upcoming payouts'}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="investments" data-testid="tab-investments">Investments</TabsTrigger>
          <TabsTrigger value="performance" data-testid="tab-performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Portfolio Performance Chart */}
            <Card data-testid="card-performance-chart">
              <CardHeader>
                <CardTitle>Portfolio Growth</CardTitle>
                <CardDescription>
                  Your investment value over the last 7 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardChart 
                  title="Portfolio Value"
                  type="line"
                  data={performanceData}
                />
              </CardContent>
            </Card>

            {/* Asset Allocation */}
            <Card data-testid="card-allocation">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>
                  Distribution by property type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assetAllocation.length > 0 ? (
                  assetAllocation.map((allocation: any) => (
                    <div key={allocation.type} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{allocation.type}</span>
                        <span>SAR {allocation.amount.toLocaleString()}</span>
                      </div>
                      <Progress value={allocation.percentage} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {allocation.percentage}% of portfolio
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No investments yet</p>
                    <p className="text-sm">Start investing to see asset allocation</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="investments" className="space-y-6">
          <div className="grid gap-6">
            {investments.map((investment) => (
              <Card key={investment.id} className="hover-elevate" data-testid={`investment-${investment.id}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{investment.property}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {investment.location}
                        </span>
                        <Badge variant="outline">{investment.type}</Badge>
                        <Badge className={getStatusColor(investment.status)}>
                          {investment.status}
                        </Badge>
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Invested</p>
                      <p className="font-semibold">SAR {investment.investedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Value</p>
                      <p className="font-semibold">SAR {investment.currentValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Returns</p>
                      <p className="font-semibold text-green-600">SAR {investment.returns.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Return Rate</p>
                      <p className="font-semibold text-green-600">+{investment.returnRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Payout</p>
                      <p className="font-semibold">
                        {investment.status === "Completed" ? "N/A" : `SAR ${investment.payoutAmount.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card data-testid="card-monthly-returns">
              <CardHeader>
                <CardTitle>Monthly Returns</CardTitle>
                <CardDescription>
                  Returns received each month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DashboardChart 
                  title="Monthly Returns"
                  type="bar"
                  data={[
                    { name: 'Jan', value: 2100 },
                    { name: 'Feb', value: 2400 },
                    { name: 'Mar', value: 2650 },
                    { name: 'Apr', value: 2800 },
                    { name: 'May', value: 3200 },
                    { name: 'Jun', value: 3100 },
                    { name: 'Jul', value: 3750 },
                  ]}
                />
              </CardContent>
            </Card>

            <Card data-testid="card-roi-analysis">
              <CardHeader>
                <CardTitle>ROI Analysis</CardTitle>
                <CardDescription>
                  Return on investment by property type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { type: "Industrial", roi: 30.0, trend: "up" },
                  { type: "Commercial", roi: 25.0, trend: "up" },
                  { type: "Residential", roi: 20.0, trend: "stable" },
                  { type: "Retail", roi: 18.0, trend: "down" }
                ].map((analysis) => (
                  <div key={analysis.type} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{analysis.type}</p>
                      <p className="text-sm text-muted-foreground">Average ROI</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{analysis.roi}%</p>
                      <div className="flex items-center gap-1">
                        {analysis.trend === "up" && <ArrowUpRight className="w-3 h-3 text-green-500" />}
                        {analysis.trend === "down" && <ArrowDownRight className="w-3 h-3 text-red-500" />}
                        <span className="text-xs text-muted-foreground capitalize">{analysis.trend}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}