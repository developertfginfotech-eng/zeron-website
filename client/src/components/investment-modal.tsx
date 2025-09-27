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
  const [amount, setAmount] = useState<string>('');
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

  const calculateShares = (investmentAmount: number): number => {
    return Math.floor(investmentAmount / property.financials.minInvestment);
  };

  const calculateProjectedReturn = (investmentAmount: number): number => {
    return (investmentAmount * property.financials.projectedYield) / 100;
  };

  // Validation
  const isValidAmount = (value: string): boolean => {
    const numValue = parseFloat(value);
    return !isNaN(numValue) && numValue >= property.financials.minInvestment;
  };

  const handleAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const cleanValue = value.replace(/[^\d.]/g, '');
    setAmount(cleanValue);
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const handleInvestment = async () => {
    if (!isValidAmount(amount)) {
      toast({
        title: "Invalid Amount",
        description: `Minimum investment is ${formatCurrency(property.financials.minInvestment)}`,
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

      // Make investment API call
      const response = await fetch(`http://13.50.13.193:5000/api/properties/${property._id}/invest`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount)
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
          description: `You've successfully invested ${formatCurrency(parseFloat(amount))} in ${property.title}`,
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

  const investmentAmount = parseFloat(amount) || 0;
  const shares = calculateShares(investmentAmount);
  const projectedReturn = calculateProjectedReturn(investmentAmount);

  const handleClose = () => {
    setAmount('');
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
                    <span className="text-emerald-700 dark:text-emerald-300">Amount Invested:</span>
                    <span className="font-semibold">{formatCurrency(parseFloat(amount))}</span>
                  </div>
                  {investmentData && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-emerald-700 dark:text-emerald-300">Shares Acquired:</span>
                        <span className="font-semibold">{investmentData.shares}</span>
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

          {/* Investment Amount */}
          <div className="space-y-4">
            <Label htmlFor="amount" className="text-base font-semibold">
              Investment Amount (SAR)
            </Label>
            <div className="space-y-2">
              <Input
                id="amount"
                type="text"
                placeholder={`Minimum ${formatCurrency(property.financials.minInvestment)}`}
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="text-lg py-3"
              />
              {amount && !isValidAmount(amount) && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertTriangle className="w-4 h-4" />
                  Minimum investment is {formatCurrency(property.financials.minInvestment)}
                </div>
              )}
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[
                property.financials.minInvestment,
                property.financials.minInvestment * 2,
                property.financials.minInvestment * 5,
                property.financials.minInvestment * 10
              ].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAmount(quickAmount)}
                  className="text-xs"
                >
                  {formatCurrency(quickAmount)}
                </Button>
              ))}
            </div>
          </div>

          {/* Investment Summary */}
          {investmentAmount >= property.financials.minInvestment && (
            <div className="space-y-4 p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <h4 className="font-semibold text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Investment Summary
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400">Investment Amount</div>
                  <div className="font-bold text-lg">{formatCurrency(investmentAmount)}</div>
                </div>
                <div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400">Shares</div>
                  <div className="font-bold text-lg">{shares}</div>
                </div>
              </div>

              <div className="space-y-2">
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
                disabled={!isValidAmount(amount) || loading}
                className="bg-gradient-to-r from-emerald-600 to-blue-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4 mr-2" />
                    Invest {amount && isValidAmount(amount) ? formatCurrency(parseFloat(amount)) : 'Now'}
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