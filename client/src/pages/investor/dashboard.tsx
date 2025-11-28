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
          title: "Investment Withdrawn",
          description: response.message || `Successfully withdrew SAR ${response.data?.withdrawalDetails?.totalWithdrawalAmount?.toFixed(2)}`,
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
        title: "Withdrawal Failed",
        description: error.response?.data?.message || "Failed to process withdrawal",
        variant: "destructive",
      })
    } finally {
      setIsWithdrawing(false)
    }
  }

  // Open withdrawal dialog
  const openWithdrawDialog = (investment: any) => {
    setSelectedInvestment(investment)
    setIsWithdrawDialogOpen(true)
  }

  // Calculate penalty if early withdrawal
  const calculatePenalty = () => {
    if (!selectedInvestment) return 0
    if (selectedInvestment.isAfterMaturity) return 0
    return selectedInvestment.amount * (selectedInvestment.penaltyRate / 100)
  }

  const penalty = calculatePenalty()
  const estimatedWithdrawal = selectedInvestment
    ? selectedInvestment.amount + selectedInvestment.returns - penalty
    : 0

  return (
    <div className="space-y-8 relative" data-testid="investor-dashboard">
      {/* Impressive Welcome Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-blue-600 to-emerald-700 p-8 text-white shadow-2xl">
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
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="font-semibold">Portfolio Active</span>
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
              className="bg-white text-emerald-700 hover:bg-white/90 font-semibold px-8 py-3 h-auto shadow-lg"
            >
              <Building className="w-5 h-5 mr-2" />
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
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold px-6 py-3 h-auto shadow-lg"
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
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 p-1 shadow-lg hover:shadow-2xl transition-all duration-300" data-testid="stat-portfolio-value">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-full relative">
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

        {/* Total Invested Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg hover:shadow-2xl transition-all duration-300" data-testid="stat-total-invested">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-full relative">
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
              </div>
            </div>
          </div>
        </div>

        {/* Total Returns Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-1 shadow-lg hover:shadow-2xl transition-all duration-300" data-testid="stat-total-returns">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-full relative">
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
                <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                  SAR {totalReturns.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Investments Card */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 p-1 shadow-lg hover:shadow-2xl transition-all duration-300" data-testid="stat-active-investments">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 h-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded-full">
                  <span className="text-xs font-semibold text-purple-600">+2 this month</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Investments</p>
                <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                  {activeInvestments}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enhanced Portfolio Performance Chart */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/50 border border-gray-200 dark:border-gray-700 shadow-xl" data-testid="card-portfolio-chart">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5" />
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white">
                    Portfolio Performance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Investment growth over the last 7 months
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">ROI</p>
                <p className="text-2xl font-mono font-bold text-emerald-600">
                  {totalReturnPercentage >= 0 ? '+' : ''}{totalReturnPercentage.toFixed(1)}%
                </p>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-white/5 rounded-xl p-4 backdrop-blur-sm">
              <DashboardChart 
                title="Portfolio Growth"
                type="line"
                data={portfolioData} 
              />
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions & Info */}
        <div className="space-y-6">
          {/* Enhanced Upcoming Payouts */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-1 shadow-xl" data-testid="card-upcoming-payouts">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white">
                      Upcoming Payouts
                    </h3>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Next Payout</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">{nextPayout}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-mono font-bold text-green-600">SAR {pendingReturns.toLocaleString()}</p>
                      <p className="text-xs text-green-500 font-medium">Estimated</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-semibold" 
                  data-testid="button-view-payouts"
                >
                  View All Payouts
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced KYC Status */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-xl" data-testid="card-kyc-status">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white">
                      Verification Status
                    </h3>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">KYC Verification</span>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user?.kycStatus === 'approved'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : user?.kycStatus === 'submitted' || user?.kycStatus === 'under_review' || user?.kycStatus === 'pending_review'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
                    }`}>
                      {user?.kycStatus === 'approved' ? 'Verified' :
                       user?.kycStatus === 'submitted' || user?.kycStatus === 'under_review' || user?.kycStatus === 'pending_review' ? 'Completed - Under Review' :
                       'Pending'}
                    </div>
                  </div>

                  {(user?.kycStatus === 'submitted' || user?.kycStatus === 'under_review' || user?.kycStatus === 'pending_review') && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                      <Clock className="h-4 w-4" />
                      <span>Your documents are being reviewed. This usually takes 1-2 business days.</span>
                    </div>
                  )}
                </div>

                {user?.kycStatus !== 'approved' && user?.kycStatus !== 'submitted' && user?.kycStatus !== 'under_review' && user?.kycStatus !== 'pending_review' && (
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold"
                    onClick={() => setLocation('/kyc')}
                    data-testid="button-complete-kyc"
                  >
                    Complete KYC Verification
                  </Button>
                )}

                {(user?.kycStatus === 'submitted' || user?.kycStatus === 'under_review' || user?.kycStatus === 'pending_review') && (
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold"
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
      </div>

      {/* Enhanced Recent Investments */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl" data-testid="card-recent-investments">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5" />
        
        <div className="relative z-10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                <Building className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                  Recent Investments
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Your latest property investments and their performance
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setLocation('/investor/portfolio')} 
              data-testid="button-view-all-investments"
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold px-6"
            >
              View All Investments
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentInvestments.map((investment, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-sm p-4 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 group"
                data-testid={`investment-${index}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-md">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-serif font-semibold text-gray-900 dark:text-white text-lg">
                        {investment.property}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {investment.date}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-xl font-mono font-bold text-gray-900 dark:text-white">
                        SAR {investment.amount.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${
                          investment.status === 'confirmed' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'
                        }`} />
                        <span className={`text-sm font-medium capitalize ${
                          investment.status === 'confirmed' ? 'text-green-600' : 'text-orange-600'
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
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
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
          
          <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Total Active Investments</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Across {activeInvestments} properties</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-mono font-bold text-emerald-600">SAR {totalInvested.toLocaleString()}</p>
                <p className="text-sm text-emerald-500 font-medium">Total Invested</p>
              </div>
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
                        You are withdrawing before the maturity date. A penalty of {selectedInvestment?.penaltyRate}% will be applied.
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

                {!selectedInvestment?.isAfterMaturity && penalty > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Early Withdrawal Penalty ({selectedInvestment?.penaltyRate}%):</span>
                    <span className="font-mono font-semibold text-red-600">
                      -SAR {penalty.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-300">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">You will receive:</span>
                    <span className="font-mono font-bold text-emerald-600 text-lg">
                      SAR {estimatedWithdrawal.toLocaleString()}
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