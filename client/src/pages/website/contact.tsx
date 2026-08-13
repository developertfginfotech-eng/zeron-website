import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/hooks/use-translation"
import type { TranslationKey } from "@/lib/translations"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageSquare,
  Headphones,
  Users,
  Building2,
  Send,
  CheckCircle
} from "lucide-react"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(1, "Please select a subject"),
  inquiry_type: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters")
})

type ContactFormData = z.infer<typeof contactFormSchema>

// Copy lives in translations.ts; only the icon and the literal contact value
// (phone/email, which are not translated) stay here.
const contactMethods = [
  { icon: Phone, slug: "phone", value: "+966 11 123 4567" },
  { icon: Mail, slug: "email", value: "support@zaron.sa" },
  { icon: MessageSquare, slug: "chat", valueKey: "cm_chat_value" },
  { icon: Building2, slug: "office", valueKey: "cm_office_value" }
] as const

const officeLocations = [
  { cityKey: "riyadh", addressKey: "office_riyadh_address", phone: "+966 11 123 4567" },
  { cityKey: "jeddah", addressKey: "office_jeddah_address", phone: "+966 12 456 7890" },
  { cityKey: "dammam", addressKey: "office_dammam_address", phone: "+966 13 789 0123" }
] as const

const faqs = [
  { q: "faq_q1", a: "faq_a1" },
  { q: "faq_q2", a: "faq_a2" },
  { q: "faq_q3", a: "faq_a3" },
  { q: "faq_q4", a: "faq_a4" }
] as const

export default function ContactPage() {
  const { t } = useTranslation()

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      inquiry_type: "",
      message: ""
    }
  })

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submitted:", data)
    // Handle form submission here
    alert("Thank you for your message! We'll get back to you within 24 hours.")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-blue-950/50 dark:via-background dark:to-emerald-950/50 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Badge className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white border-0 mb-4">
                <Headphones className="w-4 h-4 mr-2" />
                We're Here to Help
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-800 bg-clip-text text-transparent">
              {t("contact_us")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Have questions about real estate investment? Our expert team is ready to guide you through 
              your investment journey and help you make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contact_get_in_touch")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("contact_get_in_touch_sub")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center p-6 hover-elevate group cursor-pointer" data-testid={`card-contact-${index}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{t(`cm_${method.slug}_title` as TranslationKey)}</h3>
                <p className="text-muted-foreground text-sm mb-3">{t(`cm_${method.slug}_desc` as TranslationKey)}</p>
                <p className="font-semibold text-blue-600 mb-2">{"value" in method ? method.value : t(method.valueKey as TranslationKey)}</p>
                <p className="text-xs text-muted-foreground mb-4">{t(`cm_${method.slug}_available` as TranslationKey)}</p>
                <Button size="sm" variant="outline" className="w-full" data-testid={`button-${method.slug}`}>
                  {t(`cm_${method.slug}_action` as TranslationKey)}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contact_form_title")}</h2>
              <p className="text-lg text-muted-foreground">
                {t("contact_form_sub")}
              </p>
            </div>
            <Card className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact_label_name")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("contact_ph_name")} {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact_label_email")}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder={t("contact_ph_email")} {...field} data-testid="input-email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact_label_phone")}</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+966 5X XXX XXXX" {...field} data-testid="input-phone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="inquiry_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact_label_inquiry")}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-inquiry-type">
                                <SelectValue placeholder={t("contact_select_inquiry")} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="investment">{t("inquiry_investment")}</SelectItem>
                              <SelectItem value="account">{t("inquiry_account")}</SelectItem>
                              <SelectItem value="technical">{t("inquiry_technical")}</SelectItem>
                              <SelectItem value="partnership">{t("inquiry_partnership")}</SelectItem>
                              <SelectItem value="media">{t("inquiry_media")}</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact_label_subject")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contact_ph_subject")} {...field} data-testid="input-subject" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact_label_message")}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t("contact_ph_message")}
                            className="min-h-[120px]"
                            {...field}
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{t("contact_respond_note")}</span>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
                    data-testid="button-submit-contact"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contact_offices_title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("contact_offices_sub")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <Card key={index} className="p-6 hover-elevate" data-testid={`card-office-${index}`}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    {t(office.cityKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("office_label_address")}</p>
                    <p className="text-sm">{t(office.addressKey)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("office_label_phone")}</p>
                    <p className="text-sm font-medium text-blue-600">{office.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("office_label_hours")}</p>
                    <p className="text-sm">{t("office_hours_value")}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" data-testid={`button-directions-${office.cityKey}`}>
                    <MapPin className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                    {t("cm_office_action")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("faq_title")}</h2>
              <p className="text-lg text-muted-foreground">
                {t("faq_sub")}
              </p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6 hover-elevate" data-testid={`card-faq-${index}`}>
                  <h3 className="text-lg font-semibold mb-3">{t(faq.q)}</h3>
                  <p className="text-muted-foreground">{t(faq.a)}</p>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                {t("faq_no_answer")}
              </p>
              <Button variant="outline" data-testid="button-view-all-faqs">
                {t("faq_view_all")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{t("contact_urgent_title")}</h3>
            <p className="mb-6">
              For urgent account or investment issues, contact our 24/7 emergency support line.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100" data-testid="button-emergency-call">
                <Phone className="w-5 h-5 mr-2" />
                Emergency: +966 11 999 8888
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" data-testid="button-live-chat">
                <Headphones className="w-5 h-5 mr-2" />
                Live Chat Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}