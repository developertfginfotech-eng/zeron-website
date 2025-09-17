import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Search, MapPin, Users, TrendingUp, Heart, DollarSign } from "lucide-react"
import apartmentImg from '@assets/generated_images/luxury_apartment_building_exterior_e11af77f.png'
import officeImg from '@assets/generated_images/commercial_office_building_f8c8d53a.png'
import villaImg from '@assets/generated_images/luxury_villa_property_b02d7e37.png'
import retailImg from '@assets/generated_images/retail_shopping_complex_10ee6fbf.png'

const mockProperties = [
  {
    id: '2',
    name: 'Premium Office Complex',
    type: 'commercial',
    location: 'Riyadh Business District',
    price: 2500000,
    size: 15000,
    roi: 8.5,
    occupancyRate: 95,
    totalUnits: 50,
    availableUnits: 2,
    description: 'Modern office complex in prime business location',
    image: officeImg,
    status: 'upcoming',
    minInvestment: 25000,
    targetAmount: 2500000,
    raisedAmount: 1875000,
    investorCount: 75,
    expectedReturns: '8-10% annually'
  },
  {
    id: '3',
    name: 'Luxury Villa Development',
    type: 'residential',
    location: 'Al-Malqa, Riyadh',
    price: 5500000,
    size: 25000,
    roi: 12.0,
    occupancyRate: 0,
    totalUnits: 20,
    availableUnits: 20,
    description: 'Exclusive luxury villa community',
    image: villaImg,
    status: 'upcoming',
    minInvestment: 50000,
    targetAmount: 5500000,
    raisedAmount: 2750000,
    investorCount: 55,
    expectedReturns: '12-15% annually'
  }
]

export default function MobileProperties() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [isInvestDialogOpen, setIsInvestDialogOpen] = useState(false)
  const [investmentAmount, setInvestmentAmount] = useState("")

  const filteredProperties = mockProperties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleInvestClick = (property: any) => {
    setSelectedProperty(property)
    setIsInvestDialogOpen(true)
  }

  const handleInvestmentSubmit = () => {
    const amount = parseFloat(investmentAmount)
    if (!amount || amount < selectedProperty.minInvestment) {
      toast({
        title: "Invalid Amount",
        description: `Minimum investment is SAR ${selectedProperty.minInvestment.toLocaleString()}`,
        variant: "destructive"
      })
      return
    }

    // In real app, this would process the investment
    toast({
      title: "Investment Submitted",
      description: `Your investment of SAR ${amount.toLocaleString()} has been submitted for review.`,
    })

    setIsInvestDialogOpen(false)
    setInvestmentAmount("")
    setSelectedProperty(null)
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Investment Properties</h1>
        <p className="text-muted-foreground">Discover and invest in premium real estate opportunities</p>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-property-search"
          />
        </div>
      </div>

      {/* Properties Grid */}
      <div className="space-y-4">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={property.image} 
                alt={property.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary" className="bg-black/50 text-white border-0">
                  {property.type}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Button size="icon" variant="ghost" className="bg-black/50 text-white hover:bg-black/70">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{property.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">{property.roi}% ROI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-4 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{property.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{property.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Property Value</p>
                  <p className="font-semibold">SAR {property.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Min. Investment</p>
                  <p className="font-semibold">SAR {property.minInvestment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Expected Returns</p>
                  <p className="font-semibold text-green-600">{property.expectedReturns}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{property.investorCount} investors</span>
                </div>
              </div>

              {/* Investment Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Funding Progress</span>
                  <span className="font-medium">
                    {Math.round((property.raisedAmount / property.targetAmount) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(property.raisedAmount / property.targetAmount) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>SAR {property.raisedAmount.toLocaleString()} raised</span>
                  <span>SAR {property.targetAmount.toLocaleString()} target</span>
                </div>
              </div>

              <Button 
                className="w-full" 
                onClick={() => handleInvestClick(property)}
                data-testid={`button-invest-${property.id}`}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Invest Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No properties found matching your search</p>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Investment Dialog */}
      <Dialog open={isInvestDialogOpen} onOpenChange={setIsInvestDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invest in {selectedProperty?.name}</DialogTitle>
            <DialogDescription>
              Enter your investment amount to proceed with this opportunity.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="investment-amount">Investment Amount (SAR)</Label>
              <Input
                id="investment-amount"
                type="number"
                placeholder={`Min. ${selectedProperty?.minInvestment?.toLocaleString()}`}
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                data-testid="input-investment-amount"
              />
              <p className="text-xs text-muted-foreground">
                Minimum investment: SAR {selectedProperty?.minInvestment?.toLocaleString()}
              </p>
            </div>

            <div className="bg-muted p-3 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Expected ROI</span>
                <span className="font-medium">{selectedProperty?.roi}% annually</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Investment Term</span>
                <span className="font-medium">3-5 years</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Property Type</span>
                <span className="font-medium capitalize">{selectedProperty?.type}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInvestDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleInvestmentSubmit}
              data-testid="button-confirm-investment"
            >
              Submit Investment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}