import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "wouter"
import { 
  TrendingUp, 
  Building, 
  DollarSign, 
  BarChart3, 
  MapPin, 
  Star,
  Calendar,
  Bell,
  Sparkles,
  Crown,
  Users,
  Shield,
  Zap,
  ChevronRight,
  Eye,
  Heart,
  Share,
  Globe,
  Target,
  MessageSquare,
  Brain,
  ArrowUpRight,
  Sunrise,
  Moon,
  Sun,
  ChevronUp,
  RefreshCw
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/hooks/use-translation"

interface Property {
  id: string
  title: string
  titleAr: string
  titleHi: string
  location: string
  locationAr: string
  locationHi: string
  price: number
  roi: number
  image: string
  type: string
  shariahCompliant: boolean
  vision2030: boolean
  featured: boolean
}

interface Investment {
  id: string
  propertyTitle: string
  amount: number
  roi: number
  status: string
  performance: "excellent" | "good" | "stable"
}

interface MarketData {
  totalValue: number
  dailyChange: number
  monthlyGrowth: number
  yearlyReturn: number
  activeProjects: number
  vision2030Progress: number
}

const saudiProperties: Property[] = [
  {
    id: "1",
    title: "NEOM The Line Residences",
    titleAr: "مساكن ذا لاين نيوم", 
    titleHi: "नियोम द लाइन निवास",
    location: "NEOM, Tabuk Province",
    locationAr: "نيوم، منطقة تبوك",
    locationHi: "नियोम, तबूक प्रांत",
    price: 4850000,
    roi: 18.5,
    image: "/api/placeholder/400/300",
    type: "Futuristic Residential",
    shariahCompliant: true,
    vision2030: true,
    featured: true
  },
  {
    id: "2", 
    title: "Red Sea Global Resort",
    titleAr: "منتجع البحر الأحمر العالمي",
    titleHi: "रेड सी ग्लोबल रिज़ॉर्ट",
    location: "Red Sea Project",
    locationAr: "مشروع البحر الأحمر",
    locationHi: "रेड सी प्रोजेक्ट",
    price: 6200000,
    roi: 22.3,
    image: "/api/placeholder/400/300",
    type: "Luxury Resort",
    shariahCompliant: true,
    vision2030: true,
    featured: true
  },
  {
    id: "3",
    title: "Qiddiya Entertainment City",
    titleAr: "مدينة القدية الترفيهية",
    titleHi: "किद्दिया मनोरंजन शहर",
    location: "Riyadh, Central Region",
    locationAr: "الرياض، المنطقة الوسطى",
    locationHi: "रियाध, मध्य क्षेत्र",
    price: 3950000,
    roi: 16.8,
    image: "/api/placeholder/400/300",
    type: "Entertainment Complex",
    shariahCompliant: true,
    vision2030: true,
    featured: false
  }
]

const marketData: MarketData = {
  totalValue: 2450000,
  dailyChange: 2.4,
  monthlyGrowth: 12.7,
  yearlyReturn: 89.4,
  activeProjects: 156,
  vision2030Progress: 67
}

const mockInvestments: Investment[] = [
  {
    id: "1",
    propertyTitle: "NEOM The Line Residences",
    amount: 750000,
    roi: 18.5,
    status: "Active",
    performance: "excellent"
  },
  {
    id: "2",
    propertyTitle: "Qiddiya Entertainment City",
    amount: 580000,
    roi: 16.8,
    status: "Active", 
    performance: "excellent"
  },
  {
    id: "3",
    propertyTitle: "Red Sea Global Resort",
    amount: 420000,
    roi: 22.3,
    status: "Active",
    performance: "excellent"
  }
]

export default function MobileDashboard() {
  const { t, language } = useTranslation()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly")

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon" 
    return "Good Evening"
  }

  const getGreetingIcon = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return Sunrise
    if (hour < 17) return Sun
    return Moon
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
  }

  const totalInvested = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0)
  const totalReturn = mockInvestments.reduce((sum, inv) => sum + (inv.amount * inv.roi / 100), 0)
  const averageROI = mockInvestments.reduce((sum, inv) => sum + inv.roi, 0) / mockInvestments.length

  const timeframes = [
    { id: "daily", label: "Daily", value: `+${marketData.dailyChange}%`, icon: TrendingUp },
    { id: "monthly", label: "Monthly", value: `+${marketData.monthlyGrowth}%`, icon: BarChart3 },
    { id: "yearly", label: "Yearly", value: `+${marketData.yearlyReturn}%`, icon: Star }
  ]

  const quickActions = [
    { 
      icon: Building, 
      label: t("properties"), 
      path: "/mobile/properties", 
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      description: "Explore Vision 2030 projects"
    },
    { 
      icon: BarChart3, 
      label: t("portfolio"), 
      path: "/mobile/portfolio", 
      gradient: "from-emerald-500 via-green-600 to-teal-500",
      description: "Track your investments"
    }
  ]

  const GreetingIcon = getGreetingIcon()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-4 w-72 h-72 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse opacity-60" />
        <div className="absolute bottom-20 right-8 w-96 h-96 bg-gradient-to-tl from-secondary/15 to-transparent rounded-full blur-3xl animate-pulse opacity-40" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-accent/10 to-transparent rounded-full blur-2xl animate-pulse opacity-30" />
      </div>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-r from-primary to-primary/80 text-white rounded-full shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-300"
            data-testid="button-scroll-top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 p-6 pb-28 space-y-8">
        {/* Enhanced Welcome Header */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-white border-0 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent" />
            <div className="absolute inset-0">
              <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse" />
            </div>
            
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-lg">
                    <GreetingIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">{getGreeting()}</h1>
                    <p className="text-white/80 text-lg">Investor</p>
                  </div>
                </div>
                
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-xl border border-white/30 hover:bg-white/30 transition-all duration-300"
                  data-testid="button-refresh"
                >
                  <RefreshCw className={`w-5 h-5 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-white/70 text-sm uppercase tracking-widest">{t("total_portfolio_value")}</p>
                  <div className="text-4xl font-bold mt-2">
                    {(totalInvested + totalReturn).toLocaleString()} SAR
                  </div>
                </div>

                {/* Time & Date */}
                <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-xl border border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {currentTime.toLocaleTimeString(language === 'ar' ? 'ar-SA' : language === 'hi' ? 'hi-IN' : 'en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div className="text-white/80 text-sm mt-1">
                      {currentTime.toLocaleDateString(language === 'ar' ? 'ar-SA' : language === 'hi' ? 'hi-IN' : 'en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          <Card className="bg-gradient-to-br from-emerald-50 to-green-100 border-emerald-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-700">{t("total_return")}</p>
                  <p className="text-2xl font-bold text-emerald-800">+{totalReturn.toLocaleString()}</p>
                </div>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-300">
                <Sparkles className="w-3 h-3 mr-1" />
                +{((totalReturn / totalInvested) * 100).toFixed(1)}%
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-700">Avg ROI</p>
                  <p className="text-2xl font-bold text-blue-800">{averageROI.toFixed(1)}%</p>
                </div>
              </div>
              <Badge className="bg-blue-500/10 text-blue-700 border-blue-300">
                <Target className="w-3 h-3 mr-1" />
                {mockInvestments.length} {t("properties")}
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeframe Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="shadow-xl border-0 bg-gradient-to-r from-card to-card/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Market Performance
              </h3>
              
              <div className="grid grid-cols-3 gap-3 mb-4">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe.id}
                    onClick={() => setSelectedTimeframe(timeframe.id)}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      selectedTimeframe === timeframe.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-muted/50 hover:bg-muted'
                    }`}
                    data-testid={`button-timeframe-${timeframe.id}`}
                  >
                    <timeframe.icon className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-xs font-medium">{timeframe.label}</div>
                    <div className="text-sm font-bold">{timeframe.value}</div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-xl font-bold text-primary">{marketData.activeProjects}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500/10 to-green-500/5 p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground">Vision 2030</p>
                  <p className="text-xl font-bold text-green-600">{marketData.vision2030Progress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            Quick Actions
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link key={action.path} href={action.path}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  <Card className="h-32 cursor-pointer border-0 shadow-xl overflow-hidden bg-gradient-to-br from-card to-card/60 backdrop-blur-sm">
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
                    <CardContent className="h-full flex flex-col items-center justify-center relative z-10 text-center p-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="font-semibold text-sm">{action.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{action.description}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Featured Vision 2030 Properties */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Crown className="w-6 h-6 text-primary" />
              Featured Properties
            </h3>
            <Link href="/mobile/properties">
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" data-testid="button-view-all-properties">
                View All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {saudiProperties.filter(p => p.featured).map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-r from-card to-card/70 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                        <Building className="w-10 h-10 text-primary" />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="font-bold text-lg leading-tight">
                            {language === 'ar' ? property.titleAr : language === 'hi' ? property.titleHi : property.title}
                          </h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {language === 'ar' ? property.locationAr : language === 'hi' ? property.locationHi : property.location}
                          </p>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {property.vision2030 && (
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                              Vision 2030
                            </Badge>
                          )}
                          {property.shariahCompliant && (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Halal
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-primary">
                            {property.price.toLocaleString()} SAR
                          </div>
                          <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3 text-emerald-600" />
                            <span className="text-sm font-semibold text-emerald-600">{property.roi}% ROI</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active Investments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              Your Investments
            </h3>
            <Link href="/mobile/portfolio">
              <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" data-testid="button-view-portfolio">
                View Portfolio
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {mockInvestments.slice(0, 3).map((investment, index) => (
              <motion.div
                key={investment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <Card className="shadow-lg border-0 bg-gradient-to-r from-card to-card/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base mb-1">{investment.propertyTitle}</h4>
                        <p className="text-sm text-muted-foreground">
                          Invested: {investment.amount.toLocaleString()} SAR
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600 mb-1">
                          +{investment.roi}%
                        </div>
                        <Badge 
                          className={`text-xs ${
                            investment.performance === 'excellent' 
                              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                              : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                          }`}
                        >
                          {investment.performance === 'excellent' ? 'Excellent' : investment.performance === 'good' ? 'Good' : 'Stable'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Insights CTA */}
      </div>
    </div>
  )
}