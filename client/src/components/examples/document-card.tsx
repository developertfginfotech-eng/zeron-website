import { DocumentCard } from '../document-card'
import { KycDocument } from '@shared/schema'

// todo: remove mock functionality
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
]

export default function DocumentCardExample() {
  const handleView = (id: string) => {
    console.log('View document:', id)
  }

  const handleDownload = (id: string) => {
    console.log('Download document:', id)
  }

  const handleDelete = (id: string) => {
    console.log('Delete document:', id)
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">KYC Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDocuments.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            onView={handleView}
            onDownload={handleDownload}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}