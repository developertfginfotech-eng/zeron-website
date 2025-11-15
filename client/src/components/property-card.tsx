import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, TrendingUp, Users, Edit, Trash2, DollarSign, BarChart3, Activity, Shield } from "lucide-react"
import { Property } from "@shared/schema"

// Professional placeholder image with gradient and building icon
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMzYjgyZjY7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTBiOTgxO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PGcgb3BhY2l0eT0iMC4yIj48cGF0aCBkPSJNMzAwIDI1MGgxMDB2MjAwSDMwMHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNDAwIDI1MGgxMDB2MjAwSDQwMHoiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIzMjAiIHk9IjI4MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMzYwIiB5PSIyODAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjQyMCIgeT0iMjgwIiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiMwMDAiLz48cmVjdCB4PSI0NjAiIHk9IjI4MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iMzIwIiB5PSIzMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjM2MCIgeT0iMzIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiMwMDAiLz48cmVjdCB4PSI0MjAiIHk9IjMyMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iNDYwIiB5PSIzMjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjMyMCIgeT0iMzYwIiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiMwMDAiLz48cmVjdCB4PSIzNjAiIHk9IjM2MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjMDAwIi8+PHJlY3QgeD0iNDIwIiB5PSIzNjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjQ2MCIgeT0iMzYwIiB3aWR0aD0iMjAiIGhlaWdodD0iMzAiIGZpbGw9IiMwMDAiLz48L2c+PHRleHQgeD0iNDAwIiB5PSIzMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPklOVkVTVE1FTlQgUFJPUEVSVFk8L3RleHQ+PC9zdmc+'

interface PropertyCardProps {
  property: Property
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onDeactivate?: (id: string) => void
}

export function PropertyCard({ property, onEdit, onDelete, onDeactivate }: PropertyCardProps) {
  const statusColors = {
    live: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    closed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  const performanceColors = {
    excellent: "text-emerald-600",
    good: "text-green-600",
    stable: "text-blue-600",
    declining: "text-orange-600"
  }

  const handleEdit = () => {
    console.log('Edit property triggered:', property.id)
    onEdit?.(property.id)
  }

  const handleDelete = () => {
    console.log('Delete property triggered:', property.id)
    onDelete?.(property.id)
  }

  const handleDeactivate = () => {
    console.log('Deactivate property triggered:', property.id)
    onDeactivate?.(property.id)
  }

  // Determine if property can be deleted (only non-live properties without investments)
  const canDelete = property.status !== 'live' && Number(property.totalInvestment || 0) === 0
  
  // Determine if property should show deactivate option (live properties with investments)
  const shouldShowDeactivate = property.status === 'live' && Number(property.totalInvestment || 0) > 0

  return (
    <Card className="enhanced-card animate-scale-up group overflow-hidden" data-testid={`card-property-${property.id}`}>
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img
          src={property.images && property.images.length > 0 ? property.images[0] : PLACEHOLDER_IMAGE}
          alt={property.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          data-testid={`img-property-${property.id}`}
          onError={(e) => {
            if (e.currentTarget.dataset.errorHandled !== 'true') {
              e.currentTarget.dataset.errorHandled = 'true';
              e.currentTarget.src = PLACEHOLDER_IMAGE;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Badge className={`${statusColors[property.status as keyof typeof statusColors]} backdrop-blur-sm`}>
            {property.status}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg" data-testid={`text-property-title-${property.id}`}>
            {property.title}
          </CardTitle>
          <Badge 
            className={statusColors[property.status as keyof typeof statusColors]}
            data-testid={`badge-status-${property.id}`}
          >
            {property.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span data-testid={`text-location-${property.id}`}>{property.location}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-1 text-green-600" />
            <span data-testid={`text-yield-${property.id}`}>{property.yield}% Yield</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-blue-600" />
            <span data-testid={`text-ownership-${property.id}`}>{property.ownershipCap}% Cap</span>
          </div>
        </div>

        <div className="text-xl font-bold text-primary" data-testid={`text-price-${property.id}`}>
          SAR {Number(property.price).toLocaleString()}
        </div>

        {/* Investment Metrics */}
        {property.status === 'live' && (
          <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                <span className="text-muted-foreground">Investment</span>
              </div>
              <span className="font-semibold" data-testid={`text-investment-${property.id}`}>
                SAR {Number(property.totalInvestment || 0).toLocaleString()}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-blue-600" />
                <span className="text-muted-foreground">Investors</span>
              </div>
              <span className="font-semibold" data-testid={`text-investors-${property.id}`}>
                {property.investorCount || 0}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-1 text-purple-600" />
                <span className="text-muted-foreground">Occupancy</span>
              </div>
              <span className="font-semibold" data-testid={`text-occupancy-${property.id}`}>
                {property.occupancyRate || 0}%
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-1" />
                <span className="text-muted-foreground">Performance</span>
              </div>
              <span className={`font-semibold capitalize ${performanceColors[property.performance as keyof typeof performanceColors] || 'text-muted-foreground'}`} data-testid={`text-performance-${property.id}`}>
                {property.performance || 'stable'}
              </span>
            </div>
          </div>
        )}

        {property.description && (
          <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-description-${property.id}`}>
            {property.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleEdit}
          data-testid={`button-edit-${property.id}`}
          className="flex-1"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        
        {canDelete ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDelete}
            data-testid={`button-delete-${property.id}`}
            className="flex-1 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        ) : shouldShowDeactivate ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDeactivate}
            data-testid={`button-deactivate-${property.id}`}
            className="flex-1 text-orange-600 hover:text-orange-700"
          >
            <Shield className="h-4 w-4 mr-1" />
            Deactivate
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            disabled
            className="flex-1 opacity-50"
            title={property.status === 'live' ? 'Cannot delete live property with investments' : 'Property has active investments'}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            {property.status === 'live' ? 'Active' : 'Protected'}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}