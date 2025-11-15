import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { useTranslation } from "@/hooks/use-translation"
import { useUploadDocuments, useKYCStatus } from "@/hooks/use-kyc"
import { useToast } from "@/hooks/use-toast"
import {
  CheckCircle,
  Circle,
  User,
  Camera,
  MapPin,
  DollarSign,
  FileText,
  ArrowRight,
  ArrowLeft,
  Upload,
  Loader2
} from "lucide-react"

const KYC_STEPS = [
  {
    id: 'identity',
    title: 'Identity Verification',
    description: 'Upload your government ID and personal details',
    icon: User,
    fileField: 'nationalId',
    fields: ['Full Name (English)', 'Full Name (Arabic)', 'Date of Birth', 'Nationality', 'Document Type', 'Document Number'],
    documentLabel: 'National ID / Passport'
  },
  {
    id: 'selfie',
    title: 'Selfie & Liveness',
    description: 'Take a selfie for identity verification',
    icon: Camera,
    fileField: 'selfie',
    fields: ['Selfie Photo'],
    documentLabel: 'Selfie Photo'
  },
  {
    id: 'address',
    title: 'Address Proof',
    description: 'Verify your residential address',
    icon: MapPin,
    fileField: 'addressProof',
    fields: ['Street Address', 'City', 'Postal Code', 'Region'],
    documentLabel: 'Address Proof (Utility Bill, Lease, etc.)'
  },
  {
    id: 'income',
    title: 'Income Verification',
    description: 'Provide proof of income and employment',
    icon: DollarSign,
    fileField: 'proofOfIncome',
    fields: ['Monthly Income', 'Occupation', 'Employer Name'],
    documentLabel: 'Proof of Income (Salary Certificate, Bank Statement)'
  },
  {
    id: 'declarations',
    title: 'Declarations & Consent',
    description: 'Complete legal declarations and consents',
    icon: FileText,
    fields: ['I agree to the Terms & Conditions', 'I consent to data processing', 'I declare the information is accurate'],
    documentLabel: 'No document required'
  }
]

interface KYCWizardProps {
  onClose?: () => void
  onComplete?: () => void
}

