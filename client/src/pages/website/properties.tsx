import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { useTranslation } from "@/hooks/use-translation"
import { AuthDialog } from "@/components/auth-dialog"
import { InvestmentModal } from "@/components/investment-modal"
import { PropertyDetailsModal } from "@/components/property-details-modal"
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-client"
import { motion } from "framer-motion"

import {
  Search,
  Filter,
  MapPin,
  TrendingUp,
  Users,
  Calendar,
  Loader2,
  AlertTriangle,
  Lock,
  Eye,
  Shield,
  CheckCircle,
  Building2,
  DollarSign,
  Zap,
  ArrowLeft
} from "lucide-react"
import { useLocation } from "wouter"

// Backend property interface
interface BackendProperty {
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
    minInvestment: number;
    projectedYield: number;
    pricePerShare?: number;
    availableShares?: number;
  };
  propertyType: 'residential' | 'commercial' | 'retail';
  status: 'active' | 'upcoming' | 'fully_funded' | 'completed' | 'cancelled' | 'closed';
  investorCount: number;
  fundingProgress: number;
  timeline?: {
    fundingDeadline: string;
  };
  createdAt: string;
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('zaron_token') ||
         localStorage.getItem('authToken') ||
         sessionStorage.getItem('authToken') ||
         sessionStorage.getItem('token');
};

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

// Helper functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getRemainingDays = (deadline?: string): number => {
  if (!deadline) return 0;
  const deadlineDate = new Date(deadline);
  const now = new Date();
  const diffTime = deadlineDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
};

const getPropertyTags = (property: BackendProperty) => {
  const tags = [];

  if (property.status === 'active') {
    tags.push({ text: 'Live', class: 'bg-blue-500/90' });
  } else if (property.status === 'upcoming') {
    tags.push({ text: 'Coming Soon', class: 'bg-purple-500/90' });
  }

  if (property.propertyType === 'commercial') {
    tags.push({ text: 'Commercial', class: 'bg-emerald-500/90' });
  } else if (property.propertyType === 'residential') {
    tags.push({ text: 'Residential', class: 'bg-blue-500/90' });
  } else if (property.propertyType === 'retail') {
    tags.push({ text: 'Retail', class: 'bg-orange-500/90' });
  }

  if (property.financials.projectedYield >= 15) {
    tags.push({ text: 'High Yield', class: 'bg-amber-500/90' });
  }

  return tags.slice(0, 2); // Limit to 2 tags
};

