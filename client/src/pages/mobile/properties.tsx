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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import luxuryApartmentImg from '@assets/generated_images/luxury_apartment_building_exterior_e11af77f.png'
import luxuryVillaImg from '@assets/generated_images/luxury_villa_property_b02d7e37.png'
import commercialOfficeImg from '@assets/generated_images/commercial_office_building_f8c8d53a.png'
import retailComplexImg from '@assets/generated_images/retail_shopping_complex_10ee6fbf.png'
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
  Zap,
  ImageIcon,
  Clock,
  Home,
  FileText,
  Calculator,
  PieChart,
  TrendingDown,
  Percent,
  Layers,
  ArrowRight,
  MapPinIcon,
  Info,
  CheckCircle2,
  AlertTriangle,
  CircleDollarSign,
  Award,
  Activity
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
  images: string[]
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
  financialMetrics: {
    irr: number // Internal Rate of Return
    noi: number // Net Operating Income
    capRate: number // Capitalization Rate
    cashOnCash: number // Cash-on-Cash Return
    totalCostOfProject: number
    loanToValue: number // LTV ratio
    debtServiceCoverage: number // DSCR
    breakEvenOccupancy: number
  }
  investmentHighlights: string[]
  risks: string[]
  marketAnalysis: {
    averageRent: number
    marketGrowth: number
    competitorAnalysis: string
    demographic: string
  }
  legalStructure: {
    ownership: string
    managementFees: number
    exitStrategy: string
    taxation: string
  }
  timeline: {
    phase: string
    milestones: Array<{
      name: string
      date: string
      status: "completed" | "pending" | "in_progress"
    }>
  }
  developer: {
    name: string
    experience: string
    reputation: number
    previousProjects: number
  }
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
    images: [luxuryApartmentImg, luxuryVillaImg, commercialOfficeImg],
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
    developmentStage: "construction",
    financialMetrics: {
      irr: 21.4,
      noi: 1530000,
      capRate: 6.8,
      cashOnCash: 14.2,
      totalCostOfProject: 8500000,
      loanToValue: 65,
      debtServiceCoverage: 1.85,
      breakEvenOccupancy: 72
    },
    investmentHighlights: [
      "Part of Saudi Arabia's NEOM mega-project",
      "Zero-emission linear city with cutting-edge technology",
      "Government-backed with sovereign guarantee",
      "Direct access to planned hyperloop network",
      "AI-powered building management systems"
    ],
    risks: [
      "Construction timeline dependent on technology development",
      "Regulatory changes in new economic zone",
      "Market acceptance of linear city concept",
      "Weather conditions affecting construction"
    ],
    marketAnalysis: {
      averageRent: 18000,
      marketGrowth: 15.8,
      competitorAnalysis: "No direct competitors in futuristic smart city segment",
      demographic: "High-income tech professionals and international executives"
    },
    legalStructure: {
      ownership: "Freehold with 99-year renewable lease",
      managementFees: 2.5,
      exitStrategy: "Secondary market trading after 5 years",
      taxation: "10% capital gains tax exemption for first 10 years"
    },
    timeline: {
      phase: "Phase 2 - Infrastructure Development",
      milestones: [
        { name: "Foundation & Utilities", date: "2024-12-31", status: "completed" },
        { name: "Structural Framework", date: "2026-06-30", status: "in_progress" },
        { name: "Interior Systems", date: "2028-12-31", status: "pending" },
        { name: "Project Completion", date: "2030-12-31", status: "pending" }
      ]
    },
    developer: {
      name: "NEOM Company",
      experience: "Backed by Saudi Public Investment Fund",
      reputation: 95,
      previousProjects: 12
    }
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
    images: [luxuryApartmentImg, luxuryVillaImg, commercialOfficeImg],
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
    developmentStage: "construction",
    financialMetrics: {
      irr: 25.8,
      noi: 2740000,
      capRate: 8.2,
      cashOnCash: 18.6,
      totalCostOfProject: 12200000,
      loanToValue: 70,
      debtServiceCoverage: 2.1,
      breakEvenOccupancy: 68
    },
    investmentHighlights: [
      "Ultra-luxury tourism destination with pristine coral reefs",
      "First regenerative tourism project in Middle East",
      "Partnership with global luxury hotel brands",
      "Exclusive beach access and marina facilities",
      "Carbon-negative resort operations"
    ],
    risks: [
      "Seasonal tourism fluctuations",
      "Environmental regulations compliance",
      "Competition from established luxury destinations",
      "Currency exchange rate variations"
    ],
    marketAnalysis: {
      averageRent: 25000,
      marketGrowth: 22.4,
      competitorAnalysis: "Premium positioning above Maldives and Seychelles",
      demographic: "Ultra-high-net-worth individuals and luxury travelers"
    },
    legalStructure: {
      ownership: "99-year leasehold with renewal option",
      managementFees: 3.0,
      exitStrategy: "REIT conversion planned in year 7",
      taxation: "Tourism investment incentives apply"
    },
    timeline: {
      phase: "Phase 3 - Resort Construction",
      milestones: [
        { name: "Environmental Assessment", date: "2024-03-31", status: "completed" },
        { name: "Marina Development", date: "2025-09-30", status: "in_progress" },
        { name: "Resort Buildings", date: "2027-12-31", status: "pending" },
        { name: "Grand Opening", date: "2030-06-30", status: "pending" }
      ]
    },
    developer: {
      name: "Red Sea Global",
      experience: "15+ years in luxury tourism development",
      reputation: 92,
      previousProjects: 8
    }
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
    images: [luxuryApartmentImg, luxuryVillaImg, commercialOfficeImg],
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
    developmentStage: "construction",
    financialMetrics: {
      irr: 19.2,
      noi: 1156000,
      capRate: 7.4,
      cashOnCash: 12.8,
      totalCostOfProject: 6800000,
      loanToValue: 60,
      debtServiceCoverage: 1.95,
      breakEvenOccupancy: 75
    },
    investmentHighlights: [
      "World's largest entertainment destination",
      "Government commitment of $8 billion investment",
      "Partnership with Six Flags and other global brands",
      "Year-round entertainment programming",
      "Integration with Riyadh metro system"
    ],
    risks: [
      "Dependence on tourism and entertainment spending",
      "Competition from Dubai and other regional hubs",
      "Economic cycles affecting discretionary spending",
      "Operational complexity of mixed-use development"
    ],
    marketAnalysis: {
      averageRent: 15000,
      marketGrowth: 18.5,
      competitorAnalysis: "First-mover advantage in Saudi entertainment market",
      demographic: "Families, young professionals, and tourists from GCC region"
    },
    legalStructure: {
      ownership: "Freehold with commercial license",
      managementFees: 2.8,
      exitStrategy: "IPO consideration after stabilization",
      taxation: "Entertainment sector incentives available"
    },
    timeline: {
      phase: "Phase 1 - Core Infrastructure",
      milestones: [
        { name: "Site Preparation", date: "2024-06-30", status: "completed" },
        { name: "Theme Park Construction", date: "2026-12-31", status: "in_progress" },
        { name: "Sports Facilities", date: "2028-06-30", status: "pending" },
        { name: "Full Operations", date: "2030-12-31", status: "pending" }
      ]
    },
    developer: {
      name: "Qiddiya Investment Company",
      experience: "Joint venture with international entertainment leaders",
      reputation: 88,
      previousProjects: 6
    }
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
    images: [luxuryApartmentImg, luxuryVillaImg, commercialOfficeImg],
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
    developmentStage: "planning",
    financialMetrics: {
      irr: 16.8,
      noi: 596000,
      capRate: 6.2,
      cashOnCash: 10.4,
      totalCostOfProject: 4200000,
      loanToValue: 75,
      debtServiceCoverage: 1.75,
      breakEvenOccupancy: 78
    },
    investmentHighlights: [
      "Strategic location in King Abdullah Economic City",
      "Pre-leasing agreements with major banks",
      "Government tenant anchor agreements",
      "Direct access to King Abdulaziz Port",
      "Tax incentives for KAEC investors"
    ],
    risks: [
      "Economic city development timeline",
      "Corporate relocation decisions",
      "Competition from Riyadh financial district",
      "Regulatory changes in economic zones"
    ],
    marketAnalysis: {
      averageRent: 12000,
      marketGrowth: 12.3,
      competitorAnalysis: "Limited supply in specialized economic city",
      demographic: "Financial services, logistics, and international trade companies"
    },
    legalStructure: {
      ownership: "Freehold within economic zone",
      managementFees: 2.2,
      exitStrategy: "Corporate sale or REIT inclusion",
      taxation: "KAEC special economic zone benefits"
    },
    timeline: {
      phase: "Phase 0 - Planning & Approvals",
      milestones: [
        { name: "Master Planning", date: "2025-03-31", status: "in_progress" },
        { name: "Construction Start", date: "2025-09-30", status: "pending" },
        { name: "Core & Shell", date: "2027-06-30", status: "pending" },
        { name: "Tenant Fit-out", date: "2028-12-31", status: "pending" }
      ]
    },
    developer: {
      name: "KAEC Development Company",
      experience: "20+ years in economic city development",
      reputation: 90,
      previousProjects: 15
    }
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
    images: [luxuryApartmentImg, luxuryVillaImg, commercialOfficeImg],
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
    developmentStage: "construction",
    financialMetrics: {
      irr: 23.6,
      noi: 1881000,
      capRate: 7.8,
      cashOnCash: 16.4,
      totalCostOfProject: 9500000,
      loanToValue: 68,
      debtServiceCoverage: 2.0,
      breakEvenOccupancy: 70
    },
    investmentHighlights: [
      "First wellness-focused mega-resort in Saudi Arabia",
      "Partnership with leading wellness brands",
      "Exclusive access to pristine coastline",
      "Cultural arts and wellness programming",
      "Sustainable architecture and operations"
    ],
    risks: [
      "Wellness tourism market development",
      "Seasonal demand variations",
      "High operational complexity",
      "Competition from established wellness destinations"
    ],
    marketAnalysis: {
      averageRent: 22000,
      marketGrowth: 20.7,
      competitorAnalysis: "Unique positioning in growing wellness tourism segment",
      demographic: "Wellness enthusiasts, art collectors, and luxury travelers"
    },
    legalStructure: {
      ownership: "99-year leasehold with freehold conversion option",
      managementFees: 3.2,
      exitStrategy: "Hospitality REIT or strategic acquisition",
      taxation: "Tourism development incentives apply"
    },
    timeline: {
      phase: "Phase 2 - Resort Development",
      milestones: [
        { name: "Coastal Infrastructure", date: "2024-09-30", status: "completed" },
        { name: "Wellness Facilities", date: "2026-12-31", status: "in_progress" },
        { name: "Villa Construction", date: "2028-09-30", status: "pending" },
        { name: "Resort Opening", date: "2030-06-30", status: "pending" }
      ]
    },
    developer: {
      name: "Amaala Development",
      experience: "Backed by PIF with international wellness expertise",
      reputation: 91,
      previousProjects: 4
    }
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
  const [isPropertyDetailsOpen, setIsPropertyDetailsOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"newest" | "price_low" | "price_high" | "roi_high" | "popularity">("newest")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
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

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property)
    setCurrentImageIndex(0)
    setIsPropertyDetailsOpen(true)
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
                  {/* Property Image Gallery */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={property.images[0]} 
                      alt={getPropertyTitle(property)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Image Count Badge */}
                    {property.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur-xl border border-white/20">
                        <ImageIcon className="w-3 h-3" />
                        <span>{property.images.length} photos</span>
                      </div>
                    )}
                    
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
                        onClick={() => handleViewDetails(property)}
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

        {/* Property Details Dialog */}
        <Dialog open={isPropertyDetailsOpen} onOpenChange={setIsPropertyDetailsOpen}>
          <DialogContent className="sm:max-w-lg bg-card/95 backdrop-blur-xl border-border/50 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <Home className="w-5 h-5" />
                {selectedProperty && getPropertyTitle(selectedProperty)}
              </DialogTitle>
              <DialogDescription>
                Comprehensive Investment Analysis
              </DialogDescription>
            </DialogHeader>

            {selectedProperty && (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  {/* Image Gallery */}
                  <div className="space-y-3">
                    <div className="relative h-48 rounded-lg overflow-hidden">
                      <img 
                        src={selectedProperty.images[currentImageIndex]} 
                        alt={getPropertyTitle(selectedProperty)}
                        className="w-full h-full object-cover"
                      />
                      {selectedProperty.images.length > 1 && (
                        <>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                            onClick={() => setCurrentImageIndex(prev => 
                              prev === 0 ? selectedProperty.images.length - 1 : prev - 1
                            )}
                          >
                            <ChevronDown className="w-4 h-4 rotate-90" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                            onClick={() => setCurrentImageIndex(prev => 
                              prev === selectedProperty.images.length - 1 ? 0 : prev + 1
                            )}
                          >
                            <ChevronDown className="w-4 h-4 -rotate-90" />
                          </Button>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                            {selectedProperty.images.map((_, index) => (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${
                                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Location</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-medium">{getPropertyLocation(selectedProperty)}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Property Type</p>
                        <span className="font-medium capitalize">{selectedProperty.category}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p className="text-sm leading-relaxed">{getPropertyDescription(selectedProperty)}</p>
                    </div>

                    {/* Investment Highlights */}
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        Investment Highlights
                      </h4>
                      <div className="space-y-2">
                        {selectedProperty.investmentHighlights.map((highlight, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Amenities */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Key Features & Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="financials" className="space-y-4 mt-4">
                  {/* Financial Overview */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <CircleDollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-2xl font-bold text-primary">{selectedProperty.roi}%</p>
                        <p className="text-xs text-muted-foreground">Expected ROI</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">{selectedProperty.financialMetrics.irr}%</p>
                        <p className="text-xs text-muted-foreground">IRR</p>
                      </div>
                    </Card>
                  </div>

                  {/* Detailed Financial Metrics */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Calculator className="w-4 h-4" />
                      Financial Metrics
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Net Operating Income (NOI)</span>
                        <span className="font-medium">{selectedProperty.financialMetrics.noi.toLocaleString()} SAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Cap Rate</span>
                        <span className="font-medium">{selectedProperty.financialMetrics.capRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Cash-on-Cash Return</span>
                        <span className="font-medium">{selectedProperty.financialMetrics.cashOnCash}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Loan-to-Value (LTV)</span>
                        <span className="font-medium">{selectedProperty.financialMetrics.loanToValue}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Debt Service Coverage</span>
                        <span className="font-medium">{selectedProperty.financialMetrics.debtServiceCoverage}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Break-even Occupancy</span>
                        <span className="font-medium">{selectedProperty.financialMetrics.breakEvenOccupancy}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Investment Structure */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Investment Structure
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Ownership Type</span>
                        <span className="font-medium text-right flex-1 ml-2">{selectedProperty.legalStructure.ownership}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Management Fees</span>
                        <span className="font-medium">{selectedProperty.legalStructure.managementFees}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Exit Strategy</span>
                        <span className="font-medium text-right flex-1 ml-2">{selectedProperty.legalStructure.exitStrategy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Taxation</span>
                        <span className="font-medium text-right flex-1 ml-2">{selectedProperty.legalStructure.taxation}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-4 mt-4">
                  {/* Market Analysis */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Market Analysis
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Average Rent</span>
                        <span className="font-medium">{selectedProperty.marketAnalysis.averageRent.toLocaleString()} SAR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Market Growth</span>
                        <span className="font-medium text-green-600">+{selectedProperty.marketAnalysis.marketGrowth}%</span>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm text-muted-foreground">Target Demographic</span>
                        <p className="text-sm">{selectedProperty.marketAnalysis.demographic}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm text-muted-foreground">Competitive Analysis</span>
                        <p className="text-sm">{selectedProperty.marketAnalysis.competitorAnalysis}</p>
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      Risk Assessment
                    </h4>
                    <div className="space-y-2">
                      {selectedProperty.risks.map((risk, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Developer Information */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Developer Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Developer</span>
                        <span className="font-medium">{selectedProperty.developer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Experience</span>
                        <span className="font-medium text-right flex-1 ml-2">{selectedProperty.developer.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Reputation Score</span>
                        <span className="font-medium">{selectedProperty.developer.reputation}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Previous Projects</span>
                        <span className="font-medium">{selectedProperty.developer.previousProjects}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="space-y-4 mt-4">
                  {/* Project Timeline */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Project Timeline
                    </h4>
                    <p className="text-sm text-muted-foreground">Current Phase: {selectedProperty.timeline.phase}</p>
                    
                    <div className="space-y-4">
                      {selectedProperty.timeline.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            milestone.status === 'completed' 
                              ? 'bg-green-500 border-green-500' 
                              : milestone.status === 'in_progress'
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-muted-foreground'
                          }`} />
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{milestone.name}</span>
                              <span className="text-sm text-muted-foreground">
                                {new Date(milestone.date).toLocaleDateString()}
                              </span>
                            </div>
                            <Badge 
                              variant={
                                milestone.status === 'completed' 
                                  ? 'default' 
                                  : milestone.status === 'in_progress'
                                  ? 'secondary'
                                  : 'outline'
                              }
                              className="text-xs mt-1"
                            >
                              {milestone.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="space-y-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      Project Details
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Development Stage</span>
                        <Badge variant="outline" className="capitalize">{selectedProperty.developmentStage.replace('_', ' ')}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Expected Completion</span>
                        <span className="font-medium">{selectedProperty.completionDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Units</span>
                        <span className="font-medium">{selectedProperty.totalUnits.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Available Units</span>
                        <span className="font-medium">{selectedProperty.availableUnits.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Project Size</span>
                        <span className="font-medium">{selectedProperty.size.toLocaleString()} sqm</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}

            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsPropertyDetailsOpen(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button 
                onClick={() => {
                  setIsPropertyDetailsOpen(false)
                  if (selectedProperty) {
                    handleInvestClick(selectedProperty)
                  }
                }}
                className="flex-1 bg-gradient-to-r from-primary to-primary/90"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Invest Now
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