import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell, Area, AreaChart, CartesianGrid, ResponsiveContainer } from "recharts"
import {
  Building2,
  TrendingUp,
  Calendar,
  DollarSign,
  ArrowUpRight,
  MapPin,
  Star,
  Clock
} from "lucide-react"

const portfolioGrowthData = [
  { month: "Jan", value: 0 },
  { month: "Feb", value: 35000 },
  { month: "Mar", value: 55000 },
  { month: "Apr", value: 75000 },
  { month: "May", value: 95000 },
  { month: "Jun", value: 110000 },
  { month: "Jul", value: 125000 },
]

const assetAllocationData = [
  { name: "Commercial", value: 50000, percentage: 40, color: "#3b82f6" },
  { name: "Residential", value: 37500, percentage: 30, color: "#10b981" },
  { name: "Retail", value: 25000, percentage: 20, color: "#8b5cf6" },
  { name: "Industrial", value: 12500, percentage: 10, color: "#f59e0b" },
]

const investmentData = [
  {
    id: 1,
    property: "Riyadh Commercial Plaza",
    type: "Commercial",
    location: "Riyadh, Saudi Arabia",
    invested: 15000,
    currentValue: 18750,
    returns: 3750,
    returnPercentage: 25,
    status: "Active",
    nextPayout: "Oct 15, 2024",
    payoutAmount: 1250
  },
  {
    id: 2,
    property: "Jeddah Residential Complex",
    type: "Residential",
    location: "Jeddah, Saudi Arabia",
    invested: 12000,
    currentValue: 14400,
    returns: 2400,
    returnPercentage: 20,
    status: "Active",
    nextPayout: "Oct 20, 2024",
    payoutAmount: 800
  },
  {
    id: 3,
    property: "Dammam Retail Center",
    type: "Retail",
    location: "Dammam, Saudi Arabia",
    invested: 10000,
    currentValue: 13000,
    returns: 3000,
    returnPercentage: 30,
    status: "Active",
    nextPayout: "Nov 5, 2024",
    payoutAmount: 900
  }
]

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("overview")

  const chartConfig = {
    value: {
      label: "Portfolio Value",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-6 py-8">
        {/* Portfolio Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                 Portfolio
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Track your real estate investments and performance
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-600">SAR 125,000</div>
                <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">SAR 37K</div>
                  <div className="text-sm text-blue-500">Invested</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">+SAR 9.2K</div>
                  <div className="text-sm text-emerald-500">Returns</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <ArrowUpRight className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">+25%</div>
                  <div className="text-sm text-purple-500">ROI</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">3</div>
                  <div className="text-sm text-amber-500">Properties</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="investments">Investments</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="growth">Portfolio Growth</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Portfolio Growth Chart */}
                <Card className="col-span-1 lg:col-span-2 bg-gradient-to-br from-card via-card to-primary/5 border-0 shadow-2xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3 text-xl">
                          <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          Portfolio Growth
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">Your investment journey over the last 7 months</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">+25%</div>
                        <div className="text-sm text-muted-foreground">Total Growth</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="mb-4 grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                        <div className="text-lg font-bold text-blue-600">SAR 0</div>
                        <div className="text-xs text-blue-500">Starting Value</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                        <div className="text-lg font-bold text-emerald-600">SAR 125K</div>
                        <div className="text-xs text-emerald-500">Current Value</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
                        <div className="text-lg font-bold text-purple-600">7 Months</div>
                        <div className="text-xs text-purple-500">Investment Period</div>
                      </div>
                    </div>

                    <ChartContainer config={chartConfig} className="h-[350px]">
                      <AreaChart data={portfolioGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <defs>
                          <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                          tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                        />
                        <ChartTooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-2xl">
                                  <p className="font-semibold text-foreground mb-2">{`${label} 2024`}</p>
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600"></div>
                                    <span className="text-sm text-muted-foreground">Portfolio Value:</span>
                                    <span className="font-bold text-emerald-600">
                                      SAR {payload[0].value?.toLocaleString()}
                                    </span>
                                  </div>
                                  {payload[0].value > 0 && (
                                    <div className="mt-2 text-xs text-green-600 font-medium">
                                      +{(((payload[0].value - portfolioGrowthData[0].value) / Math.max(portfolioGrowthData[0].value, 1)) * 100).toFixed(1)}% growth
                                    </div>
                                  )}
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="hsl(var(--primary))"
                          strokeWidth={3}
                          fill="url(#portfolioGradient)"
                          dot={{
                            fill: "hsl(var(--primary))",
                            strokeWidth: 3,
                            r: 6,
                            stroke: "hsl(var(--background))"
                          }}
                          activeDot={{
                            r: 8,
                            fill: "hsl(var(--primary))",
                            stroke: "hsl(var(--background))",
                            strokeWidth: 3
                          }}
                        />
                      </AreaChart>
                    </ChartContainer>

                    <div className="mt-4 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span>Portfolio Value Growth</span>
                      </div>
                      <div className="text-green-600 font-medium">
                        Average: +SAR 17,857/month
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Asset Allocation */}
                <Card className="bg-gradient-to-br from-card via-card to-secondary/5 border-0 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
                        <PieChart className="h-4 w-4 text-white" />
                      </div>
                      Asset Allocation
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">Distribution across property types</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="relative h-[240px] mb-6">
                      <ChartContainer config={chartConfig} className="h-full">
                        <PieChart>
                          <Pie
                            data={assetAllocationData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={95}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {assetAllocationData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                stroke="hsl(var(--background))"
                                strokeWidth={2}
                              />
                            ))}
                          </Pie>
                          <ChartTooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-2xl">
                                    <div className="flex items-center gap-2 mb-2">
                                      <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: data.color }}
                                      />
                                      <p className="font-semibold">{data.name}</p>
                                    </div>
                                    <p className="text-lg font-bold text-primary">SAR {data.value.toLocaleString()}</p>
                                    <p className="text-sm text-muted-foreground">{data.percentage}% of portfolio</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </PieChart>
                      </ChartContainer>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">SAR 125K</div>
                          <div className="text-xs text-muted-foreground">Total Value</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {assetAllocationData.map((item) => (
                        <div key={item.name} className="p-3 rounded-xl border bg-gradient-to-br from-background/50 to-muted/20">
                          <div className="flex items-center gap-2 mb-2">
                            <div
                              className="w-3 h-3 rounded-full shadow-sm"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <div>
                            <p className="text-lg font-bold">SAR {(item.value / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-muted-foreground">{item.percentage}% of portfolio</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-gradient-to-br from-card via-card to-accent/5 border-0 shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                      Recent Activity
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">Latest updates on your investments</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
                        <div className="p-2 bg-green-500 rounded-lg shadow-sm">
                          <DollarSign className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-700 dark:text-green-300">Investment Payout Received</p>
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium">SAR 1,250 from Riyadh Commercial Plaza</p>
                          <p className="text-xs text-muted-foreground">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800">
                        <div className="p-2 bg-blue-500 rounded-lg shadow-sm">
                          <Building2 className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">New Investment Added</p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">SAR 8,000 in Mecca Residential Project</p>
                          <p className="text-xs text-muted-foreground">1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200 dark:border-amber-800">
                        <div className="p-2 bg-amber-500 rounded-lg shadow-sm">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Portfolio Milestone</p>
                          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Reached SAR 125,000 total value</p>
                          <p className="text-xs text-muted-foreground">2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      View All Activity
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="investments" className="space-y-6">
              <div className="grid gap-6">
                {investmentData.map((investment, index) => (
                  <Card
                    key={investment.id}
                    className="overflow-hidden bg-gradient-to-br from-card via-card to-primary/5 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl shadow-lg ${
                            index === 0 ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
                            index === 1 ? 'bg-gradient-to-br from-emerald-500 to-green-600' :
                            'bg-gradient-to-br from-purple-500 to-violet-600'
                          }`}>
                            <Building2 className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                              {investment.property}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{investment.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={`${
                              investment.type === 'Commercial' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                              investment.type === 'Residential' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' :
                              'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                            }`}
                          >
                            {investment.type}
                          </Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
                            {investment.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="p-4 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/50 dark:to-gray-950/50 rounded-xl border border-slate-200 dark:border-slate-700">
                          <p className="text-xs text-muted-foreground mb-1">Invested</p>
                          <p className="text-lg font-bold text-slate-700 dark:text-slate-300">SAR {investment.invested.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50 rounded-xl border border-emerald-200 dark:border-emerald-700">
                          <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                          <p className="text-lg font-bold text-emerald-600">SAR {investment.currentValue.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-xl border border-green-200 dark:border-green-700">
                          <p className="text-xs text-muted-foreground mb-1">Total Returns</p>
                          <p className="text-lg font-bold text-green-600">+SAR {investment.returns.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50 rounded-xl border border-violet-200 dark:border-violet-700">
                          <p className="text-xs text-muted-foreground mb-1">ROI</p>
                          <p className="text-lg font-bold text-violet-600">+{investment.returnPercentage}%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl border border-amber-200 dark:border-amber-700">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-500 rounded-lg">
                            <Calendar className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Next Payout</p>
                            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">{investment.nextPayout}</p>
                          </div>
                          <div className="ml-4">
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="text-lg font-bold text-green-600">SAR {investment.payoutAmount.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                            View Details
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg">
                            Invest More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Total ROI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">+25%</div>
                    <p className="text-sm text-muted-foreground">Average return across all investments</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Returns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">SAR 3,750</div>
                    <p className="text-sm text-muted-foreground">Average monthly payout</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Best Performer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-semibold mb-1">Dammam Retail Center</div>
                    <div className="text-2xl font-bold text-green-600 mb-2">+30%</div>
                    <p className="text-sm text-muted-foreground">Highest return rate</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Portfolio Diversity Score</span>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">Excellent</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Risk Level</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Low Risk</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Investment Period</span>
                      <span className="text-sm text-muted-foreground">7 months</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="growth" className="space-y-6">
              <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-0 shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                          <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        Detailed Portfolio Growth
                      </CardTitle>
                      <p className="text-muted-foreground mt-1">Complete investment journey with key milestones</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">SAR 125K</div>
                      <div className="text-sm text-muted-foreground">Current Portfolio</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ChartContainer config={chartConfig} className="h-[450px]">
                    <AreaChart data={portfolioGrowthData} margin={{ top: 30, right: 40, left: 40, bottom: 30 }}>
                      <defs>
                        <linearGradient id="detailedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 13, fill: 'hsl(var(--muted-foreground))' }}
                        tickMargin={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 13, fill: 'hsl(var(--muted-foreground))' }}
                        tickFormatter={(value) => `SAR ${(value / 1000).toFixed(0)}K`}
                        tickMargin={10}
                      />
                      <ChartTooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const currentValue = payload[0].value;
                            const growth = currentValue > 0 ? (((currentValue - portfolioGrowthData[0].value) / Math.max(portfolioGrowthData[0].value, 1)) * 100).toFixed(1) : 0;
                            return (
                              <div className="bg-background/95 backdrop-blur-sm border border-border rounded-xl p-5 shadow-2xl min-w-[200px]">
                                <p className="font-bold text-foreground mb-3 text-lg">{`${label} 2024`}</p>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Portfolio Value:</span>
                                    <span className="font-bold text-emerald-600 text-lg">
                                      SAR {currentValue?.toLocaleString()}
                                    </span>
                                  </div>
                                  {currentValue > 0 && (
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-muted-foreground">Growth:</span>
                                      <span className="font-bold text-green-600">+{growth}%</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        strokeWidth={4}
                        fill="url(#detailedGradient)"
                        dot={{
                          fill: "hsl(var(--primary))",
                          strokeWidth: 4,
                          r: 8,
                          stroke: "hsl(var(--background))"
                        }}
                        activeDot={{
                          r: 12,
                          fill: "hsl(var(--primary))",
                          stroke: "hsl(var(--background))",
                          strokeWidth: 4,
                          filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))"
                        }}
                      />
                    </AreaChart>
                  </ChartContainer>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">+SAR 125K</div>
                      <div className="text-sm text-emerald-500">Total Growth</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div className="text-2xl font-bold text-blue-600 mb-1">+25%</div>
                      <div className="text-sm text-blue-500">Return Rate</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
                      <div className="text-2xl font-bold text-purple-600 mb-1">SAR 17.9K</div>
                      <div className="text-sm text-purple-500">Monthly Avg</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <div>
                          <p className="text-sm font-medium">First SAR 100K</p>
                          <p className="text-xs text-muted-foreground">Reached in Month 6</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <div>
                          <p className="text-sm font-medium">25% ROI Achieved</p>
                          <p className="text-xs text-muted-foreground">Month 7</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gray-300" />
                        <div>
                          <p className="text-sm font-medium">Next Goal: SAR 200K</p>
                          <p className="text-xs text-muted-foreground">Projected Month 12</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Growth Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Average Monthly Growth</span>
                        <span className="text-sm font-medium">SAR 17,857</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Best Month</span>
                        <span className="text-sm font-medium">February (+SAR 35K)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Compound Growth Rate</span>
                        <span className="text-sm font-medium text-green-600">25% annually</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}