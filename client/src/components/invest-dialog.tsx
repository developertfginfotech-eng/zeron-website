import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCreateInvestment } from '@/hooks/use-investment';
import { useWalletBalance } from '@/hooks/use-wallet';
import { Loader2, AlertCircle } from 'lucide-react';

interface InvestDialogProps {
  propertyId: string;
  propertyName: string;
  minInvestment: number;
  isOpen: boolean;
  onClose: () => void;
}

export function InvestDialog({
  propertyId,
  propertyName,
  minInvestment,
  isOpen,
  onClose,
}: InvestDialogProps) {
  const [amount, setAmount] = useState<number>(minInvestment);
  const { mutate: invest, isPending } = useCreateInvestment();
  const { data: walletBalance } = useWalletBalance();

  const insufficientFunds = (walletBalance?.availableBalance || 0) < amount;
  const belowMinimum = amount < minInvestment;

  const handleInvest = () => {
    if (insufficientFunds) {
      alert('Insufficient funds in your wallet. Please recharge your wallet.');
      return;
    }
    if (belowMinimum) {
      alert(`Minimum investment amount is SAR ${minInvestment}`);
      return;
    }

    invest(
      { propertyId, amount },
      {
        onSuccess: (response) => {
          if (response.data) {
            alert(
              `Investment successful! Investment ID: ${response.data.investmentId}\nAmount: SAR ${response.data.amount}`
            );
            setAmount(minInvestment);
            onClose();
          }
        },
        onError: (error: any) => {
          alert(`Investment failed: ${error.message}`);
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg max-w-md w-full space-y-4 p-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Invest in {propertyName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Enter the amount you want to invest
          </p>
        </div>

        {/* Wallet Balance Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-600 dark:text-blue-300">Available Wallet Balance</p>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            SAR {(walletBalance?.availableBalance || 0).toLocaleString()}
          </p>
        </div>

        {/* Investment Details */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Investment Amount (SAR)
            </label>
            <Input
              type="number"
              min={minInvestment}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              disabled={isPending}
              className="w-full text-lg"
              placeholder={`Minimum: SAR ${minInvestment}`}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Minimum investment: SAR {minInvestment.toLocaleString()}
            </p>
          </div>

          {/* Error Messages */}
          {belowMinimum && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Amount must be at least SAR {minInvestment.toLocaleString()}
              </p>
            </div>
          )}

          {insufficientFunds && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <p className="text-sm text-red-700 dark:text-red-300">
                Insufficient funds. Please recharge your wallet.
              </p>
            </div>
          )}

          {/* Investment Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Investment Amount</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                SAR {amount.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Remaining Balance</span>
              <span className={`font-semibold ${
                (walletBalance?.availableBalance || 0) - amount >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                SAR {((walletBalance?.availableBalance || 0) - amount).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleInvest}
            disabled={isPending || insufficientFunds || belowMinimum}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              `Invest SAR ${amount.toLocaleString()}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
