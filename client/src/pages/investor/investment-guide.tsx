import { useTranslation } from '@/hooks/use-translation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  Building, 
  Shield, 
  Calculator, 
  FileText, 
  Users, 
  Heart, 
  Award,
  PieChart,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Target,
  BarChart3,
  Globe,
  Home,
  Play,
  ArrowRight,
  Star,
  Lightbulb,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function InvestmentGuide() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState(0)

  const guideSteps = [
    { icon: BookOpen, title: t("learn_the_basics"), progress: 100 },
    { icon: Calculator, title: t("calculate_returns"), progress: 75 },
    { icon: Shield, title: t("risk_management"), progress: 50 },
    { icon: Target, title: t("build_portfolio"), progress: 25 }
  ]

  const scrollToSection = (index: number) => {
    setActiveSection(index)
    const element = document.getElementById(`guide-section-${index}`)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-blue-900 dark:to-emerald-900">
      
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6"
              {...fadeIn}
            >
              <Lightbulb className="w-5 h-5" />
              <span className="font-sans font-medium">{t("investment_education_center")}</span>
            </motion.div>

            <motion.h1
              className="font-display text-6xl font-bold mb-6"
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              {t("master_real_estate_crowdfunding")}
            </motion.h1>

            <motion.p
              className="font-sans text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed"
              {...fadeIn}
              transition={{ delay: 0.4 }}
            >
              {t("learn_build_wealth_through_fractional")}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              {...fadeIn}
              transition={{ delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-emerald-700 hover:bg-gray-100 font-sans font-semibold text-lg px-8 py-4 h-auto"
                data-testid="button-start-guide"
                onClick={() => scrollToSection(0)}
              >
                <Play className="w-5 h-5 mr-2" />
                {t("start_learning_now")}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 font-sans font-semibold text-lg px-8 py-4 h-auto"
                data-testid="button-quick-calculator"
              >
                <Calculator className="w-5 h-5 mr-2" />
                {t("quick_calculator")}
              </Button>
            </motion.div>

            {/* Progress Tracker */}
            <motion.div
              className="flex justify-center gap-2 pt-8"
              {...fadeIn}
              transition={{ delay: 0.8 }}
            >
              {guideSteps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeSection ? 'bg-yellow-300 scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  data-testid={`button-guide-step-${index}`}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        
        {/* Section 1: What is Real Estate Crowdfunding */}
        <motion.section
          id="guide-section-0"
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-lg">
              <BookOpen className="w-5 h-5 mr-2" />
              {t("chapter_1")}
            </Badge>
            <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("what_is_real_estate_crowdfunding")}
            </h2>
            <p className="font-sans text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("discover_how_fractional_property")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={stagger} animate="animate">
              <motion.div variants={fadeIn} className="space-y-6">
                <Card className="border-2 border-emerald-100 dark:border-emerald-900 hover-elevate">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-sans text-2xl">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      {t("traditional_vs_crowdfunding")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-sans font-semibold text-gray-600 dark:text-gray-400">Traditional</h4>
                        <ul className="space-y-1 text-sm font-sans">
                          <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-orange-500" />{t("high_capital_required")}</li>
                          <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-orange-500" />{t("single_property_risk")}</li>
                          <li className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-orange-500" />{t("management_burden")}</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-sans font-semibold text-emerald-600">Crowdfunding</h4>
                        <ul className="space-y-1 text-sm font-sans">
                          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" />{t("low_minimum_investment")}</li>
                          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" />{t("diversified_portfolio")}</li>
                          <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500" />{t("professional_management")}</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-100 dark:border-blue-900 hover-elevate">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-sans text-2xl">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <PieChart className="w-6 h-6 text-white" />
                      </div>
                      How It Works
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                          <h5 className="font-sans font-semibold">Choose Your Investment</h5>
                          <p className="font-sans text-sm text-gray-600 dark:text-gray-400">Browse verified properties with detailed analytics</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                          <h5 className="font-sans font-semibold">Invest Your Amount</h5>
                          <p className="font-sans text-sm text-gray-600 dark:text-gray-400">Start with as little as 1,000 SAR</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                          <h5 className="font-sans font-semibold">Earn Returns</h5>
                          <p className="font-sans text-sm text-gray-600 dark:text-gray-400">Receive rental income and capital appreciation</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10 space-y-6">
                  <div className="text-center">
                    <h3 className="font-display text-2xl font-bold mb-2">Average Returns</h3>
                    <div className="text-6xl font-bold">20%</div>
                    <p className="font-sans text-blue-100">Annual ROI</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="font-sans text-sm text-blue-200">Happy Investors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">2B+</div>
                      <div className="font-sans text-sm text-blue-200">SAR Invested</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Section 2: Investment Calculator */}
        <motion.section
          id="guide-section-1"
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-lg">
              <Calculator className="w-5 h-5 mr-2" />
              {t("chapter_2")}
            </Badge>
            <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("calculate_potential_returns")}
            </h2>
            <p className="font-sans text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("use_interactive_tools")}
            </p>
          </div>

          <Tabs defaultValue="simple" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="simple" data-testid="tab-simple-calculator">{t("simple_calculator")}</TabsTrigger>
              <TabsTrigger value="advanced" data-testid="tab-advanced-calculator">{t("advanced_calculator")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="simple" className="space-y-6">
              <Card className="p-8">
                <CardHeader className="text-center">
                  <CardTitle className="font-sans text-2xl">{t("quick_return_estimator")}</CardTitle>
                  <CardDescription className="font-sans">{t("see_how_money_grow")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20">
                      <DollarSign className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                      <div className="font-display text-3xl font-bold text-gray-900 dark:text-white">10,000</div>
                      <div className="font-sans text-sm text-gray-600 dark:text-gray-400">{t("sar_initial_investment")}</div>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/20">
                      <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <div className="font-display text-3xl font-bold text-gray-900 dark:text-white">20%</div>
                      <div className="font-sans text-sm text-gray-600 dark:text-gray-400">{t("annual_return")}</div>
                    </div>
                    <div className="text-center p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/20">
                      <Clock className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      <div className="font-display text-3xl font-bold text-gray-900 dark:text-white">5</div>
                      <div className="font-sans text-sm text-gray-600 dark:text-gray-400">{t("years")}</div>
                    </div>
                  </div>
                  <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
                    <h4 className="font-sans text-lg mb-2">Projected Value After 5 Years</h4>
                    <div className="font-display text-5xl font-bold">24,883 SAR</div>
                    <div className="font-sans text-emerald-100 mt-2">+14,883 SAR profit</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced">
              <Card className="p-8">
                <CardHeader className="text-center">
                  <CardTitle className="font-sans text-2xl">Advanced Portfolio Calculator</CardTitle>
                  <CardDescription className="font-sans">Detailed analysis with multiple scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-sans text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      Advanced Calculator Coming Soon
                    </h4>
                    <p className="font-sans text-gray-500 dark:text-gray-500">
                      Include compound growth, tax implications, and portfolio diversification
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.section>

        {/* Section 3: Risk Management */}
        <motion.section
          id="guide-section-2"
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-lg">
              <Shield className="w-5 h-5 mr-2" />
              {t("chapter_3")}
            </Badge>
            <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("understanding_risks_protections")}
            </h2>
            <p className="font-sans text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("learn_minimize_risks")}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Regulatory Protection",
                description: "Regulatory oversight ensures compliance",
                details: ["Licensed operators only", "Regular audits", "Investor protections"],
                color: "emerald"
              },
              {
                icon: PieChart,
                title: "Diversification",
                description: "Spread risk across properties",
                details: ["Multiple locations", "Different property types", "Varied investment sizes"],
                color: "blue"
              },
              {
                icon: Award,
                title: "Due Diligence",
                description: "Thorough property vetting",
                details: ["Market analysis", "Financial projections", "Legal verification"],
                color: "purple"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className={`h-full border-2 border-${item.color}-100 dark:border-${item.color}-900 hover-elevate`}>
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 flex items-center justify-center mx-auto mb-4`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="font-sans text-xl text-center">{item.title}</CardTitle>
                    <CardDescription className="font-sans text-center">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 font-sans text-sm">
                          <CheckCircle className={`w-4 h-4 text-${item.color}-500 flex-shrink-0`} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section 4: Building Your Portfolio */}
        <motion.section
          id="guide-section-3"
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-lg">
              <Target className="w-5 h-5 mr-2" />
              {t("chapter_4")}
            </Badge>
            <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t("building_investment_portfolio")}
            </h2>
            <p className="font-sans text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t("step_by_step_guide")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { step: 1, title: "Define Your Goals", description: "Set clear investment objectives and timeline", icon: Target },
              { step: 2, title: "Assess Your Budget", description: "Determine available capital and risk tolerance", icon: Calculator },
              { step: 3, title: "Research Properties", description: "Analyze market trends and property performance", icon: BarChart3 },
              { step: 4, title: "Diversify Investments", description: "Spread across different properties and locations", icon: Globe },
              { step: 5, title: "Monitor & Adjust", description: "Track performance and rebalance as needed", icon: TrendingUp }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-6 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover-elevate"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <step.icon className="w-6 h-6 text-emerald-600" />
                    <h3 className="font-sans text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
                  </div>
                  <p className="font-sans text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="text-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 text-white p-12">
              <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-2xl"></div>
              </div>
              <div className="relative z-10 space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto">
                  <Zap className="w-10 h-10 text-yellow-300" />
                </div>
                <h2 className="font-display text-4xl font-bold">{t("ready_to_start_investing")}</h2>
                <p className="font-sans text-xl text-blue-100 max-w-2xl mx-auto">
                  {t("join_thousands_building_wealth")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-white text-emerald-700 hover:bg-gray-100 font-sans font-semibold text-lg px-8 py-4 h-auto"
                    data-testid="button-start-investing"
                  >
                    {t("start_investing_today")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 font-sans font-semibold text-lg px-8 py-4 h-auto"
                    data-testid="button-browse-properties"
                  >
                    {t("browse_properties")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}