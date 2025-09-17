import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Building2, 
  DollarSign,
  Zap,
  Target,
  PieChart,
  Shield
} from 'lucide-react'
import { motion } from 'framer-motion'

interface AiInsight {
  id: string
  type: 'market' | 'customer' | 'property' | 'risk' | 'opportunity'
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  actionable: boolean
  recommendation?: string
}

export function AiInsightsPanel() {
  const insights: AiInsight[] = [
    {
      id: '1',
      type: 'market',
      title: 'Strong Residential Demand in Riyadh',
      description: 'AI analysis shows 23% increase in residential property inquiries in Riyadh over the past month. Market sentiment is highly positive.',
      confidence: 0.92,
      impact: 'high',
      actionable: true,
      recommendation: 'Consider increasing residential property listings in Riyadh by 15%'
    },
    {
      id: '2',
      type: 'risk',
      title: 'KYC Processing Bottleneck Detected',
      description: 'AI detected average KYC processing time increased to 4.2 days. 3 applications pending review for over 72 hours.',
      confidence: 0.98,
      impact: 'medium',
      actionable: true,
      recommendation: 'Prioritize review of Fatima Al-Qasimi, Omar Hassan applications'
    },
    {
      id: '3',
      type: 'customer',
      title: 'High-Value Investor Pattern Identified',
      description: 'AI identified investment pattern: customers investing in 2+ properties have 87% likelihood of additional investments within 60 days.',
      confidence: 0.84,
      impact: 'high',
      actionable: true,
      recommendation: 'Target multi-property investors with premium opportunities'
    },
    {
      id: '4',
      type: 'opportunity',
      title: 'Cross-Selling Opportunity',
      description: 'AI suggests 12 existing customers are ideal candidates for luxury property segment based on their investment behavior and portfolio growth.',
      confidence: 0.76,
      impact: 'medium',
      actionable: true,
      recommendation: 'Send personalized luxury property recommendations'
    },
    {
      id: '5',
      type: 'property',
      title: 'Yield Optimization Potential',
      description: 'Machine learning models suggest 3 properties could increase yields by 0.8-1.2% through strategic positioning and pricing adjustments.',
      confidence: 0.88,
      impact: 'high',
      actionable: true,
      recommendation: 'Review pricing strategy for Office Tower, Retail Complex'
    }
  ]

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'market': return <TrendingUp className="h-5 w-5 text-green-600" />
      case 'risk': return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case 'customer': return <Users className="h-5 w-5 text-blue-600" />
      case 'property': return <Building2 className="h-5 w-5 text-purple-600" />
      case 'opportunity': return <Target className="h-5 w-5 text-orange-600" />
      default: return <Brain className="h-5 w-5 text-primary" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <Card className="glass-morphism border-primary/20" data-testid="card-ai-insights">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                AI Insights & Recommendations
                <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Real-time intelligence powered by machine learning
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            <PieChart className="h-3 w-3 mr-1" />
            Live Analysis
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg border border-border/50 bg-card/50 hover-elevate"
            data-testid={`ai-insight-${insight.id}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {getInsightIcon(insight.type)}
                <div>
                  <h4 className="font-semibold text-sm">{insight.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {insight.type}
                    </Badge>
                    <Badge 
                      className={`text-xs border ${getImpactColor(insight.impact)}`}
                      variant="outline"
                    >
                      {insight.impact} impact
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3 text-green-600" />
                      <span className="text-xs text-muted-foreground">
                        {Math.round(insight.confidence * 100)}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {insight.description}
            </p>

            {insight.recommendation && (
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 mb-3">
                <div className="flex items-start gap-2">
                  <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-primary mb-1">AI Recommendation</p>
                    <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                  </div>
                </div>
              </div>
            )}

            {insight.actionable && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-600 font-medium">Actionable</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    View Details
                  </Button>
                  <Button size="sm" className="text-xs neon-glow" data-testid={`button-action-${insight.id}`}>
                    Take Action
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        ))}

        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Brain className="h-4 w-4" />
              <span>AI analysis updates every 15 minutes</span>
            </div>
            <Button variant="outline" size="sm" className="text-xs" data-testid="button-refresh-insights">
              Refresh Analysis
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}