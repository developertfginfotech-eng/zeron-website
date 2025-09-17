import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Transaction } from "@shared/schema"
import { format } from "date-fns"

interface TransactionTableProps {
  transactions: Transaction[]
  onApprove?: (transactionId: string) => void
  onReject?: (transactionId: string) => void
}

export function TransactionTable({ transactions, onApprove, onReject }: TransactionTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "investment":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "payout":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "withdrawal":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleApprove = (transactionId: string) => {
    console.log('Approve transaction triggered:', transactionId)
    onApprove?.(transactionId)
  }

  const handleReject = (transactionId: string) => {
    console.log('Reject transaction triggered:', transactionId)
    onReject?.(transactionId)
  }

  return (
    <div className="rounded-md border" data-testid="table-transactions">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Investor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} data-testid={`row-transaction-${transaction.id}`}>
              <TableCell data-testid={`text-date-${transaction.id}`}>
                {format(new Date(transaction.createdAt!), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell>
                <Badge 
                  className={getTypeColor(transaction.type)}
                  data-testid={`badge-type-${transaction.id}`}
                >
                  {transaction.type}
                </Badge>
              </TableCell>
              <TableCell className="font-mono" data-testid={`text-amount-${transaction.id}`}>
                SAR {Number(transaction.amount).toLocaleString()}
              </TableCell>
              <TableCell data-testid={`text-property-${transaction.id}`}>
                {transaction.propertyId ? `Property ${transaction.propertyId.slice(0, 8)}...` : '-'}
              </TableCell>
              <TableCell data-testid={`text-investor-${transaction.id}`}>
                {transaction.investorId ? `User ${transaction.investorId.slice(0, 8)}...` : '-'}
              </TableCell>
              <TableCell>
                <Badge 
                  className={getStatusColor(transaction.status)}
                  data-testid={`badge-status-${transaction.id}`}
                >
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell>
                {transaction.status === "pending" && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => handleApprove(transaction.id)}
                      data-testid={`button-approve-${transaction.id}`}
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReject(transaction.id)}
                      data-testid={`button-reject-${transaction.id}`}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}