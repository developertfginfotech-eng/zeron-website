import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import { 
  Search, 
  MapPin, 
  Users, 
  TrendingUp, 
  Heart, 
  DollarSign, 
  Building,
  Filter,
  SlidersHorizontal,
  Star,
  Sparkles,
  Shield,
  Target,
  Calendar,
  BarChart3,
  ChevronDown,
  X,
  Eye,
  Share2,
  Bookmark,
  Crown,
  Globe,
  Zap
} from "lucide-react"

interface Property {
  id: string
  title: string
  titleAr: string
  titleHi: string
  location: string
  locationAr: string
  locationHi: string
  price: number
  roi: number
  type: string
  description: string
  descriptionAr: string
  descriptionHi: string
  image: string
  minInvestment: number
  targetAmount: number
  raisedAmount: number
  investorCount: number
  shariahCompliant: boolean
  vision2030: boolean
  featured: boolean
  status: "active" | "upcoming" | "completed"
  completionDate?: string
  size: number
  totalUnits: number
  availableUnits: number
  expectedReturns: string
  riskLevel: "low" | "medium" | "high"
  category: "residential" | "commercial" | "mixed" | "hospitality" | "industrial"
  amenities: string[]
  developmentStage: "planning" | "construction" | "near_completion" | "ready"
}

