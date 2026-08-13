import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"
import type { TranslationKey } from "@/lib/translations"
import { Link } from "wouter"
import { 
  Building2, 
  Users, 
  Target, 
  Award,
  Globe,
  TrendingUp,
  Shield,
  Heart,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Flag
} from "lucide-react"

// Copy lives in translations.ts; these carry only the non-textual bits plus the
// keys used to look each string up in the active language.
const values = [
  { icon: Shield, slug: "trust" },
  { icon: Heart, slug: "compliance" },
  { icon: Lightbulb, slug: "innovation" },
  { icon: Users, slug: "community" }
] as const

const stats = [
  { labelKey: "stat_active_investors", value: "10,000+", icon: Users },
  { labelKey: "stat_total_investments", value: "2.5B SAR", icon: TrendingUp },
  { labelKey: "stat_completed_projects", value: "150+", icon: Building2 },
  { labelKey: "stat_average_returns", value: "14.5%", icon: Target }
] as const

const team = [
  {
    name: "Ahmed Al-Rashid",
    roleKey: "team_role_ceo",
    bioKey: "team_bio_ahmed",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: "Sarah Al-Mansouri",
    roleKey: "team_role_cto",
    bioKey: "team_bio_sarah",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: "Dr. Omar Bin Laden",
    roleKey: "team_role_islamic_finance",
    bioKey: "team_bio_omar",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: "Fatima Al-Zahra",
    roleKey: "team_role_operations",
    bioKey: "team_bio_fatima",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
  }
] as const

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Badge className="bg-yellow-400 text-gray-900 border-0 mb-4 font-semibold">
                <Flag className="w-4 h-4 mr-2" />
                {t("about_badge_saudi")}
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              {t("about_us")}
            </h1>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              {t("about_hero_sub")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/website/invest">
                <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold" data-testid="button-our-story">
                  <Heart className="w-5 h-5 mr-2" />
                  {t("about_our_story_btn")}
                </Button>
              </Link>
              <Link href="#team">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-meet-team">
                  {t("about_meet_team")}
                  <ArrowRight className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white uppercase tracking-wide">{t("about_mission_title")}</h2>
            <p className="text-lg text-teal-100 mb-12 leading-relaxed">
              {t("about_mission_body")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6 hover-elevate bg-gradient-to-br from-teal-800/90 to-emerald-900/90 border-teal-700/50" data-testid="card-vision">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{t("about_vision2030_title")}</h3>
                <p className="text-teal-200">
                  {t("about_vision2030_desc")}
                </p>
              </Card>
              <Card className="text-center p-6 hover-elevate bg-gradient-to-br from-teal-800/90 to-emerald-900/90 border-teal-700/50" data-testid="card-accessibility">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{t("about_democratized_title")}</h3>
                <p className="text-teal-200">
                  {t("about_democratized_desc")}
                </p>
              </Card>
              <Card className="text-center p-6 hover-elevate bg-gradient-to-br from-teal-800/90 to-emerald-900/90 border-teal-700/50" data-testid="card-compliance">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{t("feat_shariah_title")}</h3>
                <p className="text-teal-200">
                  {t("about_shariah_desc")}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">{t("about_impact_title")}</h2>
            <p className="text-lg text-teal-100 max-w-2xl mx-auto">
              {t("about_impact_sub")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover-elevate bg-gradient-to-br from-teal-800/90 to-emerald-900/90 border-teal-700/50" data-testid={`card-stat-${index}`}>
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-gray-900" />
                </div>
                <div className="text-3xl font-bold mb-2 text-yellow-400">
                  {stat.value}
                </div>
                <p className="text-sm text-teal-200">{t(stat.labelKey)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">{t("about_values_title")}</h2>
            <p className="text-lg text-teal-100 max-w-2xl mx-auto">
              {t("about_values_sub")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="p-8 hover-elevate bg-gradient-to-br from-teal-800/90 to-emerald-900/90 border-teal-700/50" data-testid={`card-value-${index}`}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">{t(`value_${value.slug}_title` as TranslationKey)}</h3>
                    <p className="text-teal-200 leading-relaxed">{t(`value_${value.slug}_desc` as TranslationKey)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20" id="team">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">{t("about_meet_team")}</h2>
            <p className="text-lg text-teal-100 max-w-2xl mx-auto">
              {t("about_team_sub")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden hover-elevate group bg-gradient-to-br from-teal-800/90 to-emerald-900/90 border-teal-700/50" data-testid={`card-team-${index}`}>
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg text-white">{member.name}</CardTitle>
                  <CardDescription className="text-yellow-400 font-medium">{t(member.roleKey)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-teal-200">{t(member.bioKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">{t("about_our_story_btn")}</h2>
              <p className="text-lg text-teal-100">
                {t("about_story_sub")}
              </p>
            </div>
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{t("story_beginning_title")}</h3>
                  <p className="text-teal-200 mb-4">
                    {t("story_beginning_p1")}
                  </p>
                  <p className="text-teal-200">
                    {t("story_beginning_p2")}
                  </p>
                </div>
                <Card className="p-6 bg-gradient-to-br from-teal-700/50 to-emerald-800/50 border-teal-600/50">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">2022</div>
                    <p className="text-teal-200">{t("story_founded_label")}</p>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <Card className="p-6 bg-gradient-to-br from-emerald-800/50 to-teal-700/50 border-emerald-600/50 md:order-first">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">2024</div>
                    <p className="text-teal-200">{t("story_launch_title")}</p>
                  </div>
                </Card>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{t("story_launch_title")}</h3>
                  <p className="text-teal-200 mb-4">
                    {t("story_launch_p1")}
                  </p>
                  <p className="text-teal-200">
                    {t("story_launch_p2")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{t("story_future_title")}</h3>
                  <p className="text-teal-200 mb-4">
                    {t("story_future_p1")}
                  </p>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-teal-200">{t("about_licensed")}</span>
                  </div>
                </div>
                <Card className="p-6 bg-gradient-to-br from-teal-700/50 to-emerald-800/50 border-teal-600/50">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">2025+</div>
                    <p className="text-teal-200">{t("story_global_label")}</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-teal-800/90 to-emerald-900/90 text-white border-t border-teal-700/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">{t("about_cta_title")}</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            {t("about_cta_sub")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/website/properties">
              <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold" data-testid="button-start-investing">
                {t("start_investing")}
              </Button>
            </Link>
            <Link href="/website/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-contact-us">
                {t("contact_us")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}