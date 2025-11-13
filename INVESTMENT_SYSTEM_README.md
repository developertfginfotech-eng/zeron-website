# Investment System with Dynamic Configuration

## Overview
A complete investment platform with admin-configurable investment rules, dynamic calculations, and penalty management for early withdrawals.

## Features Implemented

### 1. Database Schema (`/shared/schema.ts`)

#### Investment Settings Table
Admin-configurable settings that control all investment rules:
- **Rental Yield Percentage**: Annual rental income rate (default: 8%)
- **Appreciation Rate Percentage**: Annual capital appreciation (default: 5%)
- **Maturity Period Years**: Years until investment matures (default: 3 years)
- **Investment Duration Years**: Total investment duration (default: 5 years)
- **Early Withdrawal Penalty**: Penalty for withdrawals before maturity (default: 15%)
- **Platform Fee**: Platform transaction fee (default: 2%)
- **Min/Max Investment Amount**: Investment limits
- **Active Status**: Toggle to activate/deactivate settings
- **Audit Trail**: Created by, updated by, timestamps

#### Enhanced Investments Table
Added fields to track investment lifecycle:
- **Maturity Date**: Calculated based on maturity period
- **Rental Yield Rate**: Snapshot of rate at investment time
- **Appreciation Rate**: Snapshot of appreciation at investment time
- **Penalty Rate**: Snapshot of penalty rate at investment time
- **Maturity Period Years**: Years to maturity for this investment
- **Investment Duration Years**: Total duration for this investment
- **Status**: active, sold, liquidated, withdrawn

### 2. Admin Settings Page (`/client/src/pages/settings.tsx`)

New "Investment Settings" section added with:
- Rental yield percentage configuration
- Appreciation rate configuration
- Maturity period setting (years)
- Investment duration setting (years)
- Early withdrawal penalty percentage
- Real-time investment example showing how settings apply
- Visual examples of calculations

#### Example Display:
```
Investment amount: SAR 10,000
Rental yield: 8% annually
Matures after: 3 years
Total duration: 5 years
Early withdrawal penalty: 15% if withdrawn before 3 years
At maturity: Investor gets appreciation capital + rental yield from 3 years
```

### 3. Backend API Endpoints (`/server/routes.ts`)

#### Investment Settings APIs
- `GET /api/investment-settings` - Get active investment settings
- `POST /api/investment-settings` - Create new investment settings
- `PUT /api/investment-settings/:id` - Update investment settings

#### Investment Operations APIs
- `GET /api/investments/investor/:investorId` - Get investor's investments
- `GET /api/investments/:id` - Get specific investment
- `POST /api/investments` - Create new investment (automatically applies current settings)
- `POST /api/investments/:id/withdraw` - Withdraw investment with penalty calculation
- `POST /api/investments/calculate` - Calculate investment returns

### 4. Investment Calculation Service (`/server/routes.ts`)

The `/api/investments/calculate` endpoint calculates:
- **Annual Rental Income**: `investmentAmount × (rentalYieldPercentage / 100)`
- **Total Rental Income**: `annualRentalIncome × maturityPeriodYears`
- **Appreciation Gain**: `investmentAmount × (1 + appreciationRate/100)^maturityYears - investmentAmount`
- **Total Returns at Maturity**: `totalRentalIncome + appreciationGain`
- **Total Value at Maturity**: `investmentAmount + totalReturnsAtMaturity`
- **Early Withdrawal Penalty**: `investmentAmount × (penaltyPercentage / 100)`

### 5. Early Withdrawal Logic (`/server/routes.ts`)

The `/api/investments/:id/withdraw` endpoint:
1. Checks if investment is active
2. Compares current date with maturity date
3. If before maturity:
   - Calculates penalty: `withdrawalAmount × (penaltyRate / 100)`
   - Deducts penalty from withdrawal amount
4. Updates investment status to "withdrawn"
5. Creates withdrawal transaction with penalty details
6. Returns complete withdrawal information

### 6. Investment Modal Updates (`/client/src/components/investment-modal.tsx`)

Enhanced investment modal showing:
- **Dynamic Investment Terms Section**:
  - Rental yield percentage
  - Appreciation rate
  - Maturity period (years)
  - Total investment duration
  - Early withdrawal penalty warning
- Real-time display of admin-configured values
- Professional UI with purple/indigo gradient design
- Icons for better visual hierarchy

### 7. Custom React Hooks (`/client/src/hooks/use-investment-settings.ts`)

Two hooks for data fetching:
- `useInvestmentSettings()` - Fetches active investment settings
- `useInvestmentCalculation(amount)` - Calculates returns for given amount

## Investment Flow Example

