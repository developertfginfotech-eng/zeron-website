import { useEffect, useState } from 'react'
import { AlertCircle, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface WithdrawalRequest {
  _id: string
  amount: number
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed'
  requestedAt: string
  reviewedAt?: string
  rejectionReason?: string
  rejectionComment?: string
  propertyId: {
    title: string
  }
}

interface WithdrawalStatusCardProps {
  withdrawalId?: string
  onWithdrawalUpdate?: () => void
}

export function WithdrawalStatusCard({ withdrawalId, onWithdrawalUpdate }: WithdrawalStatusCardProps) {
  const [withdrawal, setWithdrawal] = useState<WithdrawalRequest | null>(null)
  const [loading, setLoading] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (withdrawalId) {
      fetchWithdrawalStatus()
      // Poll for updates every 30 seconds
      const interval = setInterval(fetchWithdrawalStatus, 30000)
      return () => clearInterval(interval)
    }
  }, [withdrawalId])

  const fetchWithdrawalStatus = async () => {
    if (!withdrawalId) return
    try {
      setLoading(true)
      const token = localStorage.getItem('authToken') || localStorage.getItem('zaron_token')
      const response = await fetch(`/api/admin/withdrawal-requests/${withdrawalId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.success || data.data) {
        setWithdrawal(data.data || data)
        if (data.data?.status === 'completed' && onWithdrawalUpdate) {
          onWithdrawalUpdate()
        }
      }
    } catch (error) {
      console.error('Error fetching withdrawal status:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!withdrawal) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 border-yellow-200'
      case 'approved':
        return 'bg-blue-50 border-blue-200'
      case 'completed':
        return 'bg-green-50 border-green-200'
      case 'rejected':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-blue-600" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return null
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Your withdrawal request is awaiting admin review'
      case 'approved':
        return 'Your withdrawal request has been approved'
      case 'completed':
        return 'Your withdrawal has been completed and credited to your wallet'
      case 'rejected':
        return 'Your withdrawal request was rejected'
      default:
        return ''
    }
  }

  return (
    <>
      <Card className={`border ${getStatusColor(withdrawal.status)}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon(withdrawal.status)}
              <div>
                <CardTitle className="text-lg">Withdrawal Request</CardTitle>
                <p className="text-sm text-gray-600 mt-1">{getStatusMessage(withdrawal.status)}</p>
              </div>
            </div>
            {loading && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Amount */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount Requested</span>
            <span className="font-semibold text-lg">SAR {withdrawal.amount.toLocaleString()}</span>
          </div>

          {/* Property */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Property</span>
            <span className="font-semibold">{withdrawal.propertyId.title}</span>
          </div>

          {/* Status Badge */}
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Status</span>
            <Badge className={
              withdrawal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              withdrawal.status === 'approved' ? 'bg-blue-100 text-blue-800' :
              withdrawal.status === 'completed' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }>
              {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
            </Badge>
          </div>

          {/* Timeline */}
          <div className="pt-2 border-t space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Requested</span>
              <span>{new Date(withdrawal.requestedAt).toLocaleDateString()}</span>
            </div>
            {withdrawal.reviewedAt && (
              <div className="flex justify-between">
                <span className="text-gray-600">Reviewed</span>
                <span>{new Date(withdrawal.reviewedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Rejection Info */}
          {withdrawal.status === 'rejected' && (
            <div className="p-3 bg-red-100 border border-red-300 rounded-lg mt-3">
              <p className="text-sm font-semibold text-red-800 mb-1">
                Reason: {withdrawal.rejectionReason}
              </p>
              {withdrawal.rejectionComment && (
                <p className="text-sm text-red-700">{withdrawal.rejectionComment}</p>
              )}
            </div>
          )}

          {/* Completed Info */}
          {withdrawal.status === 'completed' && (
            <div className="p-3 bg-green-100 border border-green-300 rounded-lg mt-3">
              <p className="text-sm font-semibold text-green-800">
                ✓ Amount has been credited to your wallet
              </p>
            </div>
          )}

          {/* Details Button */}
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={() => setShowDetails(true)}
          >
            View Full Details
          </Button>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdrawal Request Details</DialogTitle>
            <DialogDescription>
              Complete information about your withdrawal request
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Property</span>
                <span className="font-semibold">{withdrawal.propertyId.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold text-lg">SAR {withdrawal.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <Badge className={
                  withdrawal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  withdrawal.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                  withdrawal.status === 'completed' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }>
                  {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-2 text-sm">
              <p><span className="text-gray-600">Requested:</span> {new Date(withdrawal.requestedAt).toLocaleString()}</p>
              {withdrawal.reviewedAt && (
                <p><span className="text-gray-600">Reviewed:</span> {new Date(withdrawal.reviewedAt).toLocaleString()}</p>
              )}
            </div>

            {/* Status specific info */}
            {withdrawal.status === 'pending' && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex gap-2 items-start">
                  <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold">Awaiting Review</p>
                    <p>Your withdrawal request is being reviewed by our admin team. You'll be notified once it's approved or rejected.</p>
                  </div>
                </div>
              </div>
            )}

            {withdrawal.status === 'approved' && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex gap-2 items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold">Approved</p>
                    <p>Your request has been approved. Processing will complete shortly.</p>
                  </div>
                </div>
              </div>
            )}

            {withdrawal.status === 'completed' && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex gap-2 items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-800">
                    <p className="font-semibold">Completed</p>
                    <p>SAR {withdrawal.amount.toLocaleString()} has been credited to your wallet.</p>
                  </div>
                </div>
              </div>
            )}

            {withdrawal.status === 'rejected' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex gap-2 items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-800">
                    <p className="font-semibold">Rejected</p>
                    <p className="mt-1"><strong>Reason:</strong> {withdrawal.rejectionReason}</p>
                    {withdrawal.rejectionComment && (
                      <p className="mt-1">{withdrawal.rejectionComment}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
