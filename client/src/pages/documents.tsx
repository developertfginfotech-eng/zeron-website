import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentCard } from "@/components/document-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Upload, Download } from "lucide-react"
import { KycDocument } from "@shared/schema"

export default function Documents() {
  // todo: remove mock functionality
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const mockDocuments: KycDocument[] = [
    {
      id: '1',
      investorId: 'investor-1',
      documentType: 'national_id',
      documentUrl: '/documents/national_id_001.pdf',
      status: 'approved',
      reviewNotes: null,
      uploadedAt: new Date('2024-01-10'),
    },
    {
      id: '2',
      investorId: 'investor-1',
      documentType: 'selfie',
      documentUrl: '/documents/selfie_001.jpg',
      status: 'pending',
      reviewNotes: null,
      uploadedAt: new Date('2024-01-12'),
    },
    {
      id: '3',
      investorId: 'investor-2',
      documentType: 'proof_of_income',
      documentUrl: '/documents/income_002.pdf',
      status: 'rejected',
      reviewNotes: 'Document is not clear enough. Please provide a higher quality scan.',
      uploadedAt: new Date('2024-01-08'),
    },
    {
      id: '4',
      investorId: 'investor-3',
      documentType: 'employment_letter',
      documentUrl: '/documents/employment_003.pdf',
      status: 'approved',
      reviewNotes: null,
      uploadedAt: new Date('2024-01-05'),
    },
    {
      id: '5',
      investorId: 'investor-4',
      documentType: 'passport',
      documentUrl: '/documents/passport_004.pdf',
      status: 'pending',
      reviewNotes: null,
      uploadedAt: new Date('2024-01-15'),
    },
    {
      id: '6',
      investorId: 'investor-2',
      documentType: 'address_proof',
      documentUrl: '/documents/address_002.pdf',
      status: 'approved',
      reviewNotes: null,
      uploadedAt: new Date('2024-01-18'),
    },
    {
      id: '7',
      investorId: 'investor-5',
      documentType: 'iqama',
      documentUrl: '/documents/iqama_005.pdf',
      status: 'pending',
      reviewNotes: null,
      uploadedAt: new Date('2024-01-20'),
    },
    {
      id: '8',
      investorId: 'investor-3',
      documentType: 'selfie',
      documentUrl: '/documents/selfie_003.jpg',
      status: 'rejected',
      reviewNotes: 'Photo quality is poor. Please take a clear selfie in good lighting.',
      uploadedAt: new Date('2024-01-22'),
    },
  ]

  const filteredDocuments = mockDocuments.filter(document => {
    const matchesType = typeFilter === "all" || document.documentType === typeFilter
    const matchesStatus = statusFilter === "all" || document.status === statusFilter
    return matchesType && matchesStatus
  })

  const handleView = (id: string) => {
    console.log('View document:', id)
    // In real app, this would open the document viewer
  }

  const handleDownload = (id: string) => {
    console.log('Download document:', id)
    // In real app, this would download the document
  }

  const handleDelete = (id: string) => {
    console.log('Delete document:', id)
    // In real app, this would delete the document
  }

  const handleBulkExport = () => {
    console.log('Bulk export documents triggered')
    // In real app, this would export all documents
  }

  return (
    <div className="p-6 space-y-6" data-testid="page-documents">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-documents-title">Document Management</h1>
          <p className="text-muted-foreground">Manage KYC documents and compliance files</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleBulkExport} data-testid="button-bulk-export">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button data-testid="button-upload-document">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card data-testid="card-total-documents">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDocuments.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all users
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-pending-documents">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockDocuments.filter(d => d.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-approved-documents">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockDocuments.filter(d => d.status === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully verified
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-rejected-documents">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockDocuments.filter(d => d.status === 'rejected').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Need resubmission
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Filter documents by type and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48" data-testid="select-type-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="national_id">National ID</SelectItem>
                <SelectItem value="iqama">Iqama</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="selfie">Selfie Photo</SelectItem>
                <SelectItem value="proof_of_income">Proof of Income</SelectItem>
                <SelectItem value="address_proof">Address Proof</SelectItem>
                <SelectItem value="employment_letter">Employment Letter</SelectItem>
              </SelectContent>
            </Select>
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            Documents ({filteredDocuments.length})
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline">
              {mockDocuments.filter(d => d.status === 'pending').length} Pending
            </Badge>
            <Badge variant="outline">
              {mockDocuments.filter(d => d.status === 'approved').length} Approved
            </Badge>
            <Badge variant="outline">
              {mockDocuments.filter(d => d.status === 'rejected').length} Rejected
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDocuments.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            onView={handleView}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No documents found matching your criteria</p>
            <Button variant="outline" onClick={() => {
              setTypeFilter("all")
              setStatusFilter("all")
            }} data-testid="button-clear-filters">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}