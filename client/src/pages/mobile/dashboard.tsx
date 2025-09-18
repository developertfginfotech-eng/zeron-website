import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Building, 
  Eye, 
  Plus, 
  Star, 
  MapPin, 
  ArrowRight,
  MessageSquare,
  Brain,
  Sparkles,
  Shield,
  Globe,
  Target,
  Bot,
  RefreshCw,
  Zap,
  ChevronUp
} from "lucide-react"
import { Link } from "wouter"
import { useTranslation } from "@/hooks/use-translation"
import { MobileChat } from "@/components/mobile-chat"
import { AIInsights } from "@/components/ai-insights"
import { saudiProperties, saudiMarketStats } from "@/lib/saudi-data"
import apartmentImg from "@assets/generated_images/luxury_apartment_building_exterior_e11af77f.png"
import officeImg from "@assets/generated_images/commercial_office_building_f8c8d53a.png"
import retailImg from "@assets/generated_images/retail_shopping_complex_10ee6fbf.png"
import villaImg from "@assets/generated_images/luxury_villa_property_b02d7e37.png"

// Enhanced Saudi investor data
const mockInvestor = {
  id: "inv_001",
  name: "Ahmed Al-Rashid",
  nameAr: "أحمد الراشد",
  nameHi: "अहमद अल-राशिद",
  totalInvestment: 1250000,
  currentValue: 1582000,
  totalReturn: 332000,
  returnPercentage: 26.6,
  activeInvestments: 5,
  aiScore: 92,
  vision2030Aligned: true,
  shariahCompliant: true,
  portfolio: [
    {
      id: "1",
      name: "neom_the_line_residential",
      location: "neom",
      invested: 500000,
      currentValue: 634000,
      returnAmount: 134000,
      returnPercentage: 26.8,
      performance: "excellent",
      vision2030: true,
      shariah: true
    },
    {
      id: "2", 
      name: "red_sea_global_marina",
      location: "red_sea",
      invested: 400000,
      currentValue: 498000,
      returnAmount: 98000,
      returnPercentage: 24.5,
      performance: "excellent",
      vision2030: true,
      shariah: true
    },
    {
      id: "3",
      name: "riyadh_financial_district",
      location: "riyadh",
      invested: 350000,
      currentValue: 450000,
      returnAmount: 100000,
      returnPercentage: 28.6,
      performance: "excellent",
      vision2030: true,
      shariah: true
    }
  ]
}

// Use Saudi properties from saudi-data.ts
const availableProperties = saudiProperties.slice(0, 3)

