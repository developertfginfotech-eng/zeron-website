import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Trash2 } from "lucide-react"
import { KycDocument } from "@shared/schema"
import { format } from "date-fns"

interface DocumentCardProps {
  document: KycDocument
  onView?: (id: string) => void
  onDownload?: (id: string) => void
  onDelete?: (id: string) => void
}

export function DocumentCard({ document, onView, onDownload, onDelete }: DocumentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    }
  }

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case "national_id":
        return "National ID"
      case "iqama":
        return "Iqama"
      case "passport":
        return "Passport"
      case "selfie":
        return "Selfie Photo"
      case "proof_of_income":
        return "Proof of Income"
      case "address_proof":
        return "Address Proof"
      case "employment_letter":
        return "Employment Letter"
      default:
        return type.replace('_', ' ').toUpperCase()
    }
  }

  const handleView = () => {
    console.log('View document triggered:', document.id)
    onView?.(document.id)
  }

  const handleDownload = () => {
    console.log('Download document triggered:', document.id)
    onDownload?.(document.id)
  }

  const handleDelete = () => {
    console.log('Delete document triggered:', document.id)
    onDelete?.(document.id)
  }

  return (
    <Card className="hover-elevate" data-testid={`card-document-${document.id}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm" data-testid={`text-type-${document.id}`}>
            {getDocumentTypeLabel(document.documentType)}
          </CardTitle>
        </div>
        <Badge 
          className={getStatusColor(document.status)}
          data-testid={`badge-status-${document.id}`}
        >
          {document.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-xs text-muted-foreground" data-testid={`text-date-${document.id}`}>
          Uploaded {format(new Date(document.uploadedAt!), 'MMM dd, yyyy')}
        </div>
        
        {document.reviewNotes && (
          <div className="text-xs text-muted-foreground bg-muted p-2 rounded" data-testid={`text-notes-${document.id}`}>
            <strong>Notes:</strong> {document.reviewNotes}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleView}
            data-testid={`button-view-${document.id}`}
            className="flex-1"
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            data-testid={`button-download-${document.id}`}
            className="flex-1"
          >
            <Download className="h-3 w-3 mr-1" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            data-testid={`button-delete-${document.id}`}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}