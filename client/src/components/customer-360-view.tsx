import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  User, 
  DollarSign, 
  Building2, 
  FileText, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Brain,
  Target,
  Star,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Shield,
  Eye,
  Download
} from 'lucide-react'
import { motion } from 'framer-motion'

interface CustomerData {
  id: string
  name: string
  email: string
  phone: string
  nationality: string
  joinDate: string
  kycStatus: 'pending' | 'approved' | 'rejected'
  totalInvested: number
  activeProperties: number
  monthlyIncome: number
  riskProfile: 'conservative' | 'moderate' | 'aggressive'
  aiScore: number
  lastActivity: string
}

interface InvestmentHistory {
  id: string
  propertyName: string
  amount: number
  date: string
  status: 'active' | 'completed' | 'pending'
  roi: number
}

interface AIRecommendation {
  type: 'investment' | 'risk' | 'engagement'
  title: string
  description: string
  confidence: number
  priority: 'high' | 'medium' | 'low'
}

export function Customer360View({ customerId }: { customerId: string }) {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data
  const customer: CustomerData = {
    id: customerId,
    name: 'Ahmed Al-Rashid',
    email: 'ahmed.alrashid@email.com',
    phone: '+966 50 123 4567',
    nationality: 'Saudi Arabia',
    joinDate: '2024-03-15',
    kycStatus: 'approved',
    totalInvested: 750000,
    activeProperties: 3,
    monthlyIncome: 12500,
    riskProfile: 'moderate',
    aiScore: 87,
    lastActivity: '2024-09-16'
  }

  const investmentHistory: InvestmentHistory[] = [
    {
      id: '1',
      propertyName: 'Luxury Apartments Riyadh',
      amount: 250000,
      date: '2024-03-20',
      status: 'active',
      roi: 8.5
    },
    {
      id: '2',
      propertyName: 'Commercial Tower Jeddah',
      amount: 300000,
      date: '2024-05-15',
      status: 'active',
      roi: 9.2
    }
  ]

  const aiRecommendations: AIRecommendation[] = [
    {
      type: 'investment',
      title: 'Premium Property Opportunity',
      description: 'Based on portfolio analysis, customer shows strong preference for commercial properties with 8%+ yields.',
      confidence: 0.92,
      priority: 'high'
    },
    {
      type: 'risk',
      title: 'Portfolio Diversification',
      description: 'Current portfolio concentrated in Saudi market. Consider international options.',
      confidence: 0.78,
      priority: 'medium'
    }
  ]

  return (
    <div className="space-y-6" data-testid="customer-360-view">
      {/* Header */}
      <Card className="glass-morphism border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/30">
                <AvatarFallback className="bg-gradient-to-r from-primary to-primary/70 text-primary-foreground text-lg font-bold">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{customer.name}</h1>
                <p className="text-muted-foreground">{customer.email}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className="bg-green-100 text-green-800 border-0">
                    {customer.kycStatus.toUpperCase()}
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-800 border-0">
                    {customer.riskProfile.toUpperCase()} RISK
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Brain className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">AI Score: {customer.aiScore}/100</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-morphism hover-elevate">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-lg font-bold">SAR {customer.totalInvested.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism hover-elevate">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Properties</p>
                <p className="text-lg font-bold">{customer.activeProperties}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism hover-elevate">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Income</p>
                <p className="text-lg font-bold">SAR {customer.monthlyIncome.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism hover-elevate">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <Star className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">AI Score</p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold">{customer.aiScore}/100</p>
                  <Progress value={customer.aiScore} className="w-12 h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{customer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nationality</p>
                  <p className="font-medium">{customer.nationality}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <p className="font-medium">{new Date(customer.joinDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Activity</p>
                  <p className="font-medium">{new Date(customer.lastActivity).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle>Investment History</CardTitle>
              <CardDescription>Complete timeline of customer investments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investmentHistory.map((investment) => (
                  <motion.div
                    key={investment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover-elevate"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{investment.propertyName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Invested: SAR {investment.amount.toLocaleString()} • {new Date(investment.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">
                        {investment.status}
                      </Badge>
                      <p className="text-sm font-medium text-green-600 mt-1">
                        +{investment.roi}% ROI
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI-Powered Customer Insights
              </CardTitle>
              <CardDescription>
                Machine learning analysis of customer behavior and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-border/50 hover-elevate"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">{rec.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={rec.priority === 'high' ? 'destructive' : 'default'}>
                          {rec.priority} priority
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(rec.confidence * 100)}% confidence
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    <Button size="sm" className="neon-glow">
                      Take Action
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                KYC Documents & Verification
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border/50 hover-elevate">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">National ID</h4>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">Verified • Uploaded March 15, 2024</p>
                </div>
                <div className="p-4 rounded-lg border border-border/50 hover-elevate">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Bank Statement</h4>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">Verified • Uploaded March 18, 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Logged into platform', time: '2 hours ago', type: 'login' },
                  { action: 'Viewed property listing', time: '1 day ago', type: 'view' },
                  { action: 'Downloaded investment report', time: '3 days ago', type: 'download' },
                  { action: 'Made new investment', time: '1 week ago', type: 'investment' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover-elevate">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}