// Property Card Component with KYC Lock
const PropertyCard = ({ property, onInvestClick, onDetailsClick }: { property: BackendProperty; onInvestClick: (property: BackendProperty) => void; onDetailsClick: (property: BackendProperty) => void }) => {
  const { isAuthenticated } = useAuth();
  const remainingDays = getRemainingDays(property.timeline?.fundingDeadline);
  const tags = getPropertyTags(property);
  const [, setLocation] = useLocation();

  // Get KYC status
  const { isKYCCompleted, kycStatus, isLoggedIn } = getKYCStatus();

  const getImageUrl = (property: BackendProperty): string => {
    const fallbackImages = {
      residential: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop',
      commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
      retail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    }

    if (property.images && property.images.length > 0) {
      const primaryImage = property.images.find(img => img.isPrimary) || property.images[0]
      if (primaryImage.url.startsWith('/uploads/')) {
        // Remove /api from API_BASE_URL for image serving
        const baseUrl = API_BASE_URL.replace('/api', '')
        return `${baseUrl}${primaryImage.url}`
      }
      return primaryImage.url
    }

    return fallbackImages[property.propertyType] || fallbackImages.residential
  }

  // Handle KYC requirement action
  const handleKYCRequired = () => {
    if (!isLoggedIn) {
      // Redirect to login/register
      setLocation('/website/invest');
    } else {
      // Redirect to KYC verification
      setLocation('/kyc-verification');
    }
  }

  // Get button text based on status
  const getButtonText = () => {
    if (!isLoggedIn) return 'Login to View Details';
    if (kycStatus === 'not_submitted') return 'Complete KYC to View';
    if (kycStatus === 'submitted' || kycStatus === 'under_review' || kycStatus === 'approved') return 'View Details';
    if (kycStatus === 'skipped') return 'Complete KYC to View';
    return 'Complete KYC to View';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-white overflow-hidden h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow" data-property-id={property._id}>
        {/* Property Image */}
        <div className="h-48 relative bg-gradient-to-br from-emerald-600 to-teal-600 cursor-pointer" onClick={() => onDetailsClick(property)}>
          {isKYCCompleted ? (
            // Show normal image for KYC-approved users
            <img
              src={getImageUrl(property)}
              alt={property.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'
              }}
            />
          ) : (
            // Show blurred/locked image for non-KYC users
            <>
              <img
                src={getImageUrl(property)}
                alt={property.title}
                className="w-full h-full object-cover blur-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'
                }}
              />
              {/* Lock Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="text-center p-4">
                  <div className="mx-auto w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-sm">KYC Required</h3>
                  <p className="text-xs text-white/80 mb-3">
                    {!isLoggedIn
                      ? "Login and verify your identity"
                      : kycStatus === 'submitted' || kycStatus === 'under_review'
                      ? "Your verification is under review"
                      : "Complete identity verification"}
                  </p>
                  <Button
                    size="sm"
                    onClick={handleKYCRequired}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 text-xs"
                    variant="outline"
                  >
                    {!isLoggedIn ? "Login" : "Verify Now"}
                  </Button>
                </div>
              </div>
            </>
          )}
          {!isKYCCompleted && (
            <div className="absolute top-4 left-4 bg-emerald-800/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
              <Lock className="inline h-3 w-3 mr-1" />
              KYC Required
            </div>
          )}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm text-emerald-700">
            {Math.round(property.fundingProgress)}% Funded
          </div>
        </div>

        <CardContent className="p-6 flex-1 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h3>
          <p className="text-gray-600 mb-4 flex items-center">
            <span className="mr-1">📍</span>
            {property.location.district}, {property.location.city}
          </p>

          {isKYCCompleted ? (
            <>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-500">Target Return</p>
                  <p className="text-lg font-bold text-emerald-600">{property.financials.projectedYield}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Min. Investment</p>
                  <p className="text-sm font-bold text-gray-900">
                    SAR {(property.financials.minInvestment / 1000).toFixed(0)}K
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Investors</p>
                  <p className="text-sm font-bold text-gray-900">{property.investorCount}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${property.fundingProgress}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-6">
                SAR {((property.financials.totalValue * property.fundingProgress / 100) / 1000000).toFixed(2)}M of SAR {(property.financials.totalValue / 1000000).toFixed(0)}M funded
              </p>

              <div className="flex gap-3 mt-auto">
                <Button
                  variant="outline"
                  className="flex-1 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                  onClick={() => onDetailsClick(property)}
                >
                  Learn More
                </Button>
                <Button
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  onClick={() => onInvestClick(property)}
                >
                  Invest Now
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Locked state for non-KYC users */}
              <div className="flex-1 flex flex-col justify-center items-center py-8 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  {isLoggedIn ? "Complete KYC Verification" : "Please Login to View Details"}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  {isLoggedIn
                    ? "Verify your identity to unlock full property details and start investing."
                    : "Sign in to unlock property details and start investing."}
                </p>
                <Button
                  size="sm"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  onClick={handleKYCRequired}
                >
                  {isLoggedIn ? "Verify KYC Now" : "Login Now"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main Properties Page
export default function WebsitePropertiesPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();

  const [properties, setProperties] = useState<BackendProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minReturn, setMinReturn] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState<BackendProperty | null>(null);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState<BackendProperty | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Get KYC status for page-level features
  const { isKYCCompleted, kycStatus, isLoggedIn } = getKYCStatus();

  // Handle details click - navigate to property details page
  const handleDetailsClick = (property: BackendProperty) => {
    setLocation(`/website/property/${property._id}`);
  };

  // Handle investment click
  const handleInvestClick = (property: BackendProperty) => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to start investing",
        variant: "destructive"
      });
      return;
    }

    if (!isKYCCompleted) {
      toast({
        title: "KYC Verification Required",
        description: "Complete your KYC verification to start investing",
        variant: "destructive"
      });
      setLocation('/kyc-verification');
      return;
    }

    setSelectedProperty(property);
    setIsInvestmentModalOpen(true);
  };

  // Handle investment success
  const handleInvestmentSuccess = () => {
    // Show success toast
    toast({
      title: "Investment Successful! 🎉",
      description: "Your investment has been processed successfully",
      variant: "default"
    });

    // Optionally refresh properties to update funding progress
    // but without causing page refresh/redirect
    setTimeout(() => {
      fetchProperties();
    }, 2000);
  };

  // Fetch all properties
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getAuthToken();
      const endpoint = `${API_BASE_URL}${API_ENDPOINTS.PROPERTIES}`;

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      console.log('Fetching all properties from:', endpoint);
      console.log('Authentication status:', isAuthenticated);
      console.log('KYC status:', kycStatus);

      const response = await fetch(endpoint, { headers });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data.properties) {
        // Show all available properties (active and upcoming), no limit
        const availableProperties = result.data.properties.filter(
          (prop: BackendProperty) => ['active', 'upcoming'].includes(prop.status)
        );

        setProperties(availableProperties);
      } else {
        setError('No properties available');
      }
    } catch (err: any) {
      console.error('Error fetching properties:', err);
      setError(err.message || 'Failed to load properties');
      toast({
        title: "Error Loading Properties",
        description: "Unable to load properties. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [isAuthenticated, user]);

  // Get unique cities for filter dropdown
  const uniqueCities = Array.from(
    new Set(
      properties.map(p => p.location.city).filter(Boolean)
    )
  ).sort();

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = searchTerm === "" ||
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (property.location?.city && property.location.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (property.location?.district && property.location.district.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    const matchesType = typeFilter === "all" || property.propertyType === typeFilter;
    const matchesCity = cityFilter === "all" || property.location?.city === cityFilter;

    const pricePerShare = property.financials?.pricePerShare || 0;
    const matchesPrice = pricePerShare >= minPrice && pricePerShare <= maxPrice;

    const yield_ = property.financials?.projectedYield || 0;
    const matchesReturn = yield_ >= minReturn;

    return matchesSearch && matchesStatus && matchesType && matchesCity && matchesPrice && matchesReturn;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800">
      <div className="w-full px-2 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              onClick={() => setLocation('/website/invest')}
              className="flex items-center gap-2 text-white hover:bg-teal-700/50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Invest
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              All Investment Properties
            </h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto">
              Explore all available real estate investment opportunities in Saudi Arabia
            </p>
          </div>
        </motion.div>

        {/* KYC Status Banner - only show for users who haven't submitted KYC */}
        {(!isLoggedIn || kycStatus === 'not_submitted' || kycStatus === 'skipped') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-teal-800/90 border border-teal-700/50">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-yellow-400" />
                  <div>
                    <p className="font-semibold text-white">
                      {kycStatus === 'submitted' || kycStatus === 'under_review'
                        ? 'KYC Under Review'
                        : 'Complete Your KYC Verification'}
                    </p>
                    <p className="text-sm text-teal-200">
                      {kycStatus === 'submitted' || kycStatus === 'under_review'
                        ? 'Your documents are being reviewed. Property details will be unlocked once approved.'
                        : 'Verify your identity to unlock full property details and start investing'}
                    </p>
                  </div>
                </div>
                {kycStatus !== 'submitted' && kycStatus !== 'under_review' && (
                  <Button
                    className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold"
                    onClick={() => setLocation('/kyc-verification')}
                  >
                    Complete KYC
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="mb-8 bg-teal-800/90 backdrop-blur-sm border border-teal-700/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Search className="w-5 h-5 text-yellow-400" />
                Find Your Perfect Investment
              </CardTitle>
              <CardDescription className="text-teal-200">
                {isKYCCompleted
                  ? "Search and filter properties - you have full access to all details"
                  : "Browse available properties - complete KYC to unlock full details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Primary Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-teal-300" />
                    <Input
                      placeholder="Search by title or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 bg-teal-700/50 border-teal-600/50 text-white placeholder:text-teal-300"
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-teal-700/50 border-teal-600/50 text-white">
                      <Filter className="h-4 w-4 mr-2 text-yellow-400" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Live Properties</SelectItem>
                      <SelectItem value="upcoming">Coming Soon</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-teal-700/50 border-teal-600/50 text-white">
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

                {/* Advanced Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2 border-t">
                  <Select value={cityFilter} onValueChange={setCityFilter}>
                    <SelectTrigger className="bg-teal-700/50 border-teal-600/50 text-white">
                      <MapPin className="h-4 w-4 mr-2 text-yellow-400" />
                      <SelectValue placeholder="Filter by city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      {uniqueCities.map(city => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-white">Price: SAR {minPrice}-{maxPrice}</label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Math.max(0, parseInt(e.target.value) || 0))}
                        className="bg-teal-700/50 border-teal-600/50 text-white text-xs"
                      />
                      <Input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Math.max(minPrice, parseInt(e.target.value) || 100000))}
                        className="bg-teal-700/50 border-teal-600/50 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block text-white">Min Return: {minReturn}%</label>
                    <Input
                      type="number"
                      placeholder="Min return %"
                      value={minReturn}
                      onChange={(e) => setMinReturn(Math.max(0, parseInt(e.target.value) || 0))}
                      className="bg-teal-700/50 border-teal-600/50 text-white"
                    />
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("all");
                        setTypeFilter("all");
                        setCityFilter("all");
                        setMinPrice(0);
                        setMaxPrice(100000);
                        setMinReturn(0);
                      }}
                      className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold border-0"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl font-semibold text-white">
            {filteredProperties.length > 0
              ? `${filteredProperties.length} Properties Found`
              : 'No Properties Found'}
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              {properties.filter(p => p.status === 'active').length} Live
            </Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
              {properties.filter(p => p.status === 'upcoming').length} Coming Soon
            </Badge>
            {isKYCCompleted && (
              <Badge variant="outline" className="bg-yellow-400 text-gray-900 border-yellow-500 font-bold">
                <CheckCircle className="w-3 h-3 mr-1" />
                KYC Verified
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <Card className="max-w-md mx-auto bg-teal-800/90 backdrop-blur-sm border border-teal-700/50">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-12 w-12 animate-spin mb-4 text-yellow-400" />
                <p className="text-lg text-white">Loading properties...</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <Card className="max-w-md mx-auto bg-teal-800/90 backdrop-blur-sm border border-teal-700/50">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
                <div className="text-center">
                  <p className="text-lg text-red-400 mb-2">Error: {error}</p>
                  <p className="text-sm text-teal-200 mb-4">
                    Unable to load properties. Please try again.
                  </p>
                  <Button onClick={fetchProperties} className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold">
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Properties Grid */}
        {!loading && !error && filteredProperties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
                onInvestClick={handleInvestClick}
                onDetailsClick={handleDetailsClick}
              />
            ))}
          </div>
        )}

        {/* No Properties State */}
        {!loading && !error && filteredProperties.length === 0 && properties.length > 0 && (
          <div className="text-center py-20">
            <Card className="max-w-md mx-auto bg-teal-800/90 backdrop-blur-sm border border-teal-700/50">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Search className="h-12 w-12 text-yellow-400 mb-4" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 text-white">No Properties Found</h3>
                  <p className="text-teal-200 mb-4">
                    No properties match your current search criteria
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
                    className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* CTA Section */}
        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <Card className="bg-teal-800/90 border border-teal-700/50">
              <CardContent className="text-center py-12">
                <h3 className="text-3xl font-bold mb-4 text-white uppercase">Ready to Start Investing?</h3>
                <p className="text-teal-200 mb-6 text-lg max-w-2xl mx-auto">
                  {isKYCCompleted
                    ? "You have access! Start building wealth through premium real estate opportunities"
                    : "Complete your KYC verification to unlock full access and start investing"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {isKYCCompleted ? (
                    <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Start Investing Now
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold"
                      onClick={() => setLocation('/kyc-verification')}
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Complete KYC Verification
                    </Button>
                  )}
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-gray-900"
                    onClick={() => setLocation('/website/about')}
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Investment Modal */}
      <InvestmentModal
        property={selectedProperty}
        isOpen={isInvestmentModalOpen}
        onClose={() => {
          setIsInvestmentModalOpen(false);
          setSelectedProperty(null);
        }}
        onSuccess={handleInvestmentSuccess}
      />

      {/* Property Details Modal */}
      <PropertyDetailsModal
        isOpen={isDetailsModalOpen}
        property={selectedPropertyDetails}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedPropertyDetails(null);
        }}
        onInvest={() => {
          setIsDetailsModalOpen(false);
          if (selectedPropertyDetails) {
            handleInvestClick(selectedPropertyDetails);
          }
        }}
        onViewFullDetails={() => {
          if (selectedPropertyDetails) {
            // Navigate to full property details page
            setLocation(`/website/property/${selectedPropertyDetails._id}`);
            setIsDetailsModalOpen(false);
          }
        }}
      />
    </div>
  );
}