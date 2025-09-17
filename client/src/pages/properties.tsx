import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PropertyCard } from "@/components/property-card"
import { PropertyForm } from "@/components/property-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Plus, ArrowLeft } from "lucide-react"
import { Property } from "@shared/schema"
import apartmentImg from '@assets/generated_images/luxury_apartment_building_exterior_e11af77f.png'
import officeImg from '@assets/generated_images/commercial_office_building_f8c8d53a.png'
import villaImg from '@assets/generated_images/luxury_villa_property_b02d7e37.png'
import retailImg from '@assets/generated_images/retail_shopping_complex_10ee6fbf.png'

export default function Properties() {
  // todo: remove mock functionality
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)

  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Luxury Apartment Complex',
      description: 'Modern residential complex in the heart of Riyadh with premium amenities and excellent rental yield potential.',
      location: 'Olaya District, Riyadh',
      price: '2500000',
      propertyType: 'residential',
      yield: '8.5',
      ownershipCap: 75,
      status: 'live',
      images: [apartmentImg],
      // Investment tracking data
      totalInvestment: '1875000', // 75% of price invested
      investorCount: 43,
      currentOwnership: '75.0', // percentage owned
      monthlyRevenue: '18750',
      totalRevenue: '562500', // 30 months of revenue
      occupancyRate: '92.5',
      performance: 'excellent',
      lastDividendDate: new Date('2024-01-15'),
      deactivationReason: null,
      deactivatedAt: null,
      deactivatedBy: null,
      createdAt: new Date('2023-06-15'),
    },
    {
      id: '2',
      title: 'Commercial Office Tower',
      description: 'Prime commercial space in the business district with high-end office facilities and parking.',
      location: 'King Fahd District, Riyadh',
      price: '8750000',
      propertyType: 'commercial',
      yield: '12.2',
      ownershipCap: 60,
      status: 'upcoming',
      images: [officeImg],
      // Investment tracking data
      totalInvestment: '0', // upcoming property, no investments yet
      investorCount: 0,
      currentOwnership: '0',
      monthlyRevenue: '0',
      totalRevenue: '0',
      occupancyRate: '0',
      performance: 'stable',
      lastDividendDate: null,
      deactivationReason: null,
      deactivatedAt: null,
      deactivatedBy: null,
      createdAt: new Date('2023-09-10'),
    },
    {
      id: '3',
      title: 'Luxury Villa Compound',
      description: 'Exclusive villa compound with traditional Saudi architecture and modern amenities.',
      location: 'Diplomatic Quarter, Riyadh',
      price: '15000000',
      propertyType: 'residential',
      yield: '6.8',
      ownershipCap: 40,
      status: 'upcoming',
      images: [villaImg],
      // Investment tracking data
      totalInvestment: '0', // upcoming property, no investments yet
      investorCount: 0,
      currentOwnership: '0',
      monthlyRevenue: '0',
      totalRevenue: '0',
      occupancyRate: '0',
      performance: 'stable',
      lastDividendDate: null,
      deactivationReason: null,
      deactivatedAt: null,
      deactivatedBy: null,
      createdAt: new Date('2023-11-20'),
    },
    {
      id: '4',
      title: 'Retail Shopping Complex',
      description: 'Modern retail center in a high-traffic area with diverse shopping and dining options.',
      location: 'Al Malaz District, Riyadh',
      price: '12000000',
      propertyType: 'retail',
      yield: '10.5',
      ownershipCap: 80,
      status: 'live',
      images: [retailImg],
      // Investment tracking data
      totalInvestment: '9600000', // 80% of price invested
      investorCount: 67,
      currentOwnership: '80.0',
      monthlyRevenue: '84000',
      totalRevenue: '1680000', // 20 months of revenue
      occupancyRate: '88.0',
      performance: 'good',
      lastDividendDate: new Date('2024-01-31'),
      deactivationReason: null,
      deactivatedAt: null,
      deactivatedBy: null,
      createdAt: new Date('2023-07-22'),
    },
  ])

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || property.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddProperty = () => {
    setEditingProperty(null)
    setShowForm(true)
  }

  const handleEditProperty = (id: string) => {
    const property = mockProperties.find(p => p.id === id)
    if (property) {
      setEditingProperty(property)
      setShowForm(true)
    }
  }

  const handleDeleteProperty = (id: string) => {
    console.log('Delete property triggered:', id)
    // In real app, this would delete the property
  }

  const handleFormSubmit = (data: any) => {
    console.log('Property form submitted:', data)
    setShowForm(false)
    setEditingProperty(null)
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingProperty(null)
  }

  if (showForm) {
    return (
      <div className="p-6 space-y-6" data-testid="page-property-form">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleFormCancel} data-testid="button-back-to-properties">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Properties
          </Button>
          <h1 className="text-3xl font-bold">
            {editingProperty ? 'Edit Property' : 'Add New Property'}
          </h1>
        </div>
        <PropertyForm
          initialData={editingProperty}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6" data-testid="page-properties">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-properties-title">Property Management</h1>
          <p className="text-muted-foreground">Manage property listings and track investment opportunities</p>
        </div>
        <Button onClick={handleAddProperty} data-testid="button-add-property">
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
          <CardDescription>Find properties by title, location, or status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search-properties"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48" data-testid="select-status-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="live">Live</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">
            Properties ({filteredProperties.length})
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline">
              {properties.filter(p => p.status === 'live').length} Live
            </Badge>
            <Badge variant="outline">
              {properties.filter(p => p.status === 'upcoming').length} Upcoming
            </Badge>
            <Badge variant="outline">
              {properties.filter(p => p.status === 'closed').length} Closed
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onEdit={handleEditProperty}
            onDelete={handleDeleteProperty}
          />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No properties found matching your criteria</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
            }} data-testid="button-clear-filters">
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}