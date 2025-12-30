import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { useAuth } from "@/hooks/use-auth"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { DashboardChart } from "@/components/dashboard-chart"
import { StatCard } from "@/components/stat-card"
import { useLocation } from "wouter"
import { usePortfolio } from "@/hooks/use-portfolio"
import { useMyInvestments } from "@/hooks/use-investments"
import { useKYCStatus } from "@/hooks/use-kyc"
import { useUserProfile } from "@/hooks/use-user-profile"
import { useToast } from "@/hooks/use-toast"
import { apiClient, API_ENDPOINTS } from "@/lib/api-client"
import { useState } from "react"
import {
  TrendingUp,
  Wallet,
  Building,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Target,
  Clock,
  CheckCircle,
  Loader2,
  LogOut,
  AlertTriangle,
  AlertCircle
} from "lucide-react"

export default function InvestorDashboard() {
  const { user } = useAuth()
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
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio()
  const { data: myInvestments = [], isLoading: investmentsLoading } = useMyInvestments()
  const { data: kycStatus } = useKYCStatus()
  const { data: userProfile } = useUserProfile()

  // Show loading state
  if (portfolioLoading || investmentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Use real data from backend
  const portfolioValue = portfolio?.totalCurrentValue || 0
  const totalInvested = portfolio?.totalInvestments || 0
  const totalReturns = portfolio?.totalReturns || 0
  const activeInvestments = portfolio?.propertyCount || 0
  const pendingReturns = portfolio?.monthlyIncome || 0
  const nextPayout = "Oct 15, 2024" // TODO: Calculate from backend

  // Get real percentages from API
  const portfolioGrowthPercentage = portfolio?.portfolioGrowthPercentage || 0
  const totalReturnsPercentage = portfolio?.totalReturnsPercentage || 0
  const totalReturnPercentage = portfolio?.totalReturnPercentage || 0

  // Profile completion calculation
  const profileFields = {
    basicInfo: user?.firstName && user?.lastName && user?.email && user?.phone,
    kycStatus: user?.kycStatus === 'approved',
    investmentProfile:
      userProfile?.profileData?.investmentProfile?.completed ||
      (userProfile?.profileData?.investmentProfile?.experience &&
       userProfile?.profileData?.investmentProfile?.riskTolerance &&
       userProfile?.profileData?.investmentProfile?.investmentGoals) ||
      false,
    bankDetails:
      userProfile?.profileData?.bankingDetails?.completed ||
      (userProfile?.profileData?.bankingDetails?.bankName &&
       userProfile?.profileData?.bankingDetails?.iban &&
       userProfile?.profileData?.bankingDetails?.accountHolder) ||
      false,
    preferences:
      userProfile?.profileData?.communicationPreferences?.completed ||
      (userProfile?.profileData?.communicationPreferences?.emailNotifications !== undefined &&
       userProfile?.profileData?.communicationPreferences?.languagePreference) ||
      false,
    documents:
      userProfile?.profileData?.employmentPortfolio?.completed ||
      (userProfile?.profileData?.employmentPortfolio?.employmentStatus &&
       userProfile?.profileData?.employmentPortfolio?.employer &&
       userProfile?.profileData?.employmentPortfolio?.jobTitle) ||
      false
  }

  const completedFields = Object.values(profileFields).filter(Boolean).length
  const totalFields = Object.keys(profileFields).length
  const profileCompletion = Math.round((completedFields / totalFields) * 100)

  const portfolioData = [
    { name: 'Jan', value: 85000 },
    { name: 'Feb', value: 92000 },
    { name: 'Mar', value: 88000 },
    { name: 'Apr', value: 98000 },
    { name: 'May', value: 105000 },
    { name: 'Jun', value: 115000 },
    { name: 'Jul', value: 125000 },
  ]

  // Get recent investments from backend (last 3)
  const recentInvestments = Array.isArray(myInvestments)
    ? myInvestments.slice(0, 3).map((inv: any) => ({
        id: inv._id || inv.id,
        property: inv.propertyName || inv.property || "Unknown Property",
        amount: inv.amount || 0,
        currentValue: inv.currentValue || inv.amount,
        returns: inv.returns || 0,
        rentalYieldEarned: inv.rentalYieldEarned || 0,
        appreciationGain: inv.appreciationGain || 0,
        penaltyRate: inv.penaltyRate || 0,
        graduatedPenalties: inv.graduatedPenalties || [],
        investedAt: inv.investedAt || inv.createdAt,
        isAfterMaturity: inv.isAfterMaturity || false,
        maturityDate: inv.maturityDate,
        date: inv.investedAt ? new Date(inv.investedAt).toISOString().split('T')[0] : inv.date || new Date().toISOString().split('T')[0],
        status: inv.status?.toLowerCase() || "pending",
      }))
    : []

  // Handle investment withdrawal
  const handleWithdrawInvestment = async () => {
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
          description: response.message || `Withdrawal request submitted for admin approval. You will be notified once it's processed.`,
        })

        // Refresh all related data
        queryClient.invalidateQueries({ queryKey: ["my-investments"] })
        queryClient.invalidateQueries({ queryKey: ["portfolio"] })
        queryClient.invalidateQueries({ queryKey: ["wallet-balance"] })
        queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] })

        setIsWithdrawDialogOpen(false)
        setSelectedInvestment(null)
      }
    } catch (error: any) {
      toast({
        title: "Withdrawal Request Failed",
        description: error.response?.data?.message || "Failed to submit withdrawal request",
        variant: "destructive",
      })
    } finally {
      setIsWithdrawing(false)
    }
  }

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

  // Calculate penalty if early withdrawal - use graduated penalties if available
  const calculatePenalty = () => {
    if (!selectedInvestment) return 0
    if (selectedInvestment.isAfterMaturity) return 0

    let penaltyPercentage = selectedInvestment.penaltyRate || 0

    // Use graduated penalties if available
    if (selectedInvestment.graduatedPenalties && selectedInvestment.graduatedPenalties.length > 0) {
      // Calculate years since investment
      const investedDate = new Date(selectedInvestment.investedAt)
      const now = new Date()
      const yearsHeld = (now.getTime() - investedDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
      const currentYear = Math.floor(yearsHeld) + 1

      // Find penalty for current year
      const penaltyTier = selectedInvestment.graduatedPenalties.find((p: any) => p.year === currentYear)
      if (penaltyTier) {
        penaltyPercentage = penaltyTier.penaltyPercentage
      }
    }

    return selectedInvestment.amount * (penaltyPercentage / 100)
  }

  // Get actual penalty rate (graduated or flat)
  const getActualPenaltyRate = () => {
    if (!selectedInvestment) return 0
    if (selectedInvestment.isAfterMaturity) return 0

    let penaltyPercentage = selectedInvestment.penaltyRate || 0

    // Use graduated penalties if available
    if (selectedInvestment.graduatedPenalties && selectedInvestment.graduatedPenalties.length > 0) {
      const investedDate = new Date(selectedInvestment.investedAt)
      const now = new Date()
      const yearsHeld = (now.getTime() - investedDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
      const currentYear = Math.floor(yearsHeld) + 1

      const penaltyTier = selectedInvestment.graduatedPenalties.find((p: any) => p.year === currentYear)
      if (penaltyTier) {
        penaltyPercentage = penaltyTier.penaltyPercentage
      }
    }

    return penaltyPercentage
  }

  const penalty = calculatePenalty()

  // Calculate management fees
  const calculateManagementFee = () => {
    if (!selectedInvestment) return 0

    // Calculate total amount = Principal + Rental Yield Earned
    const principalAmount = selectedInvestment.amount
    const rentalYieldEarned = selectedInvestment.returns || 0
    const totalAmount = principalAmount + rentalYieldEarned

    // Get management fee percentage from property (should be in selectedInvestment)
    const managementFeePercentage = selectedInvestment.managementFeePercentage || 0
    const managementFeeDeductionType = selectedInvestment.managementFeeDeductionType || 'upfront'

    // For 'upfront', fee was already deducted at investment time
    if (managementFeeDeductionType === 'upfront') {
      return 0
    }

    // Calculate fee as simple percentage of total amount (Principal + Rental Yield)
    return (totalAmount * managementFeePercentage) / 100
  }

  const managementFee = calculateManagementFee()
  const estimatedWithdrawal = selectedInvestment
    ? selectedInvestment.amount + selectedInvestment.returns - penalty - managementFee
    : 0

  return (
    <div className="min-h-screen relative p-6 space-y-8 bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800" data-testid="investor-dashboard">
      {/* Background Image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('/images/BG%20Image.jpg')"
        }}
      />
      {/* Impressive Welcome Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 p-8 text-white shadow-2xl border border-teal-200 dark:border-teal-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-24 translate-x-24" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-2xl translate-y-24 -translate-x-24" />
        
        <div className="relative z-10 flex items-start justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-serif font-bold tracking-tight" data-testid="text-welcome">
                  Welcome back, {user?.firstName}!
                </h1>
                <p className="text-emerald-100 text-lg font-medium mt-1">
                  Your investments are performing exceptionally well
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2 bg-teal-700/50 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-400/30">
                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                <span className="font-semibold text-yellow-200">Portfolio Active</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-100">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-sm">Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-4">
            <div className="text-right bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <p className="text-emerald-100 text-sm font-medium">Total Portfolio Value</p>
              <p className="text-3xl font-mono font-bold">SAR {portfolioValue.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-300" />
                <span className="text-green-300 font-semibold">
                  {portfolioGrowthPercentage >= 0 ? '+' : ''}{portfolioGrowthPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <Button
              onClick={() => setLocation('/investor/properties')}
              data-testid="button-browse-properties"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold px-8 py-3 h-auto shadow-lg rounded-full uppercase"
            >
              Explore New Properties
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Profile Completion Card - Show if not 100% */}
      {profileCompletion < 100 && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-1 shadow-xl">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/10 dark:to-yellow-900/10 rounded-2xl" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-orange-800 dark:text-orange-200">
                    Complete Your Investor Profile
                  </h3>
                  <p className="text-orange-600 dark:text-orange-300 font-medium">
                    Unlock premium features and higher investment limits
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-mono font-bold text-orange-700 dark:text-orange-300">
                    {profileCompletion}%
                  </p>
                  <p className="text-sm text-orange-600">Complete</p>
                </div>
                <Button
                  onClick={() => setLocation('/investor/profile')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-3 h-auto shadow-lg rounded-lg uppercase"
                  data-testid="button-complete-profile"
                >
                  Complete Now
                </Button>
              </div>
            </div>
            
            <div className="mt-6 relative">
              <div className="w-full bg-orange-100 dark:bg-orange-900/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-500 relative"
                  style={{ width: `${profileCompletion}%` }}
                >
                  <div className="absolute right-0 top-0 w-2 h-3 bg-white rounded-full shadow-sm animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Impressive Portfolio Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Portfolio Value Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 backdrop-blur-sm border border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300" data-testid="stat-portfolio-value">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-600/50 flex items-center justify-center border border-teal-500/30">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 bg-white/90 rounded-lg">
                <span className="text-sm font-semibold text-teal-700">
                  +{portfolioGrowthPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-200 uppercase tracking-wide">Portfolio Value</p>
              <p className="text-2xl font-mono font-bold text-white">
                SAR {portfolioValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Invested Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 backdrop-blur-sm border border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300" data-testid="stat-total-invested">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-600/50 flex items-center justify-center border border-teal-500/30">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 bg-white/90 rounded-lg">
                <span className="text-sm font-semibold text-teal-700">
                  +{totalReturnsPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-200 uppercase tracking-wide">Total Invested</p>
              <p className="text-2xl font-mono font-bold text-white">
                SAR {totalInvested.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Returns Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 backdrop-blur-sm border border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300" data-testid="stat-total-returns">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-600/50 flex items-center justify-center border border-teal-500/30">
                <TrendingUp className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 bg-white/90 rounded-lg">
                <span className="text-sm font-semibold text-teal-700">
                  +{totalReturnsPercentage.toFixed(1)}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-200 uppercase tracking-wide">Total Returns</p>
              <p className="text-2xl font-mono font-bold text-white">
                SAR {totalReturns.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Active Investments Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 backdrop-blur-sm border border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-300" data-testid="stat-active-investments">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-teal-600/50 flex items-center justify-center border border-teal-500/30">
                <Building className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 bg-white/90 rounded-lg">
                <span className="text-xs font-semibold text-teal-700">+2 this month</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-teal-200 uppercase tracking-wide">Active Investments</p>
              <p className="text-2xl font-mono font-bold text-white">
                {activeInvestments}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enhanced Portfolio Performance Chart */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 backdrop-blur-sm border border-teal-700/50 shadow-xl p-6" data-testid="card-portfolio-chart">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-600/50 flex items-center justify-center border border-teal-500/30">
                <PieChart className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                  Portfolio Performance
                </h3>
                <p className="text-teal-200 text-sm">
                  Investment growth over the last 7 months
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-teal-200 uppercase">ROI</p>
              <p className="text-2xl font-mono font-bold text-white">
                {totalReturnPercentage >= 0 ? '+' : ''}{totalReturnPercentage.toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-teal-200">
            <DashboardChart
              title="Portfolio Growth"
              type="line"
              data={portfolioData}
            />
          </div>
        </div>

        {/* Enhanced Quick Actions & Info */}
        <div className="space-y-6">
          {/* Enhanced Upcoming Payouts */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 backdrop-blur-sm border border-teal-700/50 p-6 shadow-xl" data-testid="card-upcoming-payouts">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-600/50 flex items-center justify-center border border-teal-500/30">
                  <Calendar className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                    Upcoming Payouts
                  </h3>
                </div>
              </div>

              <div className="bg-teal-700/50 rounded-xl p-4 border border-teal-600/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-teal-200 uppercase text-sm">Next Payout</p>
                    <p className="text-sm text-white font-mono">{nextPayout}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-mono font-bold text-white">SAR {pendingReturns.toLocaleString()}</p>
                    <p className="text-xs text-teal-200 font-medium uppercase">Estimated</p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg uppercase"
                data-testid="button-view-payouts"
              >
                View All Payouts
              </Button>
            </div>
          </div>

          {/* Enhanced KYC Status */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 backdrop-blur-sm border border-teal-700/50 p-6 shadow-xl" data-testid="card-kyc-status">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-600/50 flex items-center justify-center border border-teal-500/30">
                  <CheckCircle className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                    Verification Status
                  </h3>
                </div>
              </div>

              <div className="bg-teal-700/50 rounded-xl p-4 border border-teal-600/30">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white uppercase">KYC Verification</span>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                    user?.kycStatus === 'approved'
                      ? 'bg-green-500/20 border-green-400/30'
                      : user?.kycStatus === 'submitted' || user?.kycStatus === 'under_review' || user?.kycStatus === 'pending_review'
                      ? 'bg-blue-500/20 border-blue-400/30'
                      : 'bg-orange-500/20 border-orange-400/30'
                  }`}>
                    {user?.kycStatus === 'approved' && <CheckCircle className="w-5 h-5 text-green-400" />}
                    <span className={`text-sm font-bold uppercase ${
                      user?.kycStatus === 'approved'
                        ? 'text-green-300'
                        : user?.kycStatus === 'submitted' || user?.kycStatus === 'under_review' || user?.kycStatus === 'pending_review'
                        ? 'text-blue-300'
                        : 'text-orange-300'
                    }`}>
                      {user?.kycStatus === 'approved' ? 'Verified' :
                       user?.kycStatus === 'submitted' || user?.kycStatus === 'under_review' || user?.kycStatus === 'pending_review' ? 'Pending' :
                       'Not Verified'}
                    </span>
                  </div>
                </div>

                {(user?.kycStatus === 'submitted' || user?.kycStatus === 'under_review' || user?.kycStatus === 'pending_review') && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-teal-200">
                    <Clock className="h-4 w-4" />
                    <span>Your documents are being reviewed. This usually takes 1-2 business days.</span>
                  </div>
                )}
              </div>

              {user?.kycStatus !== 'approved' && user?.kycStatus !== 'submitted' && user?.kycStatus !== 'under_review' && user?.kycStatus !== 'pending_review' && (
                <Button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg uppercase"
                  onClick={() => setLocation('/kyc')}
                  data-testid="button-complete-kyc"
                >
                  Complete Verification
                </Button>
              )}

              {(user?.kycStatus === 'submitted' || user?.kycStatus === 'under_review' || user?.kycStatus === 'pending_review') && (
                <Button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg uppercase"
                  onClick={() => setLocation('/kyc')}
                  data-testid="button-view-kyc"
                >
                  View Verification Status
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Recent Investments */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 backdrop-blur-sm border border-teal-700/50 shadow-xl p-6" data-testid="card-recent-investments">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-600/50 flex items-center justify-center border border-teal-500/30">
              <Building className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                Recent Investments
              </h3>
              <p className="text-teal-200 text-sm">
                Your latest property investments and their performance
              </p>
            </div>
          </div>
          <Button
            onClick={() => setLocation('/investor/portfolio')}
            data-testid="button-view-all-investments"
            className="bg-white hover:bg-gray-100 text-teal-900 font-bold px-6 py-3 rounded-lg uppercase shadow-lg"
          >
            View All Investments
          </Button>
        </div>

        <div className="space-y-3">
          {recentInvestments.map((investment, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl bg-teal-700/50 backdrop-blur-sm p-4 border border-teal-600/30 hover:bg-teal-700/60 transition-all duration-300"
              data-testid={`investment-${index}`}
            >

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-600/50 flex items-center justify-center border border-teal-500/30">
                    <Building className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      {investment.property}
                    </h4>
                    <p className="text-sm text-teal-200 font-mono">
                      {investment.date}
                    </p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-6">
                  <div>
                    <p className="text-sm text-teal-200 uppercase">Invested</p>
                    <p className="text-lg font-mono font-semibold text-white">
                      SAR {investment.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-teal-200 uppercase">Current Value</p>
                    <p className="text-lg font-mono font-bold text-white">
                      SAR {investment.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-teal-200 uppercase">Returns</p>
                    <p className={`text-lg font-mono font-bold ${investment.returns >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                      +SAR {investment.returns.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${
                        investment.status === 'confirmed' ? 'bg-green-400 animate-pulse' : 'bg-orange-400'
                      }`} />
                      <span className={`text-xs font-medium capitalize ${
                        investment.status === 'confirmed' ? 'text-green-400' : 'text-orange-400'
                      }`}>
                        {investment.status === 'confirmed' ? 'Active' : investment.status}
                      </span>
                    </div>
                  </div>
                  {investment.status === 'confirmed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openWithdrawDialog(investment)}
                      className="border-red-400/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Exit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="mt-6 p-4 bg-teal-700/50 rounded-xl border border-teal-600/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-white uppercase">Total Active Investments</p>
              <p className="text-sm text-teal-200 uppercase">Across {activeInvestments} properties</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-mono font-bold text-yellow-400">SAR {totalInvested.toLocaleString()}</p>
              <p className="text-sm text-teal-200 font-medium uppercase">Total Invested</p>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Confirmation Dialog */}
      <AlertDialog open={isWithdrawDialogOpen} onOpenChange={setIsWithdrawDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-serif">
              {selectedInvestment?.isAfterMaturity
                ? "Confirm Withdrawal"
                : "Early Withdrawal Warning"}
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-4 text-base">
              {!selectedInvestment?.isAfterMaturity && penalty > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900">Early Withdrawal Penalty</p>
                      <p className="text-sm text-red-700 mt-1">
                        You are withdrawing before the maturity date. A penalty of {getActualPenaltyRate()}% will be applied.
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
                    SAR {selectedInvestment?.amount?.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rental Yield Earned:</span>
                  <span className="font-mono font-semibold text-green-600">
                    +SAR {selectedInvestment?.returns?.toLocaleString() || 0}
                  </span>
                </div>

                {withdrawalDetails?.penalty?.isInLockInPeriod && withdrawalDetails?.penalty?.penaltyAmount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Early Withdrawal Penalty ({withdrawalDetails?.penalty?.penaltyPercentage}%):</span>
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
                      SAR {(withdrawalDetails?.netWithdrawalAmount || estimatedWithdrawal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              {selectedInvestment?.isAfterMaturity ? (
                <p className="text-sm text-gray-600">
                  This investment has reached maturity. No penalty will be applied.
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Maturity date is {new Date(selectedInvestment?.maturityDate).toLocaleDateString()}.
                  Withdrawing now means you will not receive appreciation gains.
                </p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isWithdrawing}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleWithdrawInvestment}
              disabled={isWithdrawing}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isWithdrawing ? "Processing..." : "Confirm Withdrawal"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}