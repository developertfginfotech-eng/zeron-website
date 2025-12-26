import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from "@tanstack/react-query"
import { apiClient, API_ENDPOINTS } from "@/lib/api-client"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useTranslation } from "@/hooks/use-translation"
import { useAuth } from "@/hooks/use-auth"
import Logo from "@/components/logo"
import { Mail, User, Phone, Globe, TrendingUp, Building, Shield, Star } from "lucide-react"
import { useLocation } from "wouter"

// Login and registration schemas
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
})

const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  preferredLanguage: z.string().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

interface AuthDialogProps {
  children: React.ReactNode
  defaultTab?: "login" | "register"
}

export function AuthDialog({ children, defaultTab = "login" }: AuthDialogProps) {
  const { t } = useTranslation()
  const { setUser } = useAuth()
  const [, setLocation] = useLocation()
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(defaultTab)
  const [authStep, setAuthStep] = useState<'login' | 'register' | 'kyc-status'>('login')
  const { toast } = useToast()


  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      preferredLanguage: "en",
    },
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      return apiClient.post(API_ENDPOINTS.LOGIN, data)
    },
    onSuccess: (response: any) => {
      console.log('Login response:', response) // Debug log
      console.log('Response keys:', Object.keys(response)) // Show all keys

      // Handle different response structures
      // Try multiple possible locations for user data
      const userData = response.user || response.data?.user || response.investor || response.data || response
      const authToken = response.token || response.accessToken || response.data?.token || (response.data && typeof response.data === 'object' ? response.data.token : null)

      console.log('Parsed userData:', userData)
      console.log('Parsed token:', authToken)

      // Save token to localStorage
      if (authToken) {
        localStorage.setItem('zaron_token', authToken)
      } else {
        console.warn('No token found in response!')
      }

      // Save user data to localStorage
      const userToSave = {
        ...userData,
        token: authToken,
        // Ensure we have these fields
        firstName: userData.firstName || userData.name?.split(' ')[0] || 'User',
        lastName: userData.lastName || userData.name?.split(' ')[1] || '',
        email: userData.email,
        _id: userData._id || userData.id
      }

      localStorage.setItem('zaron_user', JSON.stringify(userToSave))
      console.log('Saved to localStorage:', userToSave)

      // Set user session
      setUser({
        id: userData._id || userData.id,
        firstName: userData.firstName || userData.name?.split(' ')[0] || 'User',
        lastName: userData.lastName || userData.name?.split(' ')[1] || '',
        email: userData.email,
        token: authToken,
        kycStatus: userData.kycStatus || 'not_started',
        kycCurrentStep: userData.kycCurrentStep || 0,
        kycCompletedSteps: userData.kycCompletedSteps || [],
        applicationProgress: userData.applicationProgress
      })

      toast({
        title: "Welcome back!",
        description: `Welcome back, ${userData.firstName || userData.name || 'User'}!`,
      })
      setOpen(false)

      // Redirect based on KYC status
      const kycStatus = userData.kycStatus || 'not_started'
      if (kycStatus === 'approved') {
        // If KYC is approved, go to dashboard
        setLocation('/investor/dashboard')
      } else {
        // If KYC is not approved, go to KYC verification page
        setLocation('/kyc-verification')
      }
    },
    onError: (error: any) => {
      if (error.message.includes('not found')) {
        // User doesn't exist, switch to registration
        registerForm.setValue('email', loginForm.getValues('email'))
        setActiveTab('register')
        toast({
          title: "User not found",
          description: "Please register first to continue.",
          variant: "destructive"
        })
      } else {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        })
      }
    }
  })

  // Registration mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      return apiClient.post(API_ENDPOINTS.REGISTER, data)
    },
    onSuccess: (response) => {
      console.log('Registration response:', response) // Debug log

      // Handle different response structures
      const userData = response.user || response.data?.user || response.data || response
      const authToken = response.token || response.accessToken || response.data?.token || (response.data && typeof response.data === 'object' ? response.data.token : null)

      // Save token to localStorage
      if (authToken) {
        localStorage.setItem('zaron_token', authToken)
      }

      // Save user data to localStorage
      localStorage.setItem('zaron_user', JSON.stringify({ ...userData, token: authToken }))

      // Set user session
      setUser({
        id: userData._id || userData.id,
        firstName: userData.firstName || userData.name?.split(' ')[0] || 'User',
        lastName: userData.lastName || userData.name?.split(' ')[1] || '',
        email: userData.email,
        token: authToken,
        kycStatus: userData.kycStatus || 'not_started',
        kycCurrentStep: userData.kycCurrentStep || 0,
        kycCompletedSteps: userData.kycCompletedSteps || [],
        applicationProgress: userData.applicationProgress
      })

      toast({
        title: "Registration successful!",
        description: "Your account has been created. Welcome to Zaron!",
      })
      setOpen(false)

      // Redirect new users to KYC verification page
      setLocation('/kyc-verification')
    },
    onError: (error: any) => {
      console.error('Registration error:', error) // Debug log

      if (error.message.includes('already registered')) {
        toast({
          title: "Email already exists",
          description: "This email is already registered. Please try logging in instead.",
          variant: "destructive"
        })
        loginForm.setValue('email', registerForm.getValues('email'))
        setActiveTab('login')
      } else if (error.response?.data?.errors) {
        // Show validation errors from backend
        const errorMessages = Object.values(error.response.data.errors).join(', ')
        toast({
          title: "Registration failed",
          description: errorMessages,
          variant: "destructive"
        })
      } else if (error.response?.data?.message) {
        toast({
          title: "Registration failed",
          description: error.response.data.message,
          variant: "destructive"
        })
      } else {
        toast({
          title: "Registration failed",
          description: error.message || "Please check your information and try again.",
          variant: "destructive"
        })
      }
    }
  })

  const handleLogin = (data: LoginFormData) => {
    loginMutation.mutate(data)
  }

  const handleRegister = (data: RegisterFormData) => {
    registerMutation.mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl lg:max-w-7xl p-0 overflow-y-auto max-h-[90vh] bg-transparent border-none shadow-none">
        <div className="relative w-full min-h-[700px] bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 rounded-3xl shadow-2xl">
          {/* Animated background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute bottom-32 left-40 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
            <div className="absolute bottom-20 right-20 w-1 h-1 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 min-h-[700px]">
            {/* Left Side - Impressive Hero */}
            <div className="relative overflow-hidden p-8 lg:p-12 flex flex-col justify-between text-white">
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
              
              {/* Hero content */}
              <div className="relative z-10 space-y-8">
                <div className="transform transition-all duration-1000 animate-in slide-in-from-left-10">
                  <div className="mb-6">
                    <Logo size="large" showTagline={true} />
                  </div>
                  
                  <h2 className="font-sans text-4xl font-bold mb-6 leading-tight">
                    {t("welcome_to_zaron")}
                  </h2>
                  <p className="font-sans text-blue-100 text-xl leading-relaxed">
                    {t("join_thousands_investors")}
                  </p>
                </div>
              
                {/* Impressive features with animations */}
                <div className="space-y-4 transform transition-all duration-1000 animate-in slide-in-from-left-10" style={{ animationDelay: '0.2s' }}>
                  <div className="flex items-center gap-4 text-white group hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <TrendingUp className="w-6 h-6 text-emerald-300" />
                    </div>
                    <div>
                      <p className="font-sans font-bold text-lg">20%+ Average Returns</p>
                      <p className="font-sans text-blue-200">Proven track record</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white group hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-500/20 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Building className="w-6 h-6 text-blue-300" />
                    </div>
                    <div>
                      <p className="font-sans font-bold text-lg">Premium Properties</p>
                      <p className="font-sans text-blue-200">Handpicked real estate</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white group hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400/20 to-emerald-500/20 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Shield className="w-6 h-6 text-purple-300" />
                    </div>
                    <div>
                      <p className="font-sans font-bold text-lg">Secure Platform</p>
                      <p className="font-sans text-blue-200">Bank-level security standards</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom section with testimonial */}
              <div className="relative z-10 space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl transform transition-all duration-500 hover:scale-105">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <p className="font-sans text-white text-lg leading-relaxed mb-4">
                    "Outstanding platform for real estate investment. Professional service and excellent returns."
                  </p>
                  <p className="font-sans text-blue-200">- Ahmed Al-Rashid, Verified Investor</p>
                </div>
                
                <div className="flex items-center gap-3 justify-center">
                  <span className="bg-emerald-500/20 backdrop-blur-sm text-emerald-200 px-4 py-2 rounded-full font-sans font-semibold animate-pulse">
                    {t("shariah_compliant")}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right Side - Modern Authentication Form */}
            <div className="relative overflow-y-auto p-8 lg:p-12 flex flex-col justify-center bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
              {/* Form glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-blue-50/50 dark:from-slate-800/50 dark:to-blue-900/50"></div>
              
              <div className="relative z-10 space-y-8">
                {/* Header with animation */}
                <div className="text-center space-y-4 transform transition-all duration-1000 animate-in slide-in-from-right-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center mx-auto shadow-2xl animate-pulse">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
                    START YOUR JOURNEY
                  </h2>
                  <p className="font-sans text-gray-600 dark:text-gray-300 text-lg">
                    Join thousands building wealth through real estate
                  </p>
                </div>
              
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" data-testid="tab-login" className="text-base py-3">{t("login")}</TabsTrigger>
                  <TabsTrigger value="register" data-testid="tab-register" className="text-base py-3">{t("register")}</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-6">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">{t("email")}</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="investor@example.com"
                                  className="pl-12 h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
                                  data-testid="input-login-email"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="Enter your password"
                                  className="h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
                                  data-testid="input-login-password"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <Button
                          type="submit"
                          className="w-full h-12 text-base font-medium bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                          disabled={loginMutation.isPending}
                          data-testid="button-login-submit"
                        >
                          {loginMutation.isPending ? "Checking account..." : "Continue to Dashboard"}
                        </Button>
                        
                        <div className="text-center text-sm text-gray-500">
                          New to Zaron? Switch to{" "}
                          <button 
                            type="button" 
                            onClick={() => setActiveTab('register')}
                            className="text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="register" className="space-y-6">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={registerForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">{t("first_name")}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    placeholder={t("first_name")}
                                    className="pl-12 h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
                                    data-testid="input-first-name"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-base font-medium">{t("last_name")}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                                  <Input
                                    {...field}
                                    placeholder={t("last_name")}
                                    className="pl-12 h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
                                    data-testid="input-last-name"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">{t("email")}</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="investor@example.com"
                                  className="pl-12 h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
                                  data-testid="input-register-email"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type="password"
                                  placeholder="Create a strong password"
                                  className="h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
                                  data-testid="input-register-password"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={registerForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">{t("phone_number")}</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type="tel"
                                  placeholder="+966 50 123 4567"
                                  className="pl-12 h-12 text-base bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-emerald-500 focus:ring-emerald-500"
                                  data-testid="input-phone"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="preferredLanguage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">Preferred Language</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Globe className="absolute left-4 top-4 h-5 w-5 text-muted-foreground z-10" />
                                <select
                                  {...field}
                                  className="w-full pl-12 pr-4 py-4 h-12 text-base bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                  data-testid="select-language"
                                >
                                  <option value="en">English</option>
                                  <option value="ar">العربية</option>
                                  <option value="hi">हिन्दी</option>
                                  <option value="ur">اردو</option>
                                  <option value="bn">বাংলা</option>
                                  <option value="ta">தமிழ்</option>
                                  <option value="te">తెలుగు</option>
                                </select>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-4">
                        <Button
                          type="submit"
                          className="w-full h-12 text-base font-medium bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                          disabled={registerMutation.isPending}
                          data-testid="button-register-submit"
                        >
                          {registerMutation.isPending ? t("creating_account") + "..." : "Create Account & Start Investing"}
                        </Button>
                        
                        <div className="text-center text-sm text-gray-500">
                          Already have an account?{" "}
                          <button 
                            type="button" 
                            onClick={() => setActiveTab('login')}
                            className="text-emerald-600 hover:text-emerald-700 font-medium"
                          >
                            Sign in
                          </button>
                        </div>
                      </div>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
              
              <div className="text-center text-sm text-gray-500 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="mb-3">By continuing, you agree to our Terms of Service and Privacy Policy</p>
                <div className="flex items-center gap-3 justify-center">
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-medium">Bank-Level Security</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-600 font-medium">Fully Licensed</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}