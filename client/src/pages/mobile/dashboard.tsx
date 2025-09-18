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
  Bot
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
  
  return (
    <div className="space-y-6 pb-20 mobile-enhanced">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 rounded-2xl text-white relative overflow-hidden mobile-scale-in mobile-glass shadow-xl" data-testid="header-welcome">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1" data-testid="text-welcome-message">{t('welcome_back')}</h1>
              <p className="text-xl font-semibold" data-testid="text-investor-name">{mockInvestor.name}</p>
              <p className="text-primary-foreground/80 mt-1 text-sm" data-testid="text-track-investments">{t('track_investments')}</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm" data-testid="icon-portfolio-value">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm" data-testid="card-portfolio-value">
            <p className="text-xs text-primary-foreground/70 uppercase tracking-wide">{t('total_portfolio_value')}</p>
            <p className="text-2xl font-bold" data-testid="text-portfolio-value">SAR {mockInvestor.currentValue.toLocaleString()}</p>
          </div>
        </div>
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/5 rounded-full" />
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-2 gap-4 mobile-grid">
        <Card className="mobile-card mobile-fade-in-up mobile-interactive border-0 shadow-lg" data-testid="card-total-value">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center" data-testid="icon-total-value">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{t('total_value')}</p>
                <p className="text-2xl font-bold" data-testid="text-total-value">SAR {mockInvestor.currentValue.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full" data-testid="badge-return-percentage">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <p className="text-xs font-semibold text-green-600">+{mockInvestor.returnPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mobile-card mobile-fade-in-up mobile-interactive animate-delay-100 border-0 shadow-lg" data-testid="card-total-return">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center" data-testid="icon-total-return">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">{t('total_return')}</p>
                <p className="text-2xl font-bold text-green-600" data-testid="text-total-return">+SAR {mockInvestor.totalReturn.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full inline-block" data-testid="text-since-inception">{t('since_inception')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Saudi Market Overview */}
      <Card className="mobile-card mobile-fade-in-up animate-delay-200 border-0 shadow-lg">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
              <Globe className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base">{t('saudi_market')}</h3>
              <p className="text-sm text-muted-foreground">Live Market Analytics</p>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 font-medium mb-1">Market Growth</p>
              <p className="text-lg font-bold text-blue-800">+{saudiMarketStats.yearlyGrowth}%</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <p className="text-xs text-purple-700 font-medium mb-1">AI Score</p>
              <p className="text-lg font-bold text-purple-800">{mockInvestor.aiScore}</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <p className="text-xs text-green-700 font-medium mb-1">Vision 2030</p>
              <p className="text-lg font-bold text-green-800">{saudiMarketStats.vision2030Projects}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              <Shield className="h-3 w-3 mr-1" />
              {t('shariah_compliant')}
            </Badge>
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              <Target className="h-3 w-3 mr-1" />
              {t('vision_2030')}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* AI Assistant & Chat Quick Access */}
      <div className="grid grid-cols-2 gap-4 mobile-grid">
        <Card className="mobile-card mobile-fade-in-up mobile-interactive border-0 shadow-lg cursor-pointer hover:shadow-xl" data-testid="card-ai-assistant">
          <CardContent className="p-5 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold text-sm mb-1">{t('ai_assistant')}</h3>
            <p className="text-xs text-muted-foreground mb-3">Smart Investment Advisor</p>
            <Button size="sm" className="w-full text-xs" data-testid="button-ai-assistant">
              <Bot className="h-3 w-3 mr-1" />
              {t('ask_ai')}
            </Button>
          </CardContent>
        </Card>

        <Card className="mobile-card mobile-fade-in-up mobile-interactive animate-delay-100 border-0 shadow-lg cursor-pointer hover:shadow-xl" data-testid="card-live-chat">
          <CardContent className="p-5 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-sm mb-1">{t('live_chat')}</h3>
            <p className="text-xs text-muted-foreground mb-3">Expert Advisors Online</p>
            <Button size="sm" variant="outline" className="w-full text-xs" data-testid="button-live-chat">
              <MessageSquare className="h-3 w-3 mr-1" />
              {t('chat_with_advisor')}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <AIInsights />

      {/* Live Chat Section */}
      <MobileChat />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mobile-grid">
        <Link href="/mobile/properties">
          <Button className="w-full h-14 gap-3 mobile-button mobile-interactive text-base font-semibold rounded-xl shadow-lg" data-testid="button-browse-properties">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Building className="h-4 w-4" />
            </div>
            {t('browse_properties')}
          </Button>
        </Link>
        <Link href="/mobile/portfolio">
          <Button variant="outline" className="w-full h-14 gap-3 mobile-button mobile-interactive text-base font-semibold rounded-xl shadow-lg border-2" data-testid="button-view-portfolio">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Eye className="h-4 w-4" />
            </div>
            {t('view_portfolio')}
          </Button>
        </Link>
      </div>

      {/* Active Investments */}
      <Card className="mobile-card mobile-fade-in-up animate-delay-200 border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <span className="text-lg font-bold">{t('active_investments')}</span>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold px-3 py-1">
              {mockInvestor.activeInvestments}
            </Badge>
          </CardTitle>
          <CardDescription className="text-base">{t('current_property_investments')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockInvestor.portfolio.map((investment, index) => (
            <div key={investment.id} className={`border-0 rounded-xl p-5 space-y-4 mobile-interactive property-card bg-gradient-to-r from-white to-muted/20 animate-delay-${(index + 1) * 100}`} data-testid={`investment-card-${investment.id}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-base" data-testid={`text-investment-name-${investment.id}`}>{t(investment.name as keyof typeof import("@/lib/translations").translations.en)}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground" data-testid={`text-investment-location-${investment.id}`}>{t(investment.location as keyof typeof import("@/lib/translations").translations.en)}</p>
                  </div>
                </div>
                <Badge 
                  variant={investment.performance === 'excellent' ? 'default' : 'secondary'}
                  className="text-sm px-3 py-1 bg-green-100 text-green-700 border-green-200"
                  data-testid={`badge-performance-${investment.id}`}
                >
                  {t(investment.performance as keyof typeof import("@/lib/translations").translations.en)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/70 rounded-lg" data-testid={`metric-invested-${investment.id}`}>
                  <p className="text-xs text-muted-foreground font-medium mb-1">{t('invested')}</p>
                  <p className="text-sm font-bold">SAR {investment.invested.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-lg" data-testid={`metric-current-value-${investment.id}`}>
                  <p className="text-xs text-muted-foreground font-medium mb-1">{t('current_value')}</p>
                  <p className="text-sm font-bold">SAR {investment.currentValue.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg" data-testid={`metric-return-${investment.id}`}>
                  <p className="text-xs text-muted-foreground font-medium mb-1">{t('return')}</p>
                  <p className="text-sm font-bold text-green-600">
                    +{investment.returnPercentage}%
                  </p>
                </div>
              </div>
              
              <div className="space-y-2" data-testid={`progress-section-${investment.id}`}>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Performance Progress</span>
                  <span className="font-bold text-green-600" data-testid={`text-progress-${investment.id}`}>{investment.returnPercentage}% of 15%</span>
                </div>
                <Progress 
                  value={investment.returnPercentage} 
                  className="h-3 bg-muted/50"
                  max={15}
                  data-testid={`progress-bar-${investment.id}`}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card className="mobile-card mobile-fade-in-up animate-delay-300 border-0 shadow-lg bg-gradient-to-br from-white to-primary/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">{t('performance_summary')}</span>
          </CardTitle>
          <CardDescription className="text-base">{t('investment_performance_overview')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/70 rounded-xl text-center">
                <p className="text-xs text-muted-foreground font-medium mb-2">{t('total_invested')}</p>
                <p className="text-lg font-bold">SAR {mockInvestor.totalInvestment.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-white/70 rounded-xl text-center">
                <p className="text-xs text-muted-foreground font-medium mb-2">{t('current_value')}</p>
                <p className="text-lg font-bold">SAR {mockInvestor.currentValue.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-700">{t('total_return')}</span>
                <span className="text-xl font-bold text-green-600">+SAR {mockInvestor.totalReturn.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-700">{t('roi')}</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-xl font-bold text-green-600">{mockInvestor.returnPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Properties */}
      <Card className="overflow-hidden mobile-card mobile-fade-in-up animate-delay-300 border-0 shadow-lg">
        <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Building className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">{t('available_properties')}</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-semibold px-3 py-1">
              New
            </Badge>
          </CardTitle>
          <CardDescription className="text-base">{t('new_investment_opportunities')}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {availableProperties.map((property, index) => (
              <div 
                key={property.id} 
                className={`relative p-5 property-card mobile-interactive transition-all duration-300 ${index !== availableProperties.length - 1 ? 'border-b border-muted/30' : ''} bg-gradient-to-r from-white to-muted/10`}
                data-testid={`property-card-${property.id}`}
              >
                <div className="flex gap-4">
                  <div className="relative">
                    <img 
                      src={property.image} 
                      alt={t(property.name as keyof typeof import("@/lib/translations").translations.en)} 
                      className="w-24 h-24 rounded-xl object-cover border-2 border-border shadow-md"
                    />
                    {property.status === 'new' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm line-clamp-1">
                          {t(property.name as keyof typeof import("@/lib/translations").translations.en)}
                        </h3>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">
                            {t(property.location as keyof typeof import("@/lib/translations").translations.en)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-green-600">{property.expectedReturn}%</p>
                        <p className="text-xs text-muted-foreground">{t('expected_return')}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 bg-white/70 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground font-medium mb-1">{t('min_investment')}</p>
                        <p className="text-sm font-bold">SAR {property.minInvestment.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-white/70 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground font-medium mb-1">{t('duration')}</p>
                        <p className="text-sm font-bold">{property.duration}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground font-medium">Funding Progress</span>
                        <span className="font-bold text-primary">{Math.round((property.soldUnits / property.totalUnits) * 100)}% Complete</span>
                      </div>
                      <Progress 
                        value={(property.soldUnits / property.totalUnits) * 100} 
                        className="h-3 bg-muted/50"
                      />
                      <p className="text-xs text-muted-foreground mt-1">{property.soldUnits} of {property.totalUnits} units sold</p>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button size="sm" className="flex-1 h-10 text-sm gap-2 mobile-button font-semibold rounded-lg" data-testid={`button-invest-${property.id}`}>
                        <Plus className="h-4 w-4" />
                        {t('invest_now')}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 h-10 text-sm gap-2 mobile-button font-semibold rounded-lg border-2" data-testid={`button-learn-more-${property.id}`}>
                        <ArrowRight className="h-4 w-4" />
                        {t('learn_more')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}