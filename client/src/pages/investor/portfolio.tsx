import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DashboardChart } from "@/components/dashboard-chart"
import { usePortfolio, type PortfolioSummary } from "@/hooks/use-portfolio"
import { useMyInvestments } from "@/hooks/use-investments"
import { useLocation } from "wouter"
import {
  Building,
  TrendingUp,
  ArrowUpRight,
  MapPin,
  Loader2,
  Wallet,
  PieChart,
  Target
} from "lucide-react"

export default function InvestorPortfolio() {
  const [, setLocation] = useLocation()

  // Fetch real data from backend API
  const { data: portfolioData, isLoading: portfolioLoading } = usePortfolio()
  const { data: backendInvestments = [], isLoading: investmentsLoading } = useMyInvestments()

  // Show loading state
  if (portfolioLoading || investmentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
          <p className="text-muted-foreground">Loading your portfolio...</p>
        </div>
      </div>
    )
  }

  // Extract portfolio data
  const portfolio: PortfolioSummary = portfolioData || {
    totalCurrentValue: 0,
    totalInvestments: 0,
    totalReturns: 0,
    propertyCount: 0,
    unrealizedGains: 0,
    realizedGains: 0,
    monthlyIncome: 0,
    portfolioGrowthPercentage: 0,
    totalReturnsPercentage: 0,
    totalReturnPercentage: 0,
  }
  const portfolioValue = portfolio.totalCurrentValue || 0
  const totalInvested = portfolio.totalInvestments || 0
  const totalReturns = portfolio.totalReturns || 0
  const unrealizedGains = portfolio.unrealizedGains || 0
  const realizedGains = portfolio.realizedGains || 0
  const activeInvestments = portfolio.propertyCount || 0
  const portfolioGrowthPercentage = portfolio.portfolioGrowthPercentage || 0
  const totalReturnsPercentage = portfolio.totalReturnsPercentage || 0

  // Helper function to format dates properly
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Map real investments from backend
  const investments = Array.isArray(backendInvestments) ? backendInvestments.map((inv: any) => {
    const currentValue = inv.currentValue || inv.amount
    const returns = inv.returns || (currentValue - inv.amount)
    const returnRate = inv.amount > 0 ? (returns / inv.amount) * 100 : 0

    return {
      id: inv._id,
      propertyId: inv.property?._id || inv.property,
      property: inv.property?.title || inv.propertyName || 'Property',
      propertyType: inv.property?.propertyType || 'Property',
      location: inv.property?.location
        ? `${inv.property.location.address || ''}, ${inv.property.location.city || ''}`.trim()
        : 'Location not available',
      investmentType: inv.investmentType || 'simple_annual', // Bond or Simple Annual
      investedAmount: inv.amount || 0,
      netInvestment: inv.managementFee?.netInvestment || inv.amount || 0,
      managementFee: inv.managementFee?.feeAmount || 0,
      currentValue: currentValue,
      returns: returns,
      returnRate: returnRate,
      rentalYield: inv.rentalYieldRate || 0,
      units: inv.shares || inv.units || 0,
      status: inv.status === 'confirmed' ? 'Active' : inv.status === 'completed' ? 'Completed' : 'Pending',
      investmentDate: formatDate(inv.createdAt),
      bondMaturityDate: formatDate(inv.bondMaturityDate),
      lockInEndDate: formatDate(inv.lockInEndDate),
      isInLockInPeriod: inv.isInLockInPeriod || false,
      hasMatured: inv.hasMatured || false,
    }
  }) : []

  // Group investments by property
  const investmentsByProperty = investments.reduce((acc: any, inv: any) => {
    const propertyId = inv.propertyId || inv.property
    if (!acc[propertyId]) {
      acc[propertyId] = {
        propertyId,
        propertyName: inv.property,
        propertyType: inv.propertyType,
        location: inv.location,
        investments: []
      }
    }
    acc[propertyId].investments.push(inv)
    return acc
  }, {})

  const propertyGroups = Object.values(investmentsByProperty)

  // Calculate asset allocation
  const assetAllocation = investments.reduce((acc: any, inv: any) => {
    const type = inv.propertyType || 'Unknown'
    const existing = acc.find((a: any) => a.type === type)
    if (existing) {
      existing.amount += inv.netInvestment
    } else {
      acc.push({ type, amount: inv.netInvestment })
    }
    return acc
  }, []).map((alloc: any) => ({
    ...alloc,
    percentage: totalInvested > 0 ? Math.round((alloc.amount / totalInvested) * 100) : 0
  }))

  // Mock performance data (replace with real data when available from backend)
  const performanceData = [
    { name: 'Jan', value: totalInvested * 0.85 },
    { name: 'Feb', value: totalInvested * 0.92 },
    { name: 'Mar', value: totalInvested * 0.98 },
    { name: 'Apr', value: totalInvested * 1.05 },
    { name: 'May', value: totalInvested * 1.15 },
    { name: 'Jun', value: totalInvested * 1.20 },
    { name: 'Jul', value: portfolioValue },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-600 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-24 translate-x-24" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">Investment Portfolio</h1>
              <p className="text-emerald-100 text-lg">Track your real estate investments and returns</p>
            </div>
            <Button
              onClick={() => setLocation('/investor/properties')}
              className="bg-white text-emerald-700 hover:bg-white/90 font-semibold px-6 h-auto"
            >
              <Building className="w-4 h-4 mr-2" />
              Explore Properties
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-emerald-100 text-sm mb-1">Total Value</p>
              <p className="text-3xl font-mono font-bold">SAR {portfolioValue.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-emerald-100 text-sm mb-1">Total Returns</p>
              <p className="text-3xl font-mono font-bold text-green-300">+SAR {totalReturns.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <p className="text-emerald-100 text-sm mb-1">Active Investments</p>
              <p className="text-3xl font-mono font-bold">{activeInvestments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Portfolio Value */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 p-1 shadow-lg hover:shadow-2xl transition-all">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 rounded-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-600">
                    {portfolioGrowthPercentage >= 0 ? '+' : ''}{portfolioGrowthPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Portfolio Value</p>
                <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                  SAR {portfolioValue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Invested */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg hover:shadow-2xl transition-all">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invested</p>
                <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                  SAR {totalInvested.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Across {activeInvestments} properties</p>
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
                <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3 text-green-600" />
                  <span className="text-xs font-semibold text-green-600">
                    {totalReturnsPercentage >= 0 ? '+' : ''}{totalReturnsPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Returns</p>
                <p className="text-2xl font-mono font-bold text-green-600">
                  SAR {totalReturns.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-emerald-600">Unrealized: SAR {unrealizedGains.toLocaleString()}</span>
                  <span className="text-xs text-blue-600">Realized: SAR {realizedGains.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Properties */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-pink-600 p-1 shadow-lg hover:shadow-2xl transition-all">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/10 dark:to-pink-900/10 rounded-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Properties</p>
                <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                  {activeInvestments}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Diversified portfolio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="investments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="investments">My Investments</TabsTrigger>
          <TabsTrigger value="returns">Return Breakdown</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        {/* Investments Tab */}
        <TabsContent value="investments" className="space-y-6">
          <div className="space-y-6">
            {investments.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Building className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No investments yet</h3>
                  <p className="text-muted-foreground mb-6">Start investing in real estate properties</p>
                  <Button onClick={() => setLocation('/investor/properties')}>
                    Explore Properties
                  </Button>
                </CardContent>
              </Card>
            ) : (
              propertyGroups.map((propertyGroup: any) => {
                const totalInvestedInProperty = propertyGroup.investments.reduce((sum: number, inv: any) => sum + inv.netInvestment, 0)
                const totalUnitsInProperty = propertyGroup.investments.reduce((sum: number, inv: any) => sum + inv.units, 0)
                const totalReturnsInProperty = propertyGroup.investments.reduce((sum: number, inv: any) => sum + inv.returns, 0)
                const currentValueInProperty = propertyGroup.investments.reduce((sum: number, inv: any) => sum + inv.currentValue, 0)

                return (
                  <Card key={propertyGroup.propertyId} className="overflow-hidden border-2">
                    {/* Property Header */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-blue-600 to-purple-600 p-6 text-white">
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-16 translate-x-16" />

                      <div className="relative z-10">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                              <Building className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-serif font-bold mb-1">{propertyGroup.propertyName}</h3>
                              <div className="flex items-center gap-2 text-sm text-emerald-100">
                                <MapPin className="w-4 h-4" />
                                <span>{propertyGroup.location}</span>
                              </div>
                              <Badge variant="outline" className="mt-2 bg-white/20 border-white/30 text-white">
                                {propertyGroup.propertyType}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-emerald-100 mb-1">Total Investments</p>
                            <p className="text-2xl font-mono font-bold">{propertyGroup.investments.length}</p>
                          </div>
                        </div>

                        {/* Property Summary Stats */}
                        <div className="grid grid-cols-4 gap-3 mt-4">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                            <p className="text-xs text-emerald-100 mb-1">Total Units</p>
                            <p className="text-lg font-mono font-bold">{totalUnitsInProperty}</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                            <p className="text-xs text-emerald-100 mb-1">Total Invested</p>
                            <p className="text-lg font-mono font-bold">SAR {totalInvestedInProperty.toLocaleString()}</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                            <p className="text-xs text-emerald-100 mb-1">Current Value</p>
                            <p className="text-lg font-mono font-bold">SAR {currentValueInProperty.toLocaleString()}</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                            <p className="text-xs text-emerald-100 mb-1">Total Returns</p>
                            <p className="text-lg font-mono font-bold text-green-300">+SAR {totalReturnsInProperty.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Individual Investments List */}
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {propertyGroup.investments.map((investment: any, idx: number) => (
                          <div key={investment.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                            {/* Investment Type Badge */}
                            <div className="flex flex-col gap-3 mb-4">
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge className={`text-xs font-semibold ${
                                  investment.investmentType === 'bond'
                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-700'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                                }`}>
                                  {investment.investmentType === 'bond' ? '🏆 Bond Investment' : '📅 Annual Plan'}
                                </Badge>
                                <Badge className={`text-xs ${
                                  investment.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20' :
                                  investment.status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20' :
                                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20'
                                }`}>
                                  {investment.status}
                                </Badge>
                                {investment.investmentType === 'bond' && investment.isInLockInPeriod && (
                                  <Badge variant="outline" className="text-xs text-orange-700 border-orange-300">
                                    🔒 Lock-in Period
                                  </Badge>
                                )}
                                {investment.hasMatured && (
                                  <Badge variant="outline" className="text-xs text-green-700 border-green-300">
                                    ✓ Matured
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Investment #{idx + 1} • Rental Yield: {investment.rentalYield}%
                              </div>
                            </div>

                            {/* Investment Details Grid - Responsive */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                                {/* Units */}
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground mb-1">Units</p>
                                  <p className="font-mono font-semibold text-sm text-gray-900 dark:text-white">{investment.units}</p>
                                </div>

                                {/* Invested Amount */}
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground mb-1">Invested</p>
                                  <p className="font-mono font-semibold text-sm text-gray-900 dark:text-white">SAR {investment.investedAmount.toLocaleString()}</p>
                                  {investment.managementFee > 0 && (
                                    <p className="text-xs text-red-600">-SAR {investment.managementFee.toLocaleString()} fee</p>
                                  )}
                                </div>

                                {/* Net Investment */}
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground mb-1">Net Amount</p>
                                  <p className="font-mono font-semibold text-sm text-emerald-700 dark:text-emerald-400">SAR {investment.netInvestment.toLocaleString()}</p>
                                </div>

                                {/* Current Value */}
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground mb-1">Current</p>
                                  <p className="font-mono font-semibold text-sm text-gray-900 dark:text-white">SAR {investment.currentValue.toLocaleString()}</p>
                                </div>

                                {/* Returns */}
                                <div className="text-center">
                                  <p className={`text-xs mb-1 ${investment.returns >= 0 ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>Returns</p>
                                  <p className={`font-mono font-bold text-sm ${investment.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {investment.returns >= 0 ? '+' : ''}SAR {investment.returns.toLocaleString()}
                                  </p>
                                  <p className={`text-xs font-medium ${investment.returnRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                    {investment.returnRate >= 0 ? '+' : ''}{investment.returnRate.toFixed(1)}%
                                  </p>
                                </div>

                                {/* Investment Date */}
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground mb-1">Invested On</p>
                                  <p className="font-mono text-sm text-gray-900 dark:text-white">{investment.investmentDate}</p>
                                </div>

                                {/* Maturity/Lock-in Date */}
                                <div className="text-center">
                                  <p className="text-xs text-muted-foreground mb-1">
                                    {investment.investmentType === 'bond' && investment.isInLockInPeriod ? 'Lock-in Ends' : 'Matures On'}
                                  </p>
                                  <p className="font-mono text-sm text-gray-900 dark:text-white">
                                    {investment.investmentType === 'bond' && investment.isInLockInPeriod
                                      ? investment.lockInEndDate
                                      : investment.investmentType === 'bond'
                                      ? investment.bondMaturityDate
                                      : investment.lockInEndDate}
                                  </p>
                                </div>
                              </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>

        {/* Return Breakdown Tab */}
        <TabsContent value="returns" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Property-wise Returns */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Property-wise Return Breakdown
                </CardTitle>
                <CardDescription>Detailed returns from each property investment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 border border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                          <Building className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{investment.property}</p>
                          <p className="text-sm text-muted-foreground">
                            Invested: SAR {investment.investedAmount.toLocaleString()} • Yield: {investment.rentalYield}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-mono font-bold ${investment.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {investment.returns >= 0 ? '+' : ''}SAR {investment.returns.toLocaleString()}
                        </p>
                        <p className={`text-sm font-medium ${investment.returnRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {investment.returnRate >= 0 ? '+' : ''}{investment.returnRate.toFixed(2)}% return
                        </p>
                      </div>
                    </div>
                  ))}

                  {investments.length === 0 && (
                    <div className="text-center py-8">
                      <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">No return data available yet</p>
                      <p className="text-sm text-muted-foreground">Start investing to see returns</p>
                    </div>
                  )}
                </div>

                {investments.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Portfolio Returns</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-emerald-600">Unrealized: SAR {unrealizedGains.toLocaleString()}</span>
                          <span className="text-xs text-blue-600">Realized: SAR {realizedGains.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-mono font-bold text-green-600">
                          +SAR {totalReturns.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-500 font-medium">
                          +{totalReturnsPercentage.toFixed(2)}% average
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Portfolio Growth Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-emerald-600" />
                  Portfolio Growth
                </CardTitle>
                <CardDescription>Investment value over time</CardDescription>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  Asset Allocation
                </CardTitle>
                <CardDescription>Distribution by property type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assetAllocation.length > 0 ? (
                  assetAllocation.map((allocation: any) => (
                    <div key={allocation.type} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{allocation.type}</span>
                        <span className="font-mono">SAR {allocation.amount.toLocaleString()}</span>
                      </div>
                      <Progress value={allocation.percentage} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {allocation.percentage}% of portfolio
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No allocation data yet</p>
                    <p className="text-sm">Start investing to see distribution</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
