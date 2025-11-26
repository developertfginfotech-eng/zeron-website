import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient, API_ENDPOINTS } from "@/lib/api-client";

export interface KYCDocument {
  uploaded: boolean;
  uploadedAt?: string;
  type?: string;
}

export interface KYCDocuments {
  nationalId?: KYCDocument;
  passport?: KYCDocument;
  selfie?: KYCDocument;
  proofOfIncome?: KYCDocument;
  addressProof?: KYCDocument;
}

export interface PersonalInfo {
  nationality?: string;
  dateOfBirth?: string;
  fullNameArabic?: string;
  fullNameEnglish?: string;
  monthlyIncome?: number;
  occupation?: string;
}

export interface KYCAddress {
  country?: string;
  city?: string;
  address?: string;
}

export interface KYCData {
  _id?: string;
  user?: string;
  documents: KYCDocuments;
  personalInfo: PersonalInfo;
  address: KYCAddress;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  rejectionReasons?: string[];
  createdAt?: string;
  updatedAt?: string;
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  completionPercentage?: number;
}

export interface KYCResponse {
  success: boolean;
  data: KYCData;
}

// Get full KYC data
export function useKYC() {
  const hasAuth = !!localStorage.getItem('zaron_token') || !!localStorage.getItem('zaron_user');

  return useQuery<KYCData>({
    queryKey: ["kyc"],
    queryFn: async () => {
      const response = await apiClient.get<KYCResponse>(API_ENDPOINTS.KYC);
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
    enabled: hasAuth,
    retry: false,
  });
}

// Get KYC status only
export function useKYCStatus() {
  const hasAuth = !!localStorage.getItem('zaron_token') || !!localStorage.getItem('zaron_user');

  return useQuery<KYCData>({
    queryKey: ["kyc-status"],
    queryFn: async () => {
      const response = await apiClient.get<KYCResponse>(API_ENDPOINTS.KYC);
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
    enabled: hasAuth,
    retry: false,
  });
}

// Upload KYC Documents
export function useUploadDocuments() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const token = localStorage.getItem('zaron_token') ||
                   JSON.parse(localStorage.getItem('zaron_user') || '{}').token;

      const response = await fetch(`${apiClient['baseUrl'] || 'https://zeron-backend-z5o1.onrender.com/api'}/kyc/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(error.message || `Upload failed: ${response.statusText}`);
      }

      return response.json();
    },
    onSuccess: async () => {
      // Invalidate KYC queries
      queryClient.invalidateQueries({ queryKey: ["kyc"] });
      queryClient.invalidateQueries({ queryKey: ["kyc-status"] });

      // Fetch updated user profile to refresh kycStatus
      try {
        const token = localStorage.getItem('zaron_token') ||
                     JSON.parse(localStorage.getItem('zaron_user') || '{}').token;

        const userResponse = await fetch(`${apiClient['baseUrl'] || 'https://zeron-backend-z5o1.onrender.com/api'}/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          const user = userData.data || userData.user || userData;

          // Update localStorage with fresh user data
          if (user) {
            localStorage.setItem('zaron_user', JSON.stringify(user));

            // Dispatch custom event to trigger auth context update
            window.dispatchEvent(new CustomEvent('userDataUpdated', { detail: user }));
          }
        }
      } catch (error) {
        console.error('Failed to refresh user profile after KYC upload:', error);
      }
    },
  });
}

// Get all KYC data for admin
export function useAllKYCData(page = 1, limit = 20, status = 'all', search = '') {
  const hasAuth = !!localStorage.getItem('zaron_token') || !!localStorage.getItem('zaron_user');

  return useQuery<any>({
    queryKey: ["kyc-all", page, limit, status, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      if (status !== 'all') params.append('status', status);
      if (search) params.append('search', search);

      const response = await apiClient.get<any>(`/kyc/admin/all?${params.toString()}`);
      return response;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
    enabled: hasAuth,
    retry: false,
  });
}

// Submit KYC
export function useSubmitKYC() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (kycData: any) => {
      return apiClient.post(API_ENDPOINTS.SUBMIT_KYC, kycData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kyc"] });
      queryClient.invalidateQueries({ queryKey: ["kyc-status"] });
    },
  });
}
