# Zeron API Endpoints - Postman Collection

Base URL: `http://localhost:5001` or your deployment URL

---

## 👥 INVESTORS

⚠️ **Note:** Currently, only the "Get All Investors" endpoint is implemented under `/api/admin/investors` and requires admin authentication.

### 1. Get All Investors (Admin Only - ✅ IMPLEMENTED)
```
GET /api/admin/investors
```
**Headers Required:**
```
Authorization: Bearer {token}
```

**Query Params:** (optional)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `sort` - Sort field (default: "-createdAt")
- `search` - Search by name, email, phone
- `propertyId` - Filter by property ID

**Response:**
```json
{
  "success": true,
  "data": {
    "investors": [
      {
        "_id": "mongoId",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phone": "string",
        "totalInvested": "decimal",
        "activeInvestments": "number",
        "properties": ["array of property details"]
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "pages": 5
    }
  }
}
```

---

### 2. Get Investor by ID (Admin Only - ✅ IMPLEMENTED)
```
GET /api/admin/investors/:id
```
**Headers Required:**
```
Authorization: Bearer {token}
```

**Path Params:** `id` (MongoDB ObjectId of the investor/user)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "mongoId",
    "firstName": "string",
    "lastName": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "kycStatus": "pending|approved|rejected|under_review",
    "status": "active|inactive",
    "role": "user|investor",
    "createdAt": "timestamp",
    "updatedAt": "timestamp",

    "totalInvested": "decimal",
    "totalReturns": "decimal",
    "activeInvestments": "number",
    "firstInvestment": "timestamp",
    "lastInvestment": "timestamp",

    "properties": [
      {
        "propertyId": "mongoId",
        "propertyTitle": "string",
        "propertyLocation": "string",
        "amount": "decimal",
        "ownershipPercentage": "decimal",
        "returns": "decimal",
        "date": "timestamp",
        "status": "string"
      }
    ],

    "kyc": {
      "nationality": "string",
      "dateOfBirth": "timestamp",
      "idNumber": "string",
      "address": "string",
      "city": "string",
      "country": "string",
      "occupation": "string",
      "income": "string",
      "submittedAt": "timestamp",
      "reviewedAt": "timestamp",
      "reviewedBy": "mongoId"
    }
  }
}
```

---

### 3. Create Investor (❌ NOT IMPLEMENTED)
```
POST /api/investors
```
**Status:** Endpoint not yet implemented. Use `/api/auth/register` to create users/investors.

**Planned Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+966501234567",
  "nationality": "SA",
  "firstName": "John",
  "lastName": "Doe",
  "city": "Riyadh",
  "country": "Saudi Arabia"
}
```

---

### 4. Update Investor (❌ NOT IMPLEMENTED)
```
PUT /api/investors/:id
```
**Status:** Endpoint not yet implemented. Returns 404.

**Planned Request Body:** (all fields optional)
```json
{
  "name": "John Updated",
  "phone": "+966509876543",
  "kycStatus": "approved",
  "totalInvested": "50000.00",
  "activeProperties": 3
}
```

---

## 🏢 PROPERTIES

### 5. Get All Properties
```
GET /api/properties
```
**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Luxury Villa in Riyadh",
    "description": "Modern villa...",
    "location": "Riyadh",
    "price": "1500000.00",
    "propertyType": "residential",
    "yield": "8.50",
    "status": "upcoming",
    "totalInvestment": "0",
    "investorCount": 0,
    "currentOwnership": "0",
    "performance": "stable"
  }
]
```

---

### 6. Get Property by ID
```
GET /api/properties/:id
```
**Path Params:** `id` (property UUID)

---

### 7. Create Property
```
POST /api/properties
```
**Request Body:**
```json
{
  "title": "Luxury Villa in Riyadh",
  "description": "Beautiful modern villa with 5 bedrooms",
  "location": "Riyadh, Al Narjis",
  "price": "1500000.00",
  "propertyType": "residential",
  "yield": "8.50",
  "ownershipCap": 100,
  "status": "upcoming",
  "images": ["url1.jpg", "url2.jpg"]
}
```

---

## 💰 TRANSACTIONS

### 8. Get All Transactions (Admin Only - ✅ IMPLEMENTED)
```
GET /api/admin/transactions
```
**Headers Required:**
```
Authorization: Bearer {token}
```
**Authorization:** super_admin or financial_analyst only

**Query Params:** (optional)
- `startDate` - ISO 8601 date
- `endDate` - ISO 8601 date
- `status` - pending|completed|failed|approved|rejected
- `type` - investment|payout|withdrawal|dividend
- `limit` - Number (1-100, default varies)
- `offset` - Number (min 0)

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "mongoId",
        "user": "userId",
        "type": "investment|payout|withdrawal|dividend|fee",
        "amount": "decimal",
        "status": "pending|completed|failed",
        "createdAt": "timestamp"
      }
    ],
    "pagination": {
      "limit": 20,
      "offset": 0,
      "total": 100
    }
  }
}
```

