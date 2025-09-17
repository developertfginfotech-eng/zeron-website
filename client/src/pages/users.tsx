import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InvestorTable } from "@/components/investor-table"
import { SmartTableView } from "@/components/smart-table-view"
import { Customer360View } from "@/components/customer-360-view"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Brain, Plus, ArrowLeft, Eye, Grid3X3, List } from "lucide-react"
import { Investor } from "@shared/schema"

export default function Users() {
  // todo: remove mock functionality
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<'classic' | 'smart'>('smart')
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const mockInvestors: Investor[] = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@example.com',
      phone: '+966 50 123 4567',
      kycStatus: 'pending',
      totalInvested: '150000',
      activeProperties: 3,
      monthlyIncome: '12500',
      nationality: 'Saudi Arabia',
      documentsUploaded: true,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+966 55 987 6543',
      kycStatus: 'approved',
      totalInvested: '320000',
      activeProperties: 5,
      monthlyIncome: '28400',
      nationality: 'United States',
      documentsUploaded: true,
      createdAt: new Date('2024-02-20'),
    },
    {
      id: '3',
      name: 'Mohammad Al-Zahra',
      email: 'mohammad.zahra@example.com',
      phone: '+966 56 456 7890',
      kycStatus: 'rejected',
      totalInvested: '0',
      activeProperties: 0,
      monthlyIncome: '0',
      nationality: 'Saudi Arabia',
      documentsUploaded: false,
      createdAt: new Date('2024-03-10'),
    },
    {
      id: '4',
      name: 'Fatima Al-Qasimi',
      email: 'fatima.qasimi@example.com',
      phone: '+966 54 789 0123',
      kycStatus: 'pending',
      totalInvested: '75000',
      activeProperties: 2,
      monthlyIncome: '6200',
      nationality: 'UAE',
      documentsUploaded: true,
      createdAt: new Date('2024-01-25'),
    },
    {
      id: '5',
      name: 'Omar Hassan',
      email: 'omar.hassan@example.com',
      phone: '+966 53 345 6789',
      kycStatus: 'approved',
      totalInvested: '500000',
      activeProperties: 8,
      monthlyIncome: '42000',
      nationality: 'Egypt',
      documentsUploaded: true,
      createdAt: new Date('2024-01-08'),
    },
  ]

  // Smart table data format with AI scores
  const smartTableData = mockInvestors.map(investor => ({
    id: investor.id,
    name: investor.name,
    email: investor.email,
    status: investor.kycStatus === 'approved' ? 'active' : investor.kycStatus,
    value: parseInt(investor.totalInvested || '0'),
    aiScore: Math.floor(Math.random() * 40) + 60, // Mock AI score between 60-100
    lastActivity: ['2 hours ago', '1 day ago', '3 days ago', '1 week ago'][Math.floor(Math.random() * 4)]
  }))

  const filteredInvestors = mockInvestors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || investor.kycStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleApproveKyc = (investorId: string) => {
    console.log('Approved KYC for investor:', investorId)
    // In real app, this would update the investor's KYC status
  }

  const handleRejectKyc = (investorId: string) => {
    console.log('Rejected KYC for investor:', investorId)
    // In real app, this would update the investor's KYC status
  }

  const handleExport = () => {
    console.log('Export users data triggered')
    // In real app, this would export the data as CSV/Excel
  }

  // Handle 360 view
  if (selectedUserId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 modern-scrollbar">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setSelectedUserId(null)}
              className="hover-elevate"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent">
              Customer 360° View
            </h1>
          </div>
          
          <Customer360View customerId={selectedUserId} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 modern-scrollbar">
      <div className="p-6 space-y-8" data-testid="page-users">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent animate-float" data-testid="text-users-title">
              Users & KYC Management
            </h1>
            <p className="text-lg text-muted-foreground/80">
              AI-powered customer insights and KYC verification system
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {mockInvestors.length} total users • {mockInvestors.filter(u => u.kycStatus === 'approved').length} active
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-4">
              <Button
                variant={viewMode === 'smart' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('smart')}
                className="neon-glow"
              >
                <Brain className="h-4 w-4 mr-2" />
                Smart View
              </Button>
              <Button
                variant={viewMode === 'classic' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('classic')}
              >
                <List className="h-4 w-4 mr-2" />
                Classic
              </Button>
            </div>
            <Button className="neon-glow hover:scale-105 transition-transform duration-300">
              <Plus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
            <Button onClick={handleExport} variant="outline" data-testid="button-export-users">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {viewMode === 'smart' ? (
          <SmartTableView
            title="Customer Database"
            description="Complete customer overview with AI-powered insights and 360-degree profiles"
            data={smartTableData}
            type="users"
            columns={['user', 'email', 'status', 'totalInvested', 'aiScore', 'actions']}
          />
        ) : (
          <>
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle>Search & Filter</CardTitle>
                <CardDescription>Find users by name, email, or KYC status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                      data-testid="input-search-users"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48" data-testid="select-status-filter">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle>
                  User List ({filteredInvestors.length} users)
                </CardTitle>
                <CardDescription>
                  Review user information and manage KYC verification status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InvestorTable
                  investors={filteredInvestors}
                  onApproveKyc={handleApproveKyc}
                  onRejectKyc={handleRejectKyc}
                />
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}