import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "@/hooks/use-translation"
import { 
  Building2, 
  TrendingUp, 
  Users, 
  DollarSign,
  Shield,
  PieChart,
  Banknote,
  Target,
  CheckCircle,
  ArrowRight,
  Calculator,
  Clock,
  Award,
  Globe
} from "lucide-react"

const revenueStreams = [
  {
    icon: Building2,
    title: "Property Management Fees",
    description: "1-3% annual management fee on all properties in our portfolio",
    percentage: "40%"
  },
  {
    icon: TrendingUp,
    title: "Performance Fees",
    description: "20% performance fee on returns above benchmark rates",
    percentage: "35%"
  },
  {
    icon: Users,
    title: "Platform Transaction Fees",
    description: "Small transaction fees for buying/selling property shares",
    percentage: "15%"
  },
  {
    icon: DollarSign,
    title: "Premium Services",
    description: "Advisory services, market analysis, and portfolio optimization",
    percentage: "10%"
  }
]

const investmentProcess = [
  {
    step: "01",
    title: "Property Sourcing",
    description: "Our team identifies high-quality real estate opportunities across Saudi Arabia",
    details: [
      "Due diligence on developers and projects",
      "Market analysis and feasibility studies", 
      "Shariah compliance verification",
      "Legal structure setup"
    ]
  },
  {
    step: "02",
    title: "Investor Participation", 
    description: "Retail investors can participate in fractional ownership through our platform",
    details: [
      "Minimum investment from 1,000 SAR",
      "Transparent pricing and fee structure",
      "Real-time investment tracking",
      "Flexible exit options"
    ]
  },
  {
    step: "03",
    title: "Active Management",
    description: "We actively manage properties to maximize returns for all investors",
    details: [
      "Professional property management",
      "Regular performance reporting",
      "Market optimization strategies",
      "Risk monitoring and mitigation"
    ]
  },
  {
    step: "04",
    title: "Returns Distribution",
    description: "Profits are distributed to investors based on their ownership percentage",
    details: [
      "Monthly rental income distribution",
      "Annual capital appreciation sharing",
      "Transparent accounting and reporting",
      "Automated return calculations"
    ]
  }
]

const marketOpportunity = [
  {
    metric: "2.5 Trillion SAR",
    label: "Saudi Real Estate Market Size",
    description: "Total addressable market by 2030"
  },
  {
    metric: "65%",
    label: "Home Ownership Target",
    description: "Vision 2030 goal vs current 47%"
  },
  {
    metric: "10+ Million",
    label: "Population Growth",
    description: "Expected new residents by 2030"
  },
  {
    metric: "500+ Billion SAR",
    label: "NEOM Investment",
    description: "Mega-projects creating opportunities"
  }
]

const competitiveAdvantages = [
  {
    icon: Shield,
    title: "Shariah Compliance",
    description: "Only platform with certified Islamic finance board oversight"
  },
  {
    icon: Globe,
    title: "Vision 2030 Focus",
    description: "Strategic alignment with Saudi Arabia's transformation goals"
  },
  {
    icon: Calculator,
    title: "Technology-First",
    description: "Advanced analytics and AI-powered investment recommendations"
  },
  {
    icon: Award,
    title: "Regulatory Compliance",
    description: "Fully licensed and regulated by Saudi financial authorities"
  }
]

