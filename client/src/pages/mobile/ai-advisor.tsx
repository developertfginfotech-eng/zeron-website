import { AIInsights } from "@/components/ai-insights";
import { useTranslation } from "@/hooks/use-translation";
import { Brain, Sparkles, Target, TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { saudiMarketStats } from "@/lib/saudi-data";

export default function MobileAIAdvisorPage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 pb-20 mobile-enhanced">
      {/* AI Advisor Header */}
      <Card className="mobile-card mobile-scale-in border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{t('ai_advisor')}</h1>
              <p className="text-sm text-muted-foreground">Smart investment intelligence</p>
            </div>
            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
              <Sparkles className="h-3 w-3 mr-1" />
              GPT-5
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <p className="text-xs text-green-700 font-medium mb-1">AI Accuracy</p>
              <p className="text-lg font-bold text-green-800">94%</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 font-medium mb-1">Predictions</p>
              <p className="text-lg font-bold text-blue-800">1,247</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <p className="text-xs text-purple-700 font-medium mb-1">Success Rate</p>
              <p className="text-lg font-bold text-purple-800">89%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick AI Actions */}
      <Card className="mobile-card mobile-fade-in-up border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick AI Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            className="w-full justify-start gap-3 h-12 text-left" 
            variant="outline"
            data-testid="button-portfolio-analysis"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Target className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-sm">Analyze My Portfolio</p>
              <p className="text-xs text-muted-foreground">AI-powered risk assessment</p>
            </div>
          </Button>

          <Button 
            className="w-full justify-start gap-3 h-12 text-left" 
            variant="outline"
            data-testid="button-market-trends"
          >
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-sm">Market Trends</p>
              <p className="text-xs text-muted-foreground">Real-time Saudi market analysis</p>
            </div>
          </Button>

          <Button 
            className="w-full justify-start gap-3 h-12 text-left" 
            variant="outline"
            data-testid="button-investment-opportunities"
          >
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-sm">Find Opportunities</p>
              <p className="text-xs text-muted-foreground">AI-recommended investments</p>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsights />

      {/* AI Performance Stats */}
      <Card className="mobile-card mobile-fade-in-up border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">AI Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <p className="text-xs text-orange-700 font-medium mb-1">Market Analysis</p>
              <p className="text-lg font-bold text-orange-800">{saudiMarketStats.digitalTransformationScore}</p>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border border-pink-200">
              <p className="text-xs text-pink-700 font-medium mb-1">Foreign Investment</p>
              <p className="text-lg font-bold text-pink-800">+{saudiMarketStats.foreignInvestmentGrowth}%</p>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-sm mb-2 text-primary">Latest AI Prediction</h4>
            <p className="text-xs text-muted-foreground">
              AI models predict 35% growth in NEOM properties over the next 18 months based on infrastructure development and international partnerships.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}