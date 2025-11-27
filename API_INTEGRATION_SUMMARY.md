# Complete API Integration Summary - Zeron Website

This document lists **all APIs that are actually integrated and used** in the website frontend, from start to end.

## 📋 Overview

**Base URL:** `http://localhost:5001/api` (development) or `https://zeron-backend-z5o1.onrender.com/api` (production)

**Authentication:** Bearer token stored in `localStorage` as `zaron_token`

---

## 🔐 Authentication APIs (✅ Fully Integrated)

### 1. **POST** `/api/auth/register`
- **Used in:** `components/auth-dialog.tsx`
- **Hook:** `registerMutation` 
- **Purpose:** User registration
- **Request:** `{ firstName, lastName, email, password, phone, preferredLanguage }`
- **Response:** User data + token

### 2. **POST** `/api/auth/login`
- **Used in:** `components/auth-dialog.tsx`
- **Hook:** `loginMutation`
- **Purpose:** User login
- **Request:** `{ email, password }`
- **Response:** User data + token (stored in localStorage)

---

## 👤 User Profile APIs (✅ Fully Integrated)

### 3. **GET** `/api/users/profile`
- **Used in:**
  - `hooks/use-user-profile.ts`
  - `hooks/use-kyc.ts` (after KYC upload)
  - `components/profile-completion-wizard.tsx`
  - `pages/kyc-verification.tsx`
- **Hook:** `useUserProfile()`
- **Purpose:** Get current user profile
- **Auth:** Required

### 4. **PUT** `/api/users/profile`
- **Used in:** Profile update flows
- **Purpose:** Update user profile
- **Auth:** Required

### 5. **POST** `/api/users/profile/complete`
- **Used in:** `components/profile-completion-wizard.tsx`
- **Purpose:** Save complete profile data from wizard
- **Auth:** Required

### 6. **GET** `/api/users/portfolio`
- **Used in:** `hooks/use-portfolio.ts`
- **Hook:** `usePortfolio()`
- **Purpose:** Get user's portfolio summary
- **Auth:** Required

---

## 🏢 Property APIs (✅ Fully Integrated)

### 7. **GET** `/api/admin/properties`
- **Used in:**
  - `pages/website/properties.tsx`
  - `pages/website/invest.tsx`
  - `pages/properties.tsx`
  - `hooks/use-properties.ts`
- **Hook:** `useProperties()`
- **Purpose:** Get all available properties
- **Query Params:** `page`, `limit`, `city`, `propertyType`, `minInvestment`, `maxInvestment`, `minYield`, `sort`
- **Auth:** Optional (public access)

### 8. **GET** `/api/properties/:id`
- **Used in:**
  - `hooks/use-properties.ts`
  - `components/investment-modal.tsx`
- **Hook:** `useProperty(propertyId)`
- **Purpose:** Get specific property details
- **Auth:** Required

### 9. **GET** `/api/properties/search`
- **Used in:** Property search functionality
- **Purpose:** Search properties with filters
- **Auth:** Not required

### 10. **POST** `/api/properties/:id/invest`
- **Used in:** Direct property investment flow
- **Purpose:** Invest in a specific property
- **Request:** `{ units, shares, paymentMethod }`
- **Auth:** Required

---

## 💰 Investment APIs (✅ Fully Integrated)

### 11. **GET** `/api/investments/my-investments`
- **Used in:** `hooks/use-investments.ts`
- **Hook:** `useMyInvestments()`
- **Purpose:** Get current user's investments
- **Auth:** Required

### 12. **POST** `/api/investments`
- **Used in:**
  - `hooks/use-investments.ts`
  - `hooks/use-investment.ts`
  - `components/investment-modal.tsx`
- **Hook:** `useInvest()`
- **Purpose:** Create new investment
- **Request:** `{ propertyId, shares, amount, investmentType }`
- **Auth:** Required

### 13. **GET** `/api/investments/settings`
- **Used in:**
  - `hooks/use-investments.ts`
  - `hooks/use-investment-settings.ts`
- **Hook:** `useInvestmentSettings()`
- **Purpose:** Get active investment settings (rental yield, appreciation, etc.)
- **Auth:** Not required (public)

### 14. **POST** `/api/investments/calculate`
- **Used in:**
  - `hooks/use-investments.ts`
  - `hooks/use-investment-settings.ts`
  - `components/investment-calculator.tsx`
- **Hook:** `useCalculateReturns(investmentAmount)`
- **Purpose:** Calculate projected returns for investment amount
- **Request:** `{ investmentAmount }`
- **Auth:** Not required

### 15. **POST** `/api/investments/:id/bond-break-withdraw`
- **Used in:**
  - `hooks/use-investments.ts`
  - `pages/investor/dashboard.tsx`
- **Hook:** `useWithdrawInvestment()`
- **Purpose:** Withdraw investment (bond break or after maturity)
- **Auth:** Required

