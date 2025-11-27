# Zeron Website API Integration Documentation

This document describes all backend APIs integrated in the Zeron website frontend.

## Table of Contents

- [Base Configuration](#base-configuration)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Authentication APIs](#authentication-apis)
  - [User Profile APIs](#user-profile-apis)
  - [Property APIs](#property-apis)
  - [Investment APIs](#investment-apis)
  - [Wallet APIs](#wallet-apis)
  - [KYC APIs](#kyc-apis)
  - [Portfolio APIs](#portfolio-apis)
- [Error Handling](#error-handling)
- [Request/Response Formats](#requestresponse-formats)

---

## Base Configuration

### API Base URL

```typescript
// Development
const API_BASE_URL = 'http://localhost:5001/api';

// Production (via environment variable)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

### Authentication Token Storage

The website stores authentication tokens in `localStorage` using the key `zaron_token`:

```typescript
// Token retrieval
localStorage.getItem('zaron_token');

// User data storage
localStorage.getItem('zaron_user');
```

### Default Headers

All authenticated requests include:
```javascript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {token}'
}
```

---

## Authentication

Most endpoints require authentication. The website automatically includes the Bearer token from localStorage in all API requests.

**Authentication Flow:**
1. User logs in via `/api/auth/login`
2. Token is stored in `localStorage` as `zaron_token`
3. Token is automatically included in subsequent requests via `Authorization: Bearer {token}` header
4. On 401 errors, user is redirected to login

---

## API Endpoints

### Authentication APIs

#### 1. Register User

**Endpoint:** `POST /api/auth/register`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "phone": "+966501234567",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "userId",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token_here"
  }
}
```

**Validation Rules:**
- Email: Must be valid email format
- Phone: Must match Saudi phone number format `(/^(\+966|966|0)?[5-9]\d{8}$/)`
- Password: Min 8 characters, must contain uppercase, lowercase, number, and special character
- First Name: 2-50 characters
- Last Name: 2-50 characters

**Rate Limit:** 100 requests per hour

---

#### 2. Login

**Endpoint:** `POST /api/auth/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "userId",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "kycStatus": "pending"
    },
    "token": "jwt_token_here"
  }
}
```

**Rate Limit:** 50 requests per 15 minutes

---

#### 3. Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to email"
}
```

**Rate Limit:** 5 requests per 15 minutes

---

#### 4. Reset Password

**Endpoint:** `POST /api/auth/reset-password`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "NewSecurePass123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

**Rate Limit:** 5 requests per 15 minutes

---

#### 5. Verify Reset OTP

**Endpoint:** `POST /api/auth/verify-reset-otp`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified"
}
```

---

### User Profile APIs

#### 6. Get User Profile

**Endpoint:** `GET /api/users/profile`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "userId",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+966501234567",
    "role": "user",
    "kycStatus": "approved",
    "status": "active",
    "address": {
      "street": "123 Main St",
      "city": "Riyadh",
      "country": "Saudi Arabia"
    },
    "preferences": {
      "language": "en",
      "notifications": {
        "email": true,
        "push": true
      }
    },
    "wallet": {
      "balance": 50000.00,
      "totalInvested": 100000.00,
      "totalReturns": 5000.00
    },
    "investmentSummary": {
      "totalInvested": 100000.00,
      "propertyCount": 3,
      "lastInvestmentDate": "2025-01-15T10:00:00Z"
    }
  }
}
```

---

#### 7. Update User Profile

**Endpoint:** `PUT /api/users/profile`

**Authentication:** Required

**Request Body:** (All fields optional)
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+966501234567",
  "address": {
    "street": "123 Main St",
    "city": "Riyadh",
    "country": "Saudi Arabia"
  },
  "preferences": {
    "language": "en",
    "notifications": {
      "email": true,
      "push": true
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    // Updated user object
  }
}
```

---

#### 8. Complete Profile (Wizard)

**Endpoint:** `POST /api/users/profile/complete`

**Authentication:** Required

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+966501234567",
  "dateOfBirth": "1990-01-01",
  "nationality": "SA",
  "address": {
    "street": "123 Main St",
    "city": "Riyadh",
    "country": "Saudi Arabia"
  },
  "preferences": {
    "language": "en",
    "notifications": {
      "email": true,
      "push": true
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile completed successfully",
  "data": {
    // Complete user object
  }
}
```

---

### Property APIs

#### 9. Get All Properties

**Endpoint:** `GET /api/admin/properties`

**Authentication:** Optional (for public access)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)
- `city` (optional): Filter by city (`riyadh`, `jeddah`, `dammam`, `khobar`, `mecca`, `medina`)
- `propertyType` (optional): Filter by type (`residential`, `commercial`, `retail`)
- `minInvestment` (optional): Minimum investment amount
- `maxInvestment` (optional): Maximum investment amount
- `minYield` (optional): Minimum yield percentage (0-100)

**Response:**
```json
{
  "success": true,
  "data": {
    "properties": [
      {
        "_id": "propertyId",
        "title": "Luxury Villa in Riyadh",
        "titleAr": "فيلا فاخرة في الرياض",
        "description": "Beautiful modern villa",
        "location": {
          "city": "riyadh",
          "address": "Al Narjis, Riyadh",
          "coordinates": {
            "lat": 24.7136,
            "lng": 46.6753
          }
        },
        "propertyType": "residential",
        "status": "active",
        "financials": {
          "totalValue": 5000000.00,
          "pricePerShare": 1000.00,
          "availableShares": 5000,
          "minInvestment": 1000.00,
          "fundingProgress": 45.5,
          "expectedRentalYield": 8.5,
          "expectedAppreciation": 5.0
        },
        "images": [
          "https://example.com/image1.jpg"
        ],
        "features": ["5 bedrooms", "Swimming pool"],
        "createdAt": "2025-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "pages": 3
    }
  }
}
```

**Used in:** `WebsitePropertiesPage`, `PropertiesList` component

---

#### 10. Get Property by ID

**Endpoint:** `GET /api/properties/:id`

**Authentication:** Required

**Path Parameters:**
- `id`: Property MongoDB ObjectId

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "propertyId",
    "title": "Luxury Villa in Riyadh",
    "description": "Detailed property description",
    "location": {
      "city": "riyadh",
      "address": "Al Narjis, Riyadh"
    },
    "financials": {
      "totalValue": 5000000.00,
      "pricePerShare": 1000.00,
      "availableShares": 5000,
      "minInvestment": 1000.00,
      "fundingProgress": 45.5
    },
    "investmentTerms": {
      "rentalYieldRate": 8.5,
      "appreciationRate": 5.0,
      "bondMaturityYears": 5,
      "lockingPeriodYears": 3,
      "earlyWithdrawalPenaltyPercentage": 5.0
    },
    "images": ["url1", "url2"],
    "status": "active"
  }
}
```

**Used in:** Property detail pages, investment flow

---

#### 11. Search Properties

**Endpoint:** `GET /api/properties/search`

**Authentication:** Not required

**Query Parameters:** Same as Get All Properties

**Response:** Same format as Get All Properties

**Rate Limit:** 200 requests per 15 minutes

---

#### 12. Invest in Property

**Endpoint:** `POST /api/properties/:id/invest`

**Authentication:** Required

**Path Parameters:**
- `id`: Property MongoDB ObjectId

**Request Body:**
```json
{
  "units": 10,
  // OR
  "shares": 10,
  "paymentMethod": "wallet" // Options: mada, visa, mastercard, apple_pay, samsung_pay, fake
}
```

**Response:**
```json
{
  "success": true,
  "message": "Investment successful",
  "data": {
    "investmentId": "investmentId",
    "propertyId": "propertyId",
    "amount": 10000.00,
    "shares": 10,
    "status": "confirmed",
    "investedAt": "2025-01-15T10:00:00Z"
  }
}
```

**Rate Limit:** 10 requests per 15 minutes

**Validation:**
- Either `units` or `shares` must be provided
- Minimum investment amount: SAR 1,000
- Must have sufficient wallet balance

**Used in:** Investment modal, invest page

---

### Investment APIs

#### 13. Get My Investments

**Endpoint:** `GET /api/investments/my-investments`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "investmentId",
      "propertyId": "propertyId",
      "propertyName": "Luxury Villa in Riyadh",
      "amount": 10000.00,
      "shares": 10,
      "status": "confirmed",
      "createdAt": "2025-01-15T10:00:00Z",
      "investedAt": "2025-01-15T10:00:00Z",
      "investmentType": "bond", // or "simple_annual"
      "managementFee": {
        "feePercentage": 2.0,
        "feeAmount": 200.00,
        "netInvestment": 9800.00
      },
      "currentValue": 10500.00,
      "returns": {
        "totalReturns": 500.00,
        "rentalYieldEarned": 400.00,
        "appreciationGain": 100.00
      },
      "rentalYieldRate": 8.5,
      "appreciationRate": 5.0,
      "penaltyRate": 5.0,
      "bondMaturityDate": "2030-01-15T10:00:00Z",
      "lockInEndDate": "2028-01-15T10:00:00Z",
      "isInLockInPeriod": true,
      "hasMatured": false,
      "maturityPeriodYears": 5,
      "property": {
        "_id": "propertyId",
        "title": "Luxury Villa",
        "location": {
          "city": "riyadh"
        }
      }
    }
  ]
}
```

**Used in:** Dashboard, portfolio page

---

#### 14. Create Investment

**Endpoint:** `POST /api/investments`

**Authentication:** Required

**Request Body:**
```json
{
  "propertyId": "propertyId",
  "shares": 10,
  // OR
  "amount": 10000.00,
  "investmentType": "bond" // Optional: "bond" or "simple_annual"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "investmentId": "investmentId",
    "propertyId": "propertyId",
    "amount": 10000.00,
    "shares": 10,
    "status": "confirmed",
    "investedAt": "2025-01-15T10:00:00Z",
    "message": "Successfully invested SAR 10000.00 in property"
  }
}
```

**Validation:**
- Either `shares` or `amount` must be provided
- Minimum investment: SAR 1,000
- Must have sufficient wallet balance
- Property must be active or funding status

**Used in:** Investment flow

---

#### 15. Get Investment Settings

**Endpoint:** `GET /api/investments/settings`

**Authentication:** Not required (public endpoint)

**Response:**
```json
{
  "success": true,
  "rentalYieldPercentage": 8.0,
  "appreciationRatePercentage": 3.0,
  "maturityPeriodYears": 5,
  "investmentDurationYears": 5,
  "earlyWithdrawalPenaltyPercentage": 5.0,
  "lockingPeriodYears": 3,
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00Z"
}
```

**Used in:** Investment calculator, returns calculation

---

#### 16. Calculate Investment Returns

**Endpoint:** `POST /api/investments/calculate`

**Authentication:** Not required

**Request Body:**
```json
{
  "investmentAmount": 50000
}
```

**Response:**
```json
{
  "success": true,
  "investmentAmount": 50000,
  "settings": {
    "rentalYieldPercentage": 8,
    "appreciationRatePercentage": 3,
    "maturityPeriodYears": 5,
    "lockingPeriodYears": 5,
    "investmentDurationYears": 5,
    "earlyWithdrawalPenaltyPercentage": 5
  },
  "returns": {
    "annualRentalIncome": 4000,
    "lockingPeriod": {
      "rentalYield": 20000,
      "projectedValue": 70000,
      "description": "After 5 years (locking period)"
    },
    "atMaturity": {
      "rentalYield": 20000,
      "appreciation": 7962.81,
      "totalReturns": 27962.81,
      "projectedValue": 77962.81,
      "description": "At maturity after 5 years"
    }
  },
  "earlyWithdrawal": {
    "lockingPeriodYears": 5,
    "penaltyPercentage": 5,
    "penaltyAmount": 2500,
    "amountAfterPenalty": 47500,
    "description": "Penalty applied if withdrawn before 5 years"
  }
}
```

**Used in:** Investment calculator component

---

#### 17. Withdraw Investment (Bond Break)

**Endpoint:** `POST /api/investments/:id/bond-break-withdraw`

**Authentication:** Required

**Path Parameters:**
- `id`: Investment MongoDB ObjectId

**Request Body:** Empty or optional metadata

**Response:**
```json
{
  "success": true,
  "data": {
    "withdrawalDetails": {
      "principalAmount": 10000.00,
      "rentalYieldEarned": 400.00,
      "appreciationGain": 0.00,
      "penalty": 500.00,
      "totalWithdrawalAmount": 9900.00
    },
    "timing": {
      "investedDate": "2025-01-15T10:00:00Z",
      "maturityDate": "2030-01-15T10:00:00Z",
      "withdrawalDate": "2026-01-15T10:00:00Z",
      "holdingPeriodYears": "1.00",
      "isEarlyWithdrawal": true
    },
    "rates": {
      "rentalYieldRate": "8.5%",
      "appreciationRate": "5%",
      "penaltyRate": "5%"
    },
    "newWalletBalance": 49900.00
  },
  "message": "Early withdrawal completed with 5% penalty. Amount credited: SAR 9900.00"
}
```

**Notes:**
- Early withdrawals before maturity incur penalty
- After maturity, user gets principal + rental yield + appreciation gains
- Test mode: 1 hour = 1 year (accelerated time for testing)

**Used in:** Portfolio withdrawal flow

---

### Wallet APIs

#### 18. Get Wallet Balance

**Endpoint:** `GET /api/wallet/balance`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "balance": 50000.00,
    "totalInvested": 100000.00,
    "totalReturns": 5000.00,
    "currency": "SAR"
  }
}
```

**Used in:** Wallet page, dashboard, investment checks

---

#### 19. Get Wallet Transactions

**Endpoint:** `GET /api/wallet/transactions`

**Authentication:** Required

**Query Parameters:**
- `limit` (optional): Number of transactions (default: 20)
- `skip` (optional): Number to skip for pagination
- `type` (optional): Filter by type (`investment`, `payout`, `withdrawal`, `dividend`, `recharge`)

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "_id": "transactionId",
        "type": "investment",
        "amount": -10000.00,
        "description": "Investment in Luxury Villa",
        "status": "completed",
        "paymentMethod": "wallet",
        "balanceBefore": 60000.00,
        "balanceAfter": 50000.00,
        "createdAt": "2025-01-15T10:00:00Z",
        "relatedEntity": "property",
        "relatedEntityId": "propertyId"
      }
    ],
    "currentBalance": 50000.00,
    "pagination": {
      "total": 50,
      "limit": 20,
      "skip": 0
    }
  }
}
```

**Used in:** Wallet transaction history, transaction table

---

#### 20. Recharge Wallet

**Endpoint:** `POST /api/wallet/recharge`

**Authentication:** Required

**Request Body:**
```json
{
  "amount": 10000.00,
  "method": "bank_transfer", // Optional: bank_transfer, card, other
  "description": "Wallet top-up" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Wallet recharged successfully",
  "data": {
    "transactionId": "transactionId",
    "amount": 10000.00,
    "newBalance": 60000.00,
    "status": "completed"
  }
}
```

**Validation:**
- Minimum amount: SAR 1,000
- Maximum amount: SAR 1,000,000

**Used in:** Wallet recharge flow

---

#### 21. Withdraw from Wallet

**Endpoint:** `POST /api/wallet/withdraw`

**Authentication:** Required

**Request Body:**
```json
{
  "amount": 5000.00,
  "accountDetails": {
    "bankName": "Al Rajhi Bank",
    "accountNumber": "1234567890",
    "iban": "SA1234567890123456789012"
  }, // Optional
  "description": "Withdrawal request" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Withdrawal request submitted",
  "data": {
    "transactionId": "transactionId",
    "amount": 5000.00,
    "status": "pending",
    "newBalance": 45000.00
  }
}
```

**Validation:**
- Minimum amount: SAR 1,000
- Maximum amount: SAR 1,000,000
- Must have sufficient balance

**Used in:** Wallet withdrawal flow

---

### KYC APIs

#### 22. Get KYC Data

**Endpoint:** `GET /api/kyc`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "kycId",
    "user": "userId",
    "status": "approved", // pending, approved, rejected, under_review
    "nationality": "SA",
    "dateOfBirth": "1990-01-01",
    "idNumber": "1234567890",
    "address": {
      "street": "123 Main St",
      "city": "Riyadh",
      "country": "Saudi Arabia"
    },
    "occupation": "Engineer",
    "income": "50000-100000",
    "documents": {
      "nationalId": "https://example.com/nationalId.jpg",
      "selfie": "https://example.com/selfie.jpg",
      "proofOfIncome": "https://example.com/income.jpg",
      "addressProof": "https://example.com/address.jpg"
    },
    "submittedAt": "2025-01-15T10:00:00Z",
    "reviewedAt": "2025-01-16T10:00:00Z",
    "reviewedBy": "adminId"
  }
}
```

