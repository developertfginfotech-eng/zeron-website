import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PropertyFormProps {
  onSubmit?: (data: any) => void
  onCancel?: () => void
  initialData?: any
}

export function PropertyForm({ onSubmit, onCancel, initialData }: PropertyFormProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    location: initialData?.location || '',
    price: initialData?.price || '',
    propertyType: initialData?.propertyType || '',
    yield: initialData?.yield || '',
    ownershipCap: initialData?.ownershipCap || '100',
    status: initialData?.status || 'upcoming',
    images: initialData?.images || []
  })

  const [imageUpload, setImageUpload] = useState('')

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddImage = () => {
    if (imageUpload.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageUpload.trim()]
      }))
      setImageUpload('')
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Property form submitted:', formData)
    toast({
      title: "Property Saved",
      description: "Property has been successfully saved.",
    })
    onSubmit?.(formData)
  }

  return (
    <form onSubmit={handleSubmit} data-testid="form-property">
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? 'Edit Property' : 'Add New Property'}</CardTitle>
          <CardDescription>
            {initialData ? 'Update property details' : 'Enter the details for the new property listing'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter property title"
                required
                data-testid="input-title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter property location"
                required
                data-testid="input-location"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter property description"
              rows={3}
              data-testid="textarea-description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (SAR)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0"
                required
                data-testid="input-price"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yield">Expected Yield (%)</Label>
              <Input
                id="yield"
                type="number"
                step="0.1"
                value={formData.yield}
                onChange={(e) => handleInputChange('yield', e.target.value)}
                placeholder="0.0"
                data-testid="input-yield"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownershipCap">Ownership Cap (%)</Label>
              <Input
                id="ownershipCap"
                type="number"
                value={formData.ownershipCap}
                onChange={(e) => handleInputChange('ownershipCap', e.target.value)}
                placeholder="100"
                data-testid="input-ownership-cap"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                <SelectTrigger data-testid="select-property-type">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="mixed-use">Mixed Use</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger data-testid="select-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Property Images</Label>
            <div className="flex gap-2">
              <Input
                value={imageUpload}
                onChange={(e) => setImageUpload(e.target.value)}
                placeholder="Enter image URL"
                data-testid="input-image-url"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddImage}
                data-testid="button-add-image"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.images.length > 0 && (
              <div className="space-y-2">
                {formData.images.map((image: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 text-sm truncate" data-testid={`text-image-${index}`}>{image}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveImage(index)}
                      data-testid={`button-remove-image-${index}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" data-testid="button-submit">
              {initialData ? 'Update Property' : 'Create Property'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}