const saudiProperties: Property[] = [
  {
    id: "1",
    title: "NEOM The Line Residences",
    titleAr: "مساكن ذا لاين نيوم",
    titleHi: "नियोम द लाइन निवास",
    location: "NEOM, Tabuk Province",
    locationAr: "نيوم، منطقة تبوك",
    locationHi: "नियोम, तबूक प्रांत",
    price: 8500000,
    roi: 18.5,
    type: "Futuristic Smart City",
    description: "Revolutionary linear city with mirror-clad walls stretching 170km through mountains and desert",
    descriptionAr: "مدينة خطية ثورية بجدران مكسوة بالمرايا تمتد 170 كم عبر الجبال والصحراء",
    descriptionHi: "पहाड़ों और रेगिस्तान के माध्यम से 170 किमी तक फैली दर्पण-क्लैड दीवारों के साथ क्रांतिकारी रैखिक शहर",
    image: "/api/placeholder/400/300",
    minInvestment: 100000,
    targetAmount: 8500000,
    raisedAmount: 5950000,
    investorCount: 189,
    shariahCompliant: true,
    vision2030: true,
    featured: true,
    status: "active",
    completionDate: "2030",
    size: 34000,
    totalUnits: 850,
    availableUnits: 298,
    expectedReturns: "15-20% annually",
    riskLevel: "medium",
    category: "residential",
    amenities: ["AI Integration", "Renewable Energy", "Climate Control", "Hyperloop", "Vertical Farming"],
    developmentStage: "construction"
  },
  {
    id: "2",
    title: "Red Sea Global Marina",
    titleAr: "مارينا البحر الأحمر العالمية",
    titleHi: "रेड सी ग्लोबल मरीना",
    location: "Red Sea Project",
    locationAr: "مشروع البحر الأحمر",
    locationHi: "रेड सी प्रोजेक्ट",
    price: 12200000,
    roi: 22.3,
    type: "Luxury Resort & Marina",
    description: "Ultra-luxury regenerative tourism destination with world-class marina and pristine coral reefs",
    descriptionAr: "وجهة سياحية متجددة فائقة الفخامة مع مارينا عالمية المستوى وشعاب مرجانية نقية",
    descriptionHi: "विश्व स्तरीय मरीना और प्राचीन कोरल रीफ के साथ अल्ट्रा-लक्जरी पुनर्योजी पर्यटन गंतव्य",
    image: "/api/placeholder/400/300",
    minInvestment: 200000,
    targetAmount: 12200000,
    raisedAmount: 9150000,
    investorCount: 156,
    shariahCompliant: true,
    vision2030: true,
    featured: true,
    status: "active",
    completionDate: "2030",
    size: 28000,
    totalUnits: 420,
    availableUnits: 125,
    expectedReturns: "20-25% annually",
    riskLevel: "low",
    category: "hospitality",
    amenities: ["Private Beach", "Coral Restoration", "Solar Power", "Desalination", "Yacht Club"],
    developmentStage: "construction"
  },
  {
    id: "3",
    title: "Qiddiya Entertainment City",
    titleAr: "مدينة القدية الترفيهية",
    titleHi: "किद्दिया मनोरंजन शहर",
    location: "Riyadh, Central Region",
    locationAr: "الرياض، المنطقة الوسطى",
    locationHi: "रियाध, मध्य क्षेत्र",
    price: 6800000,
    roi: 16.8,
    type: "Entertainment & Sports Hub",
    description: "World's largest entertainment, sports, and arts destination spanning 334 square kilometers",
    descriptionAr: "أكبر وجهة ترفيهية ورياضية وفنية في العالم تمتد على 334 كيلومتر مربع",
    descriptionHi: "334 वर्ग किलोमीटर में फैला दुनिया का सबसे बड़ा मनोरंजन, खेल और कला गंतव्य",
    image: "/api/placeholder/400/300",
    minInvestment: 75000,
    targetAmount: 6800000,
    raisedAmount: 4760000,
    investorCount: 203,
    shariahCompliant: true,
    vision2030: true,
    featured: false,
    status: "active",
    completionDate: "2030",
    size: 334000000,
    totalUnits: 680,
    availableUnits: 204,
    expectedReturns: "14-18% annually",
    riskLevel: "medium",
    category: "commercial",
    amenities: ["Theme Parks", "Sports Venues", "Gaming Arena", "Cultural Center", "Racing Circuit"],
    developmentStage: "construction"
  },
  {
    id: "4",
    title: "KAEC Financial District",
    titleAr: "الحي المالي مدينة الملك عبدالله الاقتصادية",
    titleHi: "केएईसी वित्तीय जिला",
    location: "King Abdullah Economic City",
    locationAr: "مدينة الملك عبدالله الاقتصادية",
    locationHi: "किंग अब्दुल्लाह इकनॉमिक सिटी",
    price: 4200000,
    roi: 14.2,
    type: "Financial & Business Hub",
    description: "Modern financial district with smart buildings and integrated business ecosystem",
    descriptionAr: "حي مالي حديث مع مباني ذكية ونظام بيئي متكامل للأعمال",
    descriptionHi: "स्मार्ट बिल्डिंगों और एकीकृत व्यापार पारिस्थितिकी तंत्र के साथ आधुनिक वित्तीय जिला",
    image: "/api/placeholder/400/300",
    minInvestment: 50000,
    targetAmount: 4200000,
    raisedAmount: 2940000,
    investorCount: 98,
    shariahCompliant: true,
    vision2030: true,
    featured: false,
    status: "upcoming",
    completionDate: "2028",
    size: 42000,
    totalUnits: 280,
    availableUnits: 168,
    expectedReturns: "12-16% annually",
    riskLevel: "low",
    category: "commercial",
    amenities: ["Smart Offices", "Conference Centers", "Banking Hub", "Retail Plaza", "Transport Hub"],
    developmentStage: "planning"
  },
  {
    id: "5",
    title: "Amaala Triple Bay Resort",
    titleAr: "منتجع أمالا الخليج الثلاثي",
    titleHi: "अमाला ट्रिपल बे रिज़ॉर्ट",
    location: "Amaala, Tabuk Province",
    locationAr: "أمالا، منطقة تبوك",
    locationHi: "अमाला, तबूक प्रांत",
    price: 9500000,
    roi: 19.7,
    type: "Ultra-Luxury Wellness Resort",
    description: "Wellness-focused ultra-luxury destination with pristine beaches and world-class spas",
    descriptionAr: "وجهة فائقة الفخامة تركز على الصحة مع شواطئ نقية ومنتجعات صحية عالمية المستوى",
    descriptionHi: "प्राचीन समुद्र तटों और विश्व स्तरीय स्पा के साथ कल्याण-केंद्रित अल्ट्रा-लक्जरी गंतव्य",
    image: "/api/placeholder/400/300",
    minInvestment: 150000,
    targetAmount: 9500000,
    raisedAmount: 6650000,
    investorCount: 134,
    shariahCompliant: true,
    vision2030: true,
    featured: true,
    status: "active",
    completionDate: "2030",
    size: 46500,
    totalUnits: 380,
    availableUnits: 133,
    expectedReturns: "17-22% annually",
    riskLevel: "medium",
    category: "hospitality",
    amenities: ["Wellness Centers", "Private Villas", "Art Galleries", "Organic Farms", "Healing Gardens"],
    developmentStage: "construction"
  }
]

