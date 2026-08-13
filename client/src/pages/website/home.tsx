import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Lock, ArrowUpRight, User, Building2, Shield, PieChart, Users, TrendingUp, Eye, Star, UserPlus, Search, DollarSign, CheckCircle, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useLocation } from "wouter"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useTranslation } from "@/hooks/use-translation"
import type { TranslationKey } from "@/lib/translations"
import { localized } from "@/lib/localize"
import { API_BASE_URL, API_ENDPOINTS } from "@/lib/api-client"

// Backend property interface
interface BackendProperty {
  _id: string
  title: string
  titleAr?: string
  description: string
  /** Machine translations cached by the API, keyed by language code. */
  translations?: Record<string, Record<string, string>> | null
  location: {
    city: string
    district: string
    address: string
  }
  images: Array<{
    url: string
    alt: string
    isPrimary: boolean
  }>
  financials: {
    totalValue: number
    minInvestment: number
    projectedYield: number
    pricePerShare?: number
    availableShares?: number
  }
  propertyType: 'residential' | 'commercial' | 'retail'
  status: 'active' | 'upcoming' | 'fully_funded' | 'completed' | 'cancelled' | 'closed'
  investorCount: number
  fundingProgress: number
  timeline?: {
    fundingDeadline: string
    expectedCompletion?: string
  }
  createdAt: string
}

// Helper function to get KYC status
const getKYCStatus = (): {
  isKYCCompleted: boolean;
  kycStatus: string;
  isLoggedIn: boolean;
} => {
  try {
    const userData = localStorage.getItem('zaron_user');
    if (!userData) {
      return { isKYCCompleted: false, kycStatus: 'not_submitted', isLoggedIn: false };
    }

    const user = JSON.parse(userData);
    const kycStatus = user.kycStatus || 'not_submitted';
    const isKYCCompleted = kycStatus === 'submitted' || kycStatus === 'under_review' || kycStatus === 'approved';

    return {
      isKYCCompleted,
      kycStatus,
      isLoggedIn: true
    };
  } catch {
    return { isKYCCompleted: false, kycStatus: 'not_submitted', isLoggedIn: false };
  }
};

// Copy lives in translations.ts; these only carry the non-textual bits plus the
// keys used to look each string up in the active language.
const features = [
  { icon: Building2, slug: "fractional" },
  { icon: Shield, slug: "shariah" },
  { icon: PieChart, slug: "diversified" },
  { icon: Users, slug: "management" },
  { icon: TrendingUp, slug: "monthly" },
  { icon: Eye, slug: "transparency" }
] as const

const testimonials = [
  { returns: "18%", quoteKey: "testimonial_1_quote", name: "Ahmed Al-Rashid", roleKey: "role_private_equity", cityKey: "riyadh", initials: "AR" },
  { returns: "22%", quoteKey: "testimonial_2_quote", name: "Khalid Al-Mutairi", roleKey: "role_entrepreneur", cityKey: "jeddah", initials: "KM" },
  { returns: "15%", quoteKey: "testimonial_3_quote", name: "Nour Al-Saud", roleKey: "role_business_consultant", cityKey: "dammam", initials: "NS" }
] as const

