import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Lock, ArrowUpRight, User } from "lucide-react"
import { motion } from "framer-motion"
import { useLocation } from "wouter"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-client"

// Backend property interface
interface BackendProperty {
  _id: string
  title: string
  titleAr?: string
  description: string
  location: {
    city: string
    district: string
    address: string
  }
  images: Array<{
    url: string
    alt: string
    isPrimary: boolean
  }>
  financials: {
    totalValue: number
    minInvestment: number
    projectedYield: number
    pricePerShare?: number
    availableShares?: number
  }
  propertyType: 'residential' | 'commercial' | 'retail'
  status: 'active' | 'upcoming' | 'fully_funded' | 'completed' | 'cancelled' | 'closed'
  investorCount: number
  fundingProgress: number
  timeline?: {
    fundingDeadline: string
    expectedCompletion?: string
  }
  createdAt: string
}

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

export default function WebsiteHome() {
  const [, setLocation] = useLocation()
  const { toast } = useToast()
  const [properties, setProperties] = useState<BackendProperty[]>([])
  const [loading, setLoading] = useState(true)

  // Get KYC status
  const { isKYCCompleted } = getKYCStatus()

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const endpoint = `${API_BASE_URL}${API_ENDPOINTS.PROPERTIES}`

        const response = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()

        if (result.success && result.data.properties) {
          // Get active and upcoming properties, limit to 3 for home page
          const availableProperties = result.data.properties
            .filter((prop: BackendProperty) => ['active', 'upcoming'].includes(prop.status))
            .slice(0, 3)

          setProperties(availableProperties)
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Handler for viewing property details
  const handleViewDetails = (propertyId?: string) => {
    if (propertyId) {
      setLocation(`/website/property/${propertyId}`)
    } else {
      setLocation('/website/properties')
    }
  }

  // Handler for invest button
  const handleInvest = () => {
    // Check if user is logged in
    const userData = localStorage.getItem('zaron_user')
    if (!userData) {
      toast({
        title: "Login Required",
        description: "Please login to start investing",
        variant: "destructive"
      })
      setLocation('/register')
      return
    }

    // Check KYC status
    try {
      const user = JSON.parse(userData)
      const kycStatus = user.kycStatus || 'not_submitted'
      const isKYCCompleted = kycStatus === 'submitted' || kycStatus === 'under_review' || kycStatus === 'approved'

      if (!isKYCCompleted) {
        toast({
          title: "KYC Verification Required",
          description: "Complete your KYC verification to start investing",
          variant: "destructive"
        })
        setLocation('/kyc-verification')
        return
      }

      // If all checks pass, go to properties page
      setLocation('/website/properties')
    } catch {
      setLocation('/register')
    }
  }

  const steps = [
    {
      number: 1,
      title: "Create Your Account",
      description: "Sign up in minutes with your email. Complete KYC verification for secure investing."
    },
    {
      number: 2,
      title: "Browse Opportunities",
      description: "Explore vetted properties with detailed information, financial projections, and risk analysis."
    },
    {
      number: 3,
      title: "Invest & Own",
      description: "Choose your investment amount and own fractional shares in premium properties."
    },
    {
      number: 4,
      title: "Earn Returns",
      description: "Receive monthly rental income and watch your investment grow with property appreciation."
    }
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#004743' }}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden" style={{ backgroundColor: '#004743' }}>
        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/BG%20Image.jpg')",
            opacity: 0.5
          }}
        ></div>

        <div className="relative w-full px-2">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Invest in
                <br />
                <span style={{ color: '#d0ac00' }}>Saudi Arabia's</span>
                <br />
                Future
              </h1>
              <p className="text-xl mb-8 leading-relaxed max-w-xl" style={{ color: '#efefef' }}>
                Join the real estate crowdfunding revolution. Build wealth through Vision 2030 projects with Shariah-compliant investments.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="backdrop-blur-sm rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <h3 className="text-2xl font-bold text-white">SAR 2.5B+</h3>
                  <p className="text-sm" style={{ color: '#efefef' }}>Total Invested</p>
                </div>
                <div className="backdrop-blur-sm rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <h3 className="text-2xl font-bold text-white">15.2%</h3>
                  <p className="text-sm" style={{ color: '#efefef' }}>Avg. Returns</p>
                </div>
                <div className="backdrop-blur-sm rounded-xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <h3 className="text-2xl font-bold text-white">6+</h3>
                  <p className="text-sm" style={{ color: '#efefef' }}>Properties Funded</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-black font-semibold text-lg px-8 border-0 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#d0ac00' }}
                  onClick={() => {
                    // Check if user is logged in
                    const userData = localStorage.getItem('zaron_user')
                    if (userData) {
                      // User is logged in, go to properties page
                      setLocation('/website/properties')
                    } else {
                      // User is not logged in, go to register page
                      setLocation('/register')
                    }
                  }}
                >
                  START INVESTING NOW
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white text-lg px-8 hover:bg-white/10 transition-colors"
                  style={{ borderColor: '#efefef', borderWidth: '2px' }}
                  onClick={() => setLocation('/website/properties')}
                >
                  EXPLORE OPPORTUNITIES
                </Button>
              </div>
            </motion.div>

            {/* Right Visual - Tablet Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full max-w-md mx-auto">
                <img
                  src="/images/Tablet.png"
                  alt="Investment Portfolio on Tablet"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#18605c' }}>
        <div className="w-full px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-6 py-2 rounded-full mb-4" style={{ border: '2px solid white' }}>
              <p className="text-sm font-semibold text-white">
                Why Choose Real Estate Crowdfunding
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#d0ac00' }}>
              Transform Your Investment Portfolio
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-white">
              Access exclusive Saudi real estate opportunities with fractional ownership, professional management, and Shariah-compliant returns.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(null).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-0 shadow-2xl h-full rounded-3xl">
                  <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 p-5 border-b-2 border-gray-300">
                    <h3 className="text-xl font-bold" style={{ color: '#004743' }}>Fractional Ownership</h3>
                    <p className="text-sm" style={{ color: '#004743', opacity: 0.8 }}>Min. SAR 1,000</p>
                  </div>
                  <CardContent className="p-6 bg-white">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-base leading-relaxed flex-1" style={{ color: '#004743' }}>
                        Invest in premium properties with as little as SAR 1,000
                      </p>
                      <div className="flex-shrink-0">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                          {/* Person head */}
                          <circle cx="40" cy="25" r="12" fill="#18605c"/>
                          {/* Person body */}
                          <path d="M40 40C30 40 22 44 22 50V58H58V50C58 44 50 40 40 40Z" fill="#18605c"/>
                          {/* Gear background circle */}
                          <circle cx="40" cy="57" r="18" fill="#18605c"/>
                          {/* Gear teeth */}
                          <path d="M40 42L42 45L40 48L38 45L40 42Z" fill="white"/>
                          <path d="M48 45L51 47L48 49L45 47L48 45Z" fill="white"/>
                          <path d="M48 65L51 67L48 69L45 67L48 65Z" fill="white"/>
                          <path d="M32 45L35 47L32 49L29 47L32 45Z" fill="white"/>
                          <path d="M32 65L35 67L32 69L29 67L32 65Z" fill="white"/>
                          {/* Center circle with plus */}
                          <circle cx="40" cy="57" r="10" fill="white"/>
                          <path d="M40 52V62M35 57H45" stroke="#18605c" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Saudi Projects */}
      <section className="py-20" style={{ backgroundColor: '#18605c' }}>
        <div className="w-full px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Exclusive Saudi Projects</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#efefef' }}>
              Premium real estate opportunities in Saudi Arabia's most promising developments. Register to unlock detailed investment information.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-white text-lg">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white text-lg">No properties available at the moment</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {properties.map((property, index) => {
                const primaryImage = property.images.find(img => img.isPrimary) || property.images[0]
                const fundedAmount = (property.financials.totalValue * property.fundingProgress) / 100

                return (
                  <motion.div
                    key={property._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white overflow-hidden h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow">
                      {/* Property Image */}
                      <div className="h-48 relative bg-gradient-to-br from-emerald-600 to-teal-600">
                        {primaryImage && (
                          <img
                            src={primaryImage.url}
                            alt={primaryImage.alt || property.title}
                            className="w-full h-full object-cover"
                          />
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
                          SAR {(fundedAmount / 1000000).toFixed(2)}M of SAR {(property.financials.totalValue / 1000000).toFixed(0)}M funded
                        </p>

                        <div className="flex gap-3 mt-auto">
                          <Button
                            variant="outline"
                            className="flex-1 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                            onClick={() => handleViewDetails(property._id)}
                          >
                            Learn More
                          </Button>
                          <Button
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                            onClick={handleInvest}
                          >
                            Invest Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-teal-900"
              onClick={() => setLocation('/website/properties')}
            >
              View All Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-teal-900 to-gray-900">
        <div className="w-full px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Start Your Investment Journey</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Four simple steps to building wealth through real estate
            </p>
          </motion.div>

          <div>
            <div className="grid md:grid-cols-4 gap-8 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-2xl font-bold mb-4 shadow-lg">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-yellow-500 to-transparent -translate-x-1/2"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-lg px-12"
              onClick={() => {
                // Check if user is logged in
                const userData = localStorage.getItem('zaron_user')
                if (userData) {
                  // User is logged in, go to properties page
                  setLocation('/website/properties')
                } else {
                  // User is not logged in, go to register page
                  setLocation('/register')
                }
              }}
            >
              Start Investing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20" style={{ backgroundColor: '#18605c' }}>
        <div className="w-full px-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#d0ac00' }}>
              Trusted by Thousands of Investors
            </h2>
            <p className="text-white text-lg mb-8">
              Join our community of successful real estate investors across Saudi Arabia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-teal-800/60 backdrop-blur-sm border border-teal-700/50 overflow-hidden h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-1">18%</h3>
                        <p className="text-teal-200 text-sm">Annual Returns</p>
                      </div>
                      <ArrowUpRight className="w-6 h-6 text-teal-300" />
                    </div>

                    <p className="text-white/90 italic mb-6 leading-relaxed text-sm">
                      "Zaron has transformed my investment strategy. The platform's transparency and Shariah-compliant options align perfectly with my values. I've achieved 18% returns consistently."
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-teal-700/50 flex items-center justify-center border border-teal-600/30">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Ahmed Al-Rashid</h4>
                        <p className="text-teal-200 text-xs">Private Equity Investor</p>
                        <p className="text-teal-300 text-xs">Riyadh</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Carousel Dots */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
