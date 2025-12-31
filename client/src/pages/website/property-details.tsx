import { useState, useEffect } from "react"
import { useRoute } from "wouter"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { InvestmentModal } from "@/components/investment-modal"
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-client"
import { Input } from "@/components/ui/input"
import {
  MapPin,
  TrendingUp,
  Clock,
  DollarSign,
  Home,
  Users,
  Building2,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Calculator
} from "lucide-react"
import { useLocation } from "wouter"

interface PropertyDetailsPageProps {}

export default function PropertyDetailsPage() {
  const [, params] = useRoute("/website/property/:id")
  const [, setLocation] = useLocation()
  const { toast } = useToast()
  const { isAuthenticated } = useAuth()

  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showInvestModal, setShowInvestModal] = useState(false)
  const [calculatorUnits, setCalculatorUnits] = useState(1)
  const [calculatorLoading, setCalculatorLoading] = useState(false)
  const [calculatorResults, setCalculatorResults] = useState<any>(null)
  const [calculatorView, setCalculatorView] = useState<'annual' | 'bond'>('annual')

  // Get KYC status
  const getKYCStatus = () => {
    try {
      const userData = localStorage.getItem('zaron_user')
      if (!userData) return { isKYCCompleted: false, kycStatus: 'not_submitted', isLoggedIn: false }
      const user = JSON.parse(userData)
      const kycStatus = user.kycStatus || 'not_submitted'
      const isKYCCompleted = kycStatus === 'submitted' || kycStatus === 'under_review' || kycStatus === 'approved'
      return { isKYCCompleted, kycStatus, isLoggedIn: true }
    } catch {
      return { isKYCCompleted: false, kycStatus: 'not_submitted', isLoggedIn: false }
    }
  }

  const { isKYCCompleted, kycStatus, isLoggedIn } = getKYCStatus()

  // Calculate returns using API
  const calculateReturns = async (units: number) => {
    if (!property) return

    const investmentAmount = units * (property.financials?.pricePerShare || 0)
    if (investmentAmount <= 0) return

    setCalculatorLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CALCULATE_RETURNS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          investmentAmount,
          propertyId: property._id,
          lockingPeriodYears: property.investmentTerms?.lockingPeriodYears || 5,
          graduatedPenalties: property.investmentTerms?.graduatedPenalties || []
        })
      })

      const data = await response.json()
      if (data.success) {
        setCalculatorResults(data)
      }
    } catch (err) {
      console.error('Calculation error:', err)
    } finally {
      setCalculatorLoading(false)
    }
  }

  // Handle slider change with debounce
  const handleSliderChange = (value: number[]) => {
    setCalculatorUnits(value[0])
    // Debounce API call
    const timeoutId = setTimeout(() => {
      calculateReturns(value[0])
    }, 300)
    return () => clearTimeout(timeoutId)
  }

  // Initial calculation when property loads
  useEffect(() => {
    if (property && !calculatorResults) {
      calculateReturns(calculatorUnits)
    }
  }, [property])

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.PROPERTIES}/${params?.id}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('zaron_token')}`
            }
          }
        )
        const data = await response.json()

        if (data.success && data.data) {
          setProperty(data.data)
        } else {
          setError('Failed to load property')
        }
      } catch (err) {
        setError('Error loading property details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (params?.id) {
      fetchProperty()
    }
  }, [params?.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-green-400" />
          <p className="text-lg text-teal-200">Loading property details...</p>
        </div>
      </div>
    )
  }

  // Handle invest click
  const handleInvestClick = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to start investing",
        variant: "destructive"
      })
      setLocation('/website/login')
      return
    }

    if (!isKYCCompleted) {
      toast({
        title: "KYC Verification Required",
        description: "Complete your KYC verification to start investing",
        variant: "destructive"
      })
      setLocation('/website/kyc-verification')
      return
    }

    setShowInvestModal(true)
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800 flex items-center justify-center p-6">
        <div className="max-w-md mx-auto bg-teal-800/90 backdrop-blur-sm border border-teal-700/50 rounded-2xl p-8 text-center space-y-6">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto" />
          <p className="text-lg text-white">{error || 'Property not found'}</p>
          <Button
            onClick={() => setLocation('/website/properties')}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold"
          >
            Back to Properties
          </Button>
        </div>
      </div>
    )
  }

  const imageUrl = property.images?.[0]?.url
    ? property.images[0].url.startsWith('http')
      ? property.images[0].url
      : `${API_BASE_URL.replace('/api', '')}${property.images[0].url}`
    : 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'

  const propertyStatus = property.status === 'fully_funded' ? 'Fully Funded' :
                        property.status === 'active' ? 'Active' :
                        property.status === 'upcoming' ? 'Coming Soon' : 'Inactive'

  const investmentTerms = property.investmentTerms || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800 px-3 py-4 space-y-4">
      <div className="max-w-full mx-auto px-2">
        {/* Header */}
        <div className="mb-4">
          <Button
            onClick={() => setLocation('/website/properties')}
            className="flex items-center gap-2 bg-teal-700/50 border border-teal-600/50 text-white hover:bg-teal-600 hover:text-white hover:border-teal-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Main Info */}
          <div className="lg:col-span-3 space-y-4">
            {/* Property Image */}
            <div className="overflow-hidden rounded-2xl bg-teal-800/90 backdrop-blur-sm border border-teal-700/50 shadow-xl">
              <img
                src={imageUrl}
                alt={property.title}
                className="w-full h-[500px] object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
                }}
              />
            </div>

            {/* Title & Location */}
            <div className="rounded-2xl bg-teal-800/90 backdrop-blur-sm border border-teal-700/50 shadow-xl p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">{property.title}</h1>
                  <p className="flex items-center gap-2 text-teal-200 text-base">
                    <MapPin className="w-5 h-5 text-green-400" />
                    {property.location?.address}, {property.location?.city}
                  </p>
                </div>
                <div className="flex gap-2">
                  <div className={`px-3 py-1.5 rounded-lg border ${
                    propertyStatus === 'Active' ? 'bg-green-500/20 border-green-400/30 text-green-300' :
                    propertyStatus === 'Coming Soon' ? 'bg-blue-500/20 border-blue-400/30 text-blue-300' :
                    'bg-gray-500/20 border-gray-400/30 text-gray-300'
                  }`}>
                    <span className="text-sm font-bold uppercase">{propertyStatus}</span>
                  </div>
                  {property.propertyType && (
                    <div className="px-3 py-1.5 rounded-lg border bg-teal-700/50 border-teal-600/30 text-teal-200">
                      <span className="text-sm font-semibold">
                        {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {property.description && (
                <p className="text-teal-200 leading-relaxed">{property.description}</p>
              )}
            </div>

            {/* Financial Overview */}
            <div className="rounded-2xl bg-teal-800/90 backdrop-blur-sm border border-teal-700/50 shadow-xl p-4">
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">Financial Overview</h2>
              <div className="space-y-6">
                {/* Investment Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-teal-900/70 p-4 rounded-xl border border-teal-700/50">
                    <p className="text-sm text-teal-300 mb-1 uppercase">Price per Share</p>
                    <p className="text-2xl font-bold text-green-400">
                      SAR {property.financials?.pricePerShare?.toLocaleString() || 0}
                    </p>
                  </div>

                  <div className="bg-teal-900/70 p-4 rounded-xl border border-teal-700/50">
                    <p className="text-sm text-teal-300 mb-1 uppercase">Available Shares</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {property.financials?.availableShares?.toLocaleString() || 0}
                    </p>
                  </div>

                  <div className="bg-teal-900/70 p-4 rounded-xl border border-teal-700/50">
                    <p className="text-sm text-teal-300 mb-1 uppercase">Projected Yield</p>
                    <p className="text-2xl font-bold text-green-400">
                      {property.financials?.projectedYield}%
                    </p>
                  </div>

                  <div className="bg-teal-900/70 p-4 rounded-xl border border-teal-700/50">
                    <p className="text-sm text-teal-300 mb-1 uppercase">Total Property Value</p>
                    <p className="text-2xl font-bold text-white">
                      SAR {(property.financials?.totalValue / 1000000)?.toFixed(1)}M
                    </p>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="space-y-3 bg-teal-900/70 p-4 rounded-xl border border-teal-700/50">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white uppercase">Funding Progress</span>
                    <span className="text-sm text-teal-200 font-mono">{property.fundingProgress?.toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-teal-700/30 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${property.fundingProgress || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Terms */}
            {Object.keys(investmentTerms).length > 0 && (
              <div className="rounded-2xl bg-teal-800/90 backdrop-blur-sm border border-teal-700/50 shadow-xl p-4">
                <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">Investment Terms</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {investmentTerms.rentalYieldRate && (
                      <div className="flex items-start gap-3 bg-teal-900/70 p-3 rounded-xl border border-teal-700/50">
                        <TrendingUp className="w-5 h-5 text-green-400 mt-1" />
                        <div>
                          <p className="text-sm text-teal-300 uppercase">Annual Rental Yield</p>
                          <p className="text-lg font-bold text-white">{investmentTerms.rentalYieldRate}%</p>
                        </div>
                      </div>
                    )}
                    {investmentTerms.appreciationRate && (
                      <div className="flex items-start gap-3 bg-teal-900/70 p-3 rounded-xl border border-teal-700/50">
                        <Home className="w-5 h-5 text-blue-400 mt-1" />
                        <div>
                          <p className="text-sm text-teal-300 uppercase">Annual Appreciation</p>
                          <p className="text-lg font-bold text-white">{investmentTerms.appreciationRate}%</p>
                        </div>
                      </div>
                    )}
                    {investmentTerms.lockingPeriodYears && (
                      <div className="flex items-start gap-3 bg-teal-900/70 p-3 rounded-xl border border-teal-700/50">
                        <Clock className="w-5 h-5 text-orange-400 mt-1" />
                        <div>
                          <p className="text-sm text-teal-300 uppercase">Lock-in Period</p>
                          <p className="text-lg font-bold text-white">{investmentTerms.lockingPeriodYears} Years</p>
                        </div>
                      </div>
                    )}
                    {investmentTerms.bondMaturityYears && (
                      <div className="flex items-start gap-3 bg-teal-900/70 p-3 rounded-xl border border-teal-700/50">
                        <Clock className="w-5 h-5 text-purple-400 mt-1" />
                        <div>
                          <p className="text-sm text-teal-300 uppercase">Bond Maturity</p>
                          <p className="text-lg font-bold text-white">{investmentTerms.bondMaturityYears} Years</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Graduated Penalties */}
                  {investmentTerms.graduatedPenalties && investmentTerms.graduatedPenalties.length > 0 && (
                    <div className="pt-4 border-t border-teal-700/50">
                      <p className="font-semibold mb-3 text-white uppercase">Early Withdrawal Penalties</p>
                      <div className="space-y-2">
                        {investmentTerms.graduatedPenalties.map((penalty: any) => (
                          <div key={penalty._id} className="flex justify-between items-center p-3 bg-teal-900/70 rounded-xl border border-teal-700/50">
                            <span className="text-sm text-teal-200">Year {penalty.year}</span>
                            <span className="font-semibold text-red-400">{penalty.penaltyPercentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {/* Key Stats */}
            <div className="rounded-2xl bg-teal-800/90 backdrop-blur-sm border border-teal-700/50 shadow-xl p-4">
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide">Key Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-teal-900/70 rounded-xl border border-teal-700/50">
                  <Users className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-teal-300 uppercase">Investors</p>
                    <p className="font-bold text-white">{property.investorCount || 0}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-teal-900/70 rounded-xl border border-teal-700/50">
                  <Building2 className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-teal-300 uppercase">Min Investment</p>
                    <p className="font-bold text-white">SAR {property.financials?.minInvestment?.toLocaleString() || 0}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-teal-900/70 rounded-xl border border-teal-700/50">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-teal-300 uppercase">Total Invested</p>
                    <p className="font-bold text-white">SAR {property.totalInvested?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Calculator */}
            <div className="rounded-2xl bg-teal-800/90 backdrop-blur-sm border border-teal-700/50 shadow-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-green-400" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-wide">Investment Calculator</h2>
              </div>
              <p className="text-teal-200 mb-6">Estimate your returns based on units purchased</p>
              <div className="space-y-6">
                {/* Units Slider */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Units to Purchase</span>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={calculatorUnits}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1
                          const maxUnits = Math.min(property.financials?.availableShares || 100, 500)
                          const clampedVal = Math.max(1, Math.min(val, maxUnits))
                          setCalculatorUnits(clampedVal)
                          calculateReturns(clampedVal)
                        }}
                        className="w-20 h-8 text-center font-bold text-emerald-400"
                        min={1}
                        max={Math.min(property.financials?.availableShares || 100, 500)}
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    value={calculatorUnits}
                    onChange={(e) => handleSliderChange([parseInt(e.target.value)])}
                    min={1}
                    max={Math.min(property.financials?.availableShares || 100, 500)}
                    step={1}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-xs text-teal-200">
                    <span>1 unit</span>
                    <span>{Math.min(property.financials?.availableShares || 100, 500)} units</span>
                  </div>
                </div>

                {/* Investment Amount */}
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-lg">
                  <p className="text-sm text-teal-700 dark:text-teal-200 mb-1">Investment Amount</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    SAR {(calculatorUnits * (property.financials?.pricePerShare || 0)).toLocaleString()}
                  </p>
                </div>

                {/* Loading State */}
                {calculatorLoading && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                    <span className="ml-2 text-sm text-teal-200">Calculating...</span>
                  </div>
                )}

                {/* API Results with Tabs */}
                {calculatorResults && !calculatorLoading && (
                  <div className="space-y-4">
                    {/* Tab Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant={calculatorView === 'annual' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCalculatorView('annual')}
                        className={calculatorView === 'annual' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'border-teal-700 text-teal-700 dark:text-teal-200 hover:bg-teal-700/50 hover:text-white'}
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Annual Returns
                      </Button>
                      <Button
                        variant={calculatorView === 'bond' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCalculatorView('bond')}
                        className={calculatorView === 'bond' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'border-teal-700 text-teal-700 dark:text-teal-200 hover:bg-teal-700/50 hover:text-white'}
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Bond Investment
                      </Button>
                    </div>

                    {/* Annual Returns View */}
                    {calculatorView === 'annual' && (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-teal-200">Annual Returns</p>

                        {/* Annual Rental Income */}
                        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm text-teal-700 dark:text-teal-200">Rental Yield ({calculatorResults.settings?.rentalYieldPercentage || 0}%)</span>
                          </div>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            +SAR {Math.round(calculatorResults.returns?.annualRentalIncome || 0).toLocaleString()}
                          </span>
                        </div>

                        {/* Annual Appreciation */}
                        <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm text-teal-700 dark:text-teal-200">Appreciation ({calculatorResults.settings?.appreciationRatePercentage || 0}%)</span>
                          </div>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            +SAR {Math.round(calculatorResults.returns?.annualAppreciation || 0).toLocaleString()}
                          </span>
                        </div>

                        {/* Total Annual Return */}
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-lg border-2 border-emerald-600 dark:border-emerald-800">
                          <span className="text-sm font-bold text-teal-900 dark:text-white">Total Annual Return</span>
                          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                            +SAR {Math.round(calculatorResults.returns?.totalAnnualReturn || ((calculatorResults.returns?.annualRentalIncome || 0) + (calculatorResults.returns?.annualAppreciation || 0))).toLocaleString()}
                          </span>
                        </div>

                        {/* Annual ROI */}
                        <div className="bg-muted/50 p-3 rounded-lg text-sm">
                          <div className="flex justify-between">
                            <span className="text-teal-700 dark:text-teal-200">Investment:</span>
                            <span className="font-medium text-teal-900 dark:text-white">SAR {calculatorResults.investmentAmount?.toLocaleString() || 0}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t mt-2">
                            <span className="font-semibold text-teal-900 dark:text-white">Annual ROI:</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              {(((calculatorResults.returns?.annualRentalIncome || 0) + (calculatorResults.returns?.annualAppreciation || 0)) / (calculatorResults.investmentAmount || 1) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bond Investment View */}
                    {calculatorView === 'bond' && (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-teal-200">Bond Investment Returns</p>

                        {/* After Locking Period */}
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                              <span className="text-sm font-semibold text-teal-900 dark:text-white">After Locking Period ({calculatorResults.returns?.lockingPeriod?.years || calculatorResults.settings?.lockingPeriodYears || 5} years)</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-teal-700 dark:text-teal-200">Rental Yield:</span>
                              <span className="text-green-600 dark:text-green-400">+SAR {Math.round(calculatorResults.returns?.lockingPeriod?.rentalYield || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-teal-700 dark:text-teal-200">Appreciation:</span>
                              <span className="text-blue-600 dark:text-blue-400">+SAR {Math.round(calculatorResults.returns?.lockingPeriod?.appreciation || 0).toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-orange-200 dark:border-orange-700">
                            <span className="text-sm text-teal-700 dark:text-teal-200">Total Value:</span>
                            <span className="font-bold text-orange-600 dark:text-orange-400">
                              SAR {Math.round(calculatorResults.returns?.lockingPeriod?.projectedValue || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* At Bond Maturity */}
                        <div className="p-4 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-lg border-2 border-emerald-600 dark:border-emerald-800 space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                              <span className="text-sm font-bold text-teal-900 dark:text-white">At Bond Maturity ({calculatorResults.returns?.atMaturity?.years || calculatorResults.settings?.bondMaturityYears || 10} years)</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-teal-700 dark:text-teal-200">Total Rental:</span>
                              <span className="text-green-600 dark:text-green-400">+SAR {Math.round(calculatorResults.returns?.atMaturity?.rentalYield || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-teal-700 dark:text-teal-200">Total Appreciation:</span>
                              <span className="text-blue-600 dark:text-blue-400">+SAR {Math.round(calculatorResults.returns?.atMaturity?.appreciation || 0).toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-emerald-300 dark:border-emerald-700">
                            <span className="text-sm font-semibold text-teal-900 dark:text-white">Final Value:</span>
                            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                              SAR {Math.round(calculatorResults.returns?.atMaturity?.projectedValue || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Total Returns Summary */}
                        <div className="bg-muted/50 p-3 rounded-lg space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-teal-700 dark:text-teal-200">Investment:</span>
                            <span className="font-medium text-teal-900 dark:text-white">SAR {calculatorResults.investmentAmount?.toLocaleString() || 0}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t">
                            <span className="font-semibold text-teal-900 dark:text-white">Total Returns at Maturity:</span>
                            <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">+SAR {Math.round(calculatorResults.returns?.atMaturity?.totalReturns || 0).toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Early Withdrawal Warning */}
                        {calculatorResults.earlyWithdrawal && (
                          <div className="bg-red-50 dark:bg-red-900/20 border border-red-600 dark:border-red-800 p-3 rounded-lg">
                            <p className="text-xs font-semibold text-red-900 dark:text-red-100">Early Withdrawal Penalty</p>
                            <p className="text-xs text-red-700 dark:text-red-200 mt-1">
                              {calculatorResults.earlyWithdrawal.penaltyPercentage}% penalty if withdrawn before {calculatorResults.earlyWithdrawal.lockingPeriodYears} years
                              (You'd receive: SAR {Math.round(calculatorResults.earlyWithdrawal.amountAfterPenalty || 0).toLocaleString()})
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Fallback - Show local calculation if API not loaded */}
                {!calculatorResults && !calculatorLoading && (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-teal-200">Projected Annual Returns</p>

                    {/* Rental Yield */}
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm text-teal-700 dark:text-teal-200">Rental Yield ({investmentTerms.rentalYieldRate || property.financials?.projectedYield || 0}%)</span>
                      </div>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        +SAR {((calculatorUnits * (property.financials?.pricePerShare || 0)) * ((investmentTerms.rentalYieldRate || property.financials?.projectedYield || 0) / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    {/* Appreciation */}
                    {investmentTerms.appreciationRate > 0 && (
                      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-teal-700 dark:text-teal-200">Appreciation ({investmentTerms.appreciationRate}%)</span>
                        </div>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          +SAR {((calculatorUnits * (property.financials?.pricePerShare || 0)) * (investmentTerms.appreciationRate / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    )}

                    {/* Total Annual Return */}
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-2 border-purple-600 dark:border-purple-800">
                      <span className="text-sm font-semibold text-teal-900 dark:text-white">Total Annual Return</span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        +SAR {((calculatorUnits * (property.financials?.pricePerShare || 0)) * (((investmentTerms.rentalYieldRate || property.financials?.projectedYield || 0) + (investmentTerms.appreciationRate || 0)) / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    {/* After Locking Period */}
                    {investmentTerms.lockingPeriodYears > 0 && (
                      <div className="pt-3 border-t">
                        <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            <div>
                              <span className="text-sm font-semibold text-teal-900 dark:text-white">After Locking Period</span>
                              <p className="text-xs text-teal-700 dark:text-teal-200">{investmentTerms.lockingPeriodYears} years</p>
                            </div>
                          </div>
                          <span className="font-bold text-orange-600 dark:text-orange-400">
                            SAR {(
                              (calculatorUnits * (property.financials?.pricePerShare || 0)) +
                              ((calculatorUnits * (property.financials?.pricePerShare || 0)) *
                              (((investmentTerms.rentalYieldRate || property.financials?.projectedYield || 0) + (investmentTerms.appreciationRate || 0)) / 100) *
                              investmentTerms.lockingPeriodYears)
                            ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* At Bond Maturity */}
                    {investmentTerms.bondMaturityYears > 0 && (
                      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <div>
                            <span className="text-sm font-semibold text-teal-900 dark:text-white">At Bond Maturity</span>
                            <p className="text-xs text-teal-700 dark:text-teal-200">{investmentTerms.bondMaturityYears} years</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                          SAR {(
                            (calculatorUnits * (property.financials?.pricePerShare || 0)) +
                            ((calculatorUnits * (property.financials?.pricePerShare || 0)) *
                            (((investmentTerms.rentalYieldRate || property.financials?.projectedYield || 0) + (investmentTerms.appreciationRate || 0)) / 100) *
                            investmentTerms.bondMaturityYears)
                          ).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    )}

                    {/* Early Withdrawal Warning */}
                    {investmentTerms.graduatedPenalties && investmentTerms.graduatedPenalties.length > 0 && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-600 dark:border-red-800 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-red-900 dark:text-red-100">Early Withdrawal Penalty</p>
                        <p className="text-xs text-red-700 dark:text-red-200 mt-1">
                          {investmentTerms.graduatedPenalties[0]?.penaltyPercentage}% penalty if withdrawn before {investmentTerms.lockingPeriodYears} years
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                disabled={propertyStatus === 'Fully Funded'}
                onClick={handleInvestClick}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                {propertyStatus === 'Fully Funded' ? 'Fully Funded' : 'Invest Now'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border-teal-600 text-teal-700 dark:text-teal-200 hover:bg-teal-700/50 hover:text-white"
                onClick={() => setLocation('/website/properties')}
              >
                View More Properties
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      <InvestmentModal
        property={property}
        isOpen={showInvestModal}
        onClose={() => setShowInvestModal(false)}
        onSuccess={() => {
          setShowInvestModal(false)
          // Refresh property data after successful investment
          if (params?.id) {
            setLoading(true)
          }
        }}
      />
    </div>
  )
}
