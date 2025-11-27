/**
 * Centralized API Client Configuration
 * All API calls go through this client to the real backend
 */

// Backend API Base URL
// Use environment variable if available, otherwise use localhost for testing
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// For production deployment, update this to:
// export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://13.50.13.193:5000/api';

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  // Try to get token from new storage key first
  let token = localStorage.getItem('zaron_token');
  if (token) {
    return token;
  }

  // Try to get token from user object
  const userData = localStorage.getItem('zaron_user');
  if (userData) {
    try {
      const parsed = JSON.parse(userData);
      if (parsed.token) {
        return parsed.token;
      }
    } catch (error) {
      // Silently fail to parse
    }
  }

  // Fallback: Check old storage keys for backward compatibility
  token = localStorage.getItem('authToken') || localStorage.getItem('token');
  if (token) {
    // Migrate to new key for future use
    localStorage.setItem('zaron_token', token);
    return token;
  }

  return null;
};

// API Client with authentication
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      // Handle specific error cases
      if (response.status === 401) {
        throw new Error('Authentication required. Please login again.');
      }
      if (response.status === 404) {
        throw new Error(`API endpoint not found: ${endpoint}`);
      }

      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || `API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(error.message || `API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }
}

// Export a default instance
export const apiClient = new ApiClient();

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  VERIFY_OTP: '/auth/verify-otp',

  // User
  USER_PROFILE: '/users/profile',
  UPDATE_PROFILE: '/users/profile',

  // Properties
  PROPERTIES: '/admin/properties',
  PROPERTY_BY_ID: (id: string) => `/properties/${id}`,

  // Investments
  MY_INVESTMENTS: '/investments/my-investments',
  INVEST: '/investments',
  INVEST_PROPERTY: (id: string) => `/properties/${id}/invest`,
  INVESTMENT_SETTINGS: '/investments/settings',
  CALCULATE_RETURNS: '/investments/calculate',
  WITHDRAW_INVESTMENT: (id: string) => `/investments/${id}/bond-break-withdraw`,
  WITHDRAW_WALLET: '/wallet/withdraw',

  // KYC
  KYC: '/kyc',
  KYC_STATUS: '/kyc/status',
  SUBMIT_KYC: '/kyc/submit',
  UPLOAD_DOCUMENT: '/kyc/upload',

  // Portfolio
  PORTFOLIO_SUMMARY: '/users/portfolio',

  // Wallet
  WALLET_BALANCE: '/wallet/balance',
  WALLET_RECHARGE: '/wallet/recharge',
  WALLET_TRANSACTIONS: '/wallet/transactions',

  // Admin (for settings)
  ADMIN_SETTINGS: '/admin/settings',
};