export function KYCWizard({ onClose, onComplete }: KYCWizardProps) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { toast } = useToast()
  const { data: kycStatus } = useKYCStatus()
  const uploadMutation = useUploadDocuments()

  const [currentStep, setCurrentStep] = useState(user?.kycCurrentStep || 0)
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({})
  const [formData, setFormData] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const progressPercentage = ((currentStep + 1) / KYC_STEPS.length) * 100

  const handleNext = async () => {
    // For steps with file uploads, require at least one file
    const currentStepData = KYC_STEPS[currentStep]
    if (currentStepData.fileField && !uploadedFiles[currentStepData.fileField]) {
      toast({
        title: "File Required",
        description: `Please upload a document for ${currentStepData.title}`,
        variant: "destructive"
      })
      return
    }

    // Handle file upload if this step has files
    if (currentStepData.fileField && uploadedFiles[currentStepData.fileField]) {
      await handleUploadStep()
    }

    if (currentStep < KYC_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleUploadStep = async () => {
    const currentStepData = KYC_STEPS[currentStep]
    const file = uploadedFiles[currentStepData.fileField]

    if (!file) return

    try {
      const data = new FormData()
      data.append(currentStepData.fileField, file)

      // Add form data for this step
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          data.append(key, value)
        }
      })

      const response = await uploadMutation.mutateAsync(data)

      toast({
        title: "Success",
        description: `Document uploaded successfully. Completion: ${response.data?.completionPercentage}%`,
      })

      // Clear uploaded files for this step
      setUploadedFiles(prev => {
        const updated = { ...prev }
        delete updated[currentStepData.fileField]
        return updated
      })
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload document",
        variant: "destructive"
      })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    // Only allow clicking on completed steps or the next step
    if (stepIndex <= currentStep + 1) {
      setCurrentStep(stepIndex)
    }
  }

  const isStepCompleted = (stepIndex: number) => {
    return kycStatus?.documents && Object.values(kycStatus.documents).some(doc => doc?.uploaded)
  }

  const isStepCurrent = (stepIndex: number) => {
    return stepIndex === currentStep
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      const file = files[0]
      const currentStepData = KYC_STEPS[currentStep]

      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB",
          variant: "destructive"
        })
        return
      }

      setUploadedFiles(prev => ({
        ...prev,
        [currentStepData.fileField]: file
      }))
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const currentStepData = KYC_STEPS[currentStep]
  const Icon = currentStepData.icon
  const currentFile = uploadedFiles[currentStepData.fileField]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your KYC Verification</h1>
            <p className="text-muted-foreground mb-6">
              Help us verify your identity to unlock investment features
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Step {currentStep + 1} of {KYC_STEPS.length} • {Math.round(progressPercentage)}% Complete
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Steps Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">KYC Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {KYC_STEPS.map((step, index) => {
                    const StepIcon = step.icon
                    const completed = isStepCompleted(index)
                    const current = isStepCurrent(index)
                    
                    return (
                      <button
                        key={step.id}
                        onClick={() => handleStepClick(index)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                          current 
                            ? 'bg-primary text-primary-foreground' 
                            : completed
                            ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                            : 'hover:bg-muted'
                        }`}
                        data-testid={`step-${step.id}`}
                      >
                        {completed ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : current ? (
                          <StepIcon className="h-5 w-5" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            current ? 'text-primary-foreground' : ''
                          }`}>
                            {step.title}
                          </p>
                          {current && (
                            <Badge variant="secondary" className="mt-1">
                              Current
                            </Badge>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{currentStepData.title}</CardTitle>
                      <CardDescription>{currentStepData.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Form Fields */}
                  <div className="space-y-4">
                    {currentStepData.fields.map((field, index) => (
                      <div key={index}>
                        <label className="text-sm font-medium mb-2 block">{field}</label>
                        <input
                          type="text"
                          name={field.toLowerCase().replace(/\s+/g, '_')}
                          placeholder={`Enter ${field.toLowerCase()}`}
                          onChange={handleFormChange}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Step Content */}
                  {currentStepData.fileField && (
                    <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-semibold mb-2">{currentStepData.documentLabel}</h3>
                      <p className="text-muted-foreground mb-4">
                        Click to upload or drag and drop
                      </p>

                      {currentFile && (
                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-sm text-green-700 dark:text-green-300">
                            ✓ {currentFile.name}
                          </p>
                        </div>
                      )}

                      {/* Hidden File Input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        data-testid={`file-input-${currentStepData.id}`}
                      />

                      {/* Upload Area */}
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="mb-4"
                        disabled={uploadMutation.isPending}
                        data-testid={`upload-${currentStepData.id}`}
                      >
                        {uploadMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground">
                        Supported formats: PDF, JPG, PNG • Maximum size: 10MB per file
                      </p>
                    </div>
                  )}

                  {currentStepData.id === 'declarations' && (
                    <div className="space-y-3">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">I agree to the Terms & Conditions</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">I consent to data processing</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">I declare the information is accurate</span>
                      </label>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 0 || uploadMutation.isPending}
                      data-testid="button-previous"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-2">
                      {onClose && (
                        <Button
                          variant="ghost"
                          onClick={onClose}
                          disabled={uploadMutation.isPending}
                          data-testid="button-save-exit"
                        >
                          Save & Exit
                        </Button>
                      )}

                      {currentStep === KYC_STEPS.length - 1 ? (
                        <Button
                          onClick={onComplete}
                          className="bg-gradient-to-r from-emerald-600 to-blue-600"
                          disabled={uploadMutation.isPending}
                          data-testid="button-submit-kyc"
                        >
                          Submit for Review
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          className="bg-gradient-to-r from-emerald-600 to-blue-600"
                          disabled={uploadMutation.isPending}
                          data-testid="button-next"
                        >
                          {uploadMutation.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              Continue
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}