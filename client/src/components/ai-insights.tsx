import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Brain, 
  Target, 
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  BarChart3,
  Lightbulb
} from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { aiInsights, saudiMarketStats } from "@/lib/saudi-data";

export function AIInsights() {
  const { t } = useTranslation();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'market_analysis': return <BarChart3 className="h-4 w-4" />;
      case 'investment_recommendation': return <Target className="h-4 w-4" />;
      case 'risk_assessment': return <AlertTriangle className="h-4 w-4" />;
      case 'trend_prediction': return <TrendingUp className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-4" data-testid="ai-insights-container">
      {/* AI Market Overview */}
      <Card className="mobile-card mobile-fade-in-up">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-primary" />
            {t('ai_insights')}
            <Badge variant="secondary" className="ml-auto">
              <Sparkles className="h-3 w-3 mr-1" />
              Real-time
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Saudi Market Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <p className="text-xs text-green-700 font-medium mb-1">Market Growth</p>
              <p className="text-lg font-bold text-green-800">+{saudiMarketStats.yearlyGrowth}%</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 font-medium mb-1">Vision 2030</p>
              <p className="text-lg font-bold text-blue-800">{saudiMarketStats.vision2030Projects}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <p className="text-xs text-purple-700 font-medium mb-1">Shariah Compliant</p>
              <p className="text-lg font-bold text-purple-800">{saudiMarketStats.shariahCompliantRate}%</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <p className="text-xs text-orange-700 font-medium mb-1">Foreign Investment</p>
              <p className="text-lg font-bold text-orange-800">+{saudiMarketStats.foreignInvestmentGrowth}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights List */}
      {aiInsights.map((insight, index) => (
        <Card 
          key={insight.id} 
          className={`mobile-card mobile-fade-in-up animate-delay-${(index + 1) * 100}`}
          data-testid={`ai-insight-${insight.id}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-sm" data-testid={`insight-title-${insight.id}`}>
                    {insight.title}
                  </h3>
                  <Badge className={`text-xs ${getImpactColor(insight.impact)}`}>
                    {insight.impact.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {insight.timestamp.toLocaleDateString()} • AI Confidence: {insight.confidence}%
                </p>
              </div>
            </div>

            <p className="text-sm text-foreground mb-3" data-testid={`insight-content-${insight.id}`}>
              {insight.content}
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">AI Confidence</span>
                <span className="font-medium">{insight.confidence}%</span>
              </div>
              <Progress 
                value={insight.confidence} 
                className="h-2" 
                data-testid={`confidence-progress-${insight.id}`}
              />
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-3 text-primary hover:bg-primary/10"
              data-testid={`button-insight-details-${insight.id}`}
            >
              View Detailed Analysis
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </Button>
          </CardContent>
        </Card>
      ))}

      {/* Quick AI Actions */}
      <Card className="mobile-card mobile-fade-in-up">
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            {t('ask_ai')}
          </h3>
          <div className="grid grid-cols-1 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start text-xs"
              data-testid="button-ai-market-analysis"
            >
              <BarChart3 className="h-3 w-3 mr-2" />
              {t('market_analysis')}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="justify-start text-xs"
              data-testid="button-ai-recommendations"
            >
              <Lightbulb className="h-3 w-3 mr-2" />
              {t('investment_recommendations')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}