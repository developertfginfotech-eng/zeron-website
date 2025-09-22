import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "@/hooks/use-translation"
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
  ArrowRight
} from "lucide-react"

const featuredProperties = [
  {
    id: 1,
    title: "NEOM Residential Complex",
    location: "NEOM, Tabuk Province",
    price: "500,000",
    expectedReturn: "12%",
    fundingProgress: 85,
    remainingDays: 15,
    investors: 234,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
    tags: ["Vision 2030", "Shariah Compliant", "High Yield"]
  },
  {
    id: 2,
    title: "Riyadh Downtown Tower",
    location: "King Fahd District, Riyadh",
    price: "750,000",
    expectedReturn: "10%",
    fundingProgress: 65,
    remainingDays: 22,
    investors: 189,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
    tags: ["Prime Location", "Commercial", "Stable Returns"]
  },
  {
    id: 3,
    title: "Red Sea Resort Development",
    location: "Red Sea Project",
    price: "1,200,000",
    expectedReturn: "15%",
    fundingProgress: 45,
    remainingDays: 35,
    investors: 156,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    tags: ["Tourism", "Luxury", "Mega Project"]
  }
]

const investmentBenefits = [
  {
    icon: TrendingUp,
    title: "High Returns",
    description: "Average returns of 12-18% annually on real estate investments"
  },
  {
    icon: Shield,
    title: "Shariah Compliant",
    description: "All investments are vetted and certified as Shariah compliant"
  },
  {
    icon: Building2,
    title: "Premium Properties",
    description: "Curated selection of high-quality real estate projects"
  },
  {
    icon: Users,
    title: "Fractional Ownership",
    description: "Start investing with as little as 1,000 SAR"
  }
]

export default function InvestPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-blue-950/50 dark:via-background dark:to-emerald-950/50 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Badge className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white border-0 mb-4">
                🏗️ Vision 2030 Projects Available
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-800 bg-clip-text text-transparent">
              Start Investing Today
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of investors building wealth through premium Saudi Arabian real estate projects. 
              All investments are Shariah compliant and aligned with Vision 2030.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700" data-testid="button-browse-investments">
                <Building2 className="w-5 h-5 mr-2" />
                Browse Investments
              </Button>
              <Button size="lg" variant="outline" data-testid="button-how-it-works">
                How It Works
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Invest with Zaron?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of real estate investment with our innovative platform designed for the Saudi market.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {investmentBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover-elevate group cursor-pointer" data-testid={`card-benefit-${index}`}>
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Investment Opportunities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover premium real estate projects across Saudi Arabia's most promising developments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover-elevate group cursor-pointer" data-testid={`card-property-${property.id}`}>
                <div className="relative">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {property.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-white/90 text-gray-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{property.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Investment Amount</p>
                      <p className="text-2xl font-bold">{property.price} SAR</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Expected Return</p>
                      <p className="text-2xl font-bold text-green-600">{property.expectedReturn}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span>{property.fundingProgress}%</span>
                    </div>
                    <Progress value={property.fundingProgress} className="h-2" />
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {property.investors} investors
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {property.remainingDays} days left
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700" data-testid={`button-invest-${property.id}`}>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Invest Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How to Start Investing</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started with real estate investment in just three simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Create Account",
                description: "Sign up and complete your KYC verification in minutes",
                icon: Users
              },
              {
                step: "02", 
                title: "Choose Investment",
                description: "Browse and select from our curated property portfolio",
                icon: Building2
              },
              {
                step: "03",
                title: "Start Earning",
                description: "Invest and start earning returns from day one",
                icon: TrendingUp
              }
            ].map((step, index) => (
              <Card key={index} className="text-center p-8 hover-elevate" data-testid={`card-step-${index + 1}`}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-emerald-300"></div>
                )}
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700" data-testid="button-get-started">
              <CheckCircle className="w-5 h-5 mr-2" />
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Wealth?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join over 10,000 investors who trust Zaron for their real estate investment journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" data-testid="button-start-investing">
              Start Investing Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-schedule-call">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}