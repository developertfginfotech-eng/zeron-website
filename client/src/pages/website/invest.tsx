import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "@/hooks/use-translation"
import { useAuth } from "@/hooks/use-auth"
import { AuthDialog } from "@/components/auth-dialog"
import { InvestmentModal } from "@/components/investment-modal"
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-client"
import { motion } from "framer-motion"
import { useLocation } from 'wouter';
import { useToast } from "@/hooks/use-toast"

import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Star, 
  MapPin, 
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Lock,
  Eye,
  Globe,
  Banknote,
  PieChart,
  BarChart3,
  Crown,
  Zap,
  Award,
  FileCheck,
  Loader2
} from "lucide-react"

// Backend property interface
interface BackendProperty {
  _id: string;
  title: string;
  description?: string;
  location: {
    city: string;
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

// Helper function to calculate remaining days
const getRemainingDays = (deadline?: string): number => {
  if (!deadline) return 30; // Default fallback
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();
  const diffTime = deadlineDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-SA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to get property tags
const getPropertyTags = (property: BackendProperty) => {
  const tags = [];
  
  // Add status-based tags
  if (property.status === 'active') {
    tags.push({ text: 'Live', class: 'bg-blue-500/90' });
  } else if (property.status === 'upcoming') {
    tags.push({ text: 'Coming Soon', class: 'bg-purple-500/90' });
  }
  
  // Add property type tags
  if (property.propertyType === 'commercial') {
    tags.push({ text: 'Commercial', class: 'bg-emerald-500/90' });
  } else if (property.propertyType === 'residential') {
    tags.push({ text: 'Residential', class: 'bg-blue-500/90' });
  } else if (property.propertyType === 'retail') {
    tags.push({ text: 'Retail', class: 'bg-orange-500/90' });
  }
  
  // Add yield-based tags
  if (property.financials.projectedYield >= 15) {
    tags.push({ text: 'High Yield', class: 'bg-amber-500/90' });
  }
  
  // Add Shariah compliant tag
  tags.push({ text: 'Shariah Compliant', class: 'bg-emerald-500/90' });
  
  return tags.slice(0, 3);
};

export default function InvestPage() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation()
  const { user, isAuthenticated } = useAuth()
  const [properties, setProperties] = useState<BackendProperty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<BackendProperty | null>(null)
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false)
  const { toast } = useToast()

  // Get KYC status
  const { isKYCCompleted, kycStatus, isLoggedIn } = getKYCStatus()

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

  /// Handle investment success
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

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const token = getAuthToken();

      // Fetch only 6 featured properties for home page
      const endpoint = `${API_BASE_URL}${API_ENDPOINTS.PROPERTIES}?limit=6&sort=-createdAt`;

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      console.log('Fetching featured properties from:', endpoint)
      console.log('Authentication status:', isAuthenticated)
      console.log('User:', user)

      const response = await fetch(endpoint, {
        method: 'GET',
        headers,
      })
      
      const result = await response.json()
      console.log('Properties response:', result)
      
      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`)
      }
      
      if (result.success && result.data.properties) {
        // Filter to show only active and upcoming properties
        const availableProperties = result.data.properties.filter(
          (prop: BackendProperty) => ['active', 'upcoming'].includes(prop.status)
        ); // Show all available properties
        
        setProperties(availableProperties)
      } else {
        setError('No properties available')
      }
    } catch (err: any) {
      console.error('Error fetching properties:', err)
      setError(err.message || 'Failed to load properties')
    } finally {
      setLoading(false)
    }
  }

  // Fetch properties on component mount and when auth status changes
  useEffect(() => {
    fetchProperties()
  }, [isAuthenticated, user])

  // Process image URL
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
      if (primaryImage.url.startsWith('http')) {
        return primaryImage.url
      }
    }

    return fallbackImages[property.propertyType] || fallbackImages.residential
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-emerald-900 via-blue-900 to-emerald-800">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-blue-900/85 to-emerald-800/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent" />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="mb-8 flex justify-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-emerald-500/20 text-emerald-100 border border-emerald-500/30 backdrop-blur-sm px-4 py-2 text-sm">
                <Crown className="w-4 h-4 mr-2" />
                {t("shariah_compliant")}
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-100 border border-blue-500/30 backdrop-blur-sm px-4 py-2 text-sm">
                <Building2 className="w-4 h-4 mr-2" />
                {t("vision_2030")}
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-100 border border-amber-500/30 backdrop-blur-sm px-4 py-2 text-sm">
                <Award className="w-4 h-4 mr-2" />
                {t("sama_regulated_title")}
              </Badge>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-emerald-300 via-white to-blue-300 bg-clip-text text-transparent">
                {t("hero_title")}
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-emerald-100/90 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t("hero_subtitle")}
            </motion.p>

            {isAuthenticated && user && (
              <motion.div 
                className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p className="text-emerald-100">
                  Welcome back, <span className="font-semibold text-white">{user.firstName}</span>! 
                  {user.kycStatus === 'approved' ? ' Ready to invest.' : ' Please complete your KYC verification.'}
                </p>
              </motion.div>
            )}

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{t("invested_amount")}</div>
                <div className="text-emerald-200/80 text-sm">{t("total_invested")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{t("avg_returns")}</div>
                <div className="text-emerald-200/80 text-sm">{t("avg_returns_label")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{properties.length}+</div>
                <div className="text-emerald-200/80 text-sm">{t("properties_funded")}</div>
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {isAuthenticated ? (
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-2xl"
                  onClick={() => {
                    const propertiesSection = document.getElementById('properties-section');
                    propertiesSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  data-testid="button-start-investing"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  View Investment Opportunities
                </Button>
              ) : (
                <AuthDialog defaultTab="register">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-2xl"
                    data-testid="button-start-investing"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    {t("start_investing_now")}
                  </Button>
                </AuthDialog>
              )}
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white backdrop-blur-sm"
                onClick={() => {
                  const propertiesSection = document.getElementById('properties-section');
                  propertiesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                data-testid="button-explore-opportunities"
              >
                <Eye className="w-5 h-5 mr-2" />
                {t("explore_opportunities")}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <motion.div 
              className="mt-12 flex items-center justify-center gap-8 text-emerald-200/60 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t("shariah_certified")}
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                {t("rating_display")}
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                {t("sama_licensed")}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-20 bg-gradient-to-br from-background via-emerald-50/30 to-blue-50/30 dark:from-background dark:via-emerald-950/30 dark:to-blue-950/30">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 mb-4">
                <BarChart3 className="w-4 h-4 mr-2" />
                Why Choose Real Estate Crowdfunding
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Transform Your Investment Portfolio
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Access exclusive Saudi real estate opportunities with fractional ownership, 
                professional management, and Shariah-compliant returns.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: PieChart,
                  title: t("fractional_ownership"),
                  description: t("fractional_desc"),
                  highlight: "Min. SAR 1,000"
                },
                {
                  icon: TrendingUp,
                  title: t("superior_returns"),
                  description: t("superior_desc"),
                  highlight: "12-18% Returns"
                },
                {
                  icon: Shield,
                  title: t("shariah_compliance"),
                  description: t("shariah_desc"),
                  highlight: "100% Halal"
                },
                {
                  icon: Building2,
                  title: t("premium_properties"),
                  description: t("premium_desc"),
                  highlight: "Prime Locations"
                },
                {
                  icon: Users,
                  title: t("professional_mgmt"),
                  description: t("professional_desc"),
                  highlight: "Hands-Free"
                },
                {
                  icon: Globe,
                  title: t("vision_alignment"),
                  description: t("vision_desc"),
                  highlight: "Future-Ready"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover-elevate group border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <benefit.icon className="w-7 h-7 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                          {benefit.highlight}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {isAuthenticated ? (
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600" data-testid="button-why-invest-cta">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  View Available Properties
                </Button>
              ) : (
                <AuthDialog defaultTab="register">
                  <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600" data-testid="button-why-invest-cta">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Start Your Investment Journey
                  </Button>
                </AuthDialog>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section id="properties-section" className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50/50 dark:from-gray-900 dark:to-emerald-950/50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 mb-4">
              <Building2 className="w-4 h-4 mr-2" />
              Live Investment Opportunities
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Exclusive Saudi Projects
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Premium real estate opportunities in Saudi Arabia's most promising developments.
              {!isAuthenticated && " Register to unlock detailed investment information and secure your allocation."}
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <Loader2 className="animate-spin h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <p className="text-muted-foreground">Loading investment opportunities...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-20">
              <div className="text-red-500 mb-4">⚠️ Error loading properties</div>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchProperties} variant="outline">
                Try Again
              </Button>
            </div>
          )}

          {/* Properties Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property, index) => {
                const remainingDays = getRemainingDays(property.timeline?.fundingDeadline)
                const tags = getPropertyTags(property)
                
                return (
                  <motion.div
                    key={property._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="overflow-hidden hover-elevate group cursor-pointer border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm" data-testid={`card-property-${property._id}`}>
                      <div className="relative">
                        {/* Image with KYC Lock */}
                        {isKYCCompleted ? (
                          // Show normal image for KYC-approved users
                          <img
                            src={getImageUrl(property)}
                            alt={property.title}
                            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          // Show blurred/locked image for non-KYC users
                          <div className="relative w-full h-56">
                            <img
                              src={getImageUrl(property)}
                              alt={property.title}
                              className="w-full h-full object-cover blur-md"
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
                                  onClick={() => {
                                    if (!isLoggedIn) {
                                      const propertiesSection = document.getElementById('properties-section');
                                      propertiesSection?.scrollIntoView({ behavior: 'smooth' });
                                    } else {
                                      setLocation('/kyc-verification');
                                    }
                                  }}
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
                        
                        {/* Tags */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {tags.slice(0, 2).map((tag, tagIndex) => (
                            <Badge key={tagIndex} className={`${tag.class} text-white border-0 backdrop-blur-sm`}>
                              {tag.text}
                            </Badge>
                          ))}
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-blue-500/90 text-white border-0 backdrop-blur-sm">
                            <Zap className="w-3 h-3 mr-1" />
                            {property.status === 'active' ? 'Live' : 'Coming Soon'}
                          </Badge>
                        </div>

                        {/* Location */}
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
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {isKYCCompleted ? `${property.investorCount}+ investors` : 'Multiple investors'}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {isKYCCompleted && remainingDays > 0 ? `${remainingDays} days left` : 'Investment Open'}
                              </span>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Funding Progress</span>
                              <span className="font-medium">
                                {isKYCCompleted ? `${property.fundingProgress}%` : '●●%'}
                              </span>
                            </div>
                            <Progress value={isKYCCompleted ? property.fundingProgress : 0} className="h-2" />
                          </div>

                          {/* Investment Details - Show/Hide based on KYC */}
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Min. Investment</p>
                              <p className="text-lg font-bold">
                                {isKYCCompleted ? `SAR ${formatCurrency(property.financials.minInvestment)}` : 'SAR ●●●,●●●'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Expected Return</p>
                              <p className="text-lg font-bold text-emerald-600">
                                {isKYCCompleted ? `${property.financials.projectedYield}%` : '●●%'}
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            {isKYCCompleted ? (
                              // KYC approved users get functional buttons
                              <>
                                <Button variant="outline" size="sm" className="w-full" data-testid={`button-view-details-${property._id}`}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                                <Button
                                  size="sm"
                                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600"
                                  onClick={() => handleInvestClick(property)}
                                  data-testid={`button-invest-${property._id}`}
                                >
                                  <DollarSign className="w-4 h-4 mr-2" />
                                  Invest Now
                                </Button>
                              </>
                            ) : (
                              // Non-KYC users get appropriate actions
                              <>
                                {isAuthenticated ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => setLocation('/kyc-verification')}
                                    data-testid={`button-view-details-${property._id}`}
                                  >
                                    <Lock className="w-4 h-4 mr-2" />
                                    Complete KYC
                                  </Button>
                                ) : (
                                  <AuthDialog defaultTab="login">
                                    <Button variant="outline" size="sm" className="w-full" data-testid={`button-view-details-${property._id}`}>
                                      <Eye className="w-4 h-4 mr-2" />
                                      Login to View
                                    </Button>
                                  </AuthDialog>
                                )}
                                {isAuthenticated ? (
                                  <Button
                                    size="sm"
                                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600"
                                    onClick={() => setLocation('/kyc-verification')}
                                    data-testid={`button-invest-${property._id}`}
                                  >
                                    <Shield className="w-4 h-4 mr-2" />
                                    Verify to Invest
                                  </Button>
                                ) : (
                                  <AuthDialog defaultTab="register">
                                    <Button size="sm" className="w-full bg-gradient-to-r from-emerald-600 to-blue-600" data-testid={`button-invest-${property._id}`}>
                                      <DollarSign className="w-4 h-4 mr-2" />
                                      Register to Invest
                                    </Button>
                                  </AuthDialog>
                                )}
                              </>
                            )}
                          </div>

                          {/* KYC Status indicator */}
                          {!isKYCCompleted && (
                            <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
                              <div className="flex items-center gap-2 text-sm">
                                <Shield className="w-4 h-4 text-orange-600" />
                                <span className="text-orange-800 dark:text-orange-200">
                                  {!isLoggedIn
                                    ? "Login and complete KYC to unlock full property details"
                                    : kycStatus === 'submitted' || kycStatus === 'under_review'
                                    ? "Your KYC is under review. Full details will be available once approved."
                                    : "Complete KYC verification to access investment features"}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* No Properties State */}
          {!loading && !error && properties.length === 0 && (
            <div className="text-center py-20">
              <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Investment Opportunities Available</h3>
              <p className="text-muted-foreground mb-6">Check back soon for new property listings</p>
              <Button onClick={fetchProperties} variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          )}

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {isAuthenticated ? (
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600" data-testid="button-browse-all-properties"
                onClick={() => setLocation('/website/properties')}
                >
                <Building2 className="w-5 h-5 mr-2" />
                Browse All Properties
              </Button>
            ) : (
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600" data-testid="button-browse-all-properties"
                onClick={() => setLocation('/website/properties')}
                >
                <Building2 className="w-5 h-5 mr-2" />
                Browse All Properties
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Trust Building - Testimonials */}
      <section className="py-20 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-emerald-950/30 dark:to-blue-950/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Trusted by Thousands of Investors
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our community of successful real estate investors across Saudi Arabia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Ahmed Al-Rashid",
                title: "Private Equity Investor",
                location: "Riyadh",
                testimonial: "Zaron has transformed my investment strategy. The platform's transparency and Shariah-compliant options align perfectly with my values. I've achieved 18% returns consistently.",
                returns: "18% Annual Returns",
                avatar: "AR"
              },
              {
                name: "Fatima Al-Zahra",
                title: "Business Owner",
                location: "Jeddah", 
                testimonial: "As a busy entrepreneur, Zaron's passive investment model is perfect. Professional property management and regular returns without the hassle of direct ownership.",
                returns: "16% Annual Returns",
                avatar: "FZ"
              },
              {
                name: "Omar Al-Mansouri",
                title: "Tech Executive",
                location: "Khobar",
                testimonial: "The Vision 2030 aligned properties on Zaron have been exceptional investments. Clear reporting, professional management, and impressive growth potential.",
                returns: "22% Annual Returns", 
                avatar: "OM"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-card/80 backdrop-blur-sm p-8 rounded-xl border hover-elevate"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                data-testid={`testimonial-${index}`}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-muted-foreground">{testimonial.title}</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">{testimonial.location}</p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground mb-4 italic">
                  "{testimonial.testimonial}"
                </blockquote>
                <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 p-3 rounded-lg">
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    {testimonial.returns}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Statistics */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">4.9/5</div>
              <p className="text-muted-foreground">Investor Rating</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">99.2%</div>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">72h</div>
              <p className="text-muted-foreground">Avg. Payout</p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">24/7</div>
              <p className="text-muted-foreground">Support</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 mb-4">
              <CheckCircle className="w-4 h-4 mr-2" />
              Simple & Secure Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Start Investing in 3 Steps
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our streamlined process makes real estate investment accessible to everyone
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Register & Verify",
                description: "Create your account and complete KYC verification in under 5 minutes. All information is securely encrypted and Shariah compliant.",
                icon: Users,
                color: "from-emerald-500 to-emerald-600"
              },
              {
                step: "02", 
                title: "Browse & Select",
                description: "Explore our curated portfolio of premium Saudi real estate projects. View detailed analytics, returns, and investment terms.",
                icon: Building2,
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "03",
                title: "Invest & Earn",
                description: "Make your investment starting from SAR 1,000. Track performance and receive returns directly to your account.",
                icon: TrendingUp,
                color: "from-amber-500 to-amber-600"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="text-center p-8 hover-elevate border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm h-full" data-testid={`card-step-${index + 1}`}>
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </Card>
                
                {/* Connection Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-20 -right-4 w-8 h-1 bg-gradient-to-r from-emerald-300 to-blue-300 rounded-full z-10"></div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {isAuthenticated ? (
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600" data-testid="button-get-started-process">
                <Zap className="w-5 h-5 mr-2" />
                View Your Dashboard
              </Button>
            ) : (
              <AuthDialog defaultTab="register">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600" data-testid="button-get-started-process">
                  <Zap className="w-5 h-5 mr-2" />
                  Get Started Now
                </Button>
              </AuthDialog>
            )}
          </motion.div>
        </div>
      </section>

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
  )
}