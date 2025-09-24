import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Upload, 
  CheckCircle, 
  Lock, 
  Camera,
  FileText,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  IdCard,
  AlertCircle,
  ArrowRight,
  X,
  Home
} from 'lucide-react';

const KYCVerificationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationality: 'Saudi Arabia',
    address: '',
    phoneNumber: '',
    documentType: '',
    documentNumber: '',
    monthlyIncome: '',
    investmentExperience: ''
  });

  const steps = [
    { id: 1, title: 'Personal Information', icon: User },
    { id: 2, title: 'Identity Verification', icon: IdCard },
    { id: 3, title: 'Document Upload', icon: Upload },
    { id: 4, title: 'Financial Profile', icon: FileText }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  // In your kyc-verification.tsx:
const handleSkip = () => {
  // Update KYC status
  const storedUser = localStorage.getItem('zaron_user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    user.kycStatus = 'skipped';
    localStorage.setItem('zaron_user', JSON.stringify(user));
  }
  
  // Redirect to user dashboard
  window.location.href = '/user-dashboard';
};

const handleComplete = () => {
  // Update KYC status to completed
  const storedUser = localStorage.getItem('zaron_user');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    user.kycStatus = 'approved';
    localStorage.setItem('zaron_user', JSON.stringify(user));
  }
  
  alert('KYC verification submitted successfully! You can now access all features.');
  window.location.href = '/user-dashboard';
};
  const progressPercentage = (currentStep / steps.length) * 100;

  // Skip Confirmation Dialog
  const SkipDialog = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            Skip Verification?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            You can skip KYC verification for now, but some features will be limited:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-500" />
              Investment limit: SAR 1,000 only
            </li>
            <li className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-500" />
              No withdrawals allowed
            </li>
            <li className="flex items-center gap-2">
              <X className="h-4 w-4 text-red-500" />
              Limited property access
            </li>
          </ul>
          <p className="text-sm text-green-600">
            ✓ You can complete verification anytime from your profile
          </p>
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowSkipDialog(false)}
              className="flex-1"
            >
              Continue KYC
            </Button>
            <Button 
              onClick={handleSkip}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600"
            >
              Skip for Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Identity Verification</h1>
              <p className="text-sm text-muted-foreground">Secure your investment account</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={() => setShowSkipDialog(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <Home className="h-4 w-4 mr-2" />
            Skip for Now
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Complete Your Profile</h2>
            <Badge variant="secondary">Step {currentStep} of {steps.length}</Badge>
          </div>
          <Progress value={progressPercentage} className="h-2 mb-4" />
          
          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step.id 
                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(steps[currentStep - 1].icon, { className: "h-5 w-5" })}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Help us verify your identity with basic information"}
              {currentStep === 2 && "Upload a government-issued ID document"}
              {currentStep === 3 && "Take a clear photo of your documents"}
              {currentStep === 4 && "Tell us about your financial background"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name (as per ID)</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Ahmed Mohammed Al-Rashid"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Select value={formData.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                      <SelectItem value="UAE">UAE</SelectItem>
                      <SelectItem value="Kuwait">Kuwait</SelectItem>
                      <SelectItem value="Qatar">Qatar</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="+966 50 123 4567"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Street address, City, Postal Code"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Identity Verification */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Select Document Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['National ID', 'Passport', 'Driving License'].map((type) => (
                      <div
                        key={type}
                        onClick={() => handleInputChange('documentType', type)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.documentType === type
                            ? 'border-emerald-600 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <IdCard className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                        <p className="text-center font-medium">{type}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {formData.documentType && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="documentNumber">Document Number</Label>
                      <Input
                        id="documentNumber"
                        value={formData.documentNumber}
                        onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                        placeholder="Enter document number"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>Front of Document</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-600 transition-colors cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Label>Back of Document</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-600 transition-colors cursor-pointer">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Tips for best results:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Ensure good lighting and clear image quality</li>
                    <li>• All corners of the document should be visible</li>
                    <li>• Avoid shadows, glare, or blurry images</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 4: Financial Profile */}
            {currentStep === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Monthly Income</Label>
                  <Select value={formData.monthlyIncome} onValueChange={(value) => handleInputChange('monthlyIncome', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below-5000">Below SAR 5,000</SelectItem>
                      <SelectItem value="5000-15000">SAR 5,000 - 15,000</SelectItem>
                      <SelectItem value="15000-30000">SAR 15,000 - 30,000</SelectItem>
                      <SelectItem value="30000-50000">SAR 30,000 - 50,000</SelectItem>
                      <SelectItem value="above-50000">Above SAR 50,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Investment Experience</Label>
                  <Select value={formData.investmentExperience} onValueChange={(value) => handleInputChange('investmentExperience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                      <SelectItem value="experienced">Experienced (3+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
              
              <div className="ml-auto">
                {currentStep < steps.length ? (
                  <Button onClick={handleNext} className="bg-gradient-to-r from-emerald-600 to-blue-600">
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleComplete} className="bg-gradient-to-r from-emerald-600 to-blue-600">
                    Complete Verification
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-emerald-600 mt-1" />
              <div>
                <h3 className="font-semibold text-emerald-900 mb-2">Your data is secure</h3>
                <p className="text-emerald-800 text-sm leading-relaxed">
                  All information is encrypted and stored securely. We use bank-grade security measures 
                  and never share your personal information with third parties. This verification is 
                  required by Saudi financial regulations to protect investors.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skip Dialog */}
      {showSkipDialog && <SkipDialog />}
    </div>
  );
};

export default KYCVerificationPage;