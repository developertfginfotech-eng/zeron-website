import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InvestorTable } from "@/components/investor-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download } from "lucide-react"
import { Investor } from "@shared/schema"

export default function Users() {
  // todo: remove mock functionality
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

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

  return (
    <div className="p-6 space-y-6" data-testid="page-users">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-users-title">Users & KYC Management</h1>
          <p className="text-muted-foreground">Manage user accounts and KYC verification</p>
        </div>
        <Button onClick={handleExport} data-testid="button-export-users">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      <Card>
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

      <Card>
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
    </div>
  )
}