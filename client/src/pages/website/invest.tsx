import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useTranslation } from "@/hooks/use-translation"
import { AuthDialog } from "@/components/auth-dialog"
import { motion } from "framer-motion"
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
  FileCheck
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
      {/* Hero Section with Beautiful Saudi-inspired Design */}
      <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-emerald-900 via-blue-900 to-emerald-800">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop')`
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-blue-900/85 to-emerald-800/80" />
          {/* Golden accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent" />
        </div>

        {/* Animated Background Elements */}
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
            {/* Hero Badges */}
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
                SAMA Regulated
              </Badge>
            </motion.div>

            {/* Main Hero Heading */}
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-emerald-300 via-white to-blue-300 bg-clip-text text-transparent">
                Invest in Saudi's
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-blue-300 bg-clip-text text-transparent">
                Future Today
              </span>
            </motion.h1>

            {/* Hero Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-emerald-100/90 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join <span className="text-amber-300 font-semibold">25,000+</span> investors building wealth through 
              <span className="text-emerald-300 font-semibold"> premium real estate crowdfunding</span> in the Kingdom
            </motion.p>

            {/* Hero Stats */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">SAR 2.5B+</div>
                <div className="text-emerald-200/80 text-sm">Total Invested</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">15.2%</div>
                <div className="text-emerald-200/80 text-sm">Avg. Returns</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">450+</div>
                <div className="text-emerald-200/80 text-sm">Properties Funded</div>
              </div>
            </motion.div>

            {/* Hero CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <AuthDialog defaultTab="register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-2xl"
                  data-testid="button-start-investing"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Investing Now
                </Button>
              </AuthDialog>
              
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
                Explore Opportunities
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="mt-12 flex items-center justify-center gap-8 text-emerald-200/60 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Shariah Certified
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                4.9/5 Rating
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                SAMA Licensed
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
                  title: "Fractional Ownership",
                  description: "Start with as little as SAR 1,000 and own a piece of premium real estate in Saudi Arabia's most promising projects.",
                  highlight: "Min. SAR 1,000"
                },
                {
                  icon: TrendingUp,
                  title: "Superior Returns",
                  description: "Historical returns of 12-18% annually from carefully selected real estate projects aligned with Vision 2030.",
                  highlight: "12-18% Returns"
                },
                {
                  icon: Shield,
                  title: "Shariah Compliant",
                  description: "All investments are certified halal by our Shariah board, ensuring your investments align with Islamic principles.",
                  highlight: "100% Halal"
                },
                {
                  icon: Building2,
                  title: "Premium Properties",
                  description: "Curated selection of high-quality developments in Riyadh, NEOM, and other strategic locations.",
                  highlight: "Prime Locations"
                },
                {
                  icon: Users,
                  title: "Professional Management",
                  description: "Expert property management and transparent reporting so you can invest passively and confidently.",
                  highlight: "Hands-Free"
                },
                {
                  icon: Globe,
                  title: "Vision 2030 Aligned",
                  description: "Invest in the Kingdom's transformation with projects that are driving Saudi Arabia's economic diversification.",
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
              <AuthDialog defaultTab="register">
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600" data-testid="button-why-invest-cta">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Start Your Investment Journey
                </Button>
              </AuthDialog>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties - Teaser Mode */}
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
              Register to unlock detailed investment information and secure your allocation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover-elevate group cursor-pointer border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm" data-testid={`card-property-${property.id}`}>
                  <div className="relative">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Tags */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {property.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} className="bg-emerald-500/90 text-white border-0 backdrop-blur-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-500/90 text-white border-0 backdrop-blur-sm">
                        <Zap className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    </div>

                    {/* Location */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{property.title}</h3>
                      <div className="flex items-center text-emerald-200">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Public Information - Always Visible */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{property.investors}+ investors</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{property.remainingDays} days left</span>
                        </div>
                      </div>

                      {/* Basic Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Funding Progress</span>
                          <span className="font-medium">{property.fundingProgress}%</span>
                        </div>
                        <Progress value={property.fundingProgress} className="h-2" />
                      </div>

                      {/* Gated Information with Blur Effect */}
                      <div className="relative">
                        <div className="filter blur-sm pointer-events-none">
                          <div className="grid grid-cols-2 gap-4 py-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Min. Investment</p>
                              <p className="text-lg font-bold">SAR {property.price}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Expected Return</p>
                              <p className="text-lg font-bold text-emerald-600">{property.expectedReturn}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Lock Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Lock className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-sm font-medium text-foreground mb-1">Investment Details</p>
                            <p className="text-xs text-muted-foreground">Register to unlock</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <AuthDialog defaultTab="login">
                          <Button variant="outline" size="sm" className="w-full" data-testid={`button-view-details-${property.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </AuthDialog>
                        <AuthDialog defaultTab="register">
                          <Button size="sm" className="w-full bg-gradient-to-r from-emerald-600 to-blue-600" data-testid={`button-invest-${property.id}`}>
                            <DollarSign className="w-4 h-4 mr-2" />
                            Invest Now
                          </Button>
                        </AuthDialog>
                      </div>
                    </div>
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
            <AuthDialog defaultTab="register">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600" data-testid="button-browse-all-properties">
                <Building2 className="w-5 h-5 mr-2" />
                Browse All Properties
              </Button>
            </AuthDialog>
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

      {/* Security & Compliance */}
      <section className="py-16 bg-background border-y">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Security & Compliance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your investments are protected by industry-leading security measures and regulatory compliance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                icon: Shield,
                title: "SAMA Regulated",
                description: "Licensed by Saudi Arabian Monetary Authority"
              },
              {
                icon: CheckCircle,
                title: "Shariah Compliant",
                description: "All investments certified by Shariah board"
              },
              {
                icon: Lock,
                title: "Bank-Grade Security",
                description: "256-bit SSL encryption and secure data storage"
              },
              {
                icon: FileCheck,
                title: "Legal Protection",
                description: "Full legal documentation and investor protection"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border hover-elevate"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-testid={`security-feature-${index}`}
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Partner Logos */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-8 text-muted-foreground">Trusted Partners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {[
                { name: "Al Rajhi Bank", logo: "ARB" },
                { name: "Saudi Investment Bank", logo: "SIB" }, 
                { name: "Riyad Capital", logo: "RC" },
                { name: "Jadwa Investment", logo: "JI" }
              ].map((partner, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-6 rounded-lg flex items-center justify-center h-20 font-bold text-gray-600 dark:text-gray-300"
                  data-testid={`partner-${index}`}
                >
                  {partner.logo}
                </div>
              ))}
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
            <AuthDialog defaultTab="register">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-blue-600" data-testid="button-get-started-process">
                <Zap className="w-5 h-5 mr-2" />
                Get Started Now
              </Button>
            </AuthDialog>
          </motion.div>
        </div>
      </section>
    </div>
  )
}