import { useState, useEffect } from "react"
import { useRoute } from "wouter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-client"
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
  AlertTriangle
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

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINTS.GET_PROPERTIES}?search=${params?.id}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('zaron_token')}`
            }
          }
        )
        const data = await response.json()

        if (data.success && data.data.properties.length > 0) {
          const prop = data.data.properties.find((p: any) => p._id === params?.id)
          if (prop) {
            setProperty(prop)
          } else {
            setError('Property not found')
          }
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

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full"
                disabled={propertyStatus === 'Fully Funded' || !isAuthenticated}
              >
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
    </div>
  )
}
