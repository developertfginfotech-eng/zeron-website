import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRechargeWallet } from '@/hooks/use-wallet';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface RechargeWalletDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECHARGE_AMOUNTS = [1000, 5000, 10000, 25000, 50000, 100000];

export function RechargeWalletDialog({ isOpen, onClose }: RechargeWalletDialogProps) {
  const [amount, setAmount] = useState<number>(5000);
  const [method, setMethod] = useState<'bank_transfer' | 'card' | 'other'>('bank_transfer');
  const { mutate: recharge, isPending, isSuccess, error } = useRechargeWallet();

  const handleRecharge = () => {
    if (amount < 1000) {
      alert('Minimum recharge amount is SAR 1,000');
      return;
    }

    recharge(
      { amount, method },
      {
        onSuccess: (response) => {
          if (response.data) {
            alert(
              `Recharge initiated successfully!\nTransaction ID: ${response.data.transactionId}\nAmount: SAR ${response.data.amount}`
            );
            setTimeout(() => {
              setAmount(5000);
              onClose();
            }, 2000);
          }
        },
        onError: (error: any) => {
          alert(`Recharge failed: ${error.message}`);
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
            Recharge Wallet
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Add funds to your wallet quickly and securely
          </p>
        </div>

        {isSuccess && (
          <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="font-medium text-green-900 dark:text-green-100">Recharge Successful!</p>
              <p className="text-sm text-green-700 dark:text-green-300">Your wallet has been updated.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-700 dark:text-red-300">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
          </div>
        )}

        {!isSuccess && (
          <>
            {/* Quick Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quick Amount Selection
              </label>
              <div className="grid grid-cols-3 gap-2">
                {RECHARGE_AMOUNTS.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount)}
                    disabled={isPending}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                      amount === quickAmount
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    } disabled:opacity-50`}
                  >
                    {quickAmount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Custom Amount (SAR)
              </label>
              <Input
                type="number"
                min={1000}
                step={100}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                disabled={isPending}
                className="w-full text-lg"
                placeholder="Enter custom amount"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minimum: SAR 1,000 | No maximum limit
              </p>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Payment Method
              </label>
              <Select value={method} onValueChange={(value: any) => setMethod(value)} disabled={isPending}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="card">Credit/Debit Card</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Recharge Summary */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Amount to Recharge</span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  SAR {amount.toLocaleString()}
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                <span className="font-semibold text-gray-900 dark:text-white capitalize">
                  {method.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Bank Transfer Instructions */}
            {method === 'bank_transfer' && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100 mb-2">Bank Transfer Details:</p>
                <div className="space-y-1 text-blue-800 dark:text-blue-200">
                  <p><strong>Bank:</strong> Al Rajhi Bank</p>
                  <p><strong>Account:</strong> Zaron Investment</p>
                  <p><strong>IBAN:</strong> SA03 8000 0000 6080 1016 7519</p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isPending}
            className="flex-1"
          >
            {isSuccess ? 'Done' : 'Cancel'}
          </Button>
          {!isSuccess && (
            <Button
              onClick={handleRecharge}
              disabled={isPending || amount < 1000}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Recharge SAR ${amount.toLocaleString()}`
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
