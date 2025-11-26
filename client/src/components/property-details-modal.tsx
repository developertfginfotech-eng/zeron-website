import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, DollarSign, TrendingUp, Clock, X } from "lucide-react"
import { InvestmentCalculator } from "@/components/investment-calculator"

interface PropertyDetailsModalProps {
  isOpen: boolean
  property: any
  onClose: () => void
  onInvest: () => void
}

const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2UyZThmMCIvPjxwYXRoIGQ9Ik0xNTAgMTAwaDEwMHYxMDBIMTUweiIgZmlsbD0iIzk0YTNiOCIvPjxyZWN0IHg9IjE3MCIgeT0iMTIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM2NDc0OGIiLz48cmVjdCB4PSIyMTAiIHk9IjEyMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjNjQ3NDhiIi8+PHJlY3QgeD0iMTcwIiB5PSIxNjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzY0NzQ4YiIvPjxyZWN0IHg9IjIxMCIgeT0iMTYwIiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM2NDc0OGIiLz48dGV4dCB4PSIyMDAiIHk9IjEzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjQ3NDhiIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='

const BACKEND_BASE = 'https://zeron-backend-z5o1.onrender.com'

export function PropertyDetailsModal({
  isOpen,
  property,
  onClose,
  onInvest
}: PropertyDetailsModalProps) {
  if (!property) return null

  // Handle both backend property format and mapped property format
  const propertyTitle = property.title || property.name || 'Property'
  const propertyLocation = typeof property.location === 'string'
    ? property.location
    : `${property.location?.address || ''}, ${property.location?.city || ''}`

  // Extract image URL from backend format
  let imageUrl = PLACEHOLDER_IMAGE
  if (property.images && property.images[0]?.url) {
    imageUrl = `${BACKEND_BASE}${property.images[0].url}`
  } else if (property.image) {
    imageUrl = property.image
  }

  // Get property status
  const propertyStatus = property.status === 'fully_funded' ? 'Funded' :
                        property.status === 'active' ? 'Funding' :
                        property.status === 'upcoming' ? 'New' : 'Funded'

  // Get property type
  const propertyType = property.propertyType
    ? property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)
    : 'Property'

  // Get target return from financials
  const targetReturn = `${property.financials?.projectedYield || 0}%`
  const funded = property.fundingProgress != null ? Number(property.fundingProgress) : 0

  // Get share/unit information (all dynamic from admin)
  const pricePerShare = property.financials?.pricePerShare != null ? Number(property.financials.pricePerShare) : 0
  const availableShares = property.financials?.availableShares != null ? Number(property.financials.availableShares) : 0
  const totalShares = property.financials?.totalShares != null ? Number(property.financials.totalShares) : 0

  const investmentTerms = property.investmentTerms || {}

  // Determine if property uses specific terms or defaults
  const rentalYield = investmentTerms.rentalYieldRate != null ? Number(investmentTerms.rentalYieldRate) : 8
  const appreciation = investmentTerms.appreciationRate != null ? Number(investmentTerms.appreciationRate) : 3
  const lockingPeriod = investmentTerms.lockingPeriodYears != null ? Number(investmentTerms.lockingPeriodYears) : 5
  const penalty = investmentTerms.earlyWithdrawalPenaltyPercentage != null ? Number(investmentTerms.earlyWithdrawalPenaltyPercentage) : 5

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl">{propertyTitle}</DialogTitle>
              <DialogDescription className="flex items-center gap-1 mt-2">
                <MapPin className="w-4 h-4" />
                {propertyLocation}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Property Image */}
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={imageUrl}
              alt={propertyTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                if (e.currentTarget.dataset.errorHandled !== 'true') {
                  e.currentTarget.dataset.errorHandled = 'true'
                  e.currentTarget.src = PLACEHOLDER_IMAGE
                }
              }}
            />
          </div>

          {/* Property Type & Status */}
          <div className="flex items-center gap-2">
            <Badge variant="outline">{propertyType}</Badge>
            <Badge className={
              propertyStatus === 'Funded' ? 'bg-green-100 text-green-800' :
              propertyStatus === 'Funding' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }>
              {propertyStatus}
            </Badge>
          </div>

          {/* Basic Investment Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground mb-1">Target Return</p>
                <p className="text-lg font-bold text-green-600">{targetReturn}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground mb-1">Price per Unit</p>
                <p className="text-lg font-bold">SAR {pricePerShare.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground mb-1">Available Units</p>
                <p className="text-lg font-bold">{availableShares} / {totalShares}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground mb-1">Funded</p>
                <p className="text-lg font-bold">{funded.toFixed(1)}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Funding Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Funding Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, funded)}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {funded.toFixed(1)}% of funding goal reached
              </p>
            </CardContent>
          </Card>

          {/* Investment Terms - Property Specific */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Investment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Rental Yield</p>
                    <p className="text-lg font-semibold">{rentalYield}%</p>
                    <p className="text-xs text-muted-foreground">Annual income during locking period</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Appreciation Rate</p>
                    <p className="text-lg font-semibold">{appreciation}%</p>
                    <p className="text-xs text-muted-foreground">Annual growth after maturity</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Locking Period</p>
                    <p className="text-lg font-semibold">{lockingPeriod} Years</p>
                    <p className="text-xs text-muted-foreground">Minimum hold period</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Early Withdrawal Penalty</p>
                    <p className="text-lg font-semibold">{penalty}%</p>
                    <p className="text-xs text-muted-foreground">If withdrawn before maturity</p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <span className="font-semibold">How it works:</span> During the {lockingPeriod}-year locking period, you earn {rentalYield}% annual rental yield. After maturity, you get both rental yield + {appreciation}% appreciation gains. Early withdrawal incurs a {penalty}% penalty.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Investment Calculator */}
          <InvestmentCalculator
            pricePerShare={pricePerShare}
            availableShares={availableShares}
            minShares={1}
          />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button
              onClick={onInvest}
              disabled={propertyStatus === 'Funded'}
              className="flex-1"
            >
              {propertyStatus === 'Funded' ? 'Fully Funded' : 'Invest Now'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