export default function WebsiteHome() {
  const [, setLocation] = useLocation()
  const { toast } = useToast()
  const { t, language } = useTranslation()
  const [properties, setProperties] = useState<BackendProperty[]>([])
  const [loading, setLoading] = useState(true)

  const { isKYCCompleted } = getKYCStatus()

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        const endpoint = `${API_BASE_URL}${API_ENDPOINTS.PROPERTIES}`

        const response = await fetch(endpoint, {
          headers: { 'Content-Type': 'application/json' }
        })

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const result = await response.json()

        if (result.success && result.data.properties) {
          const availableProperties = result.data.properties
            .filter((prop: BackendProperty) => ['active', 'upcoming'].includes(prop.status))
            .slice(0, 3)
          setProperties(availableProperties)
        }
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const handleViewDetails = (propertyId?: string) => {
    if (propertyId) {
      setLocation(`/website/property/${propertyId}`)
    } else {
      setLocation('/website/properties')
    }
  }

  const handleInvest = () => {
    const userData = localStorage.getItem('zaron_user')
    if (!userData) {
      toast({ title: t("toast_login_required"), description: t("toast_login_required_desc"), variant: "destructive" })
      setLocation('/register')
      return
    }

    try {
      const user = JSON.parse(userData)
      const kycStatus = user.kycStatus || 'not_submitted'
      const isKYCCompleted = kycStatus === 'submitted' || kycStatus === 'under_review' || kycStatus === 'approved'

      if (!isKYCCompleted) {
        toast({ title: t("toast_kyc_required"), description: t("toast_kyc_required_desc"), variant: "destructive" })
        setLocation('/kyc-verification')
        return
      }

      setLocation('/website/properties')
    } catch {
      setLocation('/register')
    }
  }

  const steps = [
    { number: 1, icon: UserPlus, slug: "create_account" },
    { number: 2, icon: Search, slug: "browse" },
    { number: 3, icon: DollarSign, slug: "invest_own" },
    { number: 4, icon: TrendingUp, slug: "earn" }
  ] as const

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#004743' }}>

      {/* ─── Hero Section ─── */}
      <section className="relative pt-28 pb-32 overflow-hidden" style={{ backgroundColor: '#004743' }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/BG%20Image.jpg')", opacity: 0.4 }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Trust badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <CheckCircle className="w-4 h-4" style={{ color: '#d0ac00' }} />
                <span className="text-sm font-medium text-white">{t("home_badge")}</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08]">
                {t("home_title_line1")}
                <br />
                <span style={{ color: '#d0ac00' }}>{t("home_title_line2")}</span>
                <br />
                {t("home_title_line3")}
              </h1>
              <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-lg" style={{ color: '#c5dfdd' }}>
                {t("home_subtitle")}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { value: 'SAR 2.5B+', label: t("home_stat_total_invested") },
                  { value: '15.2%', label: t("home_stat_avg_returns") },
                  { value: '6+', label: t("home_stat_properties_funded") }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4 text-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</h3>
                    <p className="text-xs" style={{ color: '#9ecfcb' }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="text-black font-bold text-base px-8 h-14 rounded-xl border-0 shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
                  style={{ backgroundColor: '#d0ac00' }}
                  onClick={() => {
                    const userData = localStorage.getItem('zaron_user')
                    if (userData) { setLocation('/website/properties') } else { setLocation('/register') }
                  }}
                >
                  {t("start_investing_now")}
                  <ArrowRight className="ml-2 h-5 w-5 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white text-base px-8 h-14 rounded-xl hover:bg-white/10 transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.35)', borderWidth: '2px' }}
                  onClick={() => setLocation('/website/properties')}
                >
                  {t("explore_opportunities")}
                </Button>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full max-w-md mx-auto">
                <img
                  src="/images/Tablet.png"
                  alt="Investment Portfolio on Tablet"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Section ─── */}
      <section className="py-24" style={{ backgroundColor: '#18605c' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-5"
              style={{ border: '1px solid rgba(255,255,255,0.25)', backgroundColor: 'rgba(255,255,255,0.07)' }}
            >
              <Star className="w-4 h-4" style={{ color: '#d0ac00' }} />
              <p className="text-sm font-semibold text-white">{t("home_why_badge")}</p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#d0ac00' }}>
              {t("home_why_title")}
            </h2>
            <p className="text-lg text-white/85 max-w-2xl mx-auto">
              {t("home_why_subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border-0 shadow-xl h-full rounded-2xl hover:-translate-y-1 transition-all duration-300">
                    <div className="p-5 flex items-center gap-4" style={{ backgroundColor: '#004743' }}>
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">{t(`feat_${feature.slug}_title` as TranslationKey)}</h3>
                        <p className="text-xs font-semibold mt-0.5" style={{ color: '#d0ac00' }}>{t(`feat_${feature.slug}_sub` as TranslationKey)}</p>
                      </div>
                    </div>
                    <CardContent className="p-5 bg-white">
                      <p className="text-sm leading-relaxed" style={{ color: '#1a4745' }}>
                        {t(`feat_${feature.slug}_desc` as TranslationKey)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Exclusive Saudi Projects ─── */}
      <section className="py-24" style={{ backgroundColor: '#18605c' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("home_projects_title")}</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#c5dfdd' }}>
              {t("home_projects_subtitle")}
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-white text-lg">{t("home_loading_properties")}</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white text-lg">{t("home_no_properties")}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {properties.map((property, index) => {
                const primaryImage = property.images.find(img => img.isPrimary) || property.images[0]
                const fundedAmount = (property.financials.totalValue * property.fundingProgress) / 100

                return (
                  <motion.div
                    key={property._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white overflow-hidden h-full flex flex-col shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl border-0">
                      {/* Property Image */}
                      <div className="h-52 relative bg-gradient-to-br from-emerald-600 to-teal-600">
                        {primaryImage && (
                          <img
                            src={primaryImage.url}
                            alt={primaryImage.alt || property.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                        {/* Status badge */}
                        <div
                          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm"
                          style={{ backgroundColor: property.status === 'active' ? 'rgba(34,197,94,0.85)' : 'rgba(168,85,247,0.85)' }}
                        >
                          {property.status === 'active' ? t("status_live") : t("status_coming_soon")}
                        </div>
                        {!isKYCCompleted && (
                          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            {t("kyc_required")}
                          </div>
                        )}
                        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full font-bold text-sm shadow-sm" style={{ color: '#18605c' }}>
                          {Math.round(property.fundingProgress)}% {t("label_funded")}
                        </div>
                      </div>

                      <CardContent className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                          {localized(property, "title", language)}
                        </h3>
                        <p className="text-sm text-gray-500 mb-5 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                          {[property.location.district, localized(property, "city", language) || property.location.city]
                            .filter(Boolean)
                            .join(", ")}
                        </p>

                        <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="text-center">
                            <p className="text-xs text-gray-400 mb-1">{t("label_target_return")}</p>
                            <p className="text-base font-bold" style={{ color: '#18605c' }}>{property.financials.projectedYield}%</p>
                          </div>
                          <div className="text-center border-x border-gray-200">
                            <p className="text-xs text-gray-400 mb-1">{t("label_min_invest")}</p>
                            <p className="text-sm font-bold text-gray-800">SAR {(property.financials.minInvestment / 1000).toFixed(0)}K</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400 mb-1">{t("label_investors")}</p>
                            <p className="text-sm font-bold text-gray-800">{property.investorCount}</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-1.5">
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${property.fundingProgress}%`, background: 'linear-gradient(to right, #18605c, #004743)' }}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mb-6">
                          {t("label_funded_of", {
                            funded: (fundedAmount / 1000000).toFixed(2),
                            total: (property.financials.totalValue / 1000000).toFixed(0)
                          })}
                        </p>

                        <div className="flex gap-3 mt-auto">
                          <Button
                            variant="outline"
                            className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl"
                            onClick={() => handleViewDetails(property._id)}
                          >
                            {t("learn_more")}
                          </Button>
                          <Button
                            className="flex-1 font-bold text-black hover:opacity-90 rounded-xl"
                            style={{ backgroundColor: '#d0ac00' }}
                            onClick={handleInvest}
                          >
                            {t("invest_now")}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}

          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              className="border-2 text-white hover:bg-white/10 transition-colors px-8 h-14 rounded-xl"
              style={{ borderColor: 'rgba(255,255,255,0.35)' }}
              onClick={() => setLocation('/website/properties')}
            >
              {t("view_all_opportunities")}
              <ArrowRight className="ml-2 h-5 w-5 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-24 bg-gradient-to-b from-teal-900 to-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{t("home_journey_title")}</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t("home_journey_subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-center">
                    <div className="relative inline-flex mb-6">
                      <div
                        className="h-16 w-16 flex items-center justify-center rounded-full shadow-lg"
                        style={{ backgroundColor: '#d0ac00' }}
                      >
                        <Icon className="w-7 h-7 text-black" />
                      </div>
                      <div
                        className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md"
                      >
                        <span className="text-xs font-bold" style={{ color: '#004743' }}>{step.number}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{t(`step_${step.slug}_title` as TranslationKey)}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{t(`step_${step.slug}_desc` as TranslationKey)}</p>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-8 left-full w-full h-0.5 -translate-x-1/2"
                      style={{ background: 'linear-gradient(to right, rgba(208,172,0,0.6), transparent)' }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="font-bold text-black text-base px-10 h-14 rounded-xl shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
              style={{ backgroundColor: '#d0ac00' }}
              onClick={() => {
                const userData = localStorage.getItem('zaron_user')
                if (userData) { setLocation('/website/properties') } else { setLocation('/register') }
              }}
            >
              {t("start_investing_now")}
              <ArrowRight className="ml-2 h-5 w-5 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-24" style={{ backgroundColor: '#18605c' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#d0ac00' }}>
              {t("home_testimonials_title")}
            </h2>
            <p className="text-white/80 text-lg">
              {t("home_testimonials_subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className="h-full rounded-2xl border-0 overflow-hidden shadow-xl"
                  style={{ backgroundColor: 'rgba(0,55,50,0.55)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <CardContent className="p-7 flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Return highlight */}
                    <div className="flex items-baseline gap-3 mb-5">
                      <span className="text-4xl font-bold text-white">{item.returns}</span>
                      <div className="flex items-center gap-1.5">
                        <ArrowUpRight className="w-4 h-4 text-emerald-400 rtl:-scale-x-100" />
                        <span className="text-sm text-emerald-400 font-medium">{t("annual_returns")}</span>
                      </div>
                    </div>

                    <p className="text-white/80 italic mb-6 leading-relaxed text-sm flex-1">
                      "{t(item.quoteKey)}"
                    </p>

                    <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
                        style={{ backgroundColor: '#d0ac00', color: '#004743' }}
                      >
                        {item.initials}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                        <p className="text-white/55 text-xs">{t(item.roleKey)} · {t(item.cityKey)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