**Used in:** KYC verification page, profile

---

#### 23. Upload KYC Documents

**Endpoint:** `POST /api/kyc/upload`

**Authentication:** Required

**Request Type:** `multipart/form-data`

**Form Fields:**
- `nationalId` (file): National ID document
- `selfie` (file): Selfie photo
- `proofOfIncome` (file): Proof of income document
- `addressProof` (file): Address proof document

**Response:**
```json
{
  "success": true,
  "message": "Documents uploaded successfully",
  "data": {
    "kycId": "kycId",
    "status": "pending",
    "documents": {
      "nationalId": "https://cloudinary.com/nationalId.jpg",
      "selfie": "https://cloudinary.com/selfie.jpg",
      "proofOfIncome": "https://cloudinary.com/income.jpg",
      "addressProof": "https://cloudinary.com/address.jpg"
    }
  }
}
```

**Note:** Documents are uploaded to Cloudinary

**Used in:** KYC document upload flow

---

### Portfolio APIs

#### 24. Get User Portfolio

**Endpoint:** `GET /api/users/portfolio`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "totalInvested": 100000.00,
    "currentValue": 105000.00,
    "totalReturns": 5000.00,
    "totalReturnPercentage": 5.0,
    "activeInvestments": 3,
    "properties": [
      {
        "propertyId": "propertyId",
        "propertyName": "Luxury Villa",
        "totalInvested": 50000.00,
        "currentValue": 52500.00,
        "returns": 2500.00,
        "investmentCount": 1
      }
    ]
  }
}
```

**Used in:** Portfolio dashboard, summary views

---

#### 25. Get Consolidated Portfolio

**Endpoint:** `GET /api/users/portfolio/consolidated`

**Authentication:** Required

**Response:** Same format as Get User Portfolio, but investments are grouped by property

**Used in:** Portfolio analytics, consolidated view

---

## Error Handling

### Standard Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

### Common HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data or validation error
- **401 Unauthorized**: Authentication required or token invalid
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

### Error Handling in Website

The website API client automatically handles common errors:

```typescript
// 401 errors trigger logout
if (response.status === 401) {
  // Redirect to login
  throw new Error('Authentication required. Please login again.');
}

