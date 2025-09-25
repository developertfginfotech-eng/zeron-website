import { useState, useEffect } from 'react'

interface Property {
  _id: string
  id: string
  title: string
  description?: string
  location: {
    address?: string
    city?: string
    state?: string
    country?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  financials: {
    totalValue: number
    expectedReturn: number
    minimumInvestment: number
  }
  propertyType: string
  status: 'active' | 'live' | 'upcoming' | 'closed'
  images?: Array<{
    url: string
    alt: string
    isPrimary: boolean
    _id: string
  }>
  timeline?: {
    launchDate: Date
    fundingDeadline: Date
  }
  createdBy: string
  createdAt: Date
  updatedAt: Date
  // Additional fields from aggregation
  investorCount?: number
  totalInvested?: number
  fundingProgress?: number
  // Legacy fields for compatibility
  yield?: number
  ownershipCap?: number
  price?: number
  totalInvestment?: number
  occupancyRate?: number
  performance?: 'excellent' | 'good' | 'stable' | 'declining'
}

interface PropertiesResponse {
  success: boolean
  data: {
    properties: Property[]
    pagination: {
      page: number
      pages: number
      total: number
      limit: number
      hasNext: boolean
      hasPrev: boolean
    }
  }
  message?: string
}

interface UsePropertiesParams {
  page?: number
  limit?: number
  sort?: string
  status?: string
  propertyType?: string
  search?: string
  city?: string
}

export function useProperties(params: UsePropertiesParams = {}) {
  const [properties, setProperties] = useState<Property[]>([])
  const [pagination, setPagination] = useState<PropertiesResponse['data']['pagination'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProperties = async () => {
    try {
      setLoading(true)
      setError(null)

      // Get auth token
      const token = localStorage.getItem('zaron_token') || localStorage.getItem('authToken')
      
      if (!token) {
        throw new Error('Authentication required')
      }

      // Build query parameters
      const searchParams = new URLSearchParams()
      
      if (params.page) searchParams.append('page', params.page.toString())
      if (params.limit) searchParams.append('limit', params.limit.toString())
      if (params.sort) searchParams.append('sort', params.sort)
      if (params.status) searchParams.append('status', params.status)
      if (params.propertyType) searchParams.append('propertyType', params.propertyType)
      if (params.search) searchParams.append('search', params.search)
      if (params.city) searchParams.append('city', params.city)

      const queryString = searchParams.toString()
      const url = `http://13.50.13.193:5000/api/admin/properties${queryString ? `?${queryString}` : ''}`

      console.log('Fetching properties from:', url)

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const result: PropertiesResponse = await response.json()
      console.log('Properties API Response:', result)

      if (!response.ok) {
        throw new Error(result.message || `HTTP error! status: ${response.status}`)
      }

      if (result.success) {
        // Transform properties to match PropertyCard expectations
        const transformedProperties: Property[] = result.data.properties.map((property: any) => ({
          ...property,
          id: property._id, // Ensure id field exists
          // Map backend fields to component expectations
          yield: property.financials?.expectedReturn || 0,
          ownershipCap: 100, // Default ownership cap
          price: property.financials?.totalValue || 0,
          totalInvestment: property.totalInvested || 0,
          location: typeof property.location === 'string' ? property.location : 
                   `${property.location?.address || ''} ${property.location?.city || ''}`.trim() ||
                   'Location not specified',
          occupancyRate: Math.floor(Math.random() * 40) + 60, // Mock occupancy rate
          performance: ['excellent', 'good', 'stable', 'declining'][Math.floor(Math.random() * 4)] as any,
        }))

        setProperties(transformedProperties)
        setPagination(result.data.pagination)
      } else {
        throw new Error(result.message || 'Failed to fetch properties')
      }
    } catch (error: any) {
      console.error('Error fetching properties:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [params.page, params.limit, params.sort, params.status, params.propertyType, params.search, params.city])

  const refetch = () => {
    fetchProperties()
  }

  return {
    properties,
    pagination,
    loading,
    error,
    refetch
  }
}