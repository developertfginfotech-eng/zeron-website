import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Lock, ArrowUpRight, User, Building2, Shield, PieChart, Users, TrendingUp, Eye, Star, UserPlus, Search, DollarSign, CheckCircle, MapPin } from "lucide-react"
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

const features = [
  {
    icon: Building2,
    title: "Fractional Ownership",
    subtitle: "Min. SAR 1,000",
    description: "Invest in premium Saudi properties with as little as SAR 1,000. Own real estate previously accessible only to the ultra-wealthy."
  },
  {
    icon: Shield,
    title: "Shariah Compliant",
    subtitle: "100% Halal",
    description: "Every investment is vetted by leading Islamic scholars, ensuring full compliance with Islamic finance principles."
  },
  {
    icon: PieChart,
    title: "Diversified Portfolio",
    subtitle: "Spread Your Risk",
    description: "Invest across multiple properties, cities, and asset classes to reduce risk and maximize long-term wealth growth."
  },
  {
    icon: Users,
    title: "Professional Management",
    subtitle: "Zero Hassle",
    description: "Expert property managers handle tenant relations, maintenance, and rent collection entirely on your behalf."
  },
  {
    icon: TrendingUp,
    title: "Monthly Returns",
    subtitle: "Regular Income",
    description: "Receive monthly rental distributions directly to your wallet and watch your passive income compound over time."
  },
  {
    icon: Eye,
    title: "Full Transparency",
    subtitle: "Real-time Reports",
    description: "Access detailed financial reports, property updates, and live investment performance dashboards anytime."
  }
]

const testimonials = [
  {
    returns: "18%",
    quote: "Zaron has transformed my investment strategy. The platform's transparency and Shariah-compliant options align perfectly with my values. Consistent returns every month.",
    name: "Ahmed Al-Rashid",
    role: "Private Equity Investor",
    city: "Riyadh",
    initials: "AR"
  },
  {
    returns: "22%",
    quote: "Minimum ticket sizes were always a barrier in real estate. Zaron changed that completely — I started with SAR 5,000 and have steadily grown a solid portfolio.",
    name: "Khalid Al-Mutairi",
    role: "Entrepreneur",
    city: "Jeddah",
    initials: "KM"
  },
  {
    returns: "15%",
    quote: "The platform is incredibly intuitive. I track my entire portfolio in one place and monthly returns land in my wallet like clockwork. Highly recommended.",
    name: "Nour Al-Saud",
    role: "Business Consultant",
    city: "Dammam",
    initials: "NS"
  }
]

