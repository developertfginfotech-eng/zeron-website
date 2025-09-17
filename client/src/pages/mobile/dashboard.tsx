import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Building, Eye, Plus } from "lucide-react"
import { Link } from "wouter"

// Mock investor data
const mockInvestor = {
  id: "inv_001",
  name: "Ahmed Al-Rashid",
  totalInvestment: 125000,
  currentValue: 138750,
  totalReturn: 13750,
  returnPercentage: 11.0,
  activeInvestments: 3,
  portfolio: [
    {
      id: "1",
      name: "Luxury Apartment Complex",
      location: "Riyadh",
      invested: 75000,
      currentValue: 82500,
      returnAmount: 7500,
      returnPercentage: 10.0,
      performance: "excellent"
    },
    {
      id: "4", 
      name: "Retail Shopping Complex",
      location: "Jeddah",
      invested: 50000,
      currentValue: 56250,
      returnAmount: 6250,
      returnPercentage: 12.5,
      performance: "excellent"
    }
  ]
}

export default function MobileDashboard() {
  return (
    <div className="space-y-6 pb-20">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-6 rounded-xl text-white">
        <h1 className="text-2xl font-bold">Welcome back,</h1>
        <p className="text-xl">{mockInvestor.name}</p>
        <p className="text-primary-foreground/80 mt-1">Track your real estate investments</p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <p className="text-sm text-muted-foreground">Total Value</p>
            </div>
            <p className="text-2xl font-bold">SAR {mockInvestor.currentValue.toLocaleString()}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <p className="text-xs text-green-600">+{mockInvestor.returnPercentage}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <p className="text-sm text-muted-foreground">Total Return</p>
            </div>
            <p className="text-2xl font-bold text-green-600">+SAR {mockInvestor.totalReturn.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Since inception</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/mobile/properties">
          <Button className="w-full h-12 gap-2" data-testid="button-browse-properties">
            <Building className="h-4 w-4" />
            Browse Properties
          </Button>
        </Link>
        <Link href="/mobile/portfolio">
          <Button variant="outline" className="w-full h-12 gap-2" data-testid="button-view-portfolio">
            <Eye className="h-4 w-4" />
            View Portfolio
          </Button>
        </Link>
      </div>

      {/* Active Investments */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Active Investments</span>
            <Badge variant="secondary">{mockInvestor.activeInvestments}</Badge>
          </CardTitle>
          <CardDescription>Your current property investments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockInvestor.portfolio.map((investment) => (
            <div key={investment.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{investment.name}</h3>
                  <p className="text-xs text-muted-foreground">{investment.location}</p>
                </div>
                <Badge 
                  variant={investment.performance === 'excellent' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {investment.performance}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Invested</span>
                  <span className="font-medium">SAR {investment.invested.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Value</span>
                  <span className="font-medium">SAR {investment.currentValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Return</span>
                  <span className="font-medium text-green-600">
                    +SAR {investment.returnAmount.toLocaleString()} ({investment.returnPercentage}%)
                  </span>
                </div>
              </div>
              
              <Progress 
                value={investment.returnPercentage} 
                className="h-2"
                max={15}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Your investment performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Invested</span>
              <span className="font-medium">SAR {mockInvestor.totalInvestment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Value</span>
              <span className="font-medium">SAR {mockInvestor.currentValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Return</span>
              <span className="font-medium text-green-600">+SAR {mockInvestor.totalReturn.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">ROI</span>
              <span className="font-bold text-green-600">{mockInvestor.returnPercentage}%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}