---

### 9. Get User's Wallet Transactions (✅ IMPLEMENTED)
```
GET /api/wallet/transactions
```
**Headers Required:**
```
Authorization: Bearer {token}
```

**Query Params:** (optional)
- `limit` - Number of transactions to return
- `skip` - Number of transactions to skip
- `type` - Filter by transaction type

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "mongoId",
        "type": "credit|debit|investment|withdrawal",
        "amount": "decimal",
        "balance": "decimal",
        "description": "string",
        "status": "pending|completed|failed",
        "createdAt": "timestamp"
      }
    ],
    "currentBalance": "decimal"
  }
}
```

---

### 10. Create Transaction (❌ NOT IMPLEMENTED)
```
POST /api/transactions
```
**Status:** Endpoint not implemented. Transactions are created through investment and wallet endpoints.

---

## 📊 INVESTMENT SETTINGS

### 11. Get Active Investment Settings
```
GET /api/investment-settings
```
**Response:**
```json
{
  "id": "uuid",
  "rentalYieldPercentage": "8.00",
  "appreciationRatePercentage": "5.00",
  "maturityPeriodYears": 3,
  "investmentDurationYears": 5,
  "earlyWithdrawalPenaltyPercentage": "15.00",
  "platformFeePercentage": "2.00",
  "minInvestmentAmount": "1000.00",
  "maxInvestmentAmount": "1000000.00",
  "isActive": true,
  "createdAt": "timestamp"
}
```

---

### 12. Create Investment Settings (Admin)
```
POST /api/investment-settings
```
**Request Body:**
```json
{
  "rentalYieldPercentage": "8.00",
  "appreciationRatePercentage": "5.00",
  "maturityPeriodYears": 3,
  "investmentDurationYears": 5,
  "earlyWithdrawalPenaltyPercentage": "15.00",
  "platformFeePercentage": "2.00",
  "minInvestmentAmount": "1000.00",
  "maxInvestmentAmount": "1000000.00",
  "isActive": true,
  "description": "Default investment settings for Q1 2025"
}
```

---

### 13. Update Investment Settings (Admin)
```
PUT /api/investment-settings/:id
```
**Path Params:** `id` (settings UUID)

**Request Body:** (all fields optional)
```json
{
  "rentalYieldPercentage": "9.00",
  "appreciationRatePercentage": "6.00",
  "earlyWithdrawalPenaltyPercentage": "12.00"
}
```

---

## 💼 INVESTMENTS

### 14. Get Investments by Investor
```
GET /api/investments/investor/:investorId
```
**Path Params:** `investorId` (investor UUID)

**Response:**
```json
[
  {
    "id": "uuid",
    "investorId": "uuid",
    "propertyId": "uuid",
    "investmentAmount": "50000.00",
    "ownershipPercentage": "5.00",
    "expectedReturn": "8.50",
    "currentValue": "52000.00",
    "totalReturns": "2000.00",
    "status": "active",
    "investmentDate": "2024-01-15T...",
    "maturityDate": "2027-01-15T...",
    "rentalYieldRate": "8.00",
    "appreciationRate": "5.00",
    "penaltyRate": "15.00",
    "maturityPeriodYears": 3
  }
]
```

---

### 15. Get Investment by ID
```
GET /api/investments/:id
```
**Path Params:** `id` (investment UUID)

---

### 16. Create Investment
```
POST /api/investments
```
**Request Body:**
```json
{
  "investorId": "investor-uuid",
  "propertyId": "property-uuid",
  "investmentAmount": "50000.00",
  "ownershipPercentage": "5.00",
  "expectedReturn": "8.50",
  "status": "active"
}
```

**Response:**
```json
{
  "id": "generated-uuid",
  "investorId": "investor-uuid",
  "propertyId": "property-uuid",
  "investmentAmount": "50000.00",
  "ownershipPercentage": "5.00",
  "status": "active",
  "investmentDate": "2025-01-17T...",
  "maturityDate": "2028-01-17T...",
  "rentalYieldRate": "8.00",
  "appreciationRate": "5.00",
  "penaltyRate": "15.00",
  "maturityPeriodYears": 3,
  "investmentDurationYears": 5
}
```

---

### 17. Calculate Investment Returns
```
POST /api/investments/calculate
```
**Request Body:**
```json
{
  "investmentAmount": 50000,
  "propertyId": "property-uuid"
}
```

**Response:**
```json
{
  "investmentAmount": 50000,
  "settings": {
    "rentalYieldPercentage": 8,
    "appreciationRatePercentage": 5,
    "maturityPeriodYears": 3,
    "investmentDurationYears": 5,
    "earlyWithdrawalPenaltyPercentage": 15
  },
  "returns": {
    "annualRentalIncome": 4000,
    "totalRentalIncome": 12000,
    "appreciationGain": 7881.25,
    "totalReturnsAtMaturity": 19881.25,
    "totalValueAtMaturity": 69881.25
  },
  "earlyWithdrawal": {
    "penaltyAmount": 7500,
    "amountAfterPenalty": 42500
  }
}
```

---

### 18. Withdraw Investment
```
POST /api/investments/:id/withdraw
```
**Path Params:** `id` (investment UUID)

**Request Body:** (empty or optional reason)
```json
{
  "reason": "Need funds for emergency"
}
```

**Response:**
```json
{
  "investment": {
    "id": "uuid",
    "status": "withdrawn",
    "exitDate": "2025-01-17T..."
  },
  "transaction": {
    "id": "transaction-uuid",
    "type": "withdrawal",
    "amount": "42500.00",
    "fee": "7500.00",
    "description": "Early withdrawal with 15% penalty"
  },
  "withdrawalAmount": 42500,
  "penalty": 7500,
  "isEarlyWithdrawal": true
}
```

---

## 💬 CHAT MESSAGES

### 19. Get Chat Messages
```
GET /api/chat/messages?userId=user-id
```
**Query Params:** `userId` (optional)

---

### 20. Create Chat Message
```
POST /api/chat/messages
```
**Request Body:**
```json
{
  "userId": "user-uuid",
  "message": "Hello, I need help with my investment",
  "sender": "user",
  "aiContext": null
}
```

---

### 21. AI Chat Completion
```
POST /api/ai/chat
```
**Request Body:**
```json
{
  "message": "What are my investment options?",
  "userId": "user-uuid",
  "language": "en"
}
```

**Response:**
```json
{
  "id": "message-uuid",
  "userId": "user-uuid",
  "message": "AI generated response...",
  "sender": "ai",
  "aiContext": "response",
  "createdAt": "timestamp"
}
```

---

## 🤖 AI INSIGHTS

### 22. Get AI Insights
```
GET /api/ai/insights?type=market
```
**Query Params:** `type` (optional: market, customer, property, risk, portfolio)

**Response:**
```json
[
  {
    "id": "uuid",
    "type": "market",
    "title": "Market Trend Analysis",
    "content": "Property prices expected to rise...",
    "confidence": "0.85",
    "entityId": null,
    "createdAt": "timestamp"
  }
]
```

---

### 23. Create AI Insight
```
POST /api/ai/insights
```
**Request Body:**
```json
{
  "type": "property",
  "title": "High Return Potential",
  "content": "This property shows strong rental yield indicators",
  "confidence": "0.92",
  "entityId": "property-uuid"
}
```

---

## 📝 POSTMAN COLLECTION SETUP

### Environment Variables:
```
base_url = http://localhost:5001
api_prefix = /api
auth_token = (set after login)
investor_id = (set after creating investor)
property_id = (set after creating property)
investment_id = (set after creating investment)
```

### Common Headers:
```
Content-Type: application/json
Authorization: Bearer {{auth_token}}
```

---

## 🧪 TESTING FLOW

**Recommended Testing Order:**

1. **Setup:** Create Investment Settings (POST /api/investment-settings)
2. **Investors:** Create Investor (POST /api/investors)
3. **Properties:** Create Property (POST /api/properties)
4. **Calculate:** Calculate Returns (POST /api/investments/calculate)
5. **Invest:** Create Investment (POST /api/investments)
6. **View:** Get Investments by Investor (GET /api/investments/investor/:id)
7. **Transactions:** Get Transactions (GET /api/transactions/investor/:id)
8. **Withdraw:** Withdraw Investment (POST /api/investments/:id/withdraw)

---

## 🚀 QUICK START EXAMPLES

### Example 1: Complete Investment Flow
```bash
# 1. Get active settings
GET /api/investment-settings

