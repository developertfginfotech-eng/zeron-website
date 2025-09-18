import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import { 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  Calendar, 
  MapPin, 
  Users, 
  BarChart3,
  DollarSign,
  Eye,
  Download,
  Share2,
  PieChart,
  LineChart,
  Target,
  Shield,
  Crown,
  Sparkles,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle,
  Zap,
  Globe,
  Star,
  Filter,
  RefreshCw,
  Calculator,
  TrendingUp as Growth,
  Award,
  Banknote
} from "lucide-react"

interface Investment {
  id: string
  name: string
  nameAr: string
  nameHi: string
  type: string
  location: string
  locationAr: string
  locationHi: string
  image: string
  investedAmount: number
  currentValue: number
  returnAmount: number
  returnPercentage: number
  status: "active" | "pending" | "completed"
  investmentDate: string
  performance: "excellent" | "good" | "fair" | "poor"
  occupancyRate: number
  monthlyRevenue: number
  nextDistribution: string
  vision2030: boolean
  shariahCompliant: boolean
  riskLevel: "low" | "medium" | "high"
  category: "residential" | "commercial" | "mixed" | "hospitality" | "industrial"
  projectStage: "planning" | "construction" | "operational" | "completed"
  expectedCompletion: string
  totalUnits: number
  ownedUnits: number
}

interface PortfolioStats {
  totalValue: number
  totalInvested: number
  totalReturn: number
  returnPercentage: number
  monthlyIncome: number
  averageROI: number
  activeInvestments: number
  portfolioGrowth: {
    daily: number
    weekly: number
    monthly: number
    yearly: number
  }
  riskScore: number
  diversificationScore: number
  vision2030Allocation: number
  shariahCompliance: number
}

const mockInvestments: Investment[] = [
  {
    id: "1",
    name: "NEOM The Line Residences",
    nameAr: "مساكن ذا لاين نيوم",
    nameHi: "नियोम द लाइन निवास",
    type: "Futuristic Smart City",
    location: "NEOM, Tabuk Province",
    locationAr: "نيوم، منطقة تبوك",
    locationHi: "नियोम, तबूक प्रांत",
    image: "/api/placeholder/400/300",
    investedAmount: 500000,
    currentValue: 634000,
    returnAmount: 134000,
    returnPercentage: 26.8,
    status: "active",
    investmentDate: "2024-01-15",
    performance: "excellent",
    occupancyRate: 0, // Under construction
    monthlyRevenue: 0,
    nextDistribution: "2024-12-31",
    vision2030: true,
    shariahCompliant: true,
    riskLevel: "medium",
    category: "residential",
    projectStage: "construction",
    expectedCompletion: "2030",
    totalUnits: 1000,
    ownedUnits: 5
  },
  {
    id: "2",
    name: "Red Sea Global Marina",
    nameAr: "مارينا البحر الأحمر العالمية",
    nameHi: "रेड सी ग्लोबल मरीना",
    type: "Luxury Resort & Marina",
    location: "Red Sea Project",
    locationAr: "مشروع البحر الأحمر",
    locationHi: "रेड सी प्रोजेक्ट",
    image: "/api/placeholder/400/300",
    investedAmount: 400000,
    currentValue: 498000,
    returnAmount: 98000,
    returnPercentage: 24.5,
    status: "active",
    investmentDate: "2024-02-20",
    performance: "excellent",
    occupancyRate: 78,
    monthlyRevenue: 12400,
    nextDistribution: "2024-12-31",
    vision2030: true,
    shariahCompliant: true,
    riskLevel: "low",
    category: "hospitality",
    projectStage: "operational",
    expectedCompletion: "2026",
    totalUnits: 500,
    ownedUnits: 8
  },
  {
    id: "3",
    name: "Qiddiya Entertainment City",
    nameAr: "مدينة القدية الترفيهية",
    nameHi: "किद्दिया मनोरंजन शहर",
    type: "Entertainment Hub",
    location: "Riyadh, Central Region",
    locationAr: "الرياض، المنطقة الوسطى",
    locationHi: "रियाध, मध्य क्षेत्र",
    image: "/api/placeholder/400/300",
    investedAmount: 350000,
    currentValue: 450000,
    returnAmount: 100000,
    returnPercentage: 28.6,
    status: "active",
    investmentDate: "2024-03-10",
    performance: "excellent",
    occupancyRate: 65,
    monthlyRevenue: 8200,
    nextDistribution: "2024-12-31",
    vision2030: true,
    shariahCompliant: true,
    riskLevel: "medium",
    category: "commercial",
    projectStage: "construction",
    expectedCompletion: "2030",
    totalUnits: 750,
    ownedUnits: 12
  }
]