---

## 💳 Wallet APIs (✅ Fully Integrated)

### 16. **GET** `/api/wallet/balance`
- **Used in:** `hooks/use-wallet.ts`
- **Hook:** `useWalletBalance()`
- **Purpose:** Get current wallet balance
- **Auth:** Required

### 17. **GET** `/api/wallet/transactions`
- **Used in:** `hooks/use-wallet.ts`
- **Hook:** `useWalletTransactions()`
- **Purpose:** Get wallet transaction history
- **Query Params:** `limit`, `skip`, `type`
- **Auth:** Required

### 18. **POST** `/api/wallet/recharge`
- **Used in:**
  - `hooks/use-wallet.ts`
  - `pages/investor/wallet.tsx`
- **Hook:** `useRechargeWallet()`
- **Purpose:** Recharge wallet with funds
- **Request:** `{ amount, method, description }`
- **Auth:** Required

### 19. **POST** `/api/wallet/withdraw`
- **Used in:**
  - `pages/investor/wallet.tsx`
- **Purpose:** Withdraw funds from wallet
- **Request:** `{ amount, accountDetails, description }`
- **Auth:** Required

---

## 📄 KYC APIs (✅ Fully Integrated)

### 20. **GET** `/api/kyc`
- **Used in:**
  - `hooks/use-kyc.ts`
  - `pages/kyc-verification.tsx`
- **Hook:** `useKYC()`, `useKYCStatus()`
- **Purpose:** Get user's KYC data and status
- **Auth:** Required

### 21. **POST** `/api/kyc/upload`
- **Used in:** `hooks/use-kyc.ts`
- **Hook:** `useUploadDocuments()`
- **Purpose:** Upload KYC documents (multipart/form-data)
- **Request:** FormData with files (`nationalId`, `selfie`, `proofOfIncome`, `addressProof`)
- **Auth:** Required

### 22. **GET** `/api/kyc/admin/all`
- **Used in:** `hooks/use-kyc.ts`
- **Hook:** `useAllKYCData(page, limit, status, search)`
- **Purpose:** Get all KYC submissions (admin only)
- **Query Params:** `page`, `limit`, `status`, `search`
- **Auth:** Required (admin)

### 23. **POST** `/api/kyc/submit`
- **Used in:** `hooks/use-kyc.ts`
- **Hook:** `useSubmitKYC()`
- **Purpose:** Submit KYC application
- **Request:** KYC data object
- **Auth:** Required

---

## 🔧 Admin APIs (⚠️ Partially Integrated)

### 24. **GET** `/api/admin/properties`
- **Used in:** Same as property APIs (public access)
- **Purpose:** Get properties (admin endpoint but used publicly)

### 25. **GET** `/api/admin/roles`
- **Used in:** `pages/admin.tsx`
- **Purpose:** Get all roles (RBAC)
- **Auth:** Required (super_admin)

### 26. **GET** `/api/admin/groups`
- **Used in:** `pages/admin.tsx`
- **Purpose:** Get all groups (RBAC)
- **Auth:** Required (admin)

### 27. **GET** `/api/admin/rbac/users`
- **Used in:** `pages/admin.tsx`
- **Purpose:** Get all users with RBAC info
- **Auth:** Required (super_admin)

### 28. **POST** `/api/admin/roles`
- **Used in:** `pages/admin.tsx`
- **Purpose:** Create new role
- **Auth:** Required (super_admin)

### 29. **POST** `/api/admin/groups`
- **Used in:** `pages/admin.tsx`
- **Purpose:** Create new group
- **Auth:** Required (admin)

### 30. **POST** `/api/admin/users/:id/assign-role`
- **Used in:** `pages/admin.tsx`
- **Purpose:** Assign role to user
- **Auth:** Required (super_admin)

### 31. **POST** `/api/admin/groups/:id/add-member`
- **Used in:** `pages/admin.tsx`
- **Purpose:** Add user to group
- **Auth:** Required (admin)

### 32. **GET** `/api/admin/roles/:id`
- **Used in:** `pages/admin.tsx`
- **Purpose:** Get role details
- **Auth:** Required (super_admin)

### 33. **GET** `/api/admin/groups/:id`
- **Used in:** `pages/admin.tsx`
- **Purpose:** Get group details
- **Auth:** Required (admin)

### 34. **POST** `/api/admin/rbac/initialize`
- **Used in:** `pages/admin.tsx`
- **Purpose:** Initialize default RBAC roles
- **Auth:** Required (super_admin)

---

## 📊 API Usage by Feature/Page

### Authentication Flow
1. `/api/auth/register` - User registration
2. `/api/auth/login` - User login

### User Dashboard Flow
1. `/api/users/profile` - Get user profile
2. `/api/users/portfolio` - Get portfolio summary
3. `/api/investments/my-investments` - Get user investments
4. `/api/wallet/balance` - Get wallet balance
5. `/api/wallet/transactions` - Get transaction history

