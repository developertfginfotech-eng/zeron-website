import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Search, Filter, MapPin, TrendingUp, Users, Calendar, Loader2, AlertTriangle, Lock, Eye, Shield, CheckCircle } from "lucide-react"

// CORRECTED API configuration
const API_BASE_URL = 'http://13.50.13.193:5000'

// Helper function to get KYC status
const getKYCStatus = (): {
  isKYCCompleted: boolean;
  kycStatus: string;
  isLoggedIn: boolean;
} => {
  try {
    const userData = localStorage.getItem('zaron_user');
    if (!userData) {
      return { isKYCCompleted: false, kycStatus: 'not_submitted', isLoggedIn: false };
    }

    const user = JSON.parse(userData);
    const kycStatus = user.kycStatus || 'not_submitted';
    // Allow access for both submitted and approved KYC
    const isKYCCompleted = kycStatus === 'submitted' || kycStatus === 'under_review' || kycStatus === 'approved';

    return {
      isKYCCompleted,
      kycStatus,
      isLoggedIn: true
    };
  } catch {
    return { isKYCCompleted: false, kycStatus: 'not_submitted', isLoggedIn: false };
  }
};

// Property interface matching your backend data
interface Property {
  _id: string;
  title: string;
  titleAr?: string;
  description: string;
  location: {
    city: string;
    district: string;
    address: string;
  };
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
  }>;
  financials: {
    totalValue: number;
    projectedYield: number;
    minInvestment: number;
  };
  propertyType: 'residential' | 'commercial' | 'retail';
  status: string;
  investorCount: number;
  fundingProgress: number;
  createdAt: string;
}

// User KYC status interface
interface UserStatus {
  isLoggedIn: boolean;
  kycCompleted: boolean;
  kycStatus: 'pending' | 'approved' | 'rejected' | 'not_submitted';
  registrationComplete: boolean;
}