const portfolioStats: PortfolioStats = {
  totalValue: 1582000,
  totalInvested: 1250000,
  totalReturn: 332000,
  returnPercentage: 26.6,
  monthlyIncome: 20600,
  averageROI: 26.3,
  activeInvestments: 3,
  portfolioGrowth: {
    daily: 0.12,
    weekly: 1.8,
    monthly: 4.7,
    yearly: 26.6
  },
  riskScore: 72, // Medium risk
  diversificationScore: 85, // Well diversified
  vision2030Allocation: 100, // 100% Vision 2030 projects
  shariahCompliance: 100 // 100% Shariah compliant
}

const performanceData = [
  { month: "Jan 2024", value: 1250000, growth: 0 },
  { month: "Feb 2024", value: 1285000, growth: 2.8 },
  { month: "Mar 2024", value: 1325000, growth: 6.0 },
  { month: "Apr 2024", value: 1368000, growth: 9.4 },
  { month: "May 2024", value: 1412000, growth: 13.0 },
  { month: "Jun 2024", value: 1456000, growth: 16.5 },
  { month: "Jul 2024", value: 1498000, growth: 19.8 },
  { month: "Aug 2024", value: 1535000, growth: 22.8 },
  { month: "Sep 2024", value: 1568000, growth: 25.4 },
  { month: "Oct 2024", value: 1575000, growth: 26.0 },
  { month: "Nov 2024", value: 1582000, growth: 26.6 }
]