### Property Browsing Flow
1. `/api/admin/properties` - List all properties
2. `/api/properties/:id` - Get property details
3. `/api/investments/settings` - Get investment settings
4. `/api/investments/calculate` - Calculate returns

### Investment Flow
1. `/api/investments/calculate` - Calculate returns (calculator)
2. `/api/investments` - Create investment
3. `/api/wallet/balance` - Check wallet balance
4. `/api/investments/my-investments` - Refresh investments list
5. `/api/users/portfolio` - Refresh portfolio

### Investment Withdrawal Flow
1. `/api/investments/my-investments` - Get investments
2. `/api/investments/:id/bond-break-withdraw` - Withdraw investment
3. `/api/wallet/balance` - Refresh wallet balance

### Wallet Management Flow
1. `/api/wallet/balance` - Get balance
2. `/api/wallet/recharge` - Recharge wallet
3. `/api/wallet/withdraw` - Withdraw funds
4. `/api/wallet/transactions` - View transaction history

### KYC Verification Flow
1. `/api/kyc` - Get KYC status
2. `/api/users/profile` - Get user profile
3. `/api/kyc/upload` - Upload documents
4. `/api/kyc/submit` - Submit KYC application
5. `/api/users/profile` - Refresh profile after submission

### Profile Management Flow
1. `/api/users/profile` - Get profile
2. `/api/users/profile/complete` - Complete profile wizard
3. `/api/users/profile` - Update profile

---

## 📈 Integration Statistics

**Total APIs Integrated:** 34

### By Category:
- **Authentication:** 2 APIs ✅
- **User Profile:** 4 APIs ✅
- **Properties:** 4 APIs ✅
- **Investments:** 5 APIs ✅
- **Wallet:** 4 APIs ✅
- **KYC:** 4 APIs ✅
- **Admin/RBAC:** 11 APIs ⚠️ (partially used)

### By HTTP Method:
- **GET:** 17 APIs
- **POST:** 16 APIs
- **PUT:** 1 API

### Authentication Status:
- **Public (No Auth):** 3 APIs
- **Authenticated Required:** 31 APIs
- **Admin Required:** 11 APIs

---

## 🔍 Integration Details

### API Client Implementation
- **Location:** `lib/api-client.ts`
- **Class:** `ApiClient`
- **Methods:** `get()`, `post()`, `put()`, `delete()`
- **Auth Header:** Automatically includes `Authorization: Bearer {token}`

### React Query Integration
Most APIs are wrapped in React Query hooks for:
- Caching
- Automatic refetching
- Loading states
- Error handling
- Query invalidation

### Direct Fetch Usage
Some components use direct `fetch()` calls for:
- File uploads (KYC documents)
- Special cases requiring custom headers
- Admin pages with custom logic

---

## ✅ APIs NOT Currently Used in Website

These backend APIs exist but are **not integrated** in the website:

1. `/api/auth/forgot-password` - Password reset flow
2. `/api/auth/reset-password` - Password reset confirmation
3. `/api/auth/verify-reset-otp` - OTP verification
4. `/api/properties/search` - Advanced property search
5. `/api/admin/dashboard` - Admin dashboard data
6. `/api/admin/analytics` - Admin analytics
7. `/api/admin/reports/earnings` - Earnings reports
8. `/api/admin/investors` - Investor management
9. `/api/admin/users` - User management (CRUD)
10. `/api/admin/properties` (POST/PUT/DELETE) - Property management
11. `/api/users/:id/portfolio` - Other user's portfolio (admin)
12. `/api/users/:id/kyc-status` - Other user's KYC status (admin)

---

## 🎯 Integration Status Summary

| Category | Total Backend APIs | Integrated in Website | Integration % |
|----------|-------------------|---------------------|---------------|
| Authentication | 5 | 2 | 40% |
| User Profile | 6 | 4 | 67% |
| Properties | 4 | 4 | 100% |
| Investments | 5 | 5 | 100% |
| Wallet | 4 | 4 | 100% |
| KYC | 4 | 4 | 100% |
| Admin | 20+ | 11 | ~55% |
| **TOTAL** | **48+** | **34** | **~71%** |

---

## 📝 Notes

1. **Token Storage:** All authentication tokens are stored in `localStorage` as `zaron_token`
2. **User Data:** User data stored in `localStorage` as `zaron_user`
3. **Error Handling:** Standardized error handling via `apiClient` class
4. **Query Invalidation:** React Query automatically invalidates related queries on mutations
5. **Rate Limiting:** Backend implements rate limiting (handled transparently)
6. **File Uploads:** KYC document uploads use `FormData` with multipart/form-data
7. **Real-time Updates:** Investment returns calculated in real-time based on holding period

---

**Last Updated:** January 2025  
**Website Version:** 1.0.0  
**Backend Version:** 1.0.0


