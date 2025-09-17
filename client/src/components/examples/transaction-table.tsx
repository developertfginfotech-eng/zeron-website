import { TransactionTable } from '../transaction-table'
import { Transaction } from '@shared/schema'

// todo: remove mock functionality
const mockTransactions: Transaction[] = [
  {
    id: '1',
    investorId: 'investor-1',
    propertyId: 'property-1',
    type: 'investment',
    amount: '50000',
    status: 'pending',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    investorId: 'investor-2',
    propertyId: 'property-2',
    type: 'payout',
    amount: '5250',
    status: 'completed',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    investorId: 'investor-1',
    propertyId: null,
    type: 'withdrawal',
    amount: '15000',
    status: 'pending',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    investorId: 'investor-3',
    propertyId: 'property-1',
    type: 'investment',
    amount: '75000',
    status: 'rejected',
    createdAt: new Date('2024-02-05'),
  },
]

export default function TransactionTableExample() {
  const handleApprove = (transactionId: string) => {
    console.log('Approved transaction:', transactionId)
  }

  const handleReject = (transactionId: string) => {
    console.log('Rejected transaction:', transactionId)
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Transaction Management</h3>
      <TransactionTable
        transactions={mockTransactions}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  )
}