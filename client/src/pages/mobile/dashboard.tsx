import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Building, Eye, Plus, Star, MapPin, ArrowRight } from "lucide-react"
import { Link } from "wouter"
import { useTranslation } from "@/hooks/use-translation"
import apartmentImg from "@assets/generated_images/luxury_apartment_building_exterior_e11af77f.png"
import officeImg from "@assets/generated_images/commercial_office_building_f8c8d53a.png"
import retailImg from "@assets/generated_images/retail_shopping_complex_10ee6fbf.png"
import villaImg from "@assets/generated_images/luxury_villa_property_b02d7e37.png"

// Mock investor data
const mockInvestor = {
  id: "inv_001",
  name: "Ahmed Al-Rashid",
  totalInvestment: 125000,
  currentValue: 138750,
  totalReturn: 13750,
  returnPercentage: 11.0,
  activeInvestments: 3,
  portfolio: [
    {
      id: "1",
      name: "luxury_apartment_complex",
      location: "riyadh",
      invested: 75000,
      currentValue: 82500,
      returnAmount: 7500,
      returnPercentage: 10.0,
      performance: "excellent"
    },
    {
      id: "4", 
      name: "retail_shopping_complex",
      location: "jeddah",
      invested: 50000,
      currentValue: 56250,
      returnAmount: 6250,
      returnPercentage: 12.5,
      performance: "excellent"
    }
  ]
}

// Available properties for investment
const availableProperties = [
  {
    id: "prop_001",
    name: "commercial_office_building",
    location: "riyadh",
    image: officeImg,
    minInvestment: 25000,
    expectedReturn: 12.5,
    duration: "3-5 years",
    price: 1200000,
    totalUnits: 100,
    soldUnits: 68,
    status: "selling"
  },
  {
    id: "prop_002",
    name: "luxury_villa_property",
    location: "jeddah",
    image: villaImg,
    minInvestment: 50000,
    expectedReturn: 15.0,
    duration: "2-4 years", 
    price: 850000,
    totalUnits: 50,
    soldUnits: 12,
    status: "new"
  }
]

export default function MobileDashboard() {
  const { t } = useTranslation()
  
  return (
    <div className="space-y-6 pb-20 mobile-enhanced">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 rounded-xl text-white relative overflow-hidden mobile-scale-in mobile-pulse-glow">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold">{t('welcome_back')}</h1>
          <p className="text-xl">{mockInvestor.name}</p>
          <p className="text-primary-foreground/80 mt-1">{t('track_investments')}</p>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full" />
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full" />
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-2 gap-4 mobile-grid">
        <Card className="mobile-card mobile-fade-in-up">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <p className="text-sm text-muted-foreground">{t('total_value')}</p>
            </div>
            <p className="text-2xl font-bold">SAR {mockInvestor.currentValue.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <p className="text-xs text-green-600">+{mockInvestor.returnPercentage}%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mobile-card mobile-fade-in-up animate-delay-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-muted-foreground">{t('total_return')}</p>
            </div>
            <p className="text-2xl font-bold text-green-600">+SAR {mockInvestor.totalReturn.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{t('since_inception')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mobile-grid">
        <Link href="/mobile/properties">
          <Button className="w-full h-12 gap-2 hover-elevate" data-testid="button-browse-properties">
            <Building className="h-4 w-4" />
            {t('browse_properties')}
          </Button>
        </Link>
        <Link href="/mobile/portfolio">
          <Button variant="outline" className="w-full h-12 gap-2 hover-elevate" data-testid="button-view-portfolio">
            <Eye className="h-4 w-4" />
            {t('view_portfolio')}
          </Button>
        </Link>
      </div>

      {/* Active Investments */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>{t('active_investments')}</span>
            <Badge variant="secondary">{mockInvestor.activeInvestments}</Badge>
          </CardTitle>
          <CardDescription>{t('current_property_investments')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockInvestor.portfolio.map((investment) => (
            <div key={investment.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{t(investment.name as keyof typeof import("@/lib/translations").translations.en)}</h3>
                  <p className="text-xs text-muted-foreground">{t(investment.location as keyof typeof import("@/lib/translations").translations.en)}</p>
                </div>
                <Badge 
                  variant={investment.performance === 'excellent' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {t(investment.performance as keyof typeof import("@/lib/translations").translations.en)}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('invested')}</span>
                  <span className="font-medium">SAR {investment.invested.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('current_value')}</span>
                  <span className="font-medium">SAR {investment.currentValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('return')}</span>
                  <span className="font-medium text-green-600">
                    +SAR {investment.returnAmount.toLocaleString()} ({investment.returnPercentage}%)
                  </span>
                </div>
              </div>
              
              <Progress 
                value={investment.returnPercentage} 
                className="h-2"
                max={15}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{t('performance_summary')}</CardTitle>
          <CardDescription>{t('investment_performance_overview')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('total_invested')}</span>
              <span className="font-medium">SAR {mockInvestor.totalInvestment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('current_value')}</span>
              <span className="font-medium">SAR {mockInvestor.currentValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('total_return')}</span>
              <span className="font-medium text-green-600">+SAR {mockInvestor.totalReturn.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">{t('roi')}</span>
              <span className="font-bold text-green-600">{mockInvestor.returnPercentage}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Properties */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>{t('available_properties')}</span>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              New
            </Badge>
          </CardTitle>
          <CardDescription>{t('new_investment_opportunities')}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {availableProperties.map((property, index) => (
              <div 
                key={property.id} 
                className={`relative p-4 hover-elevate transition-all duration-300 ${index !== availableProperties.length - 1 ? 'border-b' : ''}`}
                data-testid={`property-card-${property.id}`}
              >
                <div className="flex gap-4">
                  <div className="relative">
                    <img 
                      src={property.image} 
                      alt={t(property.name as keyof typeof import("@/lib/translations").translations.en)} 
                      className="w-20 h-20 rounded-lg object-cover border-2 border-border"
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
                    
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">{t('min_investment')}</p>
                        <p className="text-sm font-medium">SAR {property.minInvestment.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t('duration')}</p>
                        <p className="text-sm font-medium">{property.duration}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Funding Progress</span>
                        <span className="font-medium">{Math.round((property.soldUnits / property.totalUnits) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(property.soldUnits / property.totalUnits) * 100} 
                        className="h-2 bg-muted"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 h-8 text-xs gap-1 hover-elevate" data-testid={`button-invest-${property.id}`}>
                        <Plus className="h-3 w-3" />
                        {t('invest_now')}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1 hover-elevate" data-testid={`button-learn-more-${property.id}`}>
                        <ArrowRight className="h-3 w-3" />
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