const filterOptions = {
  type: ["All Types", "Residential", "Commercial", "Mixed", "Hospitality", "Industrial"],
  riskLevel: ["All Risk Levels", "Low Risk", "Medium Risk", "High Risk"],
  price: [0, 15000000],
  roi: [0, 25],
  category: ["All Categories", "Vision 2030", "Shariah Compliant", "Featured", "New Launch"]
}

export default function MobileProperties() {
  const { t, language } = useTranslation()
  const { toast } = useToast()
  
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isInvestDialogOpen, setIsInvestDialogOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"newest" | "price_low" | "price_high" | "roi_high" | "popularity">("newest")
  
  // Filter states
  const [filters, setFilters] = useState({
    type: "All Types",
    riskLevel: "All Risk Levels",
    priceRange: [0, 15000000] as [number, number],
    roiRange: [0, 25] as [number, number],
    category: "All Categories",
    shariahOnly: false,
    vision2030Only: false,
    featuredOnly: false
  })

  const handleFavoriteToggle = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const handleInvestClick = (property: Property) => {
    setSelectedProperty(property)
    setIsInvestDialogOpen(true)
  }

  const handleInvestmentSubmit = () => {
    const amount = parseFloat(investmentAmount)
    if (!amount || amount < selectedProperty!.minInvestment) {
      toast({
        title: "Invalid Amount",
        description: `Minimum investment is SAR ${selectedProperty!.minInvestment.toLocaleString()}`,
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Investment Submitted",
      description: `Your investment of SAR ${amount.toLocaleString()} has been submitted for review.`,
    })

    setIsInvestDialogOpen(false)
    setInvestmentAmount("")
    setSelectedProperty(null)
  }

  const applyFilters = (properties: Property[]) => {
    return properties.filter(property => {
      // Search term filter
      const searchMatch = !searchTerm || 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.titleAr.includes(searchTerm) ||
        property.titleHi.includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.locationAr.includes(searchTerm) ||
        property.locationHi.includes(searchTerm) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase())

      // Type filter
      const typeMatch = filters.type === "All Types" || 
        property.category.toLowerCase() === filters.type.toLowerCase()

      // Risk level filter
      const riskMatch = filters.riskLevel === "All Risk Levels" ||
        property.riskLevel.toLowerCase() === filters.riskLevel.toLowerCase().replace(" risk", "")

      // Price range filter
      const priceMatch = property.price >= filters.priceRange[0] && 
        property.price <= filters.priceRange[1]

      // ROI range filter
      const roiMatch = property.roi >= filters.roiRange[0] && 
        property.roi <= filters.roiRange[1]

      // Category filters
      const categoryMatch = filters.category === "All Categories" ||
        (filters.category === "Vision 2030" && property.vision2030) ||
        (filters.category === "Shariah Compliant" && property.shariahCompliant) ||
        (filters.category === "Featured" && property.featured) ||
        (filters.category === "New Launch" && property.status === "upcoming")

      // Additional filters
      const shariahMatch = !filters.shariahOnly || property.shariahCompliant
      const visionMatch = !filters.vision2030Only || property.vision2030
      const featuredMatch = !filters.featuredOnly || property.featured

      return searchMatch && typeMatch && riskMatch && priceMatch && 
             roiMatch && categoryMatch && shariahMatch && visionMatch && featuredMatch
    })
  }

  const sortProperties = (properties: Property[]) => {
    const sorted = [...properties]
    switch (sortBy) {
      case "price_low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price_high":
        return sorted.sort((a, b) => b.price - a.price)
      case "roi_high":
        return sorted.sort((a, b) => b.roi - a.roi)
      case "popularity":
        return sorted.sort((a, b) => b.investorCount - a.investorCount)
      case "newest":
      default:
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  }

  const filteredAndSortedProperties = sortProperties(applyFilters(saudiProperties))

  const clearFilters = () => {
    setFilters({
      type: "All Types",
      riskLevel: "All Risk Levels",
      priceRange: [0, 15000000],
      roiRange: [0, 25],
      category: "All Categories",
      shariahOnly: false,
      vision2030Only: false,
      featuredOnly: false
    })
    setSearchTerm("")
  }

  const getPropertyTitle = (property: Property) => {
    if (language === 'ar') return property.titleAr
    if (language === 'hi') return property.titleHi
    return property.title
  }

  const getPropertyLocation = (property: Property) => {
    if (language === 'ar') return property.locationAr
    if (language === 'hi') return property.locationHi
    return property.location
  }

  const getPropertyDescription = (property: Property) => {
    if (language === 'ar') return property.descriptionAr
    if (language === 'hi') return property.descriptionHi
    return property.description
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-8 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse opacity-60" />
        <div className="absolute bottom-40 right-12 w-80 h-80 bg-gradient-to-tl from-secondary/10 to-transparent rounded-full blur-3xl animate-pulse opacity-40" />
      </div>

      <div className="relative z-10 p-6 pb-28 space-y-8">
        {/* Enhanced Header */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              {t("properties")}
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover Vision 2030 Investment Opportunities
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search NEOM, Red Sea, Qiddiya..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-16 h-14 text-lg bg-card/50 backdrop-blur-sm border-2 border-border/50 focus:border-primary/50 shadow-lg"
              data-testid="input-property-search"
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsFilterOpen(true)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 bg-primary/10 hover:bg-primary/20"
              data-testid="button-open-filters"
            >
              <SlidersHorizontal className="h-5 w-5 text-primary" />
            </Button>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {["Vision 2030", "Shariah Compliant", "Featured", "High ROI"].map((filter) => (
              <Button
                key={filter}
                size="sm"
                variant={filters.category === filter ? "default" : "outline"}
                onClick={() => setFilters(prev => ({ 
                  ...prev, 
                  category: prev.category === filter ? "All Categories" : filter 
                }))}
                className="min-w-fit whitespace-nowrap bg-card/50 backdrop-blur-sm"
                data-testid={`button-quick-filter-${filter.toLowerCase().replace(" ", "-")}`}
              >
                {filter === "Vision 2030" && <Target className="w-3 h-3 mr-1" />}
                {filter === "Shariah Compliant" && <Shield className="w-3 h-3 mr-1" />}
                {filter === "Featured" && <Star className="w-3 h-3 mr-1" />}
                {filter === "High ROI" && <TrendingUp className="w-3 h-3 mr-1" />}
                {filter}
              </Button>
            ))}
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredAndSortedProperties.length} properties found
            </p>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-40 bg-card/50 backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="roi_high">Highest ROI</SelectItem>
                <SelectItem value="popularity">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence>
            {filteredAndSortedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-card via-card/95 to-card/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 group">
                  {/* Property Image */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      {property.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                          <Crown className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {property.vision2030 && (
                        <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white border-0 shadow-lg">
                          <Target className="w-3 h-3 mr-1" />
                          Vision 2030
                        </Badge>
                      )}
                      {property.shariahCompliant && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
                          <Shield className="w-3 h-3 mr-1" />
                          Halal
                        </Badge>
                      )}
                    </div>

                    {/* Top Right Actions */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleFavoriteToggle(property.id)}
                        className={`w-10 h-10 rounded-full backdrop-blur-xl border border-white/20 transition-all duration-300 ${
                          favorites.includes(property.id)
                            ? 'bg-red-500/90 hover:bg-red-600/90 text-white'
                            : 'bg-black/50 hover:bg-black/70 text-white'
                        }`}
                        data-testid={`button-favorite-${property.id}`}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(property.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-xl border border-white/20"
                        data-testid={`button-share-${property.id}`}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Bottom Property Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center justify-between text-white mb-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm font-medium">{getPropertyLocation(property)}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-emerald-500/20 px-3 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-sm font-bold">{property.roi}% ROI</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-white/80 text-xs">
                          <span>{property.category.charAt(0).toUpperCase() + property.category.slice(1)}</span>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{property.investorCount} investors</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary/80"
                        style={{ width: `${(property.raisedAmount / property.targetAmount) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Property Details */}
                  <CardContent className="p-6 space-y-6">
                    {/* Title and Price */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                        {getPropertyTitle(property)}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {getPropertyDescription(property)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-primary">
                            {property.price.toLocaleString()} SAR
                          </p>
                          <p className="text-xs text-muted-foreground">Property Value</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-foreground">
                            {property.minInvestment.toLocaleString()} SAR
                          </p>
                          <p className="text-xs text-muted-foreground">Min. Investment</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                        <BarChart3 className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                        <p className="text-xs text-blue-700 font-medium">Expected Returns</p>
                        <p className="text-sm font-bold text-blue-800">{property.expectedReturns}</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                        <Shield className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                        <p className="text-xs text-emerald-700 font-medium">Risk Level</p>
                        <p className="text-sm font-bold text-emerald-800 capitalize">{property.riskLevel}</p>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                        <Calendar className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                        <p className="text-xs text-purple-700 font-medium">Completion</p>
                        <p className="text-sm font-bold text-purple-800">{property.completionDate}</p>
                      </div>
                    </div>

                    {/* Funding Progress */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Funding Progress</span>
                        <span className="text-sm font-bold text-primary">
                          {Math.round((property.raisedAmount / property.targetAmount) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-primary to-primary/80 h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(property.raisedAmount / property.targetAmount) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{property.raisedAmount.toLocaleString()} SAR raised</span>
                        <span>{property.targetAmount.toLocaleString()} SAR target</span>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Key Features</p>
                      <div className="flex flex-wrap gap-2">
                        {property.amenities.slice(0, 3).map((amenity) => (
                          <Badge 
                            key={amenity}
                            variant="secondary" 
                            className="text-xs bg-muted/50 hover:bg-muted transition-colors"
                          >
                            {amenity}
                          </Badge>
                        ))}
                        {property.amenities.length > 3 && (
                          <Badge variant="secondary" className="text-xs bg-muted/50">
                            +{property.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg" 
                        onClick={() => handleInvestClick(property)}
                        data-testid={`button-invest-${property.id}`}
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Invest Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-12 w-12 border-2 hover:bg-primary/10"
                        data-testid={`button-view-details-${property.id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredAndSortedProperties.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Card className="p-8 max-w-md mx-auto bg-card/50 backdrop-blur-sm">
              <CardContent className="space-y-4">
                <Building className="w-16 h-16 text-muted-foreground mx-auto" />
                <h3 className="text-xl font-semibold">No Properties Found</h3>
                <p className="text-muted-foreground">
                  No properties match your current search and filter criteria.
                </p>
                <Button 
                  onClick={clearFilters}
                  className="w-full"
                  data-testid="button-clear-filters"
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Investment Dialog */}
        <Dialog open={isInvestDialogOpen} onOpenChange={setIsInvestDialogOpen}>
          <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border/50">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Invest in {selectedProperty ? getPropertyTitle(selectedProperty) : ''}
              </DialogTitle>
              <DialogDescription className="text-base">
                Enter your investment amount to proceed with this Vision 2030 opportunity.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="investment-amount" className="text-sm font-medium">
                  Investment Amount (SAR)
                </Label>
                <Input
                  id="investment-amount"
                  type="number"
                  placeholder={`Min. ${selectedProperty?.minInvestment?.toLocaleString()}`}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="h-12 text-lg bg-background/50"
                  data-testid="input-investment-amount"
                />
                <p className="text-xs text-muted-foreground">
                  Minimum investment: SAR {selectedProperty?.minInvestment?.toLocaleString()}
                </p>
              </div>

              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Expected ROI</span>
                    <span className="font-semibold text-emerald-600">{selectedProperty?.roi}% annually</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Investment Term</span>
                    <span className="font-semibold">3-5 years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Property Type</span>
                    <span className="font-semibold capitalize">{selectedProperty?.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Risk Level</span>
                    <span className="font-semibold capitalize">{selectedProperty?.riskLevel}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsInvestDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleInvestmentSubmit}
                className="flex-1 bg-gradient-to-r from-primary to-primary/90"
                data-testid="button-confirm-investment"
              >
                Submit Investment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Advanced Filters Dialog */}
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-xl border-border/50 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                Advanced Filters
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Property Type */}
              <div className="space-y-3">
                <Label>Property Type</Label>
                <Select 
                  value={filters.type} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.type.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Risk Level */}
              <div className="space-y-3">
                <Label>Risk Level</Label>
                <Select 
                  value={filters.riskLevel} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, riskLevel: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.riskLevel.map(risk => (
                      <SelectItem key={risk} value={risk}>{risk}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <Label>Price Range (SAR)</Label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                  max={15000000}
                  min={0}
                  step={100000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{filters.priceRange[0].toLocaleString()} SAR</span>
                  <span>{filters.priceRange[1].toLocaleString()} SAR</span>
                </div>
              </div>

              {/* ROI Range */}
              <div className="space-y-3">
                <Label>Expected ROI (%)</Label>
                <Slider
                  value={filters.roiRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, roiRange: value as [number, number] }))}
                  max={25}
                  min={0}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{filters.roiRange[0]}%</span>
                  <span>{filters.roiRange[1]}%</span>
                </div>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="flex-1"
              >
                Clear All
              </Button>
              <Button 
                onClick={() => setIsFilterOpen(false)}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}