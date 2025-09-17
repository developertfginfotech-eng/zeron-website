import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Building2, Calendar, MapPin, Users, BarChart3 } from "lucide-react"
import apartmentImg from '@assets/generated_images/luxury_apartment_building_exterior_e11af77f.png'
import retailImg from '@assets/generated_images/retail_shopping_complex_10ee6fbf.png'

const mockPortfolio = {
  totalValue: 138750,
  totalInvested: 125000,
  totalReturn: 13750,
  returnPercentage: 11.0,
  investments: [
    {
      id: "1",
      name: "Luxury Apartment Complex",
      type: "residential",
      location: "Riyadh",
      image: apartmentImg,
      investedAmount: 75000,
      currentValue: 82500,
      returnAmount: 7500,
      returnPercentage: 10.0,
      status: "active",
      investmentDate: "2024-01-15",
      performance: "excellent",
      occupancyRate: 92.5,
      monthlyRevenue: 4200,
      nextDistribution: "2024-12-31"
    },
    {
      id: "4",
      name: "Retail Shopping Complex", 
      type: "commercial",
      location: "Jeddah",
      image: retailImg,
      investedAmount: 50000,
      currentValue: 56250,
      returnAmount: 6250,
      returnPercentage: 12.5,
      status: "active",
      investmentDate: "2024-03-01",
      performance: "excellent",
      occupancyRate: 88.0,
      monthlyRevenue: 2800,
      nextDistribution: "2024-12-31"
    }
  ]
}

export default function MobilePortfolio() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        <p className="text-muted-foreground">Track your real estate investments and returns</p>
      </div>

      {/* Portfolio Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <span>Portfolio Summary</span>
            <Badge variant="default" className="bg-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{mockPortfolio.returnPercentage}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">SAR {mockPortfolio.totalValue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Current Value</p>
            </div>
            <div>
              <p className="text-2xl font-bold">SAR {mockPortfolio.totalInvested.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Invested</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">+SAR {mockPortfolio.totalReturn.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Return</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Performance</span>
              <span className="font-medium text-green-600">+{mockPortfolio.returnPercentage}%</span>
            </div>
            <Progress value={mockPortfolio.returnPercentage} className="h-2" max={20} />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Active Investments */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>Active Investments</span>
                <Badge variant="secondary">{mockPortfolio.investments.length}</Badge>
              </CardTitle>
              <CardDescription>Your current property investments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockPortfolio.investments.map((investment) => (
                <Card key={investment.id} className="p-4">
                  <div className="space-y-4">
                    {/* Property Image and Basic Info */}
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img 
                          src={investment.image} 
                          alt={investment.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{investment.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{investment.location}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {investment.type}
                          </Badge>
                          <Badge 
                            variant={investment.performance === 'excellent' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {investment.performance}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Investment Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Invested</p>
                        <p className="font-semibold">SAR {investment.investedAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Value</p>
                        <p className="font-semibold">SAR {investment.currentValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Return</p>
                        <p className="font-semibold text-green-600">
                          +SAR {investment.returnAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">ROI</p>
                        <p className="font-semibold text-green-600">+{investment.returnPercentage}%</p>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Occupancy Rate</span>
                        <span className="font-medium">{investment.occupancyRate}%</span>
                      </div>
                      <Progress value={investment.occupancyRate} className="h-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Invested {new Date(investment.investmentDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart3 className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          SAR {investment.monthlyRevenue}/month
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Next Distribution */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Next Distribution</CardTitle>
              <CardDescription>Expected return distributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Quarterly Returns</p>
                  <p className="text-sm text-muted-foreground">
                    Expected: {new Date(mockPortfolio.investments[0].nextDistribution).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">~SAR 3,200</p>
                  <p className="text-xs text-muted-foreground">Estimated amount</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Performance Over Time</CardTitle>
              <CardDescription>Your portfolio growth and returns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Performance chart would go here</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="font-semibold text-green-600">+{mockPortfolio.returnPercentage}%</p>
                  <p className="text-muted-foreground">Total Return</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <p className="font-semibold">11 months</p>
                  <p className="text-muted-foreground">Avg. Hold Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Performance */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>Recent months breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['November 2024', 'October 2024', 'September 2024'].map((month, index) => (
                  <div key={month} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium">{month}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-medium">
                        +{(1.2 - index * 0.1).toFixed(1)}%
                      </span>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
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