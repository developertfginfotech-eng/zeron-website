import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Calculator,
  MapPin,
  Building2
} from "lucide-react"

interface BackendProperty {
  _id: string;
  title: string;
  description?: string;
  location: {
    city: string;
    address: string;
  };
  financials: {
    totalValue: number;
    minInvestment: number;
    projectedYield: number;
    pricePerShare: number;
    availableShares: number;
  };
  propertyType: 'residential' | 'commercial' | 'retail';
  status: 'active' | 'upcoming' | 'fully_funded' | 'completed' | 'cancelled' | 'closed';
  investorCount: number;
  fundingProgress: number;
}

interface InvestmentModalProps {
  property: BackendProperty | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function InvestmentModal({ property, isOpen, onClose, onSuccess }: InvestmentModalProps) {
  const [units, setUnits] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [investmentSuccess, setInvestmentSuccess] = useState(false);
  const [investmentData, setInvestmentData] = useState<any>(null);
  const { toast } = useToast();

  if (!property) return null;

  // Helper functions
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateTotalAmount = (numUnits: number): number => {
    return numUnits * (property.financials.pricePerShare || 0);
  };

  const calculateProjectedReturn = (totalAmount: number): number => {
    return (totalAmount * property.financials.projectedYield) / 100;
  };

  const getMinUnitsRequired = (): number => {
    const pricePerShare = property.financials.pricePerShare || 1;
    return Math.ceil(property.financials.minInvestment / pricePerShare);
  };

  // Validation
  const isValidUnits = (value: string): boolean => {
    const numValue = parseInt(value);
    const minUnits = getMinUnitsRequired();
    return !isNaN(numValue) && numValue >= minUnits && numValue <= (property.financials.availableShares || 0);
  };

  const handleUnitsChange = (value: string) => {
    // Only allow whole numbers
    const cleanValue = value.replace(/[^\d]/g, '');
    setUnits(cleanValue);
  };

  const handleQuickUnits = (value: number) => {
    setUnits(value.toString());
  };

  const handleInvestment = async () => {
    if (!isValidUnits(units)) {
      const minUnits = getMinUnitsRequired();
      toast({
        title: "Invalid Units",
        description: `Minimum ${minUnits} units required (${formatCurrency(property.financials.minInvestment)})`,
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Get auth token
      const userData = localStorage.getItem('zaron_user');
      const token = userData ? JSON.parse(userData).token : localStorage.getItem('zaron_token');

      if (!token) {
        throw new Error('Authentication required. Please login again.');
      }

      const numUnits = parseInt(units);
      const totalAmount = calculateTotalAmount(numUnits);

      // Make investment API call
      const response = await fetch(`http://13.50.13.193:5000/api/properties/${property._id}/invest`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          units: numUnits,
          shares: numUnits
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Investment failed');
      }

      if (result.success) {
        setInvestmentSuccess(true);
        setInvestmentData(result.data);

        toast({
          title: "Investment Successful! 🎉",
          description: `You've successfully purchased ${numUnits} units (${formatCurrency(totalAmount)}) in ${property.title}`,
          variant: "default"
        });

        onSuccess();
      } else {
        throw new Error(result.message || 'Investment failed');
      }

    } catch (error: any) {
      console.error('Investment error:', error);
      toast({
        title: "Investment Failed",
        description: error.message || 'Failed to process investment. Please try again.',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const numUnits = parseInt(units) || 0;
  const totalAmount = calculateTotalAmount(numUnits);
  const projectedReturn = calculateProjectedReturn(totalAmount);
  const minUnits = getMinUnitsRequired();

  const handleClose = () => {
    setUnits('');
    setInvestmentSuccess(false);
    setInvestmentData(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {investmentSuccess ? (
          // Success Confirmation Screen
          <>
            <DialogHeader className="space-y-3 text-center">
              <DialogTitle className="flex items-center justify-center gap-3 text-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                Investment Successful!
              </DialogTitle>
              <DialogDescription className="text-base">
                Your investment has been processed successfully
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Investment Summary */}
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-4 text-center">
                  Investment Confirmation
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-emerald-700 dark:text-emerald-300">Property:</span>
                    <span className="font-semibold">{property.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700 dark:text-emerald-300">Units Purchased:</span>
                    <span className="font-semibold">{investmentData?.unitsPurchased || units} Units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-700 dark:text-emerald-300">Amount Paid:</span>
                    <span className="font-semibold">{formatCurrency(investmentData?.totalAmountPaid || totalAmount)}</span>
                  </div>
                  {investmentData && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-emerald-700 dark:text-emerald-300">Price per Unit:</span>
                        <span className="font-semibold">{formatCurrency(investmentData.pricePerUnit || property.financials.pricePerShare)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-700 dark:text-emerald-300">Investment ID:</span>
                        <span className="font-semibold text-sm">{investmentData.investmentId}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Next Steps */}
              <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  What's Next?
                </h4>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Your investment is now active and earning returns
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    You'll receive regular updates on property performance
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Returns will be distributed according to the payment schedule
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    View your portfolio anytime in your dashboard
                  </li>
                </ul>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                onClick={handleClose}
                className="bg-gradient-to-r from-emerald-600 to-blue-600 w-full"
              >
                Continue Investing
              </Button>
            </DialogFooter>
          </>
        ) : (
          // Investment Form Screen
          <>
            <DialogHeader className="space-y-3">
              <DialogTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                Invest in {property.title}
              </DialogTitle>
              <DialogDescription className="text-base">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {property.location.address}, {property.location.city}
                </div>
              </DialogDescription>
            </DialogHeader>

        <div className="space-y-6">
          {/* Property Overview */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Property Type</div>
              <div className="font-semibold capitalize">{property.propertyType}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Expected Yield</div>
              <div className="font-semibold text-emerald-600">{property.financials.projectedYield}%</div>
            </div>
          </div>

          {/* Number of Units */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="units" className="text-base font-semibold">
                Number of Units
              </Label>
              <div className="text-sm text-muted-foreground">
                {formatCurrency(property.financials.pricePerShare)} per unit
              </div>
            </div>
            <div className="space-y-2">
              <Input
                id="units"
                type="text"
                placeholder={`Minimum ${minUnits} units`}
                value={units}
                onChange={(e) => handleUnitsChange(e.target.value)}
                className="text-lg py-3"
              />
              {units && !isValidUnits(units) && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertTriangle className="w-4 h-4" />
                  {parseInt(units) > property.financials.availableShares
                    ? `Only ${property.financials.availableShares} units available`
                    : `Minimum ${minUnits} units required (${formatCurrency(property.financials.minInvestment)})`
                  }
                </div>
              )}
              {units && isValidUnits(units) && (
                <div className="text-sm text-emerald-600">
                  Total: {formatCurrency(totalAmount)}
                </div>
              )}
            </div>

            {/* Quick Units Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[
                minUnits,
                minUnits * 2,
                minUnits * 5,
                minUnits * 10
              ].filter(u => u <= property.financials.availableShares).map((quickUnits) => (
                <Button
                  key={quickUnits}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickUnits(quickUnits)}
                  className="text-xs"
                >
                  {quickUnits} units
                </Button>
              ))}
            </div>

            {/* Available units info */}
            <div className="text-sm text-muted-foreground text-center">
              {property.financials.availableShares} units available
            </div>
          </div>

          {/* Investment Summary */}
          {numUnits >= minUnits && (
            <div className="space-y-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Investment Summary
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400">Units to Purchase</div>
                  <div className="font-bold text-lg">{numUnits} Units</div>
                </div>
                <div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400">Total Amount</div>
                  <div className="font-bold text-lg">{formatCurrency(totalAmount)}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-emerald-600 dark:text-emerald-400">Price per Unit</span>
                  <span className="font-semibold">{formatCurrency(property.financials.pricePerShare)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-emerald-600 dark:text-emerald-400">Projected Annual Return</span>
                  <span className="font-semibold">{formatCurrency(projectedReturn)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-emerald-600 dark:text-emerald-400">Expected Yield</span>
                  <span className="font-semibold">{property.financials.projectedYield}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Important Information */}
          <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Important Information
            </h4>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Your investment is Shariah-compliant and regulated
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                Returns are projected based on market analysis
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                All investments carry risk and are not guaranteed
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                You can track your investment in your portfolio
              </li>
            </ul>
          </div>
        </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                onClick={handleInvestment}
                disabled={!isValidUnits(units) || loading}
                className="bg-gradient-to-r from-emerald-600 to-blue-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Building2 className="w-4 h-4 mr-2" />
                    Purchase {units && isValidUnits(units) ? `${numUnits} Units` : 'Now'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}