// 404 errors
if (response.status === 404) {
  throw new Error(`API endpoint not found: ${endpoint}`);
}

// Other errors
const error = await response.json();
throw new Error(error.message || `API Error: ${response.statusText}`);
```

---

## Request/Response Formats

### Content-Type

- **JSON APIs**: `Content-Type: application/json`
- **File Upload**: `Content-Type: multipart/form-data`
- **Form Data**: `Content-Type: application/x-www-form-urlencoded` (for some endpoints)

### Date Formats

All dates are in ISO 8601 format: `2025-01-15T10:00:00Z`

### Currency

All monetary values are in **SAR (Saudi Riyal)**

### Pagination

Most list endpoints support pagination:
- `page`: Page number (1-based)
- `limit`: Items per page (default: 20, max: 100)
- Response includes pagination metadata

---

## Rate Limits

Different endpoints have different rate limits:

- **Authentication (login)**: 50 requests per 15 minutes
- **Authentication (register)**: 100 requests per hour
- **Password Reset**: 5 requests per 15 minutes
- **Property Search**: 200 requests per 15 minutes
- **Investment**: 10 requests per 15 minutes
- **General API**: 100 requests per 15 minutes

When rate limit is exceeded:
```json
{
  "success": false,
  "message": "Too many requests, please try again later."
}
```

---

## Testing & Development

### Local Development Setup

1. Backend should be running on `http://localhost:5001`
2. Website uses `VITE_API_URL` environment variable if set
3. Default fallback: `http://localhost:5001/api`

