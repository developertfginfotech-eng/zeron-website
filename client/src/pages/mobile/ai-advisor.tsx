import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import { 
  Brain, 
  Sparkles, 
  Target, 
  TrendingUp, 
  BarChart3,
  Send,
  Mic,
  Bot,
  User,
  Zap,
  Crown,
  Star,
  Globe,
  Shield,
  DollarSign,
  Calendar,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  Lightbulb,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  category?: string
  confidence?: number
  sources?: string[]
}

interface AIRecommendation {
  id: string
  type: "buy" | "hold" | "sell" | "watch"
  property: string
  propertyAr: string
  propertyHi: string
  reason: string
  confidence: number
  expectedROI: number
  riskLevel: "low" | "medium" | "high"
  timeframe: string
  urgency: "low" | "medium" | "high"
}

interface MarketInsight {
  id: string
  title: string
  titleAr: string
  titleHi: string
  insight: string
  insightAr: string
  insightHi: string
  impact: "positive" | "negative" | "neutral"
  confidence: number
  category: string
  timestamp: Date
}

const mockRecommendations: AIRecommendation[] = [
  {
    id: "1",
    type: "buy",
    property: "NEOM The Line Phase 2",
    propertyAr: "نيوم ذا لاين المرحلة الثانية",
    propertyHi: "नियोम द लाइन फेज 2",
    reason: "AI analysis shows 87% probability of 25%+ returns based on infrastructure progress and international partnerships",
    confidence: 87,
    expectedROI: 25.3,
    riskLevel: "medium",
    timeframe: "18-24 months",
    urgency: "high"
  },
  {
    id: "2",
    type: "watch",
    property: "Red Sea Marina Extension",
    propertyAr: "توسعة مارينا البحر الأحمر",
    propertyHi: "रेड सी मरीना एक्सटेंशन",
    reason: "Monitoring environmental clearances and tourism sector recovery metrics before investment recommendation",
    confidence: 72,
    expectedROI: 18.7,
    riskLevel: "low",
    timeframe: "6-12 months",
    urgency: "medium"
  },
  {
    id: "3",
    type: "buy",
    property: "Qiddiya Sports City",
    propertyAr: "مدينة القدية الرياضية",
    propertyHi: "किद्दिया स्पोर्ट्स सिटी",
    reason: "2030 World Cup hosting and entertainment sector growth align with Vision 2030 objectives",
    confidence: 91,
    expectedROI: 22.1,
    riskLevel: "medium",
    timeframe: "24-36 months",
    urgency: "high"
  }
]

const mockInsights: MarketInsight[] = [
  {
    id: "1",
    title: "NEOM Infrastructure Milestone",
    titleAr: "إنجاز البنية التحتية لنيوم",
    titleHi: "नियोम इंफ्रास्ट्रक्चर माइलस्टोन",
    insight: "First residential units in The Line project show 40% faster construction than projected timeline",
    insightAr: "الوحدات السكنية الأولى في مشروع ذا لاين تظهر بناءً أسرع بنسبة 40% من الجدول الزمني المتوقع",
    insightHi: "द लाइन प्रोजेक्ट में पहली आवासीय इकाइयां अनुमानित समयसीमा से 40% तेज निर्माण दिखाती हैं",
    impact: "positive",
    confidence: 94,
    category: "Infrastructure",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: "2",
    title: "Foreign Investment Surge",
    titleAr: "طفرة الاستثمار الأجنبي",
    titleHi: "विदेशी निवेश में उछाल",
    insight: "Q4 foreign direct investment in Saudi real estate increased by 156% compared to previous year",
    insightAr: "الاستثمار الأجنبي المباشر في العقارات السعودية في الربع الرابع زاد بنسبة 156% مقارنة بالعام السابق",
    insightHi: "सऊदी रियल एस्टेट में Q4 प्रत्यक्ष विदेशी निवेश पिछले वर्ष की तुलना में 156% बढ़ा",
    impact: "positive",
    confidence: 89,
    category: "Investment",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
  },
  {
    id: "3",
    title: "Tourism Sector Recovery",
    titleAr: "تعافي قطاع السياحة",
    titleHi: "पर्यटन क्षेत्र की रिकवरी",
    insight: "Saudi tourism reached 130% of pre-2019 levels, boosting hospitality real estate demand",
    insightAr: "وصلت السياحة السعودية إلى 130% من مستويات ما قبل 2019، مما عزز الطلب على العقارات الضيافة",
    insightHi: "सऊदी पर्यटन 2019 से पहले के स्तर के 130% तक पहुंच गया, जिससे आतिथ्य रियल एस्टेट की मांग बढ़ी",
    impact: "positive",
    confidence: 82,
    category: "Tourism",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
  }
]