// Property Card with KYC-Locked Images
const PublicPropertyCard = ({ 
  property, 
  userStatus, 
  onKYCRequired 
}: { 
  property: Property; 
  userStatus: UserStatus;
  onKYCRequired: () => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'upcoming': return 'bg-blue-100 text-blue-800'
      case 'fully_funded': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // CORRECTED: Fix image URL construction
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'
    if (imageUrl.startsWith('http')) return imageUrl
    if (imageUrl.startsWith('/uploads/')) return `${API_BASE_URL}${imageUrl}`
    return imageUrl
  }

  const primaryImage = property.images?.find(img => img.isPrimary) || property.images?.[0]
  const imageUrl = primaryImage ? getImageUrl(primaryImage.url) : 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'

  // Check if user can see images and full details
  const canViewFullDetails = userStatus.isLoggedIn && userStatus.kycCompleted && userStatus.kycStatus === 'approved'

  const handleInvestClick = () => {
    if (!canViewFullDetails) {
      onKYCRequired()
      return
    }
    // Navigate to investment page
    console.log('Navigate to investment page for property:', property._id)
  }

  const getButtonText = () => {
    if (!userStatus.isLoggedIn) return 'Login to Invest'
    if (!userStatus.registrationComplete) return 'Complete Registration'
    if (userStatus.kycStatus === 'not_submitted') return 'Complete KYC'
    if (userStatus.kycStatus === 'pending') return 'KYC Under Review'
    if (userStatus.kycStatus === 'rejected') return 'Resubmit KYC'
    if (userStatus.kycStatus === 'approved') return property.status === 'active' ? 'Invest Now' : 'View Details'
    return 'Learn More'
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Section with KYC Lock */}
      <div className="relative aspect-video overflow-hidden">
        {canViewFullDetails ? (
          // Show actual image for KYC-approved users
          <img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'
            }}
          />
        ) : (
          // Show blurred/locked image for non-KYC users
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt={property.title}
              className="w-full h-full object-cover blur-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'
              }}
            />
            {/* Lock Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm">
              <div className="text-center p-6">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Verify Your Account</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {!userStatus.isLoggedIn 
                    ? "Login and complete KYC to unlock property images" 
                    : userStatus.kycStatus === 'pending'
                    ? "Your KYC is under review"
                    : "Complete KYC verification to view images"}
                </p>
                <Button 
                  size="sm" 
                  onClick={onKYCRequired}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {!userStatus.isLoggedIn ? "Login" : "Complete KYC"}
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Status and Property Type Badges */}
        <div className="absolute top-3 left-3">
          <Badge className={getStatusColor(property.status)}>
            {property.status === 'active' ? 'Live' : 
             property.status === 'upcoming' ? 'Coming Soon' : 
             property.status === 'fully_funded' ? 'Fully Funded' : property.status}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary">
            {property.propertyType}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {property.title}
          </CardTitle>
          {canViewFullDetails && (
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 ml-2" />
          )}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location.district}, {property.location.city}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardDescription className="text-sm mb-4 line-clamp-2">
          {property.description}
        </CardDescription>

        <div className="space-y-3">
          {/* Financial Information - Always visible but with different presentation */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Value</span>
            <span className="font-semibold">{formatCurrency(property.financials.totalValue)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Expected Return</span>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
              <span className="font-semibold text-green-600">
                {property.financials.projectedYield}%
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Min. Investment</span>
            <span className="font-semibold">{formatCurrency(property.financials.minInvestment)}</span>
          </div>

          {/* Investment Progress - Only for active properties */}
          {property.status === 'active' && (
            <>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.min(property.fundingProgress || 0, 100)}%` }}
                />
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{property.investorCount || 0} investors</span>
                </div>
                <span className="font-medium">
                  {Math.round(property.fundingProgress || 0)}% funded
                </span>
              </div>
            </>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(property.createdAt).toLocaleDateString('en-SA', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            
            <div className="flex items-center gap-2">
              {canViewFullDetails ? (
                <Eye className="h-4 w-4 text-green-600" />
              ) : (
                <Lock className="h-4 w-4 text-gray-500" />
              )}
              <Button 
                size="sm" 
                onClick={handleInvestClick}
                variant={canViewFullDetails ? "default" : "outline"}
                className="w-32"
              >
                {getButtonText()}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// KYC Status Banner Component
const KYCStatusBanner = ({ userStatus }: { userStatus: UserStatus }) => {
  if (!userStatus.isLoggedIn) {
    return (
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-800">Account Required</p>
              <p className="text-sm text-blue-700">
                Login and complete KYC verification to unlock property images and investment features
              </p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            Login / Register
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (userStatus.kycStatus === 'approved') {
    return (
      <Card className="mb-6 bg-green-50 border-green-200">
        <CardContent className="flex items-center gap-3 py-4">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-semibold text-green-800">Account Verified</p>
            <p className="text-sm text-green-700">You have full access to all property details and can invest</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (userStatus.kycStatus === 'pending') {
    return (
      <Card className="mb-6 bg-yellow-50 border-yellow-200">
        <CardContent className="flex items-center gap-3 py-4">
          <Loader2 className="h-5 w-5 text-yellow-600 animate-spin" />
          <div>
            <p className="font-semibold text-yellow-800">KYC Under Review</p>
            <p className="text-sm text-yellow-700">We're reviewing your documents. Property images will be unlocked once approved.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (userStatus.kycStatus === 'rejected') {
    return (
      <Card className="mb-6 bg-red-50 border-red-200">
        <CardContent className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-semibold text-red-800">KYC Rejected</p>
              <p className="text-sm text-red-700">Please resubmit your documents to unlock property access.</p>
            </div>
          </div>
          <Button variant="destructive" size="sm">
            Resubmit KYC
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Not submitted KYC
  return (
    <Card className="mb-6 bg-orange-50 border-orange-200">
      <CardContent className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-orange-600" />
          <div>
            <p className="font-semibold text-orange-800">KYC Verification Required</p>
            <p className="text-sm text-orange-700">Complete your KYC verification to unlock property images and start investing</p>
          </div>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700" size="sm">
          Complete KYC
        </Button>
      </CardContent>
    </Card>
  )
}

// Main Public Properties Page
export default function PublicPropertiesPage() {
  const { toast } = useToast()
  
  // State management
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  
  // Mock user status - UPDATE THIS TO CONNECT TO YOUR ACTUAL AUTH SYSTEM
  const [userStatus, setUserStatus] = useState<UserStatus>({
    isLoggedIn: false, // Set to false to test locked images
    kycCompleted: false,
    kycStatus: 'not_submitted',
    registrationComplete: false
  })

  // Fetch properties using your admin endpoint
  const fetchProperties = async (filters?: any) => {
    try {
      setLoading(true)
      setError(null)

      // Use your admin properties endpoint
      let url = `${API_BASE_URL}/api/admin/properties`
      
      // Add query parameters if filters exist
      if (filters && Object.keys(filters).length > 0) {
        const params = new URLSearchParams()
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== 'all') {
            params.append(key, value as string)
          }
        })
        if (params.toString()) {
          url += `?${params.toString()}`
        }
      }

      console.log('Fetching properties from:', url)
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add auth token if your admin endpoint requires it
          // 'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch properties`)
      }

      const data = await response.json()
      console.log('API Response:', data)
      
      if (data.success && data.data && data.data.properties) {
        console.log(`✅ Loaded ${data.data.properties.length} properties`)
        setProperties(data.data.properties)
      } else {
        throw new Error('Invalid response format from server')
      }
    } catch (err: any) {
      console.error('❌ Error fetching properties:', err)
      setError(err.message)
      toast({
        title: "Error Loading Properties",
        description: "Unable to load properties. Please try again later.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle KYC requirement
  const handleKYCRequired = () => {
    if (!userStatus.isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login and complete KYC verification to unlock all features.",
        variant: "default"
      })
    } else {
      toast({
        title: "KYC Required",
        description: "Complete your KYC verification to unlock property images and investment features.",
        variant: "default"
      })
    }
    // Redirect to login/KYC page
    // window.location.href = '/login'
  }

  // Initial load
  useEffect(() => {
    fetchProperties()
  }, [])

  // Search and filter with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      const filters: any = {}
      
      if (searchTerm) filters.search = searchTerm
      if (statusFilter !== "all") filters.status = statusFilter
      if (typeFilter !== "all") filters.propertyType = typeFilter
      
      fetchProperties(filters)
    }, 500)

    return () => clearTimeout(delayedSearch)
  }, [searchTerm, statusFilter, typeFilter])

  // Filter properties locally as backup
  const filteredProperties = properties.filter(property => {
    const matchesSearch = searchTerm === "" || 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.district.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || property.status === statusFilter
    const matchesType = typeFilter === "all" || property.propertyType === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  // Loading state
  if (loading && properties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Investment Properties</h1>
            <p className="text-xl text-gray-600">Discover premium real estate investment opportunities</p>
          </div>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin mb-4" />
              <p className="text-lg text-muted-foreground">Loading properties...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Error state
  if (error && properties.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Investment Properties</h1>
            <p className="text-xl text-gray-600">Discover premium real estate investment opportunities</p>
          </div>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
              <div className="text-center">
                <p className="text-lg text-destructive mb-2">Error: {error}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Make sure your backend server is running on {API_BASE_URL}
                </p>
                <Button onClick={() => fetchProperties()} variant="outline">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Investment Properties</h1>
          <p className="text-xl text-gray-600">Discover premium real estate investment opportunities in Saudi Arabia</p>
        </div>

        {/* KYC Status Banner */}
        <KYCStatusBanner userStatus={userStatus} />

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Browse Properties</CardTitle>
            <CardDescription>
              {userStatus.kycStatus === 'approved' ? 
                "Search and filter properties - you have full access" :
                "Browse available properties - complete KYC to unlock property images"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Live</SelectItem>
                  <SelectItem value="upcoming">Coming Soon</SelectItem>
                  <SelectItem value="fully_funded">Fully Funded</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">
            Available Properties ({filteredProperties.length})
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50">
              {properties.filter(p => p.status === 'active').length} Live
            </Badge>
            <Badge variant="outline" className="bg-blue-50">
              {properties.filter(p => p.status === 'upcoming').length} Coming Soon
            </Badge>
            <Badge variant="outline" className="bg-purple-50">
              {properties.filter(p => p.status === 'fully_funded').length} Fully Funded
            </Badge>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PublicPropertyCard 
                key={property._id} 
                property={property} 
                userStatus={userStatus}
                onKYCRequired={handleKYCRequired}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
                <p className="text-muted-foreground mb-4">
                  No properties match your current search criteria
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                    setTypeFilter("all")
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Investing?</h3>
              <p className="text-gray-600 mb-6">
                Complete your KYC verification to unlock full access and start building wealth through real estate
              </p>
              <Button size="lg" className="mr-4" onClick={handleKYCRequired}>
                {!userStatus.isLoggedIn ? "Get Started" : "Complete KYC"}
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}