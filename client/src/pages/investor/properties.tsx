import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, MapPin, Clock, Search, Filter, Loader2 } from "lucide-react"
import { useProperties } from "@/hooks/use-properties"
import { InvestDialog } from "@/components/invest-dialog"
import { PropertyDetailsModal } from "@/components/property-details-modal"

// Backend base URL for images (without /api suffix)
const BACKEND_BASE = 'https://zeron-backend-z5o1.onrender.com'

// Placeholder image as data URI (simple building icon)
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iI2UyZThmMCIvPjxwYXRoIGQ9Ik0xNTAgMTAwaDEwMHYxMDBIMTUweiIgZmlsbD0iIzk0YTNiOCIvPjxyZWN0IHg9IjE3MCIgeT0iMTIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM2NDc0OGIiLz48cmVjdCB4PSIyMTAiIHk9IjEyMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjNjQ3NDhiIi8+PHJlY3QgeD0iMTcwIiB5PSIxNjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzY0NzQ4YiIvPjxyZWN0IHg9IjIxMCIgeT0iMTYwIiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiM2NDc0OGIiLz48dGV4dCB4PSIyMDAiIHk9IjEzMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjQ3NDhiIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4='

export default function InvestorProperties() {
  const [investDialog, setInvestDialog] = useState<{
    isOpen: boolean;
    propertyId: string;
    propertyName: string;
    minInvestment: number;
  }>({
    isOpen: false,
    propertyId: '',
    propertyName: '',
    minInvestment: 0,
  });

  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // Fetch real properties from backend API
  const { data: backendProperties = [], isLoading, error } = useProperties()


  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading properties from backend...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <p className="text-red-500">Error loading properties: {error.message}</p>
          <p className="text-sm text-muted-foreground">Make sure backend is running on localhost:5001</p>
        </div>
      </div>
    )
  }

  // Map backend data to component format
  // Handle case where backendProperties might not be an array
  const propertiesArray = Array.isArray(backendProperties) ? backendProperties : []

  const properties = propertiesArray.map((prop: any) => {
    // Extract image URL and prefix with backend URL
    const imageUrl = prop.images?.[0]?.url

    // Use a default placeholder if no image is available
    let fullImageUrl = PLACEHOLDER_IMAGE

    if (imageUrl) {
      fullImageUrl = `${BACKEND_BASE}${imageUrl}`
    }

    return {
      id: prop._id,
      name: prop.title,
      type: prop.propertyType?.charAt(0).toUpperCase() + prop.propertyType?.slice(1) || 'Property',
      location: `${prop.location?.address || ''}, ${prop.location?.city || ''}`,
      targetReturn: `${prop.financials?.projectedYield || 0}%`,
      minInvestment: prop.financials?.minInvestment || 0,
      funded: prop.fundingProgress || 0,
      timeLeft: prop.status === 'upcoming' ? 'Coming soon' : prop.status === 'completed' ? 'Completed' : '-- days',
      image: fullImageUrl,
      status: prop.status === 'fully_funded' ? 'Funded' :
              prop.status === 'active' ? 'Funding' :
              prop.status === 'upcoming' ? 'New' : 'Funded',
      // Store full backend property for details modal
      backendProperty: prop
    }
  })

  // Show empty state if no properties
  if (properties.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Building className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="text-lg font-semibold">No Properties Available</h3>
          <p className="text-muted-foreground">There are no investment properties available at the moment.</p>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-100 text-blue-800"
      case "Funding": return "bg-yellow-100 text-yellow-800"
      case "Almost Funded": return "bg-orange-100 text-orange-800"
      case "Funded": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8" data-testid="investor-properties">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Properties</h1>
          <p className="text-muted-foreground">
            Discover and invest in premium real estate opportunities across Saudi Arabia
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-2">
            <Building className="w-4 h-4" />
            {properties.length} Properties Available
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Properties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search properties..." 
                className="pl-10"
                data-testid="input-search-properties" 
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-48" data-testid="select-property-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-48" data-testid="select-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="funding">Funding</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="almost-funded">Almost Funded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover-elevate transition-all duration-300 cursor-pointer" data-testid={`property-card-${property.id}`}>
            <div
              className="aspect-video bg-muted relative overflow-hidden cursor-pointer"
              onClick={() => {
                setSelectedProperty(property.backendProperty);
                setDetailsModalOpen(true);
              }}
            >
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Prevent infinite loop - only handle error once
                  if (e.currentTarget.dataset.errorHandled !== 'true') {
                    e.currentTarget.dataset.errorHandled = 'true';
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-3 left-3">
                <Badge className={getStatusColor(property.status)}>
                  {property.status}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-sm font-medium">{property.type}</p>
              </div>
            </div>

            <CardHeader
              onClick={() => {
                setSelectedProperty(property.backendProperty);
                setDetailsModalOpen(true);
              }}
              className="cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{property.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {property.location}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Investment Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Target Return</p>
                  <p className="font-semibold text-green-600">{property.targetReturn}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Min Investment</p>
                  <p className="font-semibold">SAR {property.minInvestment.toLocaleString()}</p>
                </div>
              </div>

              {/* Funding Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Funding Progress</span>
                  <span className="font-medium">{property.funded}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${property.funded}%` }}
                  />
                </div>
                {property.status !== "Funded" && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {property.timeLeft} remaining
                  </div>
                )}
              </div>

              {/* Action Button */}
              <Button
                className="w-full"
                disabled={property.status === "Funded"}
                onClick={() => setInvestDialog({
                  isOpen: true,
                  propertyId: property.id,
                  propertyName: property.name,
                  minInvestment: property.minInvestment,
                })}
                data-testid={`button-invest-${property.id}`}
              >
                {property.status === "Funded" ? "Fully Funded" : "Invest Now"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-8">
        <Button variant="outline" data-testid="button-load-more">
          Load More Properties
        </Button>
      </div>

      {/* Investment Dialog */}
      <InvestDialog
        propertyId={investDialog.propertyId}
        propertyName={investDialog.propertyName}
        minInvestment={investDialog.minInvestment}
        isOpen={investDialog.isOpen}
        onClose={() => setInvestDialog({ ...investDialog, isOpen: false })}
      />

      {/* Property Details Modal */}
      <PropertyDetailsModal
        isOpen={detailsModalOpen}
        property={selectedProperty}
        onClose={() => {
          setDetailsModalOpen(false);
          setSelectedProperty(null);
        }}
        onInvest={() => {
          if (selectedProperty) {
            setInvestDialog({
              isOpen: true,
              propertyId: selectedProperty._id,
              propertyName: selectedProperty.title,
              minInvestment: selectedProperty.financials?.minInvestment || 0,
            });
            setDetailsModalOpen(false);
          }
        }}
      />
    </div>
  )
}