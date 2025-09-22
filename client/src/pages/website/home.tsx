import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { Building, TrendingUp, Shield, Globe, Users, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function WebsiteHome() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-blue-950 dark:via-gray-900 dark:to-emerald-950">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              {t("landing_title")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              {t("landing_subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3" data-testid="button-get-started">
                {t("get_started")}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3" data-testid="button-learn-more">
                {t("learn_more_cta")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">{t("why_zaron")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The premier platform for real estate investment in Saudi Arabia's growing market
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Building className="h-8 w-8" />,
                title: t("vision_2030"),
                description: "Invest in Saudi Arabia's ambitious Vision 2030 mega-projects including NEOM, Red Sea, and Qiddiya"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: t("shariah_compliant"),
                description: "All investments are fully Shariah-compliant and approved by our Islamic finance board"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "High Returns",
                description: "Target returns of 12-18% annually through carefully selected prime real estate opportunities"
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Global Access",
                description: "Invest from anywhere in the world with our multi-language platform and global payment support"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Community Driven",
                description: "Join thousands of investors building wealth together through collective real estate investment"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Award Winning",
                description: "Recognized as the leading fintech platform for real estate investment in the Middle East"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover-elevate transition-all duration-300 border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                  <CardHeader>
                    <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center text-white mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/10 to-emerald-600/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2.5B+", label: "Total Investments" },
              { value: "50K+", label: "Active Investors" },
              { value: "500+", label: "Properties" },
              { value: "15.2%", label: "Average Return" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Start Investing?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of investors already building wealth through Saudi Arabia's real estate market
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3" data-testid="button-register-now">
                {t("register_now")}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3" data-testid="button-download-app">
                {t("download_app")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}