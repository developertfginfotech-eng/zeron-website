import { InvestorTable } from '../investor-table'
import { Investor } from '@shared/schema'

// todo: remove mock functionality
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
]

export default function InvestorTableExample() {
  const handleApproveKyc = (investorId: string) => {
    console.log('Approved KYC for investor:', investorId)
  }

  const handleRejectKyc = (investorId: string) => {
    console.log('Rejected KYC for investor:', investorId)
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Investor Management</h3>
      <InvestorTable
        investors={mockInvestors}
        onApproveKyc={handleApproveKyc}
        onRejectKyc={handleRejectKyc}
      />
    </div>
  )
}