### Scenario: Investor invests SAR 10,000

1. **Admin configures settings** (in `/settings`):
   - Rental Yield: 8%
   - Appreciation: 5%
   - Maturity: 3 years
   - Penalty: 15%

2. **Investor makes investment** (via investment modal):
   - Invests SAR 10,000
   - System snapshots current settings
   - Maturity date set to 3 years from now

3. **Investment grows over time**:
   - **Annual rental yield**: SAR 800/year
   - **After 3 years rental**: SAR 2,400
   - **Property appreciation** (compound): ~SAR 1,576
   - **Total at maturity**: SAR 13,976

4. **Early withdrawal** (before 3 years):
   - Withdrawal request processed
   - Penalty calculated: SAR 1,500 (15% of 10,000)
   - Net withdrawal: SAR 8,500
   - Status updated to "withdrawn"

5. **Withdrawal after maturity**:
   - No penalty applied
   - Full amount with returns: SAR 13,976+
   - Status updated to "withdrawn"

## API Usage Examples

### Get Active Investment Settings
```bash
GET http://localhost:5000/api/investment-settings
```

Response:
```json
{
  "id": "uuid",
  "rentalYieldPercentage": "8.00",
  "appreciationRatePercentage": "5.00",
  "maturityPeriodYears": 3,
  "investmentDurationYears": 5,
  "earlyWithdrawalPenaltyPercentage": "15.00",
  "isActive": true,
  ...
}
```

### Calculate Investment Returns
```bash
POST http://localhost:5000/api/investments/calculate
Content-Type: application/json

{
  "investmentAmount": 10000
}
```

Response:
```json
{
  "investmentAmount": 10000,
  "settings": {
    "rentalYieldPercentage": 8,
    "appreciationRatePercentage": 5,
    "maturityPeriodYears": 3,
    "investmentDurationYears": 5,
    "earlyWithdrawalPenaltyPercentage": 15
  },
  "returns": {
    "annualRentalIncome": 800,
    "totalRentalIncome": 2400,
    "appreciationGain": 1576.25,
    "totalReturnsAtMaturity": 3976.25,
    "totalValueAtMaturity": 13976.25
  },
  "earlyWithdrawal": {
    "penaltyAmount": 1500,
    "amountAfterPenalty": 8500
  }
}
```

### Create Investment
```bash
POST http://localhost:5000/api/investments
Content-Type: application/json

{
  "investorId": "investor-uuid",
  "propertyId": "property-uuid",
  "investmentAmount": "10000.00",
  "ownershipPercentage": "5.00"
}
```

### Withdraw Investment
```bash
POST http://localhost:5000/api/investments/{id}/withdraw
```

Response includes:
- Updated investment with withdrawal status
- Transaction record
- Penalty amount (if applicable)
- Net withdrawal amount
- Whether it was early withdrawal

## Admin Controls

Admins can modify investment rules at any time through the Settings page:

1. Navigate to `/settings` in admin panel
2. Scroll to "Investment Settings" card
3. Modify any values:
   - Rental Yield %
   - Appreciation Rate %
   - Maturity Period
   - Investment Duration
   - Early Withdrawal Penalty %
4. Click "Save Changes"

**Note**: New investments will use the updated settings. Existing investments retain their original settings (snapshot at investment time).

## Key Design Decisions

1. **Settings Snapshot**: Each investment stores a snapshot of settings at creation time to ensure consistency
2. **Dynamic Calculation**: All calculations use the stored snapshot, not current settings
3. **Maturity Date**: Calculated at investment time: `investmentDate + maturityPeriodYears`
4. **Penalty Application**: Only applied if withdrawal occurs before maturity date
5. **Admin Flexibility**: Settings can be changed anytime, affecting only new investments

## Testing the System

1. **Start the server**: `npm run dev`
2. **Access admin panel**: Login and go to Settings
3. **Configure investment rules**: Set your desired percentages and periods
4. **Test investment flow**:
   - Go to properties page
   - Click "Invest" on a property
   - View the dynamic investment terms
   - Complete investment
5. **Test calculations**: Use the calculate endpoint with different amounts
6. **Test withdrawal**: Use the withdraw endpoint for investments

## Database Migration

To apply the schema changes:
```bash
npm run db:push
```

## Security Notes

- Investment settings should only be accessible by admins
- Withdrawal operations should verify investor ownership
- All financial calculations use decimal precision
- Audit trail tracks who created/updated settings

## Future Enhancements

- Multiple investment setting profiles (basic, premium, VIP)
- Property-specific investment rules override
- Automated dividend distribution scheduling
- Investment performance tracking and reporting
- Email notifications for maturity approaching
- Graduated penalty rates based on time held
