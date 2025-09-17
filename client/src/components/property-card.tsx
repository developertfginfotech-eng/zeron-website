import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, TrendingUp, Users, Edit, Trash2 } from "lucide-react"
import { Property } from "@shared/schema"

interface PropertyCardProps {
  property: Property
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function PropertyCard({ property, onEdit, onDelete }: PropertyCardProps) {
  const statusColors = {
    live: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    closed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  const handleEdit = () => {
    console.log('Edit property triggered:', property.id)
    onEdit?.(property.id)
  }

  const handleDelete = () => {
    console.log('Delete property triggered:', property.id)
    onDelete?.(property.id)
  }

  return (
    <Card className="enhanced-card animate-scale-up group overflow-hidden" data-testid={`card-property-${property.id}`}>
      {property.images && property.images.length > 0 && (
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <img
            src={property.images[0]}
            alt={property.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            data-testid={`img-property-${property.id}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Badge className={`${statusColors[property.status as keyof typeof statusColors]} backdrop-blur-sm`}>
              {property.status}
            </Badge>
          </div>
        </div>
      )}
      
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

      <CardContent className="space-y-3">
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
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleDelete}
          data-testid={`button-delete-${property.id}`}
          className="flex-1"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}