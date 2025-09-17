import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Eye, TrendingUp, TrendingDown, DollarSign, Building, Wallet, ArrowUpRight, ArrowDownRight, Calendar, MapPin, Phone, Mail, User, FileText, CreditCard, Banknote, PieChart } from "lucide-react"
import { Investor, Investment, Transaction, PortfolioSummary } from "@shared/schema"

// Safe helper functions for nullable values
const safeParseNumber = (value: string | number | null | undefined, defaultValue: number = 0): number => {
  if (value === null || value === undefined) return defaultValue
  const parsed = typeof value === 'string' ? parseFloat(value) : value
  return isNaN(parsed) ? defaultValue : parsed
}

const safeParseString = (value: string | null | undefined, defaultValue: string = '0'): string => {
  return value ?? defaultValue
}

const safeRiskScore = (score: number | null | undefined): number => {
  return score ?? 50 // Default risk score
}

const safePerformanceScore = (score: number | null | undefined): number => {
  return score ?? 50 // Default performance score
}

interface InvestorWithPortfolio extends Investor {
  investments: Investment[]
  transactions: Transaction[]
  portfolio: PortfolioSummary
}

export default function Investors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [riskFilter, setRiskFilter] = useState("all")
  const [selectedInvestor, setSelectedInvestor] = useState<InvestorWithPortfolio | null>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  // Comprehensive mock investors data - only KYC approved customers
  const mockInvestors: InvestorWithPortfolio[] = [
    {
      // Basic investor info
      id: '1',
      name: 'Ahmed Al-Mansouri',
      firstName: 'Ahmed',
      lastName: 'Al-Mansouri',
      email: 'ahmed.mansouri@gmail.com',
      phone: '+966 50 123 4567',
      salutation: 'Mr',
      gender: 'male',
      dateOfBirth: new Date('1985-03-15'),
      occupation: 'Senior Software Engineer',
      city: 'Riyadh',
      country: 'Saudi Arabia',
      address: 'Al-Malaz District, Riyadh',
      nationality: 'Saudi Arabia',
      profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      kycStatus: 'approved',
      totalInvested: '485000',
      activeProperties: 3,
      monthlyIncome: '18500',
      documentsUploaded: true,
      applicationProgress: 100,
      appDownloadedAt: new Date('2024-01-10T08:30:00Z'),
      kycSubmittedAt: new Date('2024-01-15T14:22:00Z'),
      aiRiskScore: 25,
      preferredLanguage: 'en',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-20'),

      // Portfolio summary
      portfolio: {
        id: 'port1',
        investorId: '1',
        totalInvestment: '485000',
        currentValue: '522500',
        totalReturns: '37500',
        totalDividends: '15200',
        totalWithdrawals: '8000',
        unrealizedGains: '22300',
        realizedGains: '15200',
        riskScore: 25,
        performanceScore: 85,
        lastUpdated: new Date('2024-01-20'),
      },

      // Investments
      investments: [
        {
          id: 'inv1',
          investorId: '1',
          propertyId: 'prop1',
          investmentAmount: '200000',
          ownershipPercentage: '15.5',
          expectedReturn: '8.2',
          currentValue: '218000',
          totalReturns: '18000',
          totalDividends: '6500',
          status: 'active',
          investmentDate: new Date('2024-01-20T10:30:00Z'),
          exitDate: null,
          createdAt: new Date('2024-01-20'),
          updatedAt: new Date('2024-01-20'),
        },
        {
          id: 'inv2',
          investorId: '1',
          propertyId: 'prop2',
          investmentAmount: '185000',
          ownershipPercentage: '12.3',
          expectedReturn: '7.8',
          currentValue: '195500',
          totalReturns: '10500',
          totalDividends: '5200',
          status: 'active',
          investmentDate: new Date('2024-02-15T14:20:00Z'),
          exitDate: null,
          createdAt: new Date('2024-02-15'),
          updatedAt: new Date('2024-02-15'),
        },
        {
          id: 'inv3',
          investorId: '1',
          propertyId: 'prop3',
          investmentAmount: '100000',
          ownershipPercentage: '8.7',
          expectedReturn: '9.1',
          currentValue: '109000',
          totalReturns: '9000',
          totalDividends: '3500',
          status: 'active',
          investmentDate: new Date('2024-03-10T16:45:00Z'),
          exitDate: null,
          createdAt: new Date('2024-03-10'),
          updatedAt: new Date('2024-03-10'),
        }
      ],

      // Transactions
      transactions: [
        {
          id: 'tx1',
          investorId: '1',
          propertyId: 'prop1',
          type: 'investment',
          amount: '200000',
          fee: '2000',
          description: 'Initial investment in Luxury Residential Complex',
          reference: 'INV-001-2024',
          status: 'completed',
          paymentMethod: 'bank_transfer',
          bankDetails: JSON.stringify({ bank: 'Al Rajhi Bank', account: '****4567' }),
          processedAt: new Date('2024-01-20T10:30:00Z'),
          createdAt: new Date('2024-01-20T08:15:00Z'),
          updatedAt: new Date('2024-01-20T10:30:00Z'),
        },
        {
          id: 'tx2',
          investorId: '1',
          propertyId: 'prop1',
          type: 'dividend',
          amount: '6500',
          fee: '0',
          description: 'Quarterly dividend payment',
          reference: 'DIV-Q1-2024',
          status: 'completed',
          paymentMethod: 'bank_transfer',
          bankDetails: JSON.stringify({ bank: 'Al Rajhi Bank', account: '****4567' }),
          processedAt: new Date('2024-04-01T12:00:00Z'),
          createdAt: new Date('2024-04-01T11:00:00Z'),
          updatedAt: new Date('2024-04-01T12:00:00Z'),
        },
        {
          id: 'tx3',
          investorId: '1',
          propertyId: null,
          type: 'withdrawal',
          amount: '8000',
          fee: '100',
          description: 'Partial profit withdrawal',
          reference: 'WTH-001-2024',
          status: 'completed',
          paymentMethod: 'bank_transfer',
          bankDetails: JSON.stringify({ bank: 'Al Rajhi Bank', account: '****4567' }),
          processedAt: new Date('2024-03-15T14:20:00Z'),
          createdAt: new Date('2024-03-15T13:10:00Z'),
          updatedAt: new Date('2024-03-15T14:20:00Z'),
        }
      ]
    },
    {
      // Second investor
      id: '2',
      name: 'Fatima Al-Zahra',
      firstName: 'Fatima',
      lastName: 'Al-Zahra',
      email: 'fatima.zahra@hotmail.com',
      phone: '+966 55 987 6543',
      salutation: 'Mrs',
      gender: 'female',
      dateOfBirth: new Date('1990-07-22'),
      occupation: 'Marketing Manager',
      city: 'Jeddah',
      country: 'Saudi Arabia',
      address: 'Al-Hamra District, Jeddah',
      nationality: 'Saudi Arabia',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b5b0c8d1?w=150&h=150&fit=crop&crop=face',
      kycStatus: 'approved',
      totalInvested: '325000',
      activeProperties: 2,
      monthlyIncome: '15200',
      documentsUploaded: true,
      applicationProgress: 100,
      appDownloadedAt: new Date('2024-01-05T12:15:00Z'),
      kycSubmittedAt: new Date('2024-01-08T16:45:00Z'),
      aiRiskScore: 15,
      preferredLanguage: 'ar',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-18'),

      portfolio: {
        id: 'port2',
        investorId: '2',
        totalInvestment: '325000',
        currentValue: '358750',
        totalReturns: '33750',
        totalDividends: '12800',
        totalWithdrawals: '5000',
        unrealizedGains: '20950',
        realizedGains: '12800',
        riskScore: 15,
        performanceScore: 92,
        lastUpdated: new Date('2024-01-18'),
      },

      investments: [
        {
          id: 'inv4',
          investorId: '2',
          propertyId: 'prop2',
          investmentAmount: '175000',
          ownershipPercentage: '11.6',
          expectedReturn: '8.5',
          currentValue: '189250',
          totalReturns: '14250',
          totalDividends: '7200',
          status: 'active',
          investmentDate: new Date('2024-01-12T09:15:00Z'),
          exitDate: null,
          createdAt: new Date('2024-01-12'),
          updatedAt: new Date('2024-01-12'),
        },
        {
          id: 'inv5',
          investorId: '2',
          propertyId: 'prop4',
          investmentAmount: '150000',
          ownershipPercentage: '9.8',
          expectedReturn: '9.2',
          currentValue: '169500',
          totalReturns: '19500',
          totalDividends: '5600',
          status: 'active',
          investmentDate: new Date('2024-02-08T11:30:00Z'),
          exitDate: null,
          createdAt: new Date('2024-02-08'),
          updatedAt: new Date('2024-02-08'),
        }
      ],

      transactions: [
        {
          id: 'tx4',
          investorId: '2',
          propertyId: 'prop2',
          type: 'investment',
          amount: '175000',
          fee: '1750',
          description: 'Investment in Commercial Complex',
          reference: 'INV-002-2024',
          status: 'completed',
          paymentMethod: 'bank_transfer',
          bankDetails: JSON.stringify({ bank: 'SABB Bank', account: '****9876' }),
          processedAt: new Date('2024-01-12T09:15:00Z'),
          createdAt: new Date('2024-01-12T08:00:00Z'),
          updatedAt: new Date('2024-01-12T09:15:00Z'),
        },
        {
          id: 'tx5',
          investorId: '2',
          propertyId: 'prop2',
          type: 'dividend',
          amount: '7200',
          fee: '0',
          description: 'Quarterly dividend payment',
          reference: 'DIV-Q1-2024',
          status: 'completed',
          paymentMethod: 'bank_transfer',
          bankDetails: JSON.stringify({ bank: 'SABB Bank', account: '****9876' }),
          processedAt: new Date('2024-04-01T12:00:00Z'),
          createdAt: new Date('2024-04-01T11:00:00Z'),
          updatedAt: new Date('2024-04-01T12:00:00Z'),
        }
      ]
    },
    {
      // Third investor
      id: '3',
      name: 'Khalid Al-Mutairi',
      firstName: 'Khalid',
      lastName: 'Al-Mutairi',
      email: 'khalid.mutairi@gmail.com',
      phone: '+966 53 345 6789',
      salutation: 'Dr',
      gender: 'male',
      dateOfBirth: new Date('1979-09-30'),
      occupation: 'Medical Doctor',
      city: 'Mecca',
      country: 'Saudi Arabia',
      address: 'Al-Aziziyyah, Mecca',
      nationality: 'Saudi Arabia',
      profilePicture: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      kycStatus: 'approved',
      totalInvested: '750000',
      activeProperties: 4,
      monthlyIncome: '35000',
      documentsUploaded: true,
      applicationProgress: 100,
      appDownloadedAt: new Date('2024-01-08T07:20:00Z'),
      kycSubmittedAt: new Date('2024-01-16T12:45:00Z'),
      aiRiskScore: 12,
      preferredLanguage: 'ar',
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-16'),

      portfolio: {
        id: 'port3',
        investorId: '3',
        totalInvestment: '750000',
        currentValue: '847500',
        totalReturns: '97500',
        totalDividends: '28300',
        totalWithdrawals: '15000',
        unrealizedGains: '69200',
        realizedGains: '28300',
        riskScore: 12,
        performanceScore: 96,
        lastUpdated: new Date('2024-01-16'),
      },

      investments: [
        {
          id: 'inv6',
          investorId: '3',
          propertyId: 'prop1',
          investmentAmount: '250000',
          ownershipPercentage: '19.3',
          expectedReturn: '8.2',
          currentValue: '281250',
          totalReturns: '31250',
          totalDividends: '10200',
          status: 'active',
          investmentDate: new Date('2024-01-18T13:20:00Z'),
          exitDate: null,
          createdAt: new Date('2024-01-18'),
          updatedAt: new Date('2024-01-18'),
        },
        {
          id: 'inv7',
          investorId: '3',
          propertyId: 'prop3',
          investmentAmount: '200000',
          ownershipPercentage: '17.4',
          expectedReturn: '9.1',
          currentValue: '230000',
          totalReturns: '30000',
          totalDividends: '8500',
          status: 'active',
          investmentDate: new Date('2024-02-02T10:45:00Z'),
          exitDate: null,
          createdAt: new Date('2024-02-02'),
          updatedAt: new Date('2024-02-02'),
        },
        {
          id: 'inv8',
          investorId: '3',
          propertyId: 'prop5',
          investmentAmount: '300000',
          ownershipPercentage: '22.1',
          expectedReturn: '7.9',
          currentValue: '336250',
          totalReturns: '36250',
          totalDividends: '9600',
          status: 'active',
          investmentDate: new Date('2024-02-20T15:30:00Z'),
          exitDate: null,
          createdAt: new Date('2024-02-20'),
          updatedAt: new Date('2024-02-20'),
        }
      ],

      transactions: [
        {
          id: 'tx6',
          investorId: '3',
          propertyId: 'prop1',
          type: 'investment',
          amount: '250000',
          fee: '2500',
          description: 'Major investment in Luxury Residential Complex',
          reference: 'INV-003-2024',
          status: 'completed',
          paymentMethod: 'bank_transfer',
          bankDetails: JSON.stringify({ bank: 'NCB Bank', account: '****1234' }),
          processedAt: new Date('2024-01-18T13:20:00Z'),
          createdAt: new Date('2024-01-18T11:00:00Z'),
          updatedAt: new Date('2024-01-18T13:20:00Z'),
        },
        {
          id: 'tx7',
          investorId: '3',
          propertyId: null,
          type: 'dividend',
          amount: '28300',
          fee: '0',
          description: 'Quarterly dividend payments (all properties)',
          reference: 'DIV-Q1-2024-ALL',
          status: 'completed',
          paymentMethod: 'bank_transfer',
          bankDetails: JSON.stringify({ bank: 'NCB Bank', account: '****1234' }),
          processedAt: new Date('2024-04-01T12:00:00Z'),
          createdAt: new Date('2024-04-01T11:00:00Z'),
          updatedAt: new Date('2024-04-01T12:00:00Z'),
        },
        {
          id: 'tx8',
          investorId: '3',
          propertyId: null,
          type: 'withdrawal',
          amount: '15000',
          fee: '150',
          description: 'Profit withdrawal',
          reference: 'WTH-002-2024',
          status: 'completed',
          paymentMethod: 'bank_transfer',
          bankDetails: JSON.stringify({ bank: 'NCB Bank', account: '****1234' }),
          processedAt: new Date('2024-03-25T16:10:00Z'),
          createdAt: new Date('2024-03-25T14:00:00Z'),
          updatedAt: new Date('2024-03-25T16:10:00Z'),
        }
      ]
    }
  ]

  const filteredInvestors = mockInvestors.filter(investor => {
    // Only show KYC-approved investors
    const isApproved = investor.kycStatus === 'approved'
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (investor.occupation || '').toLowerCase().includes(searchTerm.toLowerCase())
    const riskScore = safeRiskScore(investor.aiRiskScore)
    const matchesRisk = riskFilter === "all" || 
                       (riskFilter === "low" && riskScore <= 30) ||
                       (riskFilter === "medium" && riskScore > 30 && riskScore <= 60) ||
                       (riskFilter === "high" && riskScore > 60)
    return isApproved && matchesSearch && matchesRisk
  })

  const formatCurrency = (amount: string | null | undefined) => {
    const parsedAmount = safeParseNumber(amount, 0)
    return `SAR ${parsedAmount.toLocaleString()}`
  }

  const formatPercentage = (value: string | null | undefined) => {
    const parsedValue = safeParseNumber(value, 0)
    return `${parsedValue.toFixed(1)}%`
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A'
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  const getRiskBadgeVariant = (riskScore: number | null | undefined) => {
    const score = safeRiskScore(riskScore)
    if (score <= 30) return 'default'
    if (score <= 60) return 'secondary'
    return 'destructive'
  }

  const getRiskLabel = (riskScore: number | null | undefined) => {
    const score = safeRiskScore(riskScore)
    if (score <= 30) return 'Low Risk'
    if (score <= 60) return 'Medium Risk'
    return 'High Risk'
  }

  const getPerformanceColor = (score: number | null | undefined) => {
    const safeScore = safePerformanceScore(score)
    if (safeScore >= 80) return 'text-green-600'
    if (safeScore >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleViewProfile = (investor: InvestorWithPortfolio) => {
    setSelectedInvestor(investor)
    setIsProfileModalOpen(true)
  }

  const handleExport = () => {
    console.log('Export investors data')
    // In real app, this would export the data
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 modern-scrollbar">
      <div className="p-6 space-y-8" data-testid="page-investors">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent animate-float" data-testid="text-investors-title">
              Active Investors
            </h1>
            <p className="text-lg text-muted-foreground/80">
              KYC-approved customers with active investment portfolios
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {mockInvestors.length} active investors • {mockInvestors.reduce((sum, inv) => sum + safeParseNumber(inv.portfolio.totalInvestment), 0).toLocaleString()} SAR total investment
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleExport} variant="outline" data-testid="button-export-investors">
              <TrendingUp className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-morphism" data-testid="card-total-investment">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Investment
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                SAR {mockInvestors.reduce((sum, inv) => sum + safeParseNumber(inv.portfolio.totalInvestment), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all portfolios
              </p>
            </CardContent>
          </Card>

          <Card className="glass-morphism" data-testid="card-current-value">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Value
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                SAR {mockInvestors.reduce((sum, inv) => sum + safeParseNumber(inv.portfolio.currentValue), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Live portfolio value
              </p>
            </CardContent>
          </Card>

          <Card className="glass-morphism" data-testid="card-total-returns">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Returns
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                SAR {mockInvestors.reduce((sum, inv) => sum + safeParseNumber(inv.portfolio.totalReturns), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Total profit generated
              </p>
            </CardContent>
          </Card>

          <Card className="glass-morphism" data-testid="card-avg-performance">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Performance
              </CardTitle>
              <PieChart className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.round(mockInvestors.reduce((sum, inv) => sum + safePerformanceScore(inv.portfolio.performanceScore), 0) / mockInvestors.length)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Portfolio performance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>Find investors by name, email, occupation, or risk profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or occupation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-investors"
                />
              </div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-48" data-testid="select-risk-filter">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low Risk (1-30)</SelectItem>
                  <SelectItem value="medium">Medium Risk (31-60)</SelectItem>
                  <SelectItem value="high">High Risk (61-100)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Investors Table */}
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle>
              Investment Portfolios ({filteredInvestors.length} investors)
            </CardTitle>
            <CardDescription>
              Active investors with approved KYC and investment portfolios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInvestors.map((investor) => (
                <div
                  key={investor.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover-elevate"
                  data-testid={`investor-row-${investor.id}`}
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={investor.profilePicture || undefined} alt={investor.name} />
                      <AvatarFallback>
                        {investor.firstName?.[0]}{investor.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{investor.name}</h3>
                        <Badge variant={getRiskBadgeVariant(investor.aiRiskScore)}>
                          {getRiskLabel(investor.aiRiskScore)}
                        </Badge>
                        {safePerformanceScore(investor.portfolio.performanceScore) >= 90 && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            TOP PERFORMER
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{investor.email}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {investor.occupation}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {investor.city}
                        </span>
                        <span>{investor.activeProperties} properties</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="text-right space-y-1">
                      <div className="text-lg font-bold text-primary">
                        {formatCurrency(investor.portfolio.totalInvestment)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Invested
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(investor.portfolio.currentValue)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Current Value
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className={`text-lg font-bold ${getPerformanceColor(investor.portfolio.performanceScore)}`}>
                        {safePerformanceScore(investor.portfolio.performanceScore)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Performance
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProfile(investor)}
                      data-testid={`button-view-${investor.id}`}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredInvestors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No investors found matching your criteria</p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("")
                  setRiskFilter("all")
                }} data-testid="button-clear-filters">
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detailed Profile Modal */}
        <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Investor Profile & Portfolio
              </DialogTitle>
              <DialogDescription>
                Complete investment profile with financial and non-financial information
              </DialogDescription>
            </DialogHeader>
            
            {selectedInvestor && (
              <div className="space-y-6">
                {/* Investor Header */}
                <div className="flex items-start gap-6 p-6 bg-card/50 rounded-lg">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedInvestor.profilePicture || undefined} alt={selectedInvestor.name} />
                    <AvatarFallback className="text-2xl">
                      {selectedInvestor.firstName?.[0]}{selectedInvestor.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <h2 className="text-3xl font-bold">{selectedInvestor.salutation} {selectedInvestor.name}</h2>
                      <Badge variant={getRiskBadgeVariant(selectedInvestor.aiRiskScore)}>
                        {getRiskLabel(selectedInvestor.aiRiskScore)} ({selectedInvestor.aiRiskScore}/100)
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedInvestor.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedInvestor.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedInvestor.city}, {selectedInvestor.country}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedInvestor.occupation}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right space-y-2">
                    <div className="text-3xl font-bold text-primary">
                      {formatCurrency(selectedInvestor.portfolio.currentValue)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
                    <div className="flex items-center gap-2">
                      <div className={`text-lg font-bold ${getPerformanceColor(selectedInvestor.portfolio.performanceScore)}`}>
                        {selectedInvestor.portfolio.performanceScore}%
                      </div>
                      <div className="text-sm text-muted-foreground">Performance Score</div>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="financial" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="financial">Financial Overview</TabsTrigger>
                    <TabsTrigger value="investments">Investments</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  </TabsList>

                  <TabsContent value="financial" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-green-600" />
                            Investment Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Invested:</span>
                            <span className="font-bold">{formatCurrency(selectedInvestor.portfolio.totalInvestment)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Current Value:</span>
                            <span className="font-bold text-primary">{formatCurrency(selectedInvestor.portfolio.currentValue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Returns:</span>
                            <span className="font-bold text-green-600">{formatCurrency(selectedInvestor.portfolio.totalReturns)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Return Rate:</span>
                            <span className="font-bold text-green-600">
                              {((safeParseNumber(selectedInvestor.portfolio.totalReturns) / safeParseNumber(selectedInvestor.portfolio.totalInvestment, 1)) * 100).toFixed(2)}%
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-blue-600" />
                            Dividend & Withdrawals
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Dividends:</span>
                            <span className="font-bold text-blue-600">{formatCurrency(selectedInvestor.portfolio.totalDividends)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Withdrawals:</span>
                            <span className="font-bold text-orange-600">{formatCurrency(selectedInvestor.portfolio.totalWithdrawals)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Net Received:</span>
                            <span className="font-bold text-green-600">
                              {formatCurrency((safeParseNumber(selectedInvestor.portfolio.totalDividends) + safeParseNumber(selectedInvestor.portfolio.totalWithdrawals)).toString())}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Monthly Income:</span>
                            <span className="font-bold">{formatCurrency(selectedInvestor.monthlyIncome)}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-purple-600" />
                            Performance Metrics
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Performance Score:</span>
                              <span className={`font-bold ${getPerformanceColor(selectedInvestor.portfolio.performanceScore)}`}>
                                {safePerformanceScore(selectedInvestor.portfolio.performanceScore)}%
                              </span>
                            </div>
                            <Progress value={safePerformanceScore(selectedInvestor.portfolio.performanceScore)} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Risk Score:</span>
                              <span className="font-bold">{safeRiskScore(selectedInvestor.aiRiskScore)}/100</span>
                            </div>
                            <Progress value={safeRiskScore(selectedInvestor.aiRiskScore)} className="h-2" />
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Active Properties:</span>
                            <span className="font-bold">{selectedInvestor.activeProperties}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="investments" className="space-y-4">
                    <div className="space-y-4">
                      {selectedInvestor.investments.map((investment) => (
                        <Card key={investment.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-2">
                                <h4 className="font-semibold">Property Investment #{investment.propertyId}</h4>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <span>Invested: {formatCurrency(investment.investmentAmount)}</span>
                                  <span>Ownership: {formatPercentage(investment.ownershipPercentage)}</span>
                                  <span>Expected: {formatPercentage(investment.expectedReturn)} annual</span>
                                </div>
                                <div className="text-sm">
                                  Investment Date: {formatDate(investment.investmentDate)}
                                </div>
                              </div>
                              
                              <div className="text-right space-y-2">
                                <div className="text-lg font-bold text-primary">
                                  {formatCurrency(investment.currentValue)}
                                </div>
                                <div className="text-sm text-muted-foreground">Current Value</div>
                                <div className="text-lg font-bold text-green-600">
                                  +{formatCurrency(investment.totalReturns)}
                                </div>
                                <div className="text-sm text-muted-foreground">Total Returns</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="transactions" className="space-y-4">
                    <div className="space-y-4">
                      {selectedInvestor.transactions.map((transaction) => {
                        const isPositive = transaction.type === 'dividend' || transaction.type === 'withdrawal'
                        return (
                          <Card key={transaction.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className={`p-2 rounded-full ${isPositive ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {transaction.type === 'investment' && <ArrowDownRight className="h-4 w-4" />}
                                    {transaction.type === 'dividend' && <ArrowUpRight className="h-4 w-4" />}
                                    {transaction.type === 'withdrawal' && <Banknote className="h-4 w-4" />}
                                  </div>
                                  
                                  <div className="space-y-1">
                                    <h4 className="font-semibold capitalize">{transaction.type.replace('_', ' ')}</h4>
                                    <p className="text-sm text-muted-foreground">{transaction.description}</p>
                                    <p className="text-xs text-muted-foreground">Ref: {transaction.reference}</p>
                                  </div>
                                </div>
                                
                                <div className="text-right space-y-1">
                                  <div className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-primary'}`}>
                                    {isPositive ? '+' : ''}{formatCurrency(transaction.amount)}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {formatDate(transaction.processedAt)}
                                  </div>
                                  <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                                    {transaction.status.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="personal" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Personal Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Full Name</span>
                              <p className="font-medium">{selectedInvestor.salutation} {selectedInvestor.firstName} {selectedInvestor.lastName}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Gender</span>
                              <p className="font-medium capitalize">{selectedInvestor.gender}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Date of Birth</span>
                              <p className="font-medium">{formatDate(selectedInvestor.dateOfBirth)}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Nationality</span>
                              <p className="font-medium">{selectedInvestor.nationality}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Occupation</span>
                              <p className="font-medium">{selectedInvestor.occupation}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Preferred Language</span>
                              <p className="font-medium">{selectedInvestor.preferredLanguage?.toUpperCase()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Contact & Location
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Email Address</span>
                              <p className="font-medium">{selectedInvestor.email}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Phone Number</span>
                              <p className="font-medium">{selectedInvestor.phone}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">City</span>
                              <p className="font-medium">{selectedInvestor.city}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Address</span>
                              <p className="font-medium">{selectedInvestor.address}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Country</span>
                              <p className="font-medium">{selectedInvestor.country}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Account Timeline
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">App Downloaded</span>
                              <p className="font-medium">{formatDate(selectedInvestor.appDownloadedAt)}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">KYC Submitted</span>
                              <p className="font-medium">{formatDate(selectedInvestor.kycSubmittedAt)}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Account Created</span>
                              <p className="font-medium">{formatDate(selectedInvestor.createdAt)}</p>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
                              <p className="font-medium">{formatDate(selectedInvestor.updatedAt)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            KYC Status
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">KYC Status</span>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="default">APPROVED</Badge>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Application Progress</span>
                              <div className="flex items-center gap-2 mt-2">
                                <Progress value={selectedInvestor.applicationProgress} className="flex-1" />
                                <span className="text-sm font-medium">{selectedInvestor.applicationProgress}%</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium text-muted-foreground">Documents Status</span>
                              <p className="font-medium text-green-600">
                                {selectedInvestor.documentsUploaded ? 'All Documents Verified' : 'Pending Documents'}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}