# 2. Create investor
POST /api/investors
{
  "name": "Ahmed Ali",
  "email": "ahmed@example.com",
  "phone": "+966501234567"
}

# 3. Create property
POST /api/properties
{
  "title": "Villa in Riyadh",
  "location": "Riyadh",
  "price": "2000000.00",
  "propertyType": "residential",
  "yield": "8.00"
}

# 4. Calculate returns for 100,000 SAR
POST /api/investments/calculate
{
  "investmentAmount": 100000
}

# 5. Create investment
POST /api/investments
{
  "investorId": "{{investor_id}}",
  "propertyId": "{{property_id}}",
  "investmentAmount": "100000.00",
  "ownershipPercentage": "5.00"
}

# 6. Get investor's investments
GET /api/investments/investor/{{investor_id}}
```

---

## ⚠️ ERROR RESPONSES

All endpoints may return these error formats:

**400 Bad Request:**
```json
{
  "error": "Invalid investment data"
}
```

**404 Not Found:**
```json
{
  "error": "Investor not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Failed to fetch investors"
}
```

---

## 📌 NOTES

- All monetary values are in SAR (Saudi Riyal)
- All dates are in ISO 8601 format
- UUIDs are generated automatically
- Investment settings must be created before creating investments
- Early withdrawal before maturity incurs penalty from snapshotted `penaltyRate`
- Settings are snapshotted at investment creation time