const quickPrompts = [
  "Analyze my portfolio risk",
  "Best Vision 2030 investments?",
  "NEOM vs Red Sea comparison",
  "Market outlook for 2025",
  "Shariah-compliant opportunities",
  "High-yield recommendations"
]

export default function MobileAIAdvisor() {
  const { t, language } = useTranslation()
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Welcome! I'm your AI Investment Advisor. I analyze Vision 2030 projects, market trends, and Shariah-compliant opportunities. How can I help you today?",
      timestamp: new Date(),
      confidence: 100
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", "portfolio", "market", "recommendations", "risks", "opportunities"]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000) // 1.5-2.5 seconds
  }

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()
    
    let response = ""
    let category = "general"
    let confidence = Math.floor(85 + Math.random() * 15) // 85-100%

    if (input.includes("portfolio") || input.includes("risk")) {
      response = "Based on your current portfolio analysis, you have a well-diversified mix of Vision 2030 projects. Your NEOM investments show strong growth potential (87% confidence), while your Red Sea holdings provide stability. I recommend rebalancing towards Qiddiya Entertainment City for optimal risk-return ratio."
      category = "portfolio"
    } else if (input.includes("neom")) {
      response = "NEOM presents exceptional opportunities with The Line project showing 40% faster construction progress. Current AI projections indicate 25-30% ROI potential over 18-24 months. Infrastructure milestones are being met ahead of schedule, making this a strong BUY recommendation with medium risk profile."
      category = "investment"
    } else if (input.includes("market") || input.includes("outlook")) {
      response = "Saudi real estate market shows robust fundamentals: Foreign investment up 156% YoY, tourism at 130% of pre-2019 levels, and Vision 2030 projects 67% complete. Q1 2025 forecasts suggest 18-22% growth in premium residential and 15-20% in commercial sectors."
      category = "market"
    } else if (input.includes("shariah") || input.includes("halal")) {
      response = "All recommended properties are Shariah-compliant with certified Islamic financing structures. NEOM, Red Sea, and Qiddiya projects operate under Islamic banking principles with no interest-based transactions. Expected returns are from asset appreciation and rental yields only."
      category = "shariah"
    } else if (input.includes("red sea")) {
      response = "Red Sea Global offers luxury hospitality investments with strong environmental credentials. Current phase shows 22% ROI potential with low risk profile. Coral reef restoration and renewable energy initiatives attract premium international tourists, supporting long-term value appreciation."
      category = "investment"
    } else {
      response = "I can help you with portfolio analysis, market insights, investment recommendations, and risk assessments. What specific aspect of Saudi real estate investments would you like to explore? I have real-time data on all Vision 2030 projects."
      category = "general"
    }

    return {
      id: Date.now().toString(),
      type: "ai",
      content: response,
      timestamp: new Date(),
      category,
      confidence,
      sources: ["Vision 2030 Database", "Real Estate Analytics", "Market Intelligence"]
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    setInputMessage(prompt)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'ar' ? 'ar-SA' : language === 'hi' ? 'hi-IN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getInsightTitle = (insight: MarketInsight) => {
    if (language === 'ar') return insight.titleAr
    if (language === 'hi') return insight.titleHi
    return insight.title
  }

  const getInsightContent = (insight: MarketInsight) => {
    if (language === 'ar') return insight.insightAr
    if (language === 'hi') return insight.insightHi
    return insight.insight
  }

  const getPropertyName = (rec: AIRecommendation) => {
    if (language === 'ar') return rec.propertyAr
    if (language === 'hi') return rec.propertyHi
    return rec.property
  }

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "buy": return <TrendingUp className="w-4 h-4 text-green-600" />
      case "sell": return <TrendingDown className="w-4 h-4 text-red-600" />
      case "hold": return <Shield className="w-4 h-4 text-blue-600" />
      case "watch": return <Eye className="w-4 h-4 text-orange-600" />
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />
    }
  }

  const getRecommendationColor = (type: string) => {
    switch (type) {
      case "buy": return "from-green-500 to-emerald-500"
      case "sell": return "from-red-500 to-rose-500"
      case "hold": return "from-blue-500 to-cyan-500"
      case "watch": return "from-orange-500 to-amber-500"
      default: return "from-gray-500 to-slate-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-6 w-72 h-72 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse opacity-60" />
        <div className="absolute bottom-32 right-8 w-80 h-80 bg-gradient-to-tl from-pink-500/10 to-transparent rounded-full blur-3xl animate-pulse opacity-40" />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <motion.div 
          className="p-6 pb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-purple-500 via-violet-600 to-pink-500 text-white border-0 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent" />
            <div className="absolute inset-0">
              <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse" />
            </div>
            
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/30 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{t("ai_advisor")}</h1>
                  <p className="text-white/80">Powered by GPT-5 & Vision 2030 Data</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-xl">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-white/15 rounded-xl backdrop-blur-xl border border-white/20">
                  <p className="text-xs text-white/70 mb-1">AI Accuracy</p>
                  <p className="text-lg font-bold">94%</p>
                </div>
                <div className="text-center p-3 bg-white/15 rounded-xl backdrop-blur-xl border border-white/20">
                  <p className="text-xs text-white/70 mb-1">Predictions</p>
                  <p className="text-lg font-bold">1,247</p>
                </div>
                <div className="text-center p-3 bg-white/15 rounded-xl backdrop-blur-xl border border-white/20">
                  <p className="text-xs text-white/70 mb-1">Success Rate</p>
                  <p className="text-lg font-bold">89%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Insights */}
        <motion.div 
          className="px-6 pb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Latest Market Insights
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {mockInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        insight.impact === 'positive' ? 'bg-green-100' : 
                        insight.impact === 'negative' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {insight.impact === 'positive' ? 
                          <TrendingUp className="w-5 h-5 text-green-600" /> :
                          insight.impact === 'negative' ?
                          <TrendingDown className="w-5 h-5 text-red-600" /> :
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                        }
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{getInsightTitle(insight)}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {getInsightContent(insight)}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {insight.confidence}% confidence
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(insight.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div 
          className="px-6 pb-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            AI Recommendations
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {mockRecommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${getRecommendationColor(rec.type)} rounded-xl flex items-center justify-center shadow-lg`}>
                        {getRecommendationIcon(rec.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm">{getPropertyName(rec)}</h4>
                          <Badge 
                            className={`text-xs uppercase font-bold ${
                              rec.type === 'buy' ? 'bg-green-100 text-green-700 border-green-300' :
                              rec.type === 'sell' ? 'bg-red-100 text-red-700 border-red-300' :
                              rec.type === 'hold' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                              'bg-orange-100 text-orange-700 border-orange-300'
                            }`}
                          >
                            {rec.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                          {rec.reason}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Expected ROI</p>
                            <p className="text-sm font-semibold text-green-600">+{rec.expectedROI}%</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Confidence</p>
                            <p className="text-sm font-semibold">{rec.confidence}%</p>
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

        {/* Chat Interface */}
        <motion.div 
          className="flex-1 flex flex-col px-6 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            Chat with AI
          </h3>
          
          {/* Quick Prompts */}
          <div className="mb-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {quickPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickPrompt(prompt)}
                  className="min-w-fit whitespace-nowrap bg-card/50 backdrop-blur-sm text-xs"
                  data-testid={`button-quick-prompt-${prompt.toLowerCase().replace(/ /g, '-')}`}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 bg-muted/20 rounded-2xl p-4 backdrop-blur-sm">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <Avatar className="w-8 h-8 border-2 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : ''}`}>
                    <div className={`rounded-2xl p-4 ${
                      message.type === 'user' 
                        ? 'bg-primary text-white ml-auto' 
                        : 'bg-card border border-border/50 shadow-sm'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.type === 'ai' && (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                          <div className="flex items-center gap-2">
                            {message.confidence && (
                              <Badge variant="secondary" className="text-xs">
                                {message.confidence}% confidence
                              </Badge>
                            )}
                            {message.category && (
                              <Badge variant="outline" className="text-xs">
                                {message.category}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Button size="icon" variant="ghost" className="w-6 h-6">
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button size="icon" variant="ghost" className="w-6 h-6">
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                            <Button size="icon" variant="ghost" className="w-6 h-6">
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-2">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>

                  {message.type === 'user' && (
                    <Avatar className="w-8 h-8 order-3">
                      <AvatarFallback className="bg-primary text-white text-xs">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <Avatar className="w-8 h-8 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about investments, risks, or market trends..."
                className="pr-12 h-12 bg-card/50 backdrop-blur-sm border-border/50"
                data-testid="input-ai-chat"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1 h-10 w-10 hover:bg-primary/10"
                data-testid="button-voice-input"
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="h-12 px-6 bg-gradient-to-r from-primary to-primary/90"
              data-testid="button-send-message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}