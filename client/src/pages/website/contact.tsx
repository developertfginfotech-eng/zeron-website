import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/hooks/use-translation"
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

const contactMethods = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak with our investment experts",
    value: "+966 11 123 4567",
    action: "Call Now",
    available: "Sunday - Thursday, 9 AM - 6 PM"
  },
  {
    icon: Mail,
    title: "Email Support", 
    description: "Get detailed responses to your questions",
    value: "support@zaron.sa",
    action: "Send Email",
    available: "24/7 - Response within 2 hours"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Instant help from our support team",
    value: "Available on website",
    action: "Start Chat",
    available: "Sunday - Thursday, 9 AM - 10 PM"
  },
  {
    icon: Building2,
    title: "Office Visit",
    description: "Meet our team in person",
    value: "King Fahd District, Riyadh",
    action: "Get Directions",
    available: "By appointment only"
  }
]

const officeLocations = [
  {
    city: "Riyadh",
    address: "King Fahd District, Riyadh 12234, Saudi Arabia",
    phone: "+966 11 123 4567",
    hours: "Sunday - Thursday: 9:00 AM - 6:00 PM"
  },
  {
    city: "Jeddah",
    address: "Al Corniche District, Jeddah 21589, Saudi Arabia", 
    phone: "+966 12 456 7890",
    hours: "Sunday - Thursday: 9:00 AM - 6:00 PM"
  },
  {
    city: "Dammam",
    address: "King Abdulaziz District, Dammam 32245, Saudi Arabia",
    phone: "+966 13 789 0123", 
    hours: "Sunday - Thursday: 9:00 AM - 6:00 PM"
  }
]

const faqs = [
  {
    question: "What is the minimum investment amount?",
    answer: "You can start investing with as little as 1,000 SAR in any of our properties."
  },
  {
    question: "Are all investments Shariah compliant?",
    answer: "Yes, all our investments are vetted and certified by our Shariah board to ensure full compliance."
  },
  {
    question: "How often are returns distributed?",
    answer: "Rental income is typically distributed monthly, while capital appreciation is realized upon property sale or exit."
  },
  {
    question: "Can I sell my shares anytime?",
    answer: "Yes, our platform provides liquidity options through our secondary market for most investments."
  }
]

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
                📞 We're Here to Help
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your preferred way to reach us. We're committed to providing prompt and helpful responses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center p-6 hover-elevate group cursor-pointer" data-testid={`card-contact-${index}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <method.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{method.description}</p>
                <p className="font-semibold text-blue-600 mb-2">{method.value}</p>
                <p className="text-xs text-muted-foreground mb-4">{method.available}</p>
                <Button size="sm" variant="outline" className="w-full" data-testid={`button-${method.action.toLowerCase().replace(/\s+/g, '-')}`}>
                  {method.action}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours.
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
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} data-testid="input-name" />
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
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} data-testid="input-email" />
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
                          <FormLabel>Phone Number *</FormLabel>
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
                          <FormLabel>Inquiry Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-inquiry-type">
                                <SelectValue placeholder="Select inquiry type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="investment">Investment Questions</SelectItem>
                              <SelectItem value="account">Account Support</SelectItem>
                              <SelectItem value="technical">Technical Issues</SelectItem>
                              <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                              <SelectItem value="media">Media/Press</SelectItem>
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
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of your inquiry" {...field} data-testid="input-subject" />
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
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details about your inquiry..."
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
                    <span>We'll respond within 24 hours during business days</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Offices</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visit us at any of our locations across Saudi Arabia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <Card key={index} className="p-6 hover-elevate" data-testid={`card-office-${index}`}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    {office.city}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    <p className="text-sm">{office.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="text-sm font-medium text-blue-600">{office.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hours</p>
                    <p className="text-sm">{office.hours}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" data-testid={`button-directions-${office.city.toLowerCase()}`}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Get Directions
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Quick answers to common questions about Zaron and real estate investment.
              </p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6 hover-elevate" data-testid={`card-faq-${index}`}>
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Don't see your question answered?
              </p>
              <Button variant="outline" data-testid="button-view-all-faqs">
                View All FAQs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Need Urgent Support?</h3>
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