export default function WebsiteHome() {
  const [, setLocation] = useLocation()
  const { toast } = useToast()
  const [properties, setProperties] = useState<BackendProperty[]>([])
  const [loading, setLoading] = useState(true)

  const { isKYCCompleted } = getKYCStatus()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const endpoint = `${API_BASE_URL}${API_ENDPOINTS.PROPERTIES}`

        const response = await fetch(endpoint, {
          headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const result = await response.json()

        if (result.success && result.data.properties) {
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

  const handleViewDetails = (propertyId?: string) => {
    if (propertyId) {
      setLocation(`/website/property/${propertyId}`)
    } else {
      setLocation('/website/properties')
    }
  }

  const handleInvest = () => {
    const userData = localStorage.getItem('zaron_user')
    if (!userData) {
      toast({ title: "Login Required", description: "Please login to start investing", variant: "destructive" })
      setLocation('/register')
      return
    }

    try {
      const user = JSON.parse(userData)
      const kycStatus = user.kycStatus || 'not_submitted'
      const isKYCCompleted = kycStatus === 'submitted' || kycStatus === 'under_review' || kycStatus === 'approved'

      if (!isKYCCompleted) {
        toast({ title: "KYC Verification Required", description: "Complete your KYC verification to start investing", variant: "destructive" })
        setLocation('/kyc-verification')
        return
      }

      setLocation('/website/properties')
    } catch {
      setLocation('/register')
    }
  }

  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up in minutes with your email. Complete KYC verification for secure, compliant investing."
    },
    {
      number: 2,
      icon: Search,
      title: "Browse Opportunities",
      description: "Explore vetted properties with detailed financials, projections, and risk analysis."
    },
    {
      number: 3,
      icon: DollarSign,
      title: "Invest & Own",
      description: "Choose your investment amount and own fractional units in premium Saudi properties."
    },
    {
      number: 4,
      icon: TrendingUp,
      title: "Earn Returns",
      description: "Receive monthly rental income and watch your investment grow with property appreciation."
    }
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#004743' }}>

      {/* ─── Hero Section ─── */}
      <section className="relative pt-28 pb-32 overflow-hidden" style={{ backgroundColor: '#004743' }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/BG%20Image.jpg')", opacity: 0.4 }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Trust badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <CheckCircle className="w-4 h-4" style={{ color: '#d0ac00' }} />
                <span className="text-sm font-medium text-white">Shariah Compliant · Vision 2030 Aligned</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08]">
                Invest in
                <br />
                <span style={{ color: '#d0ac00' }}>Saudi Arabia's</span>
                <br />
                Future
              </h1>
              <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-lg" style={{ color: '#c5dfdd' }}>
                Join the real estate crowdfunding revolution. Build wealth through Vision 2030 projects with Shariah-compliant investments starting from SAR 1,000.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { value: 'SAR 2.5B+', label: 'Total Invested' },
                  { value: '15.2%', label: 'Avg. Returns' },
                  { value: '6+', label: 'Properties Funded' }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4 text-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</h3>
                    <p className="text-xs" style={{ color: '#9ecfcb' }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-black font-bold text-base px-8 h-14 rounded-xl border-0 shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
                  style={{ backgroundColor: '#d0ac00' }}
                  onClick={() => {
                    const userData = localStorage.getItem('zaron_user')
                    if (userData) { setLocation('/website/properties') } else { setLocation('/register') }
                  }}
                >
                  Start Investing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white text-base px-8 h-14 rounded-xl hover:bg-white/10 transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.35)', borderWidth: '2px' }}
                  onClick={() => setLocation('/website/properties')}
                >
                  Explore Opportunities
                </Button>
              </div>
            </motion.div>

            {/* Right Visual */}
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

      {/* ─── Why Choose Section ─── */}
      <section className="py-24" style={{ backgroundColor: '#18605c' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-5"
              style={{ border: '1px solid rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.07)' }}
            >
              <Star className="w-4 h-4" style={{ color: '#d0ac00' }} />
              <p className="text-sm font-semibold text-white">Why Real Estate Crowdfunding</p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#d0ac00' }}>
              Transform Your Investment Portfolio
            </h2>
            <p className="text-lg text-white/85 max-w-2xl mx-auto">
              Access exclusive Saudi real estate with fractional ownership, professional management, and Shariah-compliant returns.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border-0 shadow-xl h-full rounded-2xl hover:-translate-y-1 transition-all duration-300">
                    <div className="p-5 flex items-center gap-4" style={{ backgroundColor: '#004743' }}>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">{feature.title}</h3>
                        <p className="text-xs font-semibold mt-0.5" style={{ color: '#d0ac00' }}>{feature.subtitle}</p>
                      </div>
                    </div>
                    <CardContent className="p-5 bg-white">
                      <p className="text-sm leading-relaxed" style={{ color: '#1a4745' }}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Exclusive Saudi Projects ─── */}
      <section className="py-24" style={{ backgroundColor: '#18605c' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Exclusive Saudi Projects</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#c5dfdd' }}>
              Premium real estate opportunities in Saudi Arabia's most promising developments. Register to unlock detailed investment information.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-white text-lg">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-16">
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
                    <Card className="bg-white overflow-hidden h-full flex flex-col shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl border-0">
                      {/* Property Image */}
                      <div className="h-52 relative bg-gradient-to-br from-emerald-600 to-teal-600">
                        {primaryImage && (
                          <img
                            src={primaryImage.url}
                            alt={primaryImage.alt || property.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {/* Status badge */}
                        <div
                          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm"
                          style={{ backgroundColor: property.status === 'active' ? 'rgba(34,197,94,0.85)' : 'rgba(168,85,247,0.85)' }}
                        >
                          {property.status === 'active' ? 'Live' : 'Coming Soon'}
                        </div>
                        {!isKYCCompleted && (
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            KYC Required
                          </div>
                        )}
                        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full font-bold text-sm shadow-sm" style={{ color: '#18605c' }}>
                          {Math.round(property.fundingProgress)}% Funded
                        </div>
                      </div>

                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{property.title}</h3>
                        <p className="text-sm text-gray-500 mb-5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                          {property.location.district}, {property.location.city}
                        </p>

                        <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="text-center">
                            <p className="text-xs text-gray-400 mb-1">Target Return</p>
                            <p className="text-base font-bold" style={{ color: '#18605c' }}>{property.financials.projectedYield}%</p>
                          </div>
                          <div className="text-center border-x border-gray-200">
                            <p className="text-xs text-gray-400 mb-1">Min. Invest</p>
                            <p className="text-sm font-bold text-gray-800">SAR {(property.financials.minInvestment / 1000).toFixed(0)}K</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400 mb-1">Investors</p>
                            <p className="text-sm font-bold text-gray-800">{property.investorCount}</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-1.5">
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${property.fundingProgress}%`, background: 'linear-gradient(to right, #18605c, #004743)' }}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">
                          SAR {(fundedAmount / 1000000).toFixed(2)}M of SAR {(property.financials.totalValue / 1000000).toFixed(0)}M funded
                        </p>

                        <div className="flex gap-3 mt-auto">
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
                            onClick={() => handleViewDetails(property._id)}
                          >
                            Learn More
                          </Button>
                          <Button
                            className="flex-1 font-bold text-black hover:opacity-90 rounded-xl"
                            style={{ backgroundColor: '#d0ac00' }}
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
              className="border-2 text-white hover:bg-white/10 transition-colors px-8 h-14 rounded-xl"
              style={{ borderColor: 'rgba(255,255,255,0.35)' }}
              onClick={() => setLocation('/website/properties')}
            >
              View All Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-24 bg-gradient-to-b from-teal-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Start Your Investment Journey</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Four simple steps to building real estate wealth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="relative inline-flex mb-6">
                      <div
                        className="h-16 w-16 flex items-center justify-center rounded-full shadow-lg"
                        style={{ backgroundColor: '#d0ac00' }}
                      >
                        <Icon className="w-7 h-7 text-black" />
                      </div>
                      <div
                        className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md"
                      >
                        <span className="text-xs font-bold" style={{ color: '#004743' }}>{step.number}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-8 left-full w-full h-0.5 -translate-x-1/2"
                      style={{ background: 'linear-gradient(to right, rgba(208,172,0,0.6), transparent)' }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="font-bold text-black text-base px-10 h-14 rounded-xl shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
              style={{ backgroundColor: '#d0ac00' }}
              onClick={() => {
                const userData = localStorage.getItem('zaron_user')
                if (userData) { setLocation('/website/properties') } else { setLocation('/register') }
              }}
            >
              Start Investing Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-24" style={{ backgroundColor: '#18605c' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#d0ac00' }}>
              Trusted by Thousands of Investors
            </h2>
            <p className="text-white/80 text-lg">
              Join our community of successful real estate investors across Saudi Arabia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className="h-full rounded-2xl border-0 overflow-hidden shadow-xl"
                  style={{ backgroundColor: 'rgba(0,55,50,0.55)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <CardContent className="p-7 flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Return highlight */}
                    <div className="flex items-baseline gap-3 mb-5">
                      <span className="text-4xl font-bold text-white">{item.returns}</span>
                      <div className="flex items-center gap-1.5">
                        <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-400 font-medium">Annual Returns</span>
                      </div>
                    </div>

                    <p className="text-white/80 italic mb-6 leading-relaxed text-sm flex-1">
                      "{item.quote}"
                    </p>

                    <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                        style={{ backgroundColor: '#d0ac00', color: '#004743' }}
                      >
                        {item.initials}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                        <p className="text-white/55 text-xs">{item.role} · {item.city}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
