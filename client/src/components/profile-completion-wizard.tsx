import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/use-auth"
import { X, ChevronLeft, ChevronRight, CheckCircle, User, Wallet, Bell, FileText, Home, DollarSign, Sparkles, Target, TrendingUp, Shield } from "lucide-react"

interface ProfileCompletionWizardProps {
  onClose: () => void
}

export function ProfileCompletionWizard({ onClose }: ProfileCompletionWizardProps) {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(0)
  const [animationClass, setAnimationClass] = useState("")
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  
  // Mock form data with dummy values (no validation as requested)
  const [formData, setFormData] = useState({
    // Investment Profile
    experience: "3-5 years",
    riskTolerance: "Moderate",
    investmentGoals: "Long-term wealth building",
    preferredTypes: ["Commercial", "Residential"],
    investmentAmount: "250000",
    timeline: "5-10 years",
    
    // Banking Details
    bankName: "Al Rajhi Bank",
    iban: "SA03 8000 0000 6080 1016 7519",
    accountHolder: `${user?.firstName || 'Ahmed'} ${user?.lastName || 'Al-Mansouri'}`,
    swiftCode: "RJHISARI",
    accountType: "Savings",
    
    // Communication Preferences
    emailNotifications: true,
    smsAlerts: true,
    languagePreference: "English",
    timezone: "Asia/Riyadh",
    marketingEmails: false,
    monthlyReports: true,
    
    // Additional Documents
    employmentStatus: "Employed",
    employer: "Saudi Aramco",
    jobTitle: "Senior Engineer",
    monthlySalary: "18000",
    hasInvestmentPortfolio: true,
    portfolioValue: "450000"
  })

  const steps = [
    {
      id: "investment",
      title: "Investment Profile",
      description: "Tell us about your investment experience and preferences",
      icon: <Wallet className="w-5 h-5" />,
      fields: ["experience", "riskTolerance", "investmentGoals", "preferredTypes", "investmentAmount", "timeline"]
    },
    {
      id: "banking",
      title: "Banking Details",
      description: "Add your banking information for seamless transactions",
      icon: <DollarSign className="w-5 h-5" />,
      fields: ["bankName", "iban", "accountHolder", "swiftCode", "accountType"]
    },
    {
      id: "preferences",
      title: "Communication Preferences",
      description: "Customize how you want to receive updates",
      icon: <Bell className="w-5 h-5" />,
      fields: ["emailNotifications", "smsAlerts", "languagePreference", "timezone", "marketingEmails", "monthlyReports"]
    },
    {
      id: "documents",
      title: "Employment & Portfolio",
      description: "Additional information about your financial background",
      icon: <FileText className="w-5 h-5" />,
      fields: ["employmentStatus", "employer", "jobTitle", "monthlySalary", "hasInvestmentPortfolio", "portfolioValue"]
    }
  ]

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100
  const completionPercentage = Math.round(progress)
  
  // Calculate field completion for current step
  const getCurrentStepCompletion = () => {
    const stepFields = currentStepData.fields
    const completedFields = stepFields.filter(field => {
      const value = formData[field as keyof typeof formData]
      return value !== "" && value !== null && value !== undefined && 
             (Array.isArray(value) ? value.length > 0 : true)
    })
    return Math.round((completedFields.length / stepFields.length) * 100)
  }
  
  const stepCompletion = getCurrentStepCompletion()

  const handleNext = () => {
    setAnimationClass("animate-slide-out-left")
    
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        // Mark current step as completed
        if (!completedSteps.includes(currentStep)) {
          setCompletedSteps(prev => [...prev, currentStep])
        }
        setCurrentStep(currentStep + 1)
      } else {
        // Complete the wizard
        setCompletedSteps(prev => [...prev, currentStep])
        handleComplete()
      }
      setAnimationClass("animate-slide-in-right")
    }, 150)
    
    setTimeout(() => {
      setAnimationClass("")
    }, 300)
  }

  const handlePrevious = () => {
    setAnimationClass("animate-slide-out-right")
    
    setTimeout(() => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1)
      }
      setAnimationClass("animate-slide-in-left")
    }, 150)
    
    setTimeout(() => {
      setAnimationClass("")
    }, 300)
  }

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem('zaron_token') ||
                   JSON.parse(localStorage.getItem('zaron_user') || '{}').token;

      const response = await fetch('https://zeron-backend-z5o1.onrender.com/api/users/profile/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      const data = await response.json();
      console.log("Profile saved successfully:", data);

      // Refresh the page to show updated status
      window.location.reload();
    } catch (error) {
      console.error("Error saving profile:", error);
      // Refresh anyway to show current state
      window.location.reload();
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const renderStepContent = () => {
    switch (currentStepData.id) {
      case "investment":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="experience">Investment Experience</Label>
                <Select value={formData.experience} onValueChange={(value) => updateFormData("experience", value)}>
                  <SelectTrigger data-testid="select-experience">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Less than 1 year">Less than 1 year</SelectItem>
                    <SelectItem value="1-3 years">1-3 years</SelectItem>
                    <SelectItem value="3-5 years">3-5 years</SelectItem>
                    <SelectItem value="5-10 years">5-10 years</SelectItem>
                    <SelectItem value="More than 10 years">More than 10 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                <Select value={formData.riskTolerance} onValueChange={(value) => updateFormData("riskTolerance", value)}>
                  <SelectTrigger data-testid="select-risk">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Conservative">Conservative</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="investmentGoals">Investment Goals</Label>
              <Textarea 
                value={formData.investmentGoals}
                onChange={(e) => updateFormData("investmentGoals", e.target.value)}
                placeholder="Describe your investment objectives..."
                data-testid="textarea-goals"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="investmentAmount">Initial Investment Amount (SAR)</Label>
                <Input 
                  value={formData.investmentAmount}
                  onChange={(e) => updateFormData("investmentAmount", e.target.value)}
                  placeholder="e.g., 100000"
                  data-testid="input-amount"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeline">Investment Timeline</Label>
                <Select value={formData.timeline} onValueChange={(value) => updateFormData("timeline", value)}>
                  <SelectTrigger data-testid="select-timeline">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2 years">1-2 years</SelectItem>
                    <SelectItem value="3-5 years">3-5 years</SelectItem>
                    <SelectItem value="5-10 years">5-10 years</SelectItem>
                    <SelectItem value="10+ years">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preferred Property Types</Label>
              <div className="flex flex-wrap gap-2">
                {["Commercial", "Residential", "Retail", "Industrial", "Mixed-use"].map((type) => (
                  <Badge 
                    key={type}
                    variant={formData.preferredTypes.includes(type) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      const current = formData.preferredTypes
                      if (current.includes(type)) {
                        updateFormData("preferredTypes", current.filter(t => t !== type))
                      } else {
                        updateFormData("preferredTypes", [...current, type])
                      }
                    }}
                    data-testid={`badge-${type.toLowerCase()}`}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case "banking":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Select value={formData.bankName} onValueChange={(value) => updateFormData("bankName", value)}>
                  <SelectTrigger data-testid="select-bank">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Al Rajhi Bank">Al Rajhi Bank</SelectItem>
                    <SelectItem value="National Commercial Bank">National Commercial Bank</SelectItem>
                    <SelectItem value="Riyad Bank">Riyad Bank</SelectItem>
                    <SelectItem value="SAMBA Financial Group">SAMBA Financial Group</SelectItem>
                    <SelectItem value="Saudi British Bank">Saudi British Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Select value={formData.accountType} onValueChange={(value) => updateFormData("accountType", value)}>
                  <SelectTrigger data-testid="select-account-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Savings">Savings Account</SelectItem>
                    <SelectItem value="Current">Current Account</SelectItem>
                    <SelectItem value="Investment">Investment Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="iban">IBAN</Label>
              <Input 
                value={formData.iban}
                onChange={(e) => updateFormData("iban", e.target.value)}
                placeholder="SA03 8000 0000 6080 1016 7519"
                data-testid="input-iban"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountHolder">Account Holder Name</Label>
                <Input 
                  value={formData.accountHolder}
                  onChange={(e) => updateFormData("accountHolder", e.target.value)}
                  placeholder="Full name as per bank records"
                  data-testid="input-account-holder"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="swiftCode">SWIFT Code</Label>
                <Input 
                  value={formData.swiftCode}
                  onChange={(e) => updateFormData("swiftCode", e.target.value)}
                  placeholder="e.g., RJHISARI"
                  data-testid="input-swift"
                />
              </div>
            </div>
          </div>
        )

      case "preferences":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="languagePreference">Language Preference</Label>
                <Select value={formData.languagePreference} onValueChange={(value) => updateFormData("languagePreference", value)}>
                  <SelectTrigger data-testid="select-language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Arabic">العربية</SelectItem>
                    <SelectItem value="Urdu">اردو</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={formData.timezone} onValueChange={(value) => updateFormData("timezone", value)}>
                  <SelectTrigger data-testid="select-timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Riyadh">Asia/Riyadh</SelectItem>
                    <SelectItem value="Asia/Dubai">Asia/Dubai</SelectItem>
                    <SelectItem value="Asia/Kuwait">Asia/Kuwait</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Notification Preferences</Label>
              <div className="space-y-3">
                {[
                  { key: "emailNotifications", label: "Email Notifications", desc: "Investment updates and account activity" },
                  { key: "smsAlerts", label: "SMS Alerts", desc: "Critical updates and payout notifications" },
                  { key: "marketingEmails", label: "Marketing Communications", desc: "New opportunities and market insights" },
                  { key: "monthlyReports", label: "Monthly Reports", desc: "Portfolio performance summaries" }
                ].map((pref) => (
                  <div key={pref.key} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{pref.label}</p>
                      <p className="text-sm text-muted-foreground">{pref.desc}</p>
                    </div>
                    <Button
                      variant={formData[pref.key as keyof typeof formData] ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateFormData(pref.key, !formData[pref.key as keyof typeof formData])}
                      data-testid={`toggle-${pref.key}`}
                    >
                      {formData[pref.key as keyof typeof formData] ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "documents":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employmentStatus">Employment Status</Label>
                <Select value={formData.employmentStatus} onValueChange={(value) => updateFormData("employmentStatus", value)}>
                  <SelectTrigger data-testid="select-employment">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employed">Employed</SelectItem>
                    <SelectItem value="Self-employed">Self-employed</SelectItem>
                    <SelectItem value="Business Owner">Business Owner</SelectItem>
                    <SelectItem value="Retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="monthlySalary">Monthly Salary (SAR)</Label>
                <Input 
                  value={formData.monthlySalary}
                  onChange={(e) => updateFormData("monthlySalary", e.target.value)}
                  placeholder="e.g., 15000"
                  data-testid="input-salary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employer">Employer</Label>
                <Input 
                  value={formData.employer}
                  onChange={(e) => updateFormData("employer", e.target.value)}
                  placeholder="Company name"
                  data-testid="input-employer"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input 
                  value={formData.jobTitle}
                  onChange={(e) => updateFormData("jobTitle", e.target.value)}
                  placeholder="Your position"
                  data-testid="input-job-title"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium">Existing Investment Portfolio</p>
                  <p className="text-sm text-muted-foreground">Do you have other investments?</p>
                </div>
                <Button
                  variant={formData.hasInvestmentPortfolio ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFormData("hasInvestmentPortfolio", !formData.hasInvestmentPortfolio)}
                  data-testid="toggle-portfolio"
                >
                  {formData.hasInvestmentPortfolio ? "Yes" : "No"}
                </Button>
              </div>

              {formData.hasInvestmentPortfolio && (
                <div className="space-y-2">
                  <Label htmlFor="portfolioValue">Portfolio Value (SAR)</Label>
                  <Input 
                    value={formData.portfolioValue}
                    onChange={(e) => updateFormData("portfolioValue", e.target.value)}
                    placeholder="e.g., 500000"
                    data-testid="input-portfolio-value"
                  />
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 dark:from-slate-900 dark:via-blue-950 dark:to-emerald-950 z-50 overflow-auto" data-testid="profile-wizard">
      <div className="min-h-screen flex flex-col">
        {/* Enhanced Header */}
        <div className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent" data-testid="text-wizard-title">
                    Complete Your Investment Profile
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Step {currentStep + 1} of {steps.length} • {completionPercentage}% Complete
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-muted-foreground">Current Step</p>
                  <p className="text-2xl font-bold text-emerald-600">{stepCompletion}%</p>
                </div>
                <Button variant="ghost" size="sm" onClick={onClose} data-testid="button-close-wizard" className="w-10 h-10 rounded-full">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-600">Overall Progress</span>
                <span className="text-sm font-bold text-emerald-600">{completionPercentage}%</span>
              </div>
              <div className="relative">
                <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700" />
                <div className="absolute inset-0 h-3 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full transition-all duration-500 ease-out" 
                     style={{ width: `${progress}%` }}>
                  <div className="absolute right-0 top-0 w-2 h-3 bg-white rounded-full shadow-sm animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="flex-1 max-w-6xl mx-auto px-6 py-8">
          {/* Modern Step Navigation */}
          <div className="flex items-center justify-between mb-8 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center gap-3 flex-1">
                <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                  index === currentStep 
                    ? "border-emerald-500 bg-gradient-to-br from-emerald-500 to-blue-600 text-white shadow-lg scale-110" 
                    : completedSteps.includes(index)
                      ? "border-green-500 bg-green-500 text-white shadow-md"
                      : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-400"
                }`}>
                  {completedSteps.includes(index) ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : index === currentStep ? (
                    <div className="relative">
                      {step.icon}
                      <div className="absolute -inset-2 bg-white/20 rounded-full animate-ping"></div>
                    </div>
                  ) : (
                    step.icon
                  )}
                  
                  {index === currentStep && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-yellow-800" />
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <p className={`font-semibold text-sm transition-colors ${
                    index === currentStep ? "text-emerald-600" : 
                    completedSteps.includes(index) ? "text-green-600" : 
                    "text-gray-500"
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {index === currentStep ? `${stepCompletion}% complete` :
                     completedSteps.includes(index) ? "Completed" :
                     "Pending"}
                  </p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`absolute top-8 left-1/2 w-full h-px transition-colors ${
                    completedSteps.includes(index) ? "bg-green-400" : "bg-gray-200 dark:bg-gray-600"
                  } hidden lg:block`} style={{ transform: "translateX(50%)" }} />
                )}
              </div>
            ))}
          </div>

          {/* Modern Step Content */}
          <div className={`transition-all duration-300 ease-in-out ${animationClass}`}>
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                      {currentStepData.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        {currentStepData.title}
                      </CardTitle>
                      <CardDescription className="text-base text-gray-600 dark:text-gray-300 mt-1">
                        {currentStepData.description}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full">
                      <Target className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-emerald-600">{stepCompletion}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Step Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Step Progress</span>
                    <span className="text-sm font-bold text-emerald-600">{stepCompletion}%</span>
                  </div>
                  <Progress value={stepCompletion} className="h-2 bg-gray-100 dark:bg-gray-700" />
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-900/10 dark:to-blue-900/10 rounded-xl p-6">
                  {renderStepContent()}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky bottom-0 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious} 
                  disabled={currentStep === 0}
                  data-testid="button-previous"
                  className="h-12 px-6 font-medium hover:bg-gray-50"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>
                
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Your data is encrypted and secure</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-gray-500">Overall Progress</p>
                  <p className="font-bold text-lg text-emerald-600">{completionPercentage}%</p>
                </div>
                
                <Button 
                  onClick={handleNext} 
                  data-testid="button-next"
                  className="h-12 px-8 text-base font-medium bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Complete Profile
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}