### Environment Variables

```env
VITE_API_URL=http://localhost:5001/api
```

### Common Testing Flow

1. Register/Login user
2. Complete profile (optional)
3. Upload KYC documents
4. Recharge wallet
5. Browse properties
6. Calculate returns
7. Create investment
8. View portfolio
9. Withdraw investment (if needed)

---

## Notes

1. **Token Storage**: Tokens are stored in `localStorage` as `zaron_token`
2. **Auto-logout**: 401 errors trigger automatic logout and redirect to login
3. **File Uploads**: KYC documents are uploaded to Cloudinary
4. **Test Mode**: Investment withdrawal uses accelerated time (1 hour = 1 year) for testing
5. **Wallet Balance**: Must check wallet balance before making investments
6. **KYC Status**: Some features may require KYC approval
7. **Real-time Calculations**: Investment returns are calculated in real-time based on holding period

---

## API Client Usage Example

```typescript
import { apiClient, API_ENDPOINTS } from '@/lib/api-client';

// Get properties
const properties = await apiClient.get(API_ENDPOINTS.PROPERTIES);

// Create investment
const investment = await apiClient.post(API_ENDPOINTS.INVEST, {
  propertyId: 'propertyId',
  shares: 10
});

// Update profile
const profile = await apiClient.put(API_ENDPOINTS.UPDATE_PROFILE, {
  firstName: 'John',
  lastName: 'Doe'
});
```

---

**Last Updated:** January 2025  
**Backend Version:** 1.0.0  
**Website Version:** 1.0.0


