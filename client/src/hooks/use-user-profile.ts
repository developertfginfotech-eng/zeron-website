import { useQuery } from "@tanstack/react-query";
import { apiClient, API_ENDPOINTS } from "@/lib/api-client";
import { useAuth } from "./use-auth";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  kycStatus: 'not_started' | 'in_progress' | 'pending_review' | 'approved' | 'rejected';
  kycCurrentStep?: number;
  kycCompletedSteps?: number[];
  applicationProgress?: number;
  profilePicture?: string;
  dateOfBirth?: string;
  nationality?: string;
  occupation?: string;
  createdAt?: string;
  updatedAt?: string;
  profileData?: {
    investmentProfile?: {
      experience?: string;
      riskTolerance?: string;
      investmentGoals?: string;
      preferredTypes?: string[];
      investmentAmount?: number;
      timeline?: string;
      completed?: boolean;
    };
    bankingDetails?: {
      bankName?: string;
      iban?: string;
      accountHolder?: string;
      swiftCode?: string;
      accountType?: string;
      completed?: boolean;
    };
    communicationPreferences?: {
      emailNotifications?: boolean;
      smsAlerts?: boolean;
      languagePreference?: string;
      timezone?: string;
      marketingEmails?: boolean;
      monthlyReports?: boolean;
      completed?: boolean;
    };
    employmentPortfolio?: {
      employmentStatus?: string;
      employer?: string;
      jobTitle?: string;
      monthlySalary?: number;
      hasInvestmentPortfolio?: boolean;
      portfolioValue?: number;
      completed?: boolean;
    };
  };
}

export interface UserProfileResponse {
  success: boolean;
  data: UserProfile;
}

// Fetch user profile from backend API
export function useUserProfile() {
  const { user, setUser } = useAuth();
  const hasAuth = !!localStorage.getItem('zaron_token') || !!localStorage.getItem('zaron_user');

  return useQuery<UserProfile>({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await apiClient.get<UserProfileResponse>(API_ENDPOINTS.USER_PROFILE);

      // Update auth context with fresh data from backend
      if (response.data) {
        const mappedUser = {
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone,
          kycStatus: response.data.kycStatus,
          kycCurrentStep: response.data.kycCurrentStep,
          kycCompletedSteps: response.data.kycCompletedSteps,
          applicationProgress: response.data.applicationProgress,
        };
        setUser(mappedUser);
      }

      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: hasAuth,
    retry: false,
  });
}
