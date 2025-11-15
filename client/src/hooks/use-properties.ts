import { useQuery } from "@tanstack/react-query";
import { apiClient, API_ENDPOINTS } from "@/lib/api-client";

interface Property {
  _id: string;
  title: string;
  titleAr?: string;
  description?: string;
  propertyType: string;
  location: {
    city: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  financials: {
    totalValue: number;
    pricePerShare: number;
    minInvestment: number;
    projectedYield: number;
    availableShares: number;
  };
  images: string[];
  status: 'active' | 'upcoming' | 'fully_funded' | 'completed';
  fundingProgress: number;
  investorCount: number;
}

// Get all properties
export function useProperties() {
  return useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: async () => {
      const response: any = await apiClient.get(API_ENDPOINTS.PROPERTIES);

      // Handle different response structures
      // Backend returns: { success: true, data: { properties: [...], pagination: {...} } }
      if (response.data && response.data.properties) {
        return response.data.properties;
      }

      // Fallback if properties are at data level
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }

      // Fallback if response is direct array
      if (Array.isArray(response)) {
        return response;
      }

      return [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Retry once on failure
  });
}

// Get single property by ID
export function useProperty(propertyId: string | undefined) {
  return useQuery<Property>({
    queryKey: ["property", propertyId],
    queryFn: async () => {
      if (!propertyId) throw new Error("Property ID is required");
      return apiClient.get<Property>(API_ENDPOINTS.PROPERTY_BY_ID(propertyId));
    },
    enabled: !!propertyId,
    staleTime: 5 * 60 * 1000,
  });
}
