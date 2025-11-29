import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-client"
import { Calculator, TrendingUp, Clock, DollarSign, Package } from "lucide-react"

interface InvestmentCalculatorProps {
  pricePerShare: number
  availableShares: number
  minShares?: number
  propertyId?: string
  lockingPeriodYears?: number
  graduatedPenalties?: Array<{ year: number; penaltyPercentage: number }>
  onCalculate?: (shares: number, totalAmount: number, results: any) => void
}

export function InvestmentCalculator({
  pricePerShare,
  availableShares,
  minShares = 1,
  propertyId,
  lockingPeriodYears = 5,
  graduatedPenalties = [],
  onCalculate
}: InvestmentCalculatorProps) {
  const [shares, setShares] = useState(minShares.toString())
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateReturns = async () => {
    const numShares = parseInt(shares)

    if (isNaN(numShares) || numShares < minShares) {
      setError(`Minimum ${minShares} unit(s) required`)
      return
    }

    if (numShares > availableShares) {
      setError(`Only ${availableShares} units available`)
      return
    }

    const investmentAmount = numShares * pricePerShare

    setError(null)
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.CALCULATE_RETURNS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          investmentAmount,
          propertyId,
          lockingPeriodYears,
          graduatedPenalties
        })
      })

      const data = await response.json()

      if (data.success) {
        setResults({ ...data, shares: numShares, pricePerShare })
        onCalculate?.(numShares, investmentAmount, data)
      } else {
        setError(data.message || 'Failed to calculate returns')
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again.')
      console.error('Calculation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculateReturns()
    }
  }

  const totalInvestment = parseInt(shares) * pricePerShare

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Investment Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Price Info */}
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Price per Unit</span>
          </div>
          <span className="text-sm font-bold">SAR {pricePerShare.toLocaleString()}</span>
        </div>

        {/* Input Section */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Number of Units</label>
          <div className="flex gap-2">
            <Input
              type="number"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Available: ${availableShares}`}
              className="flex-1"
              min={minShares}
              max={availableShares}
              step={1}
            />
            <Button
              onClick={calculateReturns}
              disabled={loading || parseInt(shares) <= 0}
              className="min-w-[120px]"
            >
              {loading ? 'Calculating...' : 'Calculate'}
            </Button>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{availableShares} units available</span>
            <span className="font-semibold text-foreground">
              Total: SAR {(isNaN(totalInvestment) ? 0 : totalInvestment).toLocaleString()}
            </span>
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* Results Section */}
        {results && (
          <div className="space-y-3 pt-4 border-t">
            {/* Purchase Summary */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Purchasing</p>
                  <p className="text-lg font-bold text-indigo-600">{results.shares} Units</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">@ SAR {results.pricePerShare.toLocaleString()}/unit</p>
                  <p className="text-lg font-bold">SAR {results.investmentAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Annual Income */}
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Annual Income</p>
                    <p className="text-lg font-bold text-green-600">
                      SAR {results.returns.annualRentalIncome.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Locking Period Value */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">After {results.settings.lockingPeriodYears} Years</p>
                    <p className="text-lg font-bold text-blue-600">
                      SAR {results.returns.lockingPeriod.projectedValue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* At Maturity */}
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Returns</p>
                    <p className="text-lg font-bold text-purple-600">
                      SAR {results.returns.atMaturity.totalReturns.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Final Value */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Final Value</p>
                    <p className="text-lg font-bold text-indigo-600">
                      SAR {results.returns.atMaturity.projectedValue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-muted/50 p-3 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Investment:</span>
                <span className="font-medium">SAR {results.investmentAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rental Yield ({results.settings.rentalYieldPercentage}%):</span>
                <span className="font-medium text-green-600">+SAR {results.returns.atMaturity.rentalYield.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Appreciation ({results.settings.appreciationRatePercentage}%):</span>
                <span className="font-medium text-blue-600">+SAR {results.returns.atMaturity.appreciation.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-semibold">Total Value:</span>
                <span className="font-bold text-lg">SAR {results.returns.atMaturity.projectedValue.toLocaleString()}</span>
              </div>
            </div>

            {/* Early Withdrawal Warning */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg">
              <p className="text-xs font-semibold text-red-900 dark:text-red-100">⚠️ Early Withdrawal Penalty</p>
              <p className="text-xs text-red-800 dark:text-red-200 mt-1">
                {results.earlyWithdrawal.penaltyPercentage}% penalty if withdrawn before {results.earlyWithdrawal.lockingPeriodYears} years
                (You'd receive: SAR {results.earlyWithdrawal.amountAfterPenalty.toLocaleString()})
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