export default function MobileDashboard() {
  const { t } = useTranslation()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showFloatingActions, setShowFloatingActions] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  // Pull-to-refresh simulation
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }
  
  // Scroll listener for floating elements
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      setShowFloatingActions(window.scrollY > 200)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div className="relative">
      {/* Pull-to-refresh indicator */}
      {isRefreshing && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
          <RefreshCw className="h-4 w-4 animate-spin inline mr-2" />
          Refreshing...
        </div>
      )}
      
      {/* Floating scroll-to-top button */}
      {showFloatingActions && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-4 z-40 w-12 h-12 bg-primary text-white rounded-full shadow-xl mobile-pulse-glow hover:scale-110 transition-all duration-300 flex items-center justify-center"
          data-testid="button-scroll-top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
      
      {/* Floating AI Assistant Button */}
      {showFloatingActions && (
        <Link href="/mobile/ai-advisor">
          <button
            className="fixed bottom-40 right-4 z-40 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full shadow-xl mobile-pulse-glow hover:scale-110 transition-all duration-300 flex items-center justify-center"
            data-testid="button-floating-ai"
          >
            <Brain className="h-6 w-6" />
          </button>
        </Link>
      )}
    
      <div className="space-y-6 pb-20 mobile-enhanced bg-gradient-to-br from-background via-muted/10 to-primary/5 min-h-screen">
        {/* Outstanding Premium Welcome Header */}
        <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 rounded-3xl text-white relative overflow-hidden mobile-scale-in glass-card shadow-2xl border border-white/20 backdrop-blur-xl" data-testid="header-welcome">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 backdrop-blur-sm" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-1" data-testid="text-welcome-message">{t('welcome_back')}</h1>
                <p className="text-xl font-semibold" data-testid="text-investor-name">{mockInvestor.name}</p>
                <p className="text-primary-foreground/80 mt-1 text-sm" data-testid="text-track-investments">{t('track_investments')}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-lg animate-float" data-testid="icon-portfolio-value">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="bg-white/15 rounded-xl p-4 backdrop-blur-xl border border-white/20 shadow-lg" data-testid="card-portfolio-value">
              <p className="text-xs text-primary-foreground/70 uppercase tracking-wide">{t('total_portfolio_value')}</p>
              <p className="text-2xl font-bold" data-testid="text-portfolio-value">SAR {mockInvestor.currentValue.toLocaleString()}</p>
            </div>
          </div>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse-slow" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-lg animate-float" />
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/10 rounded-full blur-md animate-pulse" />
          <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-white/20 rounded-full animate-ping" />
        </div>

        {/* Enhanced Portfolio Overview Cards */}
        <div className="grid grid-cols-2 gap-4 mobile-grid">
          <Card className="enhanced-card mobile-fade-in-up mobile-interactive border-0 shadow-xl" data-testid="card-total-value">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center shadow-lg" data-testid="icon-total-value">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{t('total_value')}</p>
                  <p className="text-2xl font-bold" data-testid="text-total-value">SAR {mockInvestor.currentValue.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gradient-to-r from-green-50 to-green-100 px-3 py-1 rounded-full border border-green-200 shadow-sm" data-testid="badge-return-percentage">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <p className="text-xs font-semibold text-green-600">+{mockInvestor.returnPercentage}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="enhanced-card mobile-fade-in-up mobile-interactive animate-delay-100 border-0 shadow-xl" data-testid="card-total-return">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-lg" data-testid="icon-total-return">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{t('total_return')}</p>
                  <p className="text-2xl font-bold text-green-600" data-testid="text-total-return">+SAR {mockInvestor.totalReturn.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground bg-gradient-to-r from-muted/50 to-muted/30 px-3 py-1 rounded-full inline-block border border-muted/30" data-testid="text-since-inception">{t('since_inception')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Premium Saudi Market Overview */}
        <Card className="enhanced-card mobile-fade-in-up animate-delay-200 border-0 shadow-xl bg-gradient-to-br from-white via-white to-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 via-green-200 to-green-300 rounded-xl flex items-center justify-center shadow-lg animate-pulse-slow">
                <Globe className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{t('saudi_market')}</h3>
                <p className="text-sm text-muted-foreground">Live Market Analytics with AI Insights</p>
              </div>
              <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300 px-3 py-1 shadow-sm">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-150 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-all">
                <p className="text-xs text-blue-700 font-medium mb-2">Market Growth</p>
                <p className="text-xl font-bold text-blue-800">+{saudiMarketStats.yearlyGrowth}%</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 via-purple-100 to-purple-150 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-all">
                <p className="text-xs text-purple-700 font-medium mb-2">AI Score</p>
                <p className="text-xl font-bold text-purple-800">{mockInvestor.aiScore}</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 via-green-100 to-green-150 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-all">
                <p className="text-xs text-green-700 font-medium mb-2">Vision 2030</p>
                <p className="text-xl font-bold text-green-800">{saudiMarketStats.vision2030Projects}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Badge variant="outline" className="text-xs bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200 px-3 py-1 shadow-sm">
                <Shield className="h-3 w-3 mr-1" />
                {t('shariah_compliant')}
              </Badge>
              <Badge variant="outline" className="text-xs bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200 px-3 py-1 shadow-sm">
                <Target className="h-3 w-3 mr-1" />
                {t('vision_2030')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Premium AI Assistant & Chat Quick Access */}
        <div className="grid grid-cols-2 gap-4 mobile-grid">
          <Link href="/mobile/ai-advisor">
            <Card className="enhanced-card mobile-fade-in-up mobile-interactive border-0 shadow-xl cursor-pointer group" data-testid="card-ai-assistant">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 via-primary/20 to-primary/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all shadow-lg">
                  <Brain className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-sm mb-2">{t('ai_assistant')}</h3>
                <p className="text-xs text-muted-foreground mb-4">Smart Investment Advisor</p>
                <Button size="sm" className="w-full text-xs h-9 shadow-lg" data-testid="button-ai-assistant">
                  <Bot className="h-3 w-3 mr-1" />
                  {t('ask_ai')}
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/mobile/chat">
            <Card className="enhanced-card mobile-fade-in-up mobile-interactive animate-delay-100 border-0 shadow-xl cursor-pointer group" data-testid="card-live-chat">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all shadow-lg">
                  <MessageSquare className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-sm mb-2">{t('live_chat')}</h3>
                <p className="text-xs text-muted-foreground mb-4">Expert Advisors Online</p>
                <Button size="sm" variant="outline" className="w-full text-xs h-9 shadow-lg border-2" data-testid="button-live-chat">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {t('chat_with_advisor')}
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* AI Insights Section */}
        <AIInsights />

        {/* Live Chat Section */}
        <MobileChat />

        {/* Premium Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mobile-grid">
          <Link href="/mobile/properties">
            <Button className="w-full h-16 gap-4 mobile-button mobile-interactive text-base font-bold rounded-2xl shadow-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary" data-testid="button-browse-properties">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg">
                <Building className="h-5 w-5" />
              </div>
              {t('browse_properties')}
            </Button>
          </Link>
          <Link href="/mobile/portfolio">
            <Button variant="outline" className="w-full h-16 gap-4 mobile-button mobile-interactive text-base font-bold rounded-2xl shadow-xl border-2 bg-gradient-to-r from-white to-muted/30" data-testid="button-view-portfolio">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shadow-lg">
                <Eye className="h-5 w-5" />
              </div>
              {t('view_portfolio')}
            </Button>
          </Link>
        </div>

        {/* Outstanding Active Investments */}
        <Card className="enhanced-card mobile-fade-in-up animate-delay-200 border-0 shadow-xl bg-gradient-to-br from-white via-white to-primary/5">
          <CardHeader className="pb-5">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold">{t('active_investments')}</span>
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-primary/20 text-primary font-bold px-4 py-2 text-base shadow-sm">
                {mockInvestor.activeInvestments}
              </Badge>
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">{t('current_property_investments')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {mockInvestor.portfolio.map((investment, index) => (
              <div key={investment.id} className={`border-0 rounded-2xl p-6 space-y-5 mobile-interactive property-card bg-gradient-to-r from-white via-white to-muted/20 shadow-lg mobile-fade-in-up animate-delay-${(index + 1) * 100}`} data-testid={`investment-card-${investment.id}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2" data-testid={`text-investment-name-${investment.id}`}>{t(investment.name as keyof typeof import("@/lib/translations").translations.en)}</h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground" data-testid={`text-investment-location-${investment.id}`}>{t(investment.location as keyof typeof import("@/lib/translations").translations.en)}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={investment.performance === 'excellent' ? 'default' : 'secondary'}
                    className="text-sm px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300 shadow-sm"
                    data-testid={`badge-performance-${investment.id}`}
                  >
                    {t(investment.performance as keyof typeof import("@/lib/translations").translations.en)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-white to-muted/50 rounded-xl border border-muted/30 shadow-sm" data-testid={`metric-invested-${investment.id}`}>
                    <p className="text-xs text-muted-foreground font-medium mb-2">{t('invested')}</p>
                    <p className="text-sm font-bold">SAR {investment.invested.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-white to-muted/50 rounded-xl border border-muted/30 shadow-sm" data-testid={`metric-current-value-${investment.id}`}>
                    <p className="text-xs text-muted-foreground font-medium mb-2">{t('current_value')}</p>
                    <p className="text-sm font-bold">SAR {investment.currentValue.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 shadow-sm" data-testid={`metric-return-${investment.id}`}>
                    <p className="text-xs text-muted-foreground font-medium mb-2">{t('return')}</p>
                    <p className="text-sm font-bold text-green-600">
                      +{investment.returnPercentage}%
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3" data-testid={`progress-section-${investment.id}`}>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">Performance Progress</span>
                    <span className="font-bold text-green-600" data-testid={`text-progress-${investment.id}`}>{investment.returnPercentage}% of 15%</span>
                  </div>
                  <Progress 
                    value={investment.returnPercentage} 
                    className="h-4 bg-muted/50 shadow-inner"
                    max={15}
                    data-testid={`progress-bar-${investment.id}`}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Premium Performance Summary */}
        <Card className="enhanced-card mobile-fade-in-up animate-delay-300 border-0 shadow-xl bg-gradient-to-br from-white via-primary/5 to-primary/10">
          <CardHeader className="pb-5">
            <CardTitle className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">{t('performance_summary')}</span>
            </CardTitle>
            <CardDescription className="text-base">{t('investment_performance_overview')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-white to-muted/30 rounded-2xl text-center border border-muted/30 shadow-lg">
                  <p className="text-sm text-muted-foreground font-medium mb-3">{t('total_invested')}</p>
                  <p className="text-2xl font-bold">SAR {mockInvestor.totalInvestment.toLocaleString()}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-white to-muted/30 rounded-2xl text-center border border-muted/30 shadow-lg">
                  <p className="text-sm text-muted-foreground font-medium mb-3">{t('current_value')}</p>
                  <p className="text-2xl font-bold">SAR {mockInvestor.currentValue.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="p-5 bg-gradient-to-r from-green-50 via-green-100 to-green-150 rounded-2xl text-center border border-green-200 shadow-lg">
                <p className="text-sm text-green-700 font-medium mb-3">{t('total_return')}</p>
                <p className="text-3xl font-bold text-green-600">+SAR {mockInvestor.totalReturn.toLocaleString()}</p>
                <p className="text-lg font-bold text-green-600 mt-1">+{mockInvestor.returnPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Outstanding Available Properties */}
        <Card className="enhanced-card mobile-fade-in-up animate-delay-400 border-0 shadow-xl bg-gradient-to-br from-white via-white to-muted/5">
          <CardHeader className="pb-5">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-lg">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-xl font-bold">{t('available_properties')}</span>
              </div>
              <Link href="/mobile/properties">
                <Button size="sm" variant="outline" className="gap-2 shadow-lg border-2">
                  View All
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardTitle>
            <CardDescription className="text-base">{t('new_investment_opportunities')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {availableProperties.map((property, index) => (
                <div key={property.id} className={`border rounded-2xl p-6 space-y-5 mobile-interactive property-card bg-gradient-to-r from-white to-muted/20 shadow-lg hover:shadow-xl transition-all mobile-fade-in-up animate-delay-${(index + 1) * 100}`} data-testid={`property-card-${property.id}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2" data-testid={`text-property-name-${property.id}`}>{property.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground" data-testid={`text-property-location-${property.id}`}>{property.location}</p>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-property-description-${property.id}`}>{property.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm" data-testid={`metric-min-investment-${property.id}`}>
                      <p className="text-xs text-blue-700 font-medium mb-2">{t('min_investment')}</p>
                      <p className="text-sm font-bold text-blue-800">SAR {property.minInvestment.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 shadow-sm" data-testid={`metric-expected-return-${property.id}`}>
                      <p className="text-xs text-green-700 font-medium mb-2">{t('expected_return')}</p>
                      <p className="text-sm font-bold text-green-800">{property.expectedReturn}%</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 shadow-sm" data-testid={`metric-duration-${property.id}`}>
                      <p className="text-xs text-purple-700 font-medium mb-2">{t('duration')}</p>
                      <p className="text-sm font-bold text-purple-800">{property.duration}</p>
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-muted-foreground font-medium">Funding Progress</span>
                      <span className="font-bold text-primary">{Math.round((property.soldUnits / property.totalUnits) * 100)}% Complete</span>
                    </div>
                    <Progress 
                      value={(property.soldUnits / property.totalUnits) * 100} 
                      className="h-4 bg-muted/50 shadow-inner"
                    />
                    <p className="text-xs text-muted-foreground mt-2">{property.soldUnits} of {property.totalUnits} units sold</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="sm" className="flex-1 h-12 text-sm gap-2 mobile-button font-bold rounded-xl shadow-lg" data-testid={`button-invest-${property.id}`}>
                      <Plus className="h-4 w-4" />
                      {t('invest_now')}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 h-12 text-sm gap-2 mobile-button font-bold rounded-xl border-2 shadow-lg" data-testid={`button-learn-more-${property.id}`}>
                      <ArrowRight className="h-4 w-4" />
                      {t('learn_more')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}