import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, Filter, Eye, FileText, Download, AlertCircle, CheckCircle, XCircle, Clock, Sparkles, TrendingUp, Building, MapPin, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Investor, KycDocument } from "@shared/schema"

interface KycApplicant extends Investor {
  documents: KycDocument[]
  completionPercentage: number
  riskScore: number
  aiRecommendation: string
}

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedApplicant, setSelectedApplicant] = useState<KycApplicant | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<KycDocument | null>(null)
  const [remarkText, setRemarkText] = useState("")

  // Comprehensive mock KYC applicants data
  const mockKycApplicants: KycApplicant[] = [
    {
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
      kycStatus: 'pending',
      totalInvested: '250000',
      activeProperties: 2,
      monthlyIncome: '18500',
      documentsUploaded: true,
      applicationProgress: 85,
      appDownloadedAt: new Date('2024-01-10T08:30:00Z'),
      kycSubmittedAt: new Date('2024-01-15T14:22:00Z'),
      aiRiskScore: 25,
      preferredLanguage: 'en',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-15'),
      completionPercentage: 85,
      riskScore: 25,
      aiRecommendation: 'High-quality candidate with stable income and good document quality. Recommended for approval.',
      documents: [
        {
          id: 'doc1',
          investorId: '1',
          documentType: 'national_id',
          documentUrl: '/documents/ahmed_national_id.pdf',
          status: 'approved',
          reviewNotes: null,
          reviewedBy: 'admin1',
          isAuthentic: true,
          confidenceScore: 95,
          extractedData: JSON.stringify({ name: 'Ahmed Al-Mansouri', id_number: '1234567890', expiry: '2029-03-15' }),
          uploadedAt: new Date('2024-01-12T10:00:00Z'),
          reviewedAt: new Date('2024-01-13T09:15:00Z'),
        },
        {
          id: 'doc2',
          investorId: '1',
          documentType: 'selfie',
          documentUrl: '/documents/ahmed_selfie.jpg',
          status: 'pending',
          reviewNotes: null,
          reviewedBy: null,
          isAuthentic: null,
          confidenceScore: null,
          extractedData: null,
          uploadedAt: new Date('2024-01-15T14:22:00Z'),
          reviewedAt: null,
        }
      ]
    },
    {
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
      totalInvested: '180000',
      activeProperties: 1,
      monthlyIncome: '15200',
      documentsUploaded: true,
      applicationProgress: 100,
      appDownloadedAt: new Date('2024-01-05T12:15:00Z'),
      kycSubmittedAt: new Date('2024-01-08T16:45:00Z'),
      aiRiskScore: 15,
      preferredLanguage: 'ar',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date('2024-01-18'),
      completionPercentage: 100,
      riskScore: 15,
      aiRecommendation: 'Excellent candidate with comprehensive documentation and low risk profile. Top-tier investor.',
      documents: [
        {
          id: 'doc3',
          investorId: '2',
          documentType: 'national_id',
          documentUrl: '/documents/fatima_national_id.pdf',
          status: 'approved',
          reviewNotes: 'All information verified successfully',
          reviewedBy: 'admin2',
          isAuthentic: true,
          confidenceScore: 98,
          extractedData: JSON.stringify({ name: 'Fatima Al-Zahra', id_number: '0987654321', expiry: '2028-07-22' }),
          uploadedAt: new Date('2024-01-06T11:30:00Z'),
          reviewedAt: new Date('2024-01-07T14:20:00Z'),
        },
        {
          id: 'doc4',
          investorId: '2',
          documentType: 'selfie',
          documentUrl: '/documents/fatima_selfie.jpg',
          status: 'approved',
          reviewNotes: 'Clear photo, face matches ID',
          reviewedBy: 'admin2',
          isAuthentic: true,
          confidenceScore: 92,
          extractedData: null,
          uploadedAt: new Date('2024-01-06T11:35:00Z'),
          reviewedAt: new Date('2024-01-07T14:25:00Z'),
        }
      ]
    },
    {
      id: '3',
      name: 'Omar Hassan',
      firstName: 'Omar',
      lastName: 'Hassan',
      email: 'omar.hassan@gmail.com',
      phone: '+966 56 456 7890',
      salutation: 'Mr',
      gender: 'male',
      dateOfBirth: new Date('1982-11-08'),
      occupation: 'Business Consultant',
      city: 'Dammam',
      country: 'Saudi Arabia',
      address: 'Al-Faisaliyyah, Dammam',
      nationality: 'Egypt',
      profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      kycStatus: 'rejected',
      totalInvested: '0',
      activeProperties: 0,
      monthlyIncome: '22000',
      documentsUploaded: true,
      applicationProgress: 60,
      appDownloadedAt: new Date('2024-01-12T09:20:00Z'),
      kycSubmittedAt: new Date('2024-01-18T11:10:00Z'),
      aiRiskScore: 65,
      preferredLanguage: 'en',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-19'),
      completionPercentage: 60,
      riskScore: 65,
      aiRecommendation: 'Document quality issues detected. Recommend requesting clearer documents before approval.',
      documents: [
        {
          id: 'doc5',
          investorId: '3',
          documentType: 'passport',
          documentUrl: '/documents/omar_passport.pdf',
          status: 'rejected',
          reviewNotes: 'Document quality is poor. Please provide a clearer scan of your passport.',
          reviewedBy: 'admin1',
          isAuthentic: false,
          confidenceScore: 45,
          extractedData: null,
          uploadedAt: new Date('2024-01-18T11:10:00Z'),
          reviewedAt: new Date('2024-01-19T10:30:00Z'),
        }
      ]
    },
    {
      id: '4',
      name: 'Layla Al-Qasimi',
      firstName: 'Layla',
      lastName: 'Al-Qasimi',
      email: 'layla.qasimi@outlook.com',
      phone: '+966 54 789 0123',
      salutation: 'Ms',
      gender: 'female',
      dateOfBirth: new Date('1993-05-12'),
      occupation: 'Financial Analyst',
      city: 'Riyadh',
      country: 'Saudi Arabia',
      address: 'King Fahd District, Riyadh',
      nationality: 'UAE',
      profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      kycStatus: 'under_review',
      totalInvested: '0',
      activeProperties: 0,
      monthlyIncome: '16800',
      documentsUploaded: true,
      applicationProgress: 75,
      appDownloadedAt: new Date('2024-01-14T15:45:00Z'),
      kycSubmittedAt: new Date('2024-01-20T13:30:00Z'),
      aiRiskScore: 30,
      preferredLanguage: 'en',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-20'),
      completionPercentage: 75,
      riskScore: 30,
      aiRecommendation: 'Strong professional background in finance. Documents pending authentication verification.',
      documents: [
        {
          id: 'doc6',
          investorId: '4',
          documentType: 'national_id',
          documentUrl: '/documents/layla_national_id.pdf',
          status: 'under_review',
          reviewNotes: null,
          reviewedBy: null,
          isAuthentic: null,
          confidenceScore: null,
          extractedData: null,
          uploadedAt: new Date('2024-01-20T13:30:00Z'),
          reviewedAt: null,
        },
        {
          id: 'doc7',
          investorId: '4',
          documentType: 'employment_letter',
          documentUrl: '/documents/layla_employment.pdf',
          status: 'pending',
          reviewNotes: null,
          reviewedBy: null,
          isAuthentic: null,
          confidenceScore: null,
          extractedData: null,
          uploadedAt: new Date('2024-01-20T13:35:00Z'),
          reviewedAt: null,
        }
      ]
    },
    {
      id: '5',
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
      kycStatus: 'pending',
      totalInvested: '0',
      activeProperties: 0,
      monthlyIncome: '35000',
      documentsUploaded: true,
      applicationProgress: 90,
      appDownloadedAt: new Date('2024-01-08T07:20:00Z'),
      kycSubmittedAt: new Date('2024-01-16T12:45:00Z'),
      aiRiskScore: 12,
      preferredLanguage: 'ar',
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-16'),
      completionPercentage: 90,
      riskScore: 12,
      aiRecommendation: 'Exceptional candidate with high income and professional credentials. Priority for approval.',
      documents: [
        {
          id: 'doc8',
          investorId: '5',
          documentType: 'national_id',
          documentUrl: '/documents/khalid_national_id.pdf',
          status: 'approved',
          reviewNotes: 'Document verified successfully',
          reviewedBy: 'admin2',
          isAuthentic: true,
          confidenceScore: 97,
          extractedData: JSON.stringify({ name: 'Khalid Al-Mutairi', id_number: '1122334455', expiry: '2027-09-30' }),
          uploadedAt: new Date('2024-01-16T12:45:00Z'),
          reviewedAt: new Date('2024-01-17T09:10:00Z'),
        },
        {
          id: 'doc9',
          investorId: '5',
          documentType: 'proof_of_income',
          documentUrl: '/documents/khalid_income.pdf',
          status: 'pending',
          reviewNotes: null,
          reviewedBy: null,
          isAuthentic: null,
          confidenceScore: null,
          extractedData: null,
          uploadedAt: new Date('2024-01-16T12:50:00Z'),
          reviewedAt: null,
        }
      ]
    }
  ]

  const filteredApplicants = mockKycApplicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (applicant.occupation || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || applicant.kycStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const pendingKycCount = mockKycApplicants.filter(a => a.kycStatus === 'pending' || a.kycStatus === 'under_review').length

  // AI-powered top profiles based on occupation and risk score
  const topProfiles = mockKycApplicants
    .sort((a, b) => {
      // Prioritize by low risk score and high income
      const aScore = (100 - a.riskScore) * 0.7 + (parseFloat(a.monthlyIncome || '0') / 1000) * 0.3
      const bScore = (100 - b.riskScore) * 0.7 + (parseFloat(b.monthlyIncome || '0') / 1000) * 0.3
      return bScore - aScore
    })
    .slice(0, 3)

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default'
      case 'pending': return 'secondary'
      case 'under_review': return 'outline'
      case 'rejected': return 'destructive'
      default: return 'outline'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'under_review': return <AlertCircle className="h-4 w-4 text-blue-600" />
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A'
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const handleViewApplicant = (applicant: KycApplicant) => {
    setSelectedApplicant(applicant)
    setIsViewModalOpen(true)
  }

  const handleAddRemark = (document: KycDocument) => {
    setSelectedDocument(document)
    setRemarkText(document.reviewNotes || '')
    setIsRemarkModalOpen(true)
  }

  const handleApproveDocument = (documentId: string) => {
    console.log('Approve document:', documentId)
    // In real app, this would update document status
  }

  const handleRejectDocument = (documentId: string) => {
    console.log('Reject document:', documentId)
    // In real app, this would update document status
  }

  const handleSubmitRemark = () => {
    console.log('Submit remark for document:', selectedDocument?.id, 'Remark:', remarkText)
    setIsRemarkModalOpen(false)
    setRemarkText('')
    setSelectedDocument(null)
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 modern-scrollbar">
        <div className="p-6 space-y-8" data-testid="page-documents">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent animate-float" data-testid="text-documents-title">
                  KYC Management
                </h1>
                {pendingKycCount > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold animate-pulse">
                          {pendingKycCount}
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{pendingKycCount} KYC applications pending review</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <p className="text-lg text-muted-foreground/80">
                Review KYC applications and document verification with AI-powered insights
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {mockKycApplicants.length} total applicants • {mockKycApplicants.filter(a => a.kycStatus === 'approved').length} approved • {pendingKycCount} pending review
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" data-testid="button-export-kyc">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* AI Insights Panel */}
          <Card className="glass-morphism border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI-Powered Top Profiles
              </CardTitle>
              <CardDescription>
                Recommended applicants based on professional credentials, risk assessment, and income analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topProfiles.map((profile, index) => (
                  <div
                    key={profile.id}
                    className="p-4 rounded-lg border bg-card/50 hover-elevate cursor-pointer"
                    onClick={() => handleViewApplicant(profile)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={profile.profilePicture || undefined} alt={profile.name} />
                          <AvatarFallback>{profile.firstName?.[0]}{profile.lastName?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">{profile.name}</h4>
                        <p className="text-sm text-muted-foreground">{profile.occupation}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Risk Score</span>
                        <Badge variant={profile.riskScore < 30 ? 'default' : profile.riskScore < 50 ? 'secondary' : 'destructive'}>
                          {profile.riskScore}/100
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Income</span>
                        <span className="font-medium">SAR {parseFloat(profile.monthlyIncome || '0').toLocaleString()}/mo</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{profile.aiRecommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-morphism" data-testid="card-total-applicants">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Applicants
                </CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockKycApplicants.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  KYC applications submitted
                </p>
              </CardContent>
            </Card>

            <Card className="glass-morphism" data-testid="card-pending-review">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Review
                </CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {pendingKycCount}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting verification
                </p>
              </CardContent>
            </Card>

            <Card className="glass-morphism" data-testid="card-approved">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Approved
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {mockKycApplicants.filter(a => a.kycStatus === 'approved').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Successfully verified
                </p>
              </CardContent>
            </Card>

            <Card className="glass-morphism" data-testid="card-rejected">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Rejected
                </CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {mockKycApplicants.filter(a => a.kycStatus === 'rejected').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Need resubmission
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
              <CardDescription>Find KYC applicants by name, email, occupation, or status</CardDescription>
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
                    data-testid="input-search-applicants"
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
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* KYC Applicants Table */}
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle>
                KYC Applicants ({filteredApplicants.length} applicants)
              </CardTitle>
              <CardDescription>
                Review and manage KYC applications with document verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredApplicants.map((applicant) => (
                  <div
                    key={applicant.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover-elevate"
                    data-testid={`applicant-row-${applicant.id}`}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={applicant.profilePicture || undefined} alt={applicant.name} />
                        <AvatarFallback>
                          {applicant.firstName?.[0]}{applicant.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{applicant.name}</h3>
                          <Badge variant={getStatusBadgeVariant(applicant.kycStatus)}>
                            {applicant.kycStatus.replace('_', ' ').toUpperCase()}
                          </Badge>
                          {applicant.riskScore < 30 && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              TOP CANDIDATE
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{applicant.email}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building className="h-3 w-3" />
                            {applicant.occupation}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {applicant.city}
                          </span>
                          <span>Risk Score: {applicant.riskScore}/100</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">Completion:</span>
                          <Progress value={applicant.completionPercentage} className="w-24 h-2" />
                          <span className="text-xs text-muted-foreground">{applicant.completionPercentage}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="text-right space-y-1">
                        <div className="text-sm">
                          Documents: {applicant.documents.length}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Submitted: {formatDate(applicant.kycSubmittedAt).split(',')[0]}
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewApplicant(applicant)}
                        data-testid={`button-view-${applicant.id}`}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredApplicants.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No KYC applicants found matching your criteria</p>
                  <Button variant="outline" onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                  }} data-testid="button-clear-filters">
                    Clear Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detailed View Modal */}
          <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  KYC Application Details
                </DialogTitle>
                <DialogDescription>
                  Complete applicant information and document verification status
                </DialogDescription>
              </DialogHeader>
              
              {selectedApplicant && (
                <div className="space-y-6">
                  {/* Applicant Header */}
                  <div className="flex items-start gap-6 p-4 bg-card/50 rounded-lg">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={selectedApplicant.profilePicture || undefined} alt={selectedApplicant.name} />
                      <AvatarFallback className="text-2xl">
                        {selectedApplicant.firstName?.[0]}{selectedApplicant.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold">{selectedApplicant.salutation} {selectedApplicant.name}</h2>
                        <Badge variant={getStatusBadgeVariant(selectedApplicant.kycStatus)}>
                          {getStatusIcon(selectedApplicant.kycStatus)}
                          {selectedApplicant.kycStatus.replace('_', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><strong>Email:</strong> {selectedApplicant.email}</div>
                        <div><strong>Phone:</strong> {selectedApplicant.phone}</div>
                        <div><strong>Gender:</strong> {selectedApplicant.gender}</div>
                        <div><strong>Nationality:</strong> {selectedApplicant.nationality}</div>
                        <div><strong>City:</strong> {selectedApplicant.city}</div>
                        <div><strong>Occupation:</strong> {selectedApplicant.occupation}</div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="text-2xl font-bold text-primary">
                        {selectedApplicant.riskScore}/100
                      </div>
                      <div className="text-sm text-muted-foreground">Risk Score</div>
                      <div className="text-lg font-semibold">
                        SAR {parseFloat(selectedApplicant.monthlyIncome || '0').toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Monthly Income</div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-lg font-semibold">App Downloaded</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(selectedApplicant.appDownloadedAt)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-lg font-semibold">KYC Submitted</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(selectedApplicant.kycSubmittedAt)}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-lg font-semibold">Completion</div>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <Progress value={selectedApplicant.completionPercentage} className="w-16 h-2" />
                          <span className="text-sm">{selectedApplicant.completionPercentage}%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* AI Recommendation */}
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        AI Risk Assessment & Recommendation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedApplicant.aiRecommendation}</p>
                    </CardContent>
                  </Card>

                  {/* Documents */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Submitted Documents ({selectedApplicant.documents.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedApplicant.documents.map((document) => (
                          <div
                            key={document.id}
                            className="flex items-center justify-between p-3 rounded-lg border bg-card/30"
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(document.status)}
                              <div>
                                <div className="font-medium">
                                  {document.documentType.replace('_', ' ').toUpperCase()}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Uploaded: {formatDate(document.uploadedAt)}
                                </div>
                                {document.isAuthentic !== null && (
                                  <div className="flex items-center gap-2 text-sm">
                                    {document.isAuthentic ? (
                                      <Badge variant="default" className="text-xs">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Authentic ({document.confidenceScore}%)
                                      </Badge>
                                    ) : (
                                      <Badge variant="destructive" className="text-xs">
                                        <XCircle className="h-3 w-3 mr-1" />
                                        Suspicious ({document.confidenceScore}%)
                                      </Badge>
                                    )}
                                  </div>
                                )}
                                {document.reviewNotes && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Note: {document.reviewNotes}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Badge variant={getStatusBadgeVariant(document.status)}>
                                {document.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    Actions
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem onClick={() => console.log('View document:', document.id)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Document
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleAddRemark(document)}>
                                    <FileText className="h-4 w-4 mr-2" />
                                    Add Remark
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleApproveDocument(document.id)}>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleRejectDocument(document.id)}
                                    className="text-destructive"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Remark Modal */}
          <Dialog open={isRemarkModalOpen} onOpenChange={setIsRemarkModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Review Remark</DialogTitle>
                <DialogDescription>
                  Add notes for document review or resubmission requirements
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="remark">Review Notes</Label>
                  <Textarea
                    id="remark"
                    placeholder="Enter your review notes or resubmission requirements..."
                    value={remarkText}
                    onChange={(e) => setRemarkText(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRemarkModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitRemark}>
                  Save Remark
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </TooltipProvider>
  )
}