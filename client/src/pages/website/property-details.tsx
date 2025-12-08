import { useState, useEffect } from "react"
import { useRoute } from "wouter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/50 dark:from-gray-900 dark:to-emerald-950/50 flex items-center justify-center">
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-12 w-12 animate-spin mb-4" />
            <p className="text-lg text-muted-foreground">Loading property details...</p>
          </CardContent>
        </Card>
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/50 dark:from-gray-900 dark:to-emerald-950/50 flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-lg text-muted-foreground mb-6">{error || 'Property not found'}</p>
            <Button onClick={() => setLocation('/website/properties')}>
              Back to Properties
            </Button>
          </CardContent>
        </Card>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/50 dark:from-gray-900 dark:to-emerald-950/50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setLocation('/website/properties')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Image */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <img
                src={imageUrl}
                alt={property.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
                }}
              />
            </Card>

            {/* Title & Location */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl mb-2">{property.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base">
                      <MapPin className="w-5 h-5" />
                      {property.location?.address}, {property.location?.city}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className={
                        propertyStatus === 'Active' ? 'bg-green-100 text-green-800' :
                        propertyStatus === 'Coming Soon' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }
                    >
                      {propertyStatus}
                    </Badge>
                    {property.propertyType && (
                      <Badge variant="outline">
                        {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              {property.description && (
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                </CardContent>
              )}
            </Card>

            {/* Financial Overview */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Investment Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Price per Share</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      SAR {property.financials?.pricePerShare?.toLocaleString() || 0}
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Available Shares</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {property.financials?.availableShares?.toLocaleString() || 0}
                    </p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Projected Yield</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {property.financials?.projectedYield}%
                    </p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Total Property Value</p>
                    <p className="text-2xl font-bold text-orange-600">
                      SAR {(property.financials?.totalValue / 1000000)?.toFixed(1)}M
                    </p>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Funding Progress</span>
                    <span className="text-sm text-muted-foreground">{property.fundingProgress?.toFixed(2)}%</span>
                  </div>
                  <Progress value={property.fundingProgress || 0} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Investment Terms */}
            {Object.keys(investmentTerms).length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Investment Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {investmentTerms.rentalYieldRate && (
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">Annual Rental Yield</p>
                          <p className="text-lg font-bold">{investmentTerms.rentalYieldRate}%</p>
                        </div>
                      </div>
                    )}
                    {investmentTerms.appreciationRate && (
                      <div className="flex items-start gap-3">
                        <Home className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">Annual Appreciation</p>
                          <p className="text-lg font-bold">{investmentTerms.appreciationRate}%</p>
                        </div>
                      </div>
                    )}
                    {investmentTerms.lockingPeriodYears && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-orange-600 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">Lock-in Period</p>
                          <p className="text-lg font-bold">{investmentTerms.lockingPeriodYears} Years</p>
                        </div>
                      </div>
                    )}
                    {investmentTerms.bondMaturityYears && (
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-purple-600 mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">Bond Maturity</p>
                          <p className="text-lg font-bold">{investmentTerms.bondMaturityYears} Years</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Graduated Penalties */}
                  {investmentTerms.graduatedPenalties && investmentTerms.graduatedPenalties.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="font-semibold mb-3">Early Withdrawal Penalties</p>
                      <div className="space-y-2">
                        {investmentTerms.graduatedPenalties.map((penalty: any) => (
                          <div key={penalty._id} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                            <span className="text-sm">Year {penalty.year}</span>
                            <span className="font-semibold text-red-600">{penalty.penaltyPercentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Stats */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Investors</p>
                    <p className="font-bold">{property.investorCount || 0}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Min Investment</p>
                    <p className="font-bold">SAR {property.financials?.minInvestment?.toLocaleString() || 0}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Invested</p>
                    <p className="font-bold">SAR {property.totalInvested?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Calculator */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  Investment Calculator
                </CardTitle>
                <CardDescription>
                  Estimate your returns based on units purchased
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Units Slider */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Units to Purchase</span>
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
                        className="w-20 h-8 text-center font-bold text-emerald-600"
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
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 unit</span>
                    <span>{Math.min(property.financials?.availableShares || 100, 500)} units</span>
                  </div>
                </div>

                {/* Investment Amount */}
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Investment Amount</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    SAR {(calculatorUnits * (property.financials?.pricePerShare || 0)).toLocaleString()}
                  </p>
                </div>

                {/* Loading State */}
                {calculatorLoading && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
                    <span className="ml-2 text-sm text-muted-foreground">Calculating...</span>
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
                        className={calculatorView === 'annual' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                      >
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Annual Returns
                      </Button>
                      <Button
                        variant={calculatorView === 'bond' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCalculatorView('bond')}
                        className={calculatorView === 'bond' ? 'bg-blue-600 hover:bg-blue-700' : ''}
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Bond Investment
                      </Button>
                    </div>

                    {/* Annual Returns View */}
                    {calculatorView === 'annual' && (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-muted-foreground">Annual Returns</p>

                        {/* Annual Rental Income */}
                        <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm">Rental Yield ({calculatorResults.settings?.rentalYieldPercentage || 0}%)</span>
                          </div>
                          <span className="font-bold text-green-600">
                            +SAR {Math.round(calculatorResults.returns?.annualRentalIncome || 0).toLocaleString()}
                          </span>
                        </div>

                        {/* Annual Appreciation */}
                        <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">Appreciation ({calculatorResults.settings?.appreciationRatePercentage || 0}%)</span>
                          </div>
                          <span className="font-bold text-blue-600">
                            +SAR {Math.round(calculatorResults.returns?.annualAppreciation || 0).toLocaleString()}
                          </span>
                        </div>

                        {/* Total Annual Return */}
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-lg border-2 border-emerald-200 dark:border-emerald-800">
                          <span className="text-sm font-bold">Total Annual Return</span>
                          <span className="text-xl font-bold text-emerald-600">
                            +SAR {Math.round(calculatorResults.returns?.totalAnnualReturn || ((calculatorResults.returns?.annualRentalIncome || 0) + (calculatorResults.returns?.annualAppreciation || 0))).toLocaleString()}
                          </span>
                        </div>

                        {/* Annual ROI */}
                        <div className="bg-muted/50 p-3 rounded-lg text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Investment:</span>
                            <span className="font-medium">SAR {calculatorResults.investmentAmount?.toLocaleString() || 0}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t mt-2">
                            <span className="font-semibold">Annual ROI:</span>
                            <span className="font-bold text-emerald-600">
                              {(((calculatorResults.returns?.annualRentalIncome || 0) + (calculatorResults.returns?.annualAppreciation || 0)) / (calculatorResults.investmentAmount || 1) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Bond Investment View */}
                    {calculatorView === 'bond' && (
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-muted-foreground">Bond Investment Returns</p>

                        {/* After Locking Period */}
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-orange-600" />
                              <span className="text-sm font-semibold">After Locking Period ({calculatorResults.returns?.lockingPeriod?.years || calculatorResults.settings?.lockingPeriodYears || 5} years)</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Rental Yield:</span>
                              <span className="text-green-600">+SAR {Math.round(calculatorResults.returns?.lockingPeriod?.rentalYield || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Appreciation:</span>
                              <span className="text-blue-600">+SAR {Math.round(calculatorResults.returns?.lockingPeriod?.appreciation || 0).toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-orange-200">
                            <span className="text-sm">Total Value:</span>
                            <span className="font-bold text-orange-600">
                              SAR {Math.round(calculatorResults.returns?.lockingPeriod?.projectedValue || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* At Bond Maturity */}
                        <div className="p-4 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-lg border-2 border-emerald-200 dark:border-emerald-800 space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-5 h-5 text-emerald-600" />
                              <span className="text-sm font-bold">At Bond Maturity ({calculatorResults.returns?.atMaturity?.years || calculatorResults.settings?.bondMaturityYears || 10} years)</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Total Rental:</span>
                              <span className="text-green-600">+SAR {Math.round(calculatorResults.returns?.atMaturity?.rentalYield || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Total Appreciation:</span>
                              <span className="text-blue-600">+SAR {Math.round(calculatorResults.returns?.atMaturity?.appreciation || 0).toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-emerald-300">
                            <span className="text-sm font-semibold">Final Value:</span>
                            <span className="text-xl font-bold text-emerald-600">
                              SAR {Math.round(calculatorResults.returns?.atMaturity?.projectedValue || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Total Returns Summary */}
                        <div className="bg-muted/50 p-3 rounded-lg space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Investment:</span>
                            <span className="font-medium">SAR {calculatorResults.investmentAmount?.toLocaleString() || 0}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t">
                            <span className="font-semibold">Total Returns at Maturity:</span>
                            <span className="font-bold text-lg text-emerald-600">+SAR {Math.round(calculatorResults.returns?.atMaturity?.totalReturns || 0).toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Early Withdrawal Warning */}
                        {calculatorResults.earlyWithdrawal && (
                          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg">
                            <p className="text-xs font-semibold text-red-900 dark:text-red-100">Early Withdrawal Penalty</p>
                            <p className="text-xs text-red-800 dark:text-red-200 mt-1">
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
                    <p className="text-sm font-semibold text-muted-foreground">Projected Annual Returns</p>

                    {/* Rental Yield */}
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Rental Yield ({investmentTerms.rentalYieldRate || property.financials?.projectedYield || 0}%)</span>
                      </div>
                      <span className="font-bold text-green-600">
                        +SAR {((calculatorUnits * (property.financials?.pricePerShare || 0)) * ((investmentTerms.rentalYieldRate || property.financials?.projectedYield || 0) / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    {/* Appreciation */}
                    {investmentTerms.appreciationRate > 0 && (
                      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">Appreciation ({investmentTerms.appreciationRate}%)</span>
                        </div>
                        <span className="font-bold text-blue-600">
                          +SAR {((calculatorUnits * (property.financials?.pricePerShare || 0)) * (investmentTerms.appreciationRate / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    )}

                    {/* Total Annual Return */}
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-2 border-purple-200 dark:border-purple-800">
                      <span className="text-sm font-semibold">Total Annual Return</span>
                      <span className="font-bold text-purple-600">
                        +SAR {((calculatorUnits * (property.financials?.pricePerShare || 0)) * (((investmentTerms.rentalYieldRate || property.financials?.projectedYield || 0) + (investmentTerms.appreciationRate || 0)) / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    {/* After Locking Period */}
                    {investmentTerms.lockingPeriodYears > 0 && (
                      <div className="pt-3 border-t">
                        <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <div>
                              <span className="text-sm font-semibold">After Locking Period</span>
                              <p className="text-xs text-muted-foreground">{investmentTerms.lockingPeriodYears} years</p>
                            </div>
                          </div>
                          <span className="font-bold text-orange-600">
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
                          <DollarSign className="w-4 h-4 text-emerald-600" />
                          <div>
                            <span className="text-sm font-semibold">At Bond Maturity</span>
                            <p className="text-xs text-muted-foreground">{investmentTerms.bondMaturityYears} years</p>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-emerald-600">
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
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg">
                        <p className="text-xs font-semibold text-red-900 dark:text-red-100">Early Withdrawal Penalty</p>
                        <p className="text-xs text-red-800 dark:text-red-200 mt-1">
                          {investmentTerms.graduatedPenalties[0]?.penaltyPercentage}% penalty if withdrawn before {investmentTerms.lockingPeriodYears} years
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

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
                className="w-full"
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
