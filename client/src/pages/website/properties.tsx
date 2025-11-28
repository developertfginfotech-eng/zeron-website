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
const PropertyCard = ({ property, onInvestClick }: { property: BackendProperty; onInvestClick: (property: BackendProperty) => void }) => {
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
      <Card className="overflow-hidden hover-elevate group cursor-pointer border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm" data-property-id={property._id}>
        <div className="relative">
          {/* Image with KYC Lock */}
          {isKYCCompleted ? (
            // Show normal image for KYC-approved users
            <img
              src={getImageUrl(property)}
              alt={property.title}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'
              }}
            />
          ) : (
            // Show blurred/locked image for non-KYC users
            <div className="relative w-full h-56">
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
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Tags - always visible */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} className={`${tag.class} text-white border-0 backdrop-blur-sm`}>
                {tag.text}
              </Badge>
            ))}
          </div>

          <div className="absolute top-4 right-4">
            <Badge className="bg-blue-500/90 text-white border-0 backdrop-blur-sm">
              <Zap className="w-3 h-3 mr-1" />
              {property.status === 'active' ? 'Live' : 'Coming Soon'}
            </Badge>
          </div>

          {/* Property title and location - always visible */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1">{property.title}</h3>
            {property.location && (property.location.address || property.location.city) ? (
              <div className="flex items-center text-emerald-200">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.location.address || property.location.city || 'Location TBD'}</span>
              </div>
            ) : (
              <div className="flex items-center text-emerald-200">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm text-orange-300">Location information pending</span>
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-6">
          {isKYCCompleted ? (
            <>
              {/* Basic info - visible for KYC-approved users */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {property.investorCount}+ investors
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {remainingDays > 0 ? `${remainingDays} days left` : 'Investment Open'}
                  </span>
                </div>
              </div>

              {/* Funding progress */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Funding Progress</span>
                  <span className="font-medium">{property.fundingProgress}%</span>
                </div>
                <Progress value={property.fundingProgress} className="h-2" />
              </div>

              {/* Financial details */}
              <div className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <p className="text-sm text-muted-foreground">Min. Investment</p>
                  <p className="text-lg font-bold">
                    SAR {formatCurrency(property.financials.minInvestment)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expected Return</p>
                  <p className="text-lg font-bold text-emerald-600">
                    {property.financials.projectedYield}%
                  </p>
                </div>
              </div>

              {/* Action button for KYC-approved users */}
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                onClick={() => {
                  // Scroll to top of the property card
                  const cardElement = document.querySelector('[data-property-id="' + property._id + '"]');
                  if (cardElement) {
                    cardElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  // Open investment modal
                  onInvestClick(property);
                }}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Invest Now
              </Button>
            </>
          ) : (
            <>
              {/* Different prompts for not logged in vs logged in without KYC */}
              <div className="py-8 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {isLoggedIn ? "Complete KYC Verification" : "Please Login to View Details"}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {isLoggedIn
                    ? "Verify your identity to unlock full property details and start investing. It only takes a few minutes."
                    : "Sign in to unlock property details and start investing in Saudi Arabia's best real estate opportunities."}
                </p>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-blue-600"
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
  const [selectedProperty, setSelectedProperty] = useState<BackendProperty | null>(null);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);

  // Get KYC status for page-level features
  const { isKYCCompleted, kycStatus, isLoggedIn } = getKYCStatus();

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

  // Filter properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = searchTerm === "" ||
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    const matchesType = typeFilter === "all" || property.propertyType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/50 dark:from-gray-900 dark:to-emerald-950/50">
      <div className="container mx-auto px-6 py-8">
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
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Invest
            </Button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-emerald-600 dark:from-gray-100 dark:to-emerald-400 bg-clip-text text-transparent mb-4">
              All Investment Properties
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
            <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/50 dark:to-yellow-950/50 border-orange-200 dark:border-orange-800">
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="font-semibold text-orange-900 dark:text-orange-100">
                      {kycStatus === 'submitted' || kycStatus === 'under_review'
                        ? 'KYC Under Review'
                        : 'Complete Your KYC Verification'}
                    </p>
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                      {kycStatus === 'submitted' || kycStatus === 'under_review'
                        ? 'Your documents are being reviewed. Property details will be unlocked once approved.'
                        : 'Verify your identity to unlock full property details and start investing'}
                    </p>
                  </div>
                </div>
                {kycStatus !== 'submitted' && kycStatus !== 'under_review' && (
                  <Button
                    className="bg-orange-600 hover:bg-orange-700 text-white"
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
          <Card className="mb-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find Your Perfect Investment
              </CardTitle>
              <CardDescription>
                {isKYCCompleted
                  ? "Search and filter properties - you have full access to all details"
                  : "Browse available properties - complete KYC to unlock full details"}
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
                    className="pl-9 bg-background/50"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-background/50">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Live Properties</SelectItem>
                    <SelectItem value="upcoming">Coming Soon</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="bg-background/50">
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
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-2xl font-semibold">
            {filteredProperties.length > 0
              ? `${filteredProperties.length} Properties Found`
              : 'No Properties Found'}
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {properties.filter(p => p.status === 'active').length} Live
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {properties.filter(p => p.status === 'upcoming').length} Coming Soon
            </Badge>
            {isKYCCompleted && (
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                KYC Verified
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <Card className="max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-12 w-12 animate-spin mb-4" />
                <p className="text-lg text-muted-foreground">Loading properties...</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <Card className="max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <div className="text-center">
                  <p className="text-lg text-destructive mb-2">Error: {error}</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Unable to load properties. Please try again.
                  </p>
                  <Button onClick={fetchProperties} variant="outline">
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
              />
            ))}
          </div>
        )}

        {/* No Properties State */}
        {!loading && !error && filteredProperties.length === 0 && properties.length > 0 && (
          <div className="text-center py-20">
            <Card className="max-w-md mx-auto bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
                  <p className="text-muted-foreground mb-4">
                    No properties match your current search criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
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
            <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white border-0">
              <CardContent className="text-center py-12">
                <h3 className="text-3xl font-bold mb-4">Ready to Start Investing?</h3>
                <p className="text-emerald-100 mb-6 text-lg max-w-2xl mx-auto">
                  {isKYCCompleted
                    ? "You have access! Start building wealth through premium real estate opportunities"
                    : "Complete your KYC verification to unlock full access and start investing"}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {isKYCCompleted ? (
                    <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Start Investing Now
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-emerald-600 hover:bg-gray-100"
                      onClick={() => setLocation('/kyc-verification')}
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Complete KYC Verification
                    </Button>
                  )}
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-emerald-600"
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
    </div>
  );
}