export default function BusinessModelPage() {
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
                <PieChart className="w-4 h-4 mr-2" />
                Our Business Model
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-800 bg-clip-text text-transparent">
              {t("business_model")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover how Zaron is transforming real estate investment through innovative technology, 
              strategic partnerships, and unwavering commitment to Shariah compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-emerald-600" data-testid="button-view-opportunities">
                <PieChart className="w-5 h-5 mr-2" />
                View Opportunities
              </Button>
              <Button size="lg" variant="outline" data-testid="button-download-whitepaper">
                Download Whitepaper
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Market Opportunity</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Saudi Arabia's real estate market presents unprecedented opportunities driven by Vision 2030 initiatives.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {marketOpportunity.map((item, index) => (
              <Card key={index} className="text-center p-6 hover-elevate" data-testid={`card-market-${index}`}>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  {item.metric}
                </div>
                <h3 className="font-semibold mb-2">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Model Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Generate Revenue</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our diversified revenue model ensures sustainable growth while aligning our interests with investor success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {revenueStreams.map((stream, index) => (
              <Card key={index} className="p-8 hover-elevate" data-testid={`card-revenue-${index}`}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <stream.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{stream.title}</h3>
                      <Badge variant="secondary" className="text-blue-600 font-bold">
                        {stream.percentage}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{stream.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Investment Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive approach that ensures quality investments and maximizes returns for all stakeholders.
            </p>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
            {investmentProcess.map((process, index) => (
              <Card key={index} className="p-8 hover-elevate" data-testid={`card-process-${index}`}>
                <div className="flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-6">
                  <div className="flex items-center space-x-4 lg:w-1/3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                      {process.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{process.title}</h3>
                      <p className="text-muted-foreground text-sm">{process.description}</p>
                    </div>
                  </div>
                  <div className="lg:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {process.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Competitive Advantages</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              What sets Zaron apart in the real estate investment landscape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {competitiveAdvantages.map((advantage, index) => (
              <Card key={index} className="p-6 text-center hover-elevate" data-testid={`card-advantage-${index}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Model */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Financial Projections</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our growth trajectory and financial outlook for the next five years.
            </p>
          </div>
          <Tabs defaultValue="growth" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="growth" data-testid="tab-growth">Growth Metrics</TabsTrigger>
              <TabsTrigger value="revenue" data-testid="tab-revenue">Revenue Model</TabsTrigger>
              <TabsTrigger value="expansion" data-testid="tab-expansion">Expansion Plan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="growth" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <h3 className="text-2xl font-bold text-blue-600 mb-2">100,000+</h3>
                  <p className="text-muted-foreground">Active Investors by 2026</p>
                </Card>
                <Card className="text-center p-6">
                  <h3 className="text-2xl font-bold text-emerald-600 mb-2">10B SAR</h3>
                  <p className="text-muted-foreground">Assets Under Management</p>
                </Card>
                <Card className="text-center p-6">
                  <h3 className="text-2xl font-bold text-purple-600 mb-2">500+</h3>
                  <p className="text-muted-foreground">Properties in Portfolio</p>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="revenue" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Year 1-2: Foundation</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Focus on platform growth and user acquisition</li>
                    <li>• Build strong property portfolio</li>
                    <li>• Establish market presence in major cities</li>
                  </ul>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Year 3-5: Scale</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Expand to secondary markets</li>
                    <li>• Launch premium investment products</li>
                    <li>• International expansion planning</li>
                  </ul>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="expansion" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Geographic Expansion</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Phase 1: All major Saudi cities</li>
                    <li>• Phase 2: GCC countries</li>
                    <li>• Phase 3: MENA region</li>
                  </ul>
                </Card>
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Product Expansion</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Commercial real estate</li>
                    <li>• REITs and structured products</li>
                    <li>• Property development funding</li>
                  </ul>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Risk Management */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Risk Management</h2>
            <p className="text-lg text-muted-foreground mb-12">
              We employ comprehensive risk management strategies to protect investor capital and ensure sustainable returns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6 text-left">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Investment Risk Mitigation
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Diversified portfolio across regions and property types</li>
                  <li>• Thorough due diligence on all investments</li>
                  <li>• Professional property management partners</li>
                  <li>• Regular market analysis and portfolio rebalancing</li>
                </ul>
              </Card>
              <Card className="p-6 text-left">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-emerald-600" />
                  Regulatory Compliance
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Full compliance with SAMA regulations</li>
                  <li>• Shariah board oversight and certification</li>
                  <li>• Regular audits and reporting</li>
                  <li>• Investor protection measures</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Partner with Zaron</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join us in reshaping the future of real estate investment in Saudi Arabia and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" data-testid="button-start-investing">
              Start Investing
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-partner-with-us">
              Partner With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}