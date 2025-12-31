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
  Target,
  AlertCircle,
  LogOut
} from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { apiClient, API_ENDPOINTS } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"
import { useQueryClient } from "@tanstack/react-query"

export default function InvestorPortfolio() {
  const [, setLocation] = useLocation()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // State for withdrawal dialog
  const [selectedInvestment, setSelectedInvestment] = useState<any>(null)
  const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const [withdrawalDetails, setWithdrawalDetails] = useState<any>(null)
  const [isLoadingWithdrawalDetails, setIsLoadingWithdrawalDetails] = useState(false)

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

  // Fetch withdrawal details from backend
  const fetchWithdrawalDetails = async (investmentId: string) => {
    setIsLoadingWithdrawalDetails(true)
    try {
      const response = await apiClient.get(
        API_ENDPOINTS.GET_INVESTMENT_RETURNS(investmentId)
      ) as any

      if (response.success && response.data) {
        setWithdrawalDetails(response.data)
      }
    } catch (error) {
      console.error('Error fetching withdrawal details:', error)
    } finally {
      setIsLoadingWithdrawalDetails(false)
    }
  }

  // Open withdrawal dialog
  const openWithdrawDialog = (investment: any) => {
    setSelectedInvestment(investment)
    setWithdrawalDetails(null)
    fetchWithdrawalDetails(investment.id)
    setIsWithdrawDialogOpen(true)
  }

  // Handle withdrawal submission
  const handleWithdraw = async () => {
    if (!selectedInvestment) return

    setIsWithdrawing(true)
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.WITHDRAW_INVESTMENT(selectedInvestment.id),
        {}
      ) as any

      if (response.success) {
        toast({
          title: "Withdrawal Request Submitted",
          description: "Please wait for your withdrawal request to be approved within 24-48 hours.",
          duration: 6000,
        })

        // Refresh investment data
        queryClient.invalidateQueries({ queryKey: ['my-investments'] })
        queryClient.invalidateQueries({ queryKey: ['portfolio'] })

        setIsWithdrawDialogOpen(false)
        setSelectedInvestment(null)
        setWithdrawalDetails(null)
      } else {
        throw new Error(response.message || 'Failed to submit withdrawal request')
      }
    } catch (error: any) {
      toast({
        title: "Withdrawal Failed",
        description: error.message || 'Failed to submit withdrawal request. Please try again.',
        variant: "destructive",
      })
    } finally {
      setIsWithdrawing(false)
    }
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
              <h1 className="text-4xl font-bold mb-2 uppercase tracking-wide">Investment Portfolio</h1>
              <p className="text-teal-100 text-lg">Track your real estate investments and returns</p>
            </div>
            <Button
              onClick={() => setLocation('/investor/properties')}
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold px-8 py-3 h-auto shadow-lg rounded-full uppercase"
            >
              <Building className="w-4 h-4 mr-2" />
              Explore Properties
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-teal-700/50 backdrop-blur-sm rounded-2xl p-4 border border-teal-600/30">
              <p className="text-white text-sm mb-1 uppercase">Total Value</p>
              <p className="text-3xl font-mono font-bold text-white">SAR {portfolioValue.toLocaleString()}</p>
            </div>
            <div className="bg-teal-700/50 backdrop-blur-sm rounded-2xl p-4 border border-teal-600/30">
              <p className="text-white text-sm mb-1 uppercase">Total Returns</p>
              <p className="text-3xl font-mono font-bold text-yellow-400">+SAR {totalReturns.toLocaleString()}</p>
            </div>
            <div className="bg-teal-700/50 backdrop-blur-sm rounded-2xl p-4 border border-teal-600/30">
              <p className="text-white text-sm mb-1 uppercase">Active Investments</p>
              <p className="text-3xl font-mono font-bold text-white">{activeInvestments}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Portfolio Value */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-teal-800/90 backdrop-blur-sm border border-teal-200 dark:border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-600 dark:bg-teal-700/50 flex items-center justify-center border border-teal-500 dark:border-teal-600/30">
                <Wallet className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1">
                <span className="text-sm font-semibold text-teal-700 dark:text-teal-200">
                  +{portfolioGrowthPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-700 dark:text-teal-200 uppercase tracking-wide">Portfolio Value</p>
              <p className="text-2xl font-mono font-bold text-teal-900 dark:text-white">
                SAR {portfolioValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Invested */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-teal-800/90 backdrop-blur-sm border border-teal-200 dark:border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-600 dark:bg-teal-700/50 flex items-center justify-center border border-teal-500 dark:border-teal-600/30">
                <Target className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-700 dark:text-teal-200 uppercase tracking-wide">Total Invested</p>
              <p className="text-2xl font-mono font-bold text-teal-900 dark:text-white">
                SAR {totalInvested.toLocaleString()}
              </p>
              <p className="text-xs text-teal-600 dark:text-teal-300 mt-1 uppercase">Across {activeInvestments} properties</p>
            </div>
          </div>
        </div>

        {/* Total Returns */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-teal-800/90 backdrop-blur-sm border border-teal-200 dark:border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-600 dark:bg-teal-700/50 flex items-center justify-center border border-teal-500 dark:border-teal-600/30">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex items-center gap-1 px-2 py-1">
                <span className="text-sm font-semibold text-teal-700 dark:text-teal-200">
                  +{totalReturnsPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-700 dark:text-teal-200 uppercase tracking-wide">Total Returns</p>
              <p className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">
                SAR {totalReturns.toLocaleString()}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-teal-600 dark:text-teal-300 uppercase">Unrealized: SAR {unrealizedGains.toLocaleString()}</span>
                <span className="text-xs text-teal-600 dark:text-teal-300 uppercase">Realized: SAR {realizedGains.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Properties */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-teal-800/90 backdrop-blur-sm border border-teal-200 dark:border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-600 dark:bg-teal-700/50 flex items-center justify-center border border-teal-500 dark:border-teal-600/30">
                <Building className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-700 dark:text-teal-200 uppercase tracking-wide">Active Properties</p>
              <p className="text-2xl font-mono font-bold text-teal-900 dark:text-white">
                {activeInvestments}
              </p>
              <p className="text-xs text-teal-600 dark:text-teal-300 mt-1 uppercase">Diversified portfolio</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="investments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-teal-800/90 border border-teal-200 dark:border-teal-700/50">
          <TabsTrigger value="investments" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">My Investments</TabsTrigger>
          <TabsTrigger value="returns" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">Return Breakdown</TabsTrigger>
          <TabsTrigger value="overview" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-gray-900">Overview</TabsTrigger>
        </TabsList>

        {/* Investments Tab */}
        <TabsContent value="investments" className="space-y-6">
          <div className="space-y-6">
            {investments.length === 0 ? (
              <Card className="bg-white dark:bg-teal-800/90 border border-teal-200 dark:border-teal-700/50">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Building className="w-16 h-16 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-teal-900 dark:text-white">No investments yet</h3>
                  <p className="text-teal-700 dark:text-teal-200 mb-6">Start investing in real estate properties</p>
                  <Button onClick={() => setLocation('/investor/properties')} className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold">
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
                  <Card key={propertyGroup.propertyId} className="overflow-hidden border-2 border-teal-200 dark:border-teal-700/50 bg-teal-900/70">
                    {/* Property Header */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-teal-800 to-emerald-900 p-6 text-white border-b border-teal-200 dark:border-teal-700/50">
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
                            <p className="text-lg font-mono font-bold text-yellow-300">+SAR {totalReturnsInProperty.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Individual Investments List */}
                    <CardContent className="p-0 bg-teal-900/50">
                      <div className="divide-y divide-teal-700/30">
                        {propertyGroup.investments.map((investment: any, idx: number) => (
                          <div key={investment.id} className="p-4 hover:bg-teal-800/70 transition-colors">
                            {/* Investment Type Badge */}
                            <div className="flex flex-col gap-3 mb-4">
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge className={`text-xs font-semibold ${
                                  investment.investmentType === 'bond'
                                    ? 'bg-yellow-400 text-gray-900 border-yellow-500'
                                    : 'bg-teal-700 text-white border-teal-600'
                                }`}>
                                  {investment.investmentType === 'bond' ? '🏆 Bond Investment' : '📅 Annual Plan'}
                                </Badge>
                                <Badge className={`text-xs ${
                                  investment.status === 'Active' ? 'bg-green-100 text-green-800' :
                                  investment.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                                  'bg-green-100 text-green-800'
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
                              <div className="text-xs text-white">
                                Investment #{idx + 1} • Rental Yield: {investment.rentalYield}%
                              </div>
                            </div>

                            {/* Investment Details Grid - Responsive */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
                                {/* Units */}
                                <div className="text-center">
                                  <p className="text-xs text-teal-200 mb-1">Units</p>
                                  <p className="font-mono font-semibold text-sm text-white">{investment.units}</p>
                                </div>

                                {/* Invested Amount */}
                                <div className="text-center">
                                  <p className="text-xs text-teal-200 mb-1">Invested</p>
                                  <p className="font-mono font-semibold text-sm text-white">SAR {investment.investedAmount.toLocaleString()}</p>
                                  {investment.managementFee > 0 && (
                                    <p className="text-xs text-red-400">-SAR {investment.managementFee.toLocaleString()} fee</p>
                                  )}
                                </div>

                                {/* Net Investment */}
                                <div className="text-center">
                                  <p className="text-xs text-teal-200 mb-1">Net Amount</p>
                                  <p className="font-mono font-semibold text-sm text-yellow-400">SAR {investment.netInvestment.toLocaleString()}</p>
                                </div>

                                {/* Current Value */}
                                <div className="text-center">
                                  <p className="text-xs text-teal-200 mb-1">Current</p>
                                  <p className="font-mono font-semibold text-sm text-white">SAR {investment.currentValue.toLocaleString()}</p>
                                </div>

                                {/* Returns */}
                                <div className="text-center">
                                  <p className={`text-xs mb-1 ${investment.returns >= 0 ? 'text-yellow-400' : 'text-red-400'}`}>Returns</p>
                                  <p className={`font-mono font-bold text-sm ${investment.returns >= 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                                    {investment.returns >= 0 ? '+' : ''}SAR {investment.returns.toLocaleString()}
                                  </p>
                                  <p className={`text-xs font-medium ${investment.returnRate >= 0 ? 'text-yellow-300' : 'text-red-300'}`}>
                                    {investment.returnRate >= 0 ? '+' : ''}{investment.returnRate.toFixed(1)}%
                                  </p>
                                </div>

                                {/* Investment Date */}
                                <div className="text-center">
                                  <p className="text-xs text-teal-200 mb-1">Invested On</p>
                                  <p className="font-mono text-sm text-white">{investment.investmentDate}</p>
                                </div>

                                {/* Maturity/Lock-in Date */}
                                <div className="text-center">
                                  <p className="text-xs text-teal-200 mb-1">
                                    {investment.investmentType === 'bond' && investment.isInLockInPeriod ? 'Lock-in Ends' : 'Matures On'}
                                  </p>
                                  <p className="font-mono text-sm text-white">
                                    {investment.investmentType === 'bond' && investment.isInLockInPeriod
                                      ? investment.lockInEndDate
                                      : investment.investmentType === 'bond'
                                      ? investment.bondMaturityDate
                                      : investment.lockInEndDate}
                                  </p>
                                </div>
                              </div>

                              {/* Withdrawal Button */}
                              {investment.status === 'Active' && (
                                <div className="mt-4 pt-4 border-t border-teal-700/30">
                                  <Button
                                    onClick={() => openWithdrawDialog(investment)}
                                    variant="outline"
                                    size="sm"
                                    className="w-full sm:w-auto border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                                  >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Request Withdrawal
                                  </Button>
                                </div>
                              )}
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
            <Card className="col-span-2 bg-white dark:bg-teal-800/90 border border-teal-200 dark:border-teal-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-900 dark:text-white">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Property-wise Return Breakdown
                </CardTitle>
                <CardDescription className="text-teal-700 dark:text-teal-200">Detailed returns from each property investment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between p-4 rounded-xl bg-teal-100 dark:bg-teal-700/50 border border-teal-300 dark:border-teal-600/30">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-yellow-400 flex items-center justify-center">
                          <Building className="w-5 h-5 text-gray-900" />
                        </div>
                        <div>
                          <p className="font-semibold text-teal-900 dark:text-white">{investment.property}</p>
                          <p className="text-sm text-teal-700 dark:text-teal-200">
                            Invested: SAR {investment.investedAmount.toLocaleString()} • Yield: {investment.rentalYield}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-xl font-mono font-bold ${investment.returns >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {investment.returns >= 0 ? '+' : ''}SAR {investment.returns.toLocaleString()}
                        </p>
                        <p className={`text-sm font-medium ${investment.returnRate >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                          {investment.returnRate >= 0 ? '+' : ''}{investment.returnRate.toFixed(2)}% return
                        </p>
                      </div>
                    </div>
                  ))}

                  {investments.length === 0 && (
                    <div className="text-center py-8">
                      <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <p className="text-teal-900 dark:text-white">No return data available yet</p>
                      <p className="text-sm text-teal-700 dark:text-teal-200">Start investing to see returns</p>
                    </div>
                  )}
                </div>

                {investments.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-teal-200 dark:border-teal-700/50">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-teal-700/50 border border-teal-600/30">
                      <div>
                        <p className="text-sm font-medium text-white">Total Portfolio Returns</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-teal-700 dark:text-teal-200">Unrealized: SAR {unrealizedGains.toLocaleString()}</span>
                          <span className="text-xs text-teal-700 dark:text-teal-200">Realized: SAR {realizedGains.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-mono font-bold text-green-400">
                          +SAR {totalReturns.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-300 font-medium">
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
            <Card className="bg-white dark:bg-teal-800/90 border border-teal-200 dark:border-teal-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <PieChart className="w-5 h-5 text-green-400" />
                  Portfolio Growth
                </CardTitle>
                <CardDescription className="text-teal-700 dark:text-teal-200">Investment value over time</CardDescription>
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
            <Card className="bg-white dark:bg-teal-800/90 border border-teal-200 dark:border-teal-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="w-5 h-5 text-green-400" />
                  Asset Allocation
                </CardTitle>
                <CardDescription className="text-teal-700 dark:text-teal-200">Distribution by property type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assetAllocation.length > 0 ? (
                  assetAllocation.map((allocation: any) => (
                    <div key={allocation.type} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-white">{allocation.type}</span>
                        <span className="font-mono text-white">SAR {allocation.amount.toLocaleString()}</span>
                      </div>
                      <Progress value={allocation.percentage} className="h-2" />
                      <div className="text-xs text-teal-700 dark:text-teal-200">
                        {allocation.percentage}% of portfolio
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 mx-auto mb-3 text-green-400 opacity-50" />
                    <p className="text-white">No allocation data yet</p>
                    <p className="text-sm text-teal-700 dark:text-teal-200">Start investing to see distribution</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Withdrawal Confirmation Dialog */}
      <AlertDialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-serif">
              Investment Exit Confirmation
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-base">
              {withdrawalDetails?.penalty?.isInLockInPeriod && withdrawalDetails?.penalty?.penaltyAmount > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900">Pre-Maturity Exit Fee</p>
                      <p className="text-sm text-red-700 mt-1">
                        You are exiting before the maturity date. A pre-maturity exit fee of {withdrawalDetails?.penalty?.penaltyPercentage}% will be applied.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Property:</span>
                  <span className="font-semibold text-gray-900">{selectedInvestment?.property}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Principal Amount:</span>
                  <span className="font-mono font-semibold text-gray-900">
                    SAR {selectedInvestment?.investedAmount?.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rental Yield Earned:</span>
                  <span className="font-mono font-semibold text-yellow-600">
                    +SAR {(withdrawalDetails?.rentalYield?.netRentalYield || selectedInvestment?.returns || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                {withdrawalDetails?.penalty?.isInLockInPeriod && withdrawalDetails?.penalty?.penaltyAmount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pre-Maturity Exit Fee ({withdrawalDetails?.penalty?.penaltyPercentage}%):</span>
                    <span className="font-mono font-semibold text-red-600">
                      -SAR {withdrawalDetails?.penalty?.penaltyAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                )}

                {withdrawalDetails?.managementFee?.accumulatedAmount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Management Fee ({withdrawalDetails?.managementFee?.deductionType}):</span>
                    <span className="font-mono font-semibold text-amber-600">
                      -SAR {withdrawalDetails?.managementFee?.accumulatedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">You will receive:</span>
                    <span className="font-mono font-bold text-emerald-600 text-lg">
                      SAR {(withdrawalDetails?.netWithdrawalAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Your withdrawal request will be reviewed and approved within 24-48 hours.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isWithdrawing}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleWithdraw}
              disabled={isWithdrawing || isLoadingWithdrawalDetails}
              className="bg-red-600 hover:bg-red-700"
            >
              {isWithdrawing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Withdrawal'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