export default function MobilePortfolio() {
  const { t, language } = useTranslation()
  const { toast } = useToast()
  
  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedTimeframe, setSelectedTimeframe] = useState("monthly")
  const [sortBy, setSortBy] = useState("performance")
  const [filterBy, setFilterBy] = useState("all")
  const [showDetails, setShowDetails] = useState<string | null>(null)

  const timeframes = [
    { id: "daily", label: "Daily", value: portfolioStats.portfolioGrowth.daily },
    { id: "weekly", label: "Weekly", value: portfolioStats.portfolioGrowth.weekly },
    { id: "monthly", label: "Monthly", value: portfolioStats.portfolioGrowth.monthly },
    { id: "yearly", label: "Yearly", value: portfolioStats.portfolioGrowth.yearly }
  ]

  const getInvestmentName = (investment: Investment) => {
    if (language === 'ar') return investment.nameAr
    if (language === 'hi') return investment.nameHi
    return investment.name
  }

  const getInvestmentLocation = (investment: Investment) => {
    if (language === 'ar') return investment.locationAr
    if (language === 'hi') return investment.locationHi
    return investment.location
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent": return "from-green-500 to-emerald-500"
      case "good": return "from-blue-500 to-cyan-500"
      case "fair": return "from-yellow-500 to-orange-500"
      case "poor": return "from-red-500 to-rose-500"
      default: return "from-gray-500 to-slate-500"
    }
  }

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case "excellent": return <TrendingUp className="w-4 h-4" />
      case "good": return <TrendingUp className="w-4 h-4" />
      case "fair": return <TrendingUp className="w-4 h-4" />
      case "poor": return <TrendingDown className="w-4 h-4" />
      default: return <BarChart3 className="w-4 h-4" />
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case "low": return <Shield className="w-4 h-4 text-green-600" />
      case "medium": return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "high": return <AlertTriangle className="w-4 h-4 text-red-600" />
      default: return <Shield className="w-4 h-4 text-gray-600" />
    }
  }

  const downloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Your portfolio report has been downloaded.",
    })
  }

  const sharePortfolio = () => {
    toast({
      title: "Portfolio Shared",
      description: "Portfolio link copied to clipboard.",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-6 w-72 h-72 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl animate-pulse opacity-60" />
        <div className="absolute bottom-32 right-8 w-80 h-80 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse opacity-40" />
      </div>

      <div className="relative z-10 p-6 pb-28 space-y-8">
        {/* Enhanced Header */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                {t("portfolio")}
              </h1>
              <p className="text-muted-foreground text-lg">
                Track your Vision 2030 investments
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" onClick={downloadReport} data-testid="button-download-report">
                <Download className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="outline" onClick={sharePortfolio} data-testid="button-share-portfolio">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Portfolio Summary */}
          <Card className="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-500 text-white border-0 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent" />
            <div className="absolute inset-0">
              <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse" />
            </div>
            
            <CardContent className="p-8 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-lg">
                    <PieChart className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Portfolio Value</h2>
                    <p className="text-white/80">Total Investment Returns</p>
                  </div>
                </div>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-xl px-4 py-2">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  +{portfolioStats.returnPercentage}%
                </Badge>
              </div>

              <div className="text-center mb-6">
                <div className="text-5xl font-bold mb-2">
                  {portfolioStats.totalValue.toLocaleString()} SAR
                </div>
                <div className="text-white/80 text-lg">
                  +{portfolioStats.totalReturn.toLocaleString()} SAR profit
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/15 rounded-2xl backdrop-blur-xl border border-white/20">
                  <p className="text-white/70 text-sm mb-1">Invested</p>
                  <p className="text-xl font-bold">{portfolioStats.totalInvested.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-white/15 rounded-2xl backdrop-blur-xl border border-white/20">
                  <p className="text-white/70 text-sm mb-1">Monthly Income</p>
                  <p className="text-xl font-bold">{portfolioStats.monthlyIncome.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-white/15 rounded-2xl backdrop-blur-xl border border-white/20">
                  <p className="text-white/70 text-sm mb-1">Properties</p>
                  <p className="text-xl font-bold">{portfolioStats.activeInvestments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-700">Risk Score</p>
                    <p className="text-2xl font-bold text-blue-800">{portfolioStats.riskScore}</p>
                  </div>
                </div>
                <Progress value={portfolioStats.riskScore} className="h-2" />
                <p className="text-xs text-blue-600 mt-2">Medium Risk Portfolio</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-700">Diversification</p>
                    <p className="text-2xl font-bold text-purple-800">{portfolioStats.diversificationScore}</p>
                  </div>
                </div>
                <Progress value={portfolioStats.diversificationScore} className="h-2" />
                <p className="text-xs text-purple-600 mt-2">Well Diversified</p>
              </CardContent>
            </Card>
          </div>

          {/* Growth Timeframes */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-card to-card/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-primary" />
                Portfolio Growth
              </h3>
              
              <div className="grid grid-cols-4 gap-3">
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
                    <div className="text-xs font-medium mb-1">{timeframe.label}</div>
                    <div className="text-sm font-bold text-green-600">
                      +{timeframe.value.toFixed(1)}%
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="investments">Investments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Key Insights */}
              <Card className="shadow-xl border-0 bg-gradient-to-r from-card to-card/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Key Insights
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-green-700">Vision 2030</span>
                      </div>
                      <p className="text-2xl font-bold text-green-800">{portfolioStats.vision2030Allocation}%</p>
                      <p className="text-xs text-green-600">of portfolio</p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-blue-700">Shariah Compliant</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-800">{portfolioStats.shariahCompliance}%</p>
                      <p className="text-xs text-blue-600">compliance rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="shadow-xl border-0 bg-gradient-to-r from-card to-card/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Recent Activity
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Value Increase</p>
                        <p className="text-xs text-muted-foreground">NEOM portfolio gained 4.2% this week</p>
                      </div>
                      <p className="text-sm font-semibold text-green-600">+26,800 SAR</p>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Banknote className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Income Distribution</p>
                        <p className="text-xs text-muted-foreground">Monthly rental income received</p>
                      </div>
                      <p className="text-sm font-semibold text-blue-600">20,600 SAR</p>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Performance Update</p>
                        <p className="text-xs text-muted-foreground">Red Sea project milestone achieved</p>
                      </div>
                      <p className="text-sm font-semibold text-purple-600">+2.1% ROI</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investments" className="space-y-6 mt-6">
              {/* Filters and Sort */}
              <div className="flex gap-3 overflow-x-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-card/50 backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="value">Current Value</SelectItem>
                    <SelectItem value="return">Total Return</SelectItem>
                    <SelectItem value="date">Investment Date</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-32 bg-card/50 backdrop-blur-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="vision2030">Vision 2030</SelectItem>
                    <SelectItem value="shariah">Shariah</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Investments List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {mockInvestments.map((investment, index) => (
                    <motion.div
                      key={investment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="shadow-xl border-0 overflow-hidden bg-gradient-to-r from-card via-card/95 to-card/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {/* Header */}
                            <div className="flex items-start gap-4">
                              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <Building2 className="w-8 h-8 text-primary" />
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-bold text-lg leading-tight">
                                  {getInvestmentName(investment)}
                                </h4>
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <MapPin className="w-3 h-3" />
                                  {getInvestmentLocation(investment)}
                                </p>
                                <div className="flex gap-2 mt-2">
                                  {investment.vision2030 && (
                                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                                      Vision 2030
                                    </Badge>
                                  )}
                                  {investment.shariahCompliant && (
                                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                                      <Shield className="w-3 h-3 mr-1" />
                                      Halal
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className={`w-10 h-10 bg-gradient-to-r ${getPerformanceColor(investment.performance)} rounded-xl flex items-center justify-center shadow-lg mb-2`}>
                                  {getPerformanceIcon(investment.performance)}
                                </div>
                                <Badge 
                                  className={`text-xs font-bold ${
                                    investment.performance === 'excellent' 
                                      ? 'bg-green-100 text-green-700 border-green-300' 
                                      : 'bg-blue-100 text-blue-700 border-blue-300'
                                  }`}
                                >
                                  {investment.performance}
                                </Badge>
                              </div>
                            </div>

                            {/* Financial Metrics */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Invested Amount</p>
                                <p className="text-lg font-bold">{investment.investedAmount.toLocaleString()} SAR</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Current Value</p>
                                <p className="text-lg font-bold text-primary">{investment.currentValue.toLocaleString()} SAR</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Total Return</p>
                                <p className="text-lg font-bold text-green-600">+{investment.returnAmount.toLocaleString()} SAR</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">ROI</p>
                                <p className="text-lg font-bold text-green-600">+{investment.returnPercentage}%</p>
                              </div>
                            </div>

                            {/* Additional Info */}
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                                {getRiskIcon(investment.riskLevel)}
                                <p className="text-xs text-blue-700 font-medium mt-1">Risk Level</p>
                                <p className="text-sm font-bold text-blue-800 capitalize">{investment.riskLevel}</p>
                              </div>
                              
                              <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                                <Calendar className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                                <p className="text-xs text-emerald-700 font-medium">Project Stage</p>
                                <p className="text-sm font-bold text-emerald-800 capitalize">{investment.projectStage}</p>
                              </div>
                              
                              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                                <Users className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                                <p className="text-xs text-purple-700 font-medium">Units Owned</p>
                                <p className="text-sm font-bold text-purple-800">{investment.ownedUnits}</p>
                              </div>
                            </div>

                            {/* Occupancy Progress (if applicable) */}
                            {investment.occupancyRate > 0 && (
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Occupancy Rate</span>
                                  <span className="font-medium">{investment.occupancyRate}%</span>
                                </div>
                                <Progress value={investment.occupancyRate} className="h-2" />
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              <Button 
                                variant="outline"
                                className="flex-1"
                                onClick={() => setShowDetails(showDetails === investment.id ? null : investment.id)}
                                data-testid={`button-view-details-${investment.id}`}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                              <Button 
                                variant="outline"
                                size="icon"
                                data-testid={`button-share-investment-${investment.id}`}
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Expandable Details */}
                            <AnimatePresence>
                              {showDetails === investment.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="border-t border-border/50 pt-4"
                                >
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="text-muted-foreground">Investment Date</p>
                                      <p className="font-medium">{new Date(investment.investmentDate).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Expected Completion</p>
                                      <p className="font-medium">{investment.expectedCompletion}</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Monthly Revenue</p>
                                      <p className="font-medium">{investment.monthlyRevenue.toLocaleString()} SAR</p>
                                    </div>
                                    <div>
                                      <p className="text-muted-foreground">Next Distribution</p>
                                      <p className="font-medium">{new Date(investment.nextDistribution).toLocaleDateString()}</p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6 mt-6">
              {/* Performance Chart */}
              <Card className="shadow-xl border-0 bg-gradient-to-r from-card to-card/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Portfolio Performance
                  </h3>
                  
                  <div className="h-48 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-center">
                      <LineChart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">Interactive performance chart</p>
                      <p className="text-xs text-muted-foreground">Showing 26.6% growth over time</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <p className="text-lg font-bold text-green-800">+{portfolioStats.returnPercentage}%</p>
                      <p className="text-xs text-green-600">Total Growth</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                      <p className="text-lg font-bold text-blue-800">{portfolioStats.averageROI}%</p>
                      <p className="text-xs text-blue-600">Average ROI</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Asset Allocation */}
              <Card className="shadow-xl border-0 bg-gradient-to-r from-card to-card/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-primary" />
                    Asset Allocation
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full" />
                        <span className="font-medium">Residential</span>
                      </div>
                      <span className="font-bold">40%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full" />
                        <span className="font-medium">Hospitality</span>
                      </div>
                      <span className="font-bold">35%</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-purple-500 rounded-full" />
                        <span className="font-medium">Commercial</span>
                      </div>
                      <span className="font-bold">25%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}