import { useState } from "react"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { Investor } from "@shared/schema"

interface InvestorTableProps {
  investors: Investor[]
  onApproveKyc?: (investorId: string) => void
  onRejectKyc?: (investorId: string) => void
}

export function InvestorTable({ investors, onApproveKyc, onRejectKyc }: InvestorTableProps) {
  const [processing, setProcessing] = useState<string | null>(null)

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    }
  }

  const getKycIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleApprove = async (investorId: string) => {
    setProcessing(investorId)
    console.log('Approve KYC triggered:', investorId)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    onApproveKyc?.(investorId)
    setProcessing(null)
  }

  const handleReject = async (investorId: string) => {
    setProcessing(investorId)
    console.log('Reject KYC triggered:', investorId)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    onRejectKyc?.(investorId)
    setProcessing(null)
  }

  return (
    <div className="rounded-md border" data-testid="table-investors">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Investor</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>KYC Status</TableHead>
            <TableHead>Total Invested</TableHead>
            <TableHead>Properties</TableHead>
            <TableHead>Monthly Income</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {investors.map((investor) => (
            <TableRow key={investor.id} data-testid={`row-investor-${investor.id}`}>
              <TableCell className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {investor.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium" data-testid={`text-name-${investor.id}`}>
                    {investor.name}
                  </div>
                  <div className="text-sm text-muted-foreground" data-testid={`text-nationality-${investor.id}`}>
                    {investor.nationality}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  <div data-testid={`text-email-${investor.id}`}>{investor.email}</div>
                  {investor.phone && (
                    <div className="text-muted-foreground" data-testid={`text-phone-${investor.id}`}>
                      {investor.phone}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  className={`${getKycStatusColor(investor.kycStatus)} flex items-center gap-1 w-fit`}
                  data-testid={`badge-kyc-${investor.id}`}
                >
                  {getKycIcon(investor.kycStatus)}
                  {investor.kycStatus}
                </Badge>
              </TableCell>
              <TableCell className="font-mono" data-testid={`text-invested-${investor.id}`}>
                SAR {Number(investor.totalInvested).toLocaleString()}
              </TableCell>
              <TableCell data-testid={`text-properties-${investor.id}`}>
                {investor.activeProperties}
              </TableCell>
              <TableCell className="font-mono" data-testid={`text-income-${investor.id}`}>
                SAR {Number(investor.monthlyIncome).toLocaleString()}
              </TableCell>
              <TableCell>
                {investor.kycStatus === "pending" && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => handleApprove(investor.id)}
                      disabled={processing === investor.id}
                      data-testid={`button-approve-${investor.id}`}
                    >
                      {processing === investor.id ? "..." : "Approve"}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleReject(investor.id)}
                      disabled={processing === investor.id}
                      data-testid={`button-reject-${investor.id}`}
                    >
                      {processing === investor.id ? "..." : "Reject"}
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