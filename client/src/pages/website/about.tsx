import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"
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

const values = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "We believe in complete transparency in all our dealings, providing clear information about every investment opportunity."
  },
  {
    icon: Heart,
    title: "Shariah Compliance",
    description: "All our investments are carefully vetted to ensure they meet the highest standards of Islamic finance principles."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We leverage cutting-edge technology to make real estate investment accessible, efficient, and rewarding."
  },
  {
    icon: Users,
    title: "Community First",
    description: "We're committed to building a community of informed investors who grow together and support each other."
  }
]

const stats = [
  { label: "Active Investors", value: "10,000+", icon: Users },
  { label: "Total Investments", value: "2.5B SAR", icon: TrendingUp },
  { label: "Completed Projects", value: "150+", icon: Building2 },
  { label: "Average Returns", value: "14.5%", icon: Target }
]

const team = [
  {
    name: "Ahmed Al-Rashid",
    role: "CEO & Co-Founder",
    bio: "15+ years in real estate development and fintech. Former VP at SAMA.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: "Sarah Al-Mansouri",
    role: "CTO & Co-Founder", 
    bio: "Tech leader with experience at Careem and STC. MIT Computer Science graduate.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: "Dr. Omar Bin Laden",
    role: "Head of Islamic Finance",
    bio: "Islamic finance scholar and Shariah board member. PhD from King Saud University.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: "Fatima Al-Zahra",
    role: "Head of Operations",
    bio: "Operations expert with 12+ years at McKinsey and Saudi Aramco. Harvard MBA.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
  }
]

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Badge className="bg-yellow-400 text-gray-900 border-0 mb-4 font-semibold">
                <Flag className="w-4 h-4 mr-2" />
                Proudly Saudi
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              {t("about_us")}
            </h1>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              We're on a mission to democratize real estate investment in Saudi Arabia, making it accessible, 
              transparent, and profitable for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/website/invest">
                <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold" data-testid="button-our-story">
                  <Heart className="w-5 h-5 mr-2" />
                  Our Story
                </Button>
              </Link>
              <Link href="#team">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-meet-team">
                  Meet Our Team
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white uppercase tracking-wide">Our Mission</h2>
            <p className="text-lg text-teal-100 mb-12 leading-relaxed">
              At Zaron, we believe that everyone should have the opportunity to participate in Saudi Arabia's
              incredible economic transformation. Through our platform, we're making premium real estate
              investment accessible to retail investors while maintaining the highest standards of
              transparency and Shariah compliance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center p-6 hover-elevate bg-gradient-to-br from-teal-800/90 to-emerald-900/90 border-teal-700/50" data-testid="card-vision">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Vision 2030 Aligned</h3>
                <p className="text-teal-200">
                  Supporting Saudi Arabia's transformation through strategic real estate investments.
                </p>
              </Card>
              <Card className="text-center p-6 hover-elevate bg-gradient-to-br from-teal-800/90 to-emerald-900/90 border-teal-700/50" data-testid="card-accessibility">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Democratized Access</h3>
                <p className="text-teal-200">
                  Making premium real estate investment accessible to everyone, not just the wealthy.
                </p>
              </Card>
              <Card className="text-center p-6 hover-elevate bg-gradient-to-br from-teal-800/90 to-emerald-900/90 border-teal-700/50" data-testid="card-compliance">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Shariah Compliant</h3>
                <p className="text-teal-200">
                  Every investment is carefully vetted to ensure full compliance with Islamic principles.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">Our Impact</h2>
            <p className="text-lg text-teal-100 max-w-2xl mx-auto">
              Since our launch, we've helped thousands of investors build wealth through real estate.
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
                <p className="text-sm text-teal-200">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">Our Values</h2>
            <p className="text-lg text-teal-100 max-w-2xl mx-auto">
              The principles that guide everything we do at Zaron.
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
                    <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                    <p className="text-teal-200 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20" id="team">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">Meet Our Team</h2>
            <p className="text-lg text-teal-100 max-w-2xl mx-auto">
              Experienced professionals dedicated to transforming real estate investment in Saudi Arabia.
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
                  <CardDescription className="text-yellow-400 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-teal-200">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white uppercase tracking-wide">Our Story</h2>
              <p className="text-lg text-teal-100">
                How we started and where we're going.
              </p>
            </div>
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">The Beginning</h3>
                  <p className="text-teal-200 mb-4">
                    Founded in 2022 by a team of real estate and fintech experts, Zaron was born from a simple
                    observation: Saudi Arabia's booming real estate market was only accessible to the wealthy elite.
                  </p>
                  <p className="text-teal-200">
                    We saw an opportunity to democratize this access and align it with Vision 2030's goals of
                    economic diversification and increased retail investment participation.
                  </p>
                </div>
                <Card className="p-6 bg-gradient-to-br from-teal-700/50 to-emerald-800/50 border-teal-600/50">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">2022</div>
                    <p className="text-teal-200">Zaron Founded</p>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <Card className="p-6 bg-gradient-to-br from-emerald-800/50 to-teal-700/50 border-emerald-600/50 md:order-first">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">2024</div>
                    <p className="text-teal-200">Platform Launch</p>
                  </div>
                </Card>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Platform Launch</h3>
                  <p className="text-teal-200 mb-4">
                    After two years of development and regulatory approval, we launched our platform with
                    our first set of curated investment opportunities.
                  </p>
                  <p className="text-teal-200">
                    Within months, we had onboarded thousands of investors and facilitated millions in
                    real estate investments, all while maintaining our commitment to Shariah compliance.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">The Future</h3>
                  <p className="text-teal-200 mb-4">
                    We're just getting started. Our roadmap includes expanding to international markets,
                    adding new asset classes, and continuing to innovate in the Islamic fintech space.
                  </p>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-teal-200">Licensed & Regulated in Saudi Arabia</span>
                  </div>
                </div>
                <Card className="p-6 bg-gradient-to-br from-teal-700/50 to-emerald-800/50 border-teal-600/50">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-400 mb-2">2025+</div>
                    <p className="text-teal-200">Global Expansion</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-teal-800/90 to-emerald-900/90 text-white border-t border-teal-700/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-wide">Join Our Mission</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Be part of Saudi Arabia's real estate transformation. Start your investment journey with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/website/properties">
              <Button size="lg" className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold" data-testid="button-start-investing">
                Start Investing
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