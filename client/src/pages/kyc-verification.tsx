import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Upload,
  CheckCircle,
  FileText,
  User,
  CreditCard,
  AlertCircle,
  ArrowRight,
  X,
  Home,
  Loader2,
} from "lucide-react";

const KYCVerificationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);
  const [kycCompletionPercentage, setKycCompletionPercentage] = useState(0);

  const fileInputRefs = {
    nationalId: useRef(null),
    selfie: useRef(null),
    proofOfIncome: useRef(null),
    addressProof: useRef(null),
  };

  const [formData, setFormData] = useState({
    fullNameEnglish: "",
    fullNameArabic: "",
    dateOfBirth: "",
    nationality: "Saudi Arabia",
    street: "",
    city: "",
    region: "",
    postalCode: "",
    phoneNumber: "",
    documentType: "",
    documentNumber: "",
    monthlyIncome: "",
    occupation: "",
    investmentExperience: "",
    incomeDocType: "salary_certificate",
    addressDocType: "utility_bill",
  });

  useEffect(() => {
    const loadExistingKYCData = async () => {
      try {
        setDataLoading(true);
        const userData = localStorage.getItem('zaron_user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          const token = parsedUser.token || localStorage.getItem('zaron_token');
          
          if (token) {
            console.log('Fetching existing KYC data...');
            const response = await fetch('http://13.50.13.193:5000/api/kyc', {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            if (response.ok) {
              const kycData = await response.json();
              console.log('KYC data received:', kycData);

              if (kycData.success && kycData.data) {
                const existingData = kycData.data;

                // Store the actual completion percentage from backend
                if (existingData.completionPercentage !== undefined) {
                  setKycCompletionPercentage(existingData.completionPercentage);
                }

                if (existingData.status === 'submitted' || existingData.status === 'under_review' || existingData.status === 'approved') {
                  alert('Your KYC verification is already submitted and under review. Redirecting to dashboard...');
                  window.location.href = '/user-dashboard';
                  return;
                }
                
               
                setFormData(prev => ({
                  ...prev,
                  fullNameEnglish: existingData.personalInfo?.fullNameEnglish || '',
                  fullNameArabic: existingData.personalInfo?.fullNameArabic || '',
                  dateOfBirth: existingData.personalInfo?.dateOfBirth ? 
                    new Date(existingData.personalInfo.dateOfBirth).toISOString().split('T')[0] : '',
                  occupation: existingData.personalInfo?.occupation || '',
                  nationality: existingData.personalInfo?.nationality || 'Saudi Arabia',
                  monthlyIncome: existingData.personalInfo?.monthlyIncome?.toString() || '',
                  street: existingData.address?.street || '',
                  city: existingData.address?.city || '',
                  region: existingData.address?.region || '',
                  postalCode: existingData.address?.postalCode || '',
                  phoneNumber: existingData.personalInfo?.phoneNumber || '',
                  documentType: existingData.documentInfo?.type || '',
                  documentNumber: existingData.documentInfo?.number || '',
                  incomeDocType: existingData.documents?.proofOfIncome?.type || 'salary_certificate',
                  addressDocType: existingData.documents?.addressProof?.type || 'utility_bill'
                }));

               
                const uploadedFilesStatus = {};
                if (existingData.documents?.nationalId?.url) {
                  uploadedFilesStatus.nationalId = { name: 'Previously uploaded', size: 0 };
                }
                if (existingData.documents?.selfie?.url) {
                  uploadedFilesStatus.selfie = { name: 'Previously uploaded', size: 0 };
                }
                if (existingData.documents?.proofOfIncome?.url) {
                  uploadedFilesStatus.proofOfIncome = { name: 'Previously uploaded', size: 0 };
                }
                if (existingData.documents?.addressProof?.url) {
                  uploadedFilesStatus.addressProof = { name: 'Previously uploaded', size: 0 };
                }
                setUploadedFiles(uploadedFilesStatus);

                console.log('Form pre-filled with existing data');
              }
            } else if (response.status === 404) {
              console.log('No existing KYC data found');
            }
          }
        }
      } catch (error) {
        console.error('Failed to load existing KYC data:', error);
      } finally {
        setDataLoading(false);
      }
    };

    loadExistingKYCData();
  }, []);

  const steps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Identity Verification", icon: CreditCard },
    { id: 3, title: "Document Upload", icon: Upload },
    { id: 4, title: "Financial Profile", icon: FileText },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateFile = (file, maxSize = 10 * 1024 * 1024) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];

    if (!validTypes.includes(file.type)) {
      throw new Error(
        "Invalid file type. Please upload JPG, PNG, WebP, or PDF files only."
      );
    }

    if (file.size > maxSize) {
      throw new Error(
        `File size too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`
      );
    }

    return true;
  };

  const handleFileSelect = (fileType, event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        validateFile(file);
        setUploadedFiles((prev) => ({ ...prev, [fileType]: file }));
      } catch (error) {
        alert(error.message);
        event.target.value = "";
      }
    }
  };

  const prepareFormData = (formData, uploadedFiles) => {
    const formDataToSend = new FormData();

    // Add files with correct field names for backend
    Object.entries(uploadedFiles).forEach(([key, file]) => {
      if (file) {
        formDataToSend.append(key, file);
      }
    });

    // Add form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value && value.toString().trim() !== "") {
        formDataToSend.append(key, value);
      }
    });

    return formDataToSend;
  };

  const uploadDocuments = async () => {
    try {
      setIsLoading(true);
      setUploadProgress(10);

      // Validate required fields
      const requiredFields = ["fullNameEnglish", "dateOfBirth", "occupation"];
      const missingFields = requiredFields.filter(
        (field) => !formData[field] || formData[field].trim() === ""
      );

      if (missingFields.length > 0) {
        throw new Error(
          `Please fill in required fields: ${missingFields.join(", ")}`
        );
      }

      // Check if at least one file is uploaded
      if (Object.keys(uploadedFiles).length === 0) {
        throw new Error("Please upload at least one document");
      }

      // Prepare form data
      const formDataToSend = prepareFormData(formData, uploadedFiles);
      setUploadProgress(30);

      // Get auth token - check multiple locations
      const user = JSON.parse(localStorage.getItem("zaron_user") || "{}");
      const token =
        user.token ||
        localStorage.getItem("zaron_token") ||
        localStorage.getItem("authToken");

      if (!token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      setUploadProgress(50);

      // Use the correct API URL
      const apiUrl = "http://13.50.13.193:5000/api";
      const fullUrl = `${apiUrl}/kyc/upload`;
      
      console.log("Making request to:", fullUrl);
      console.log("Auth token present:", token ? "Yes" : "No");
      console.log("FormData entries:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      setUploadProgress(90);

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers.get('content-type'));

      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error("Non-JSON response received:", textResponse);
        throw new Error(`Server returned ${response.status}: ${response.statusText}. Response: ${textResponse.substring(0, 200)}`);
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Upload failed");
      }

      setUploadProgress(100);

      // Fetch updated user profile from backend
      try {
        const profileResponse = await fetch(`${API_BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          const updatedUser = profileData.data || profileData.user || profileData;

          if (updatedUser) {
            // Update localStorage with fresh user data from backend
            localStorage.setItem("zaron_user", JSON.stringify(updatedUser));
            console.log("User profile refreshed after KYC upload:", updatedUser);
          }
        }
      } catch (profileError) {
        console.error("Failed to refresh user profile:", profileError);
        // Continue anyway - use result data
        if (result.data) {
          user.kycStatus = result.data.kycStatus || "submitted";
          user.kycCompletionPercentage = result.data.completionPercentage || 0;
          localStorage.setItem("zaron_user", JSON.stringify(user));
        }
      }

      // Update state with completion percentage
      if (result.data?.completionPercentage !== undefined) {
        setKycCompletionPercentage(result.data.completionPercentage);
      }

      const completionPercent = result.data?.completionPercentage || 0;
      alert(
        `KYC verification submitted successfully! Completion: ${completionPercent}%\nYour documents are under review.`
      );

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "/user-dashboard";
      }, 2000);
    } catch (error) {
      console.error("KYC upload error:", error);
      alert(`Upload failed: ${error.message}`);
      setUploadProgress(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    // Basic validation before proceeding
    if (currentStep === 1) {
      const required = ["fullNameEnglish", "dateOfBirth"];
      const missing = required.filter((field) => !formData[field]);
      if (missing.length > 0) {
        alert(`Please fill in: ${missing.join(", ")}`);
        return;
      }
    }

    if (currentStep === 2 && !formData.documentType) {
      alert("Please select a document type");
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    const storedUser = localStorage.getItem("zaron_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      user.kycStatus = "skipped";
      localStorage.setItem("zaron_user", JSON.stringify(user));
    }

    window.location.href = "/user-dashboard";
  };

  const handleComplete = async () => {
    await uploadDocuments();
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
            You can skip KYC verification for now, but some features will be
            limited:
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

  // File Upload Component
  const FileUploadBox = ({
    fileType,
    label,
    accept = "image/*,.pdf",
    description = "PNG, JPG, WebP, PDF up to 10MB",
    required = false,
  }) => (
    <div className="space-y-2">
      <Label className="flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <div
        onClick={() => fileInputRefs[fileType]?.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          uploadedFiles[fileType]
            ? "border-green-500 bg-green-50"
            : "border-gray-300 hover:border-emerald-600"
        }`}
      >
        <input
          ref={fileInputRefs[fileType]}
          type="file"
          accept={accept}
          onChange={(e) => handleFileSelect(fileType, e)}
          className="hidden"
        />

        {uploadedFiles[fileType] ? (
          <div>
            <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <p className="text-sm font-medium text-green-700">
              {uploadedFiles[fileType].name}
            </p>
            {uploadedFiles[fileType].size > 0 && (
              <p className="text-xs text-green-600 mt-1">
                {(uploadedFiles[fileType].size / 1024 / 1024).toFixed(2)} MB
              </p>
            )}
            {uploadedFiles[fileType].name === 'Previously uploaded' && (
              <p className="text-xs text-blue-600 mt-1">
                Click to replace existing file
              </p>
            )}
          </div>
        ) : (
          <div>
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Click to upload</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
        )}
      </div>
    </div>
  );

  if (dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your KYC information...</p>
        </div>
      </div>
    );
  }

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
              <p className="text-sm text-muted-foreground">
                Secure your investment account
              </p>
            </div>
          </div>
          {!isLoading && (
            <Button
              variant="ghost"
              onClick={() => setShowSkipDialog(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Home className="h-4 w-4 mr-2" />
              Skip for Now
            </Button>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Complete Your Profile</h2>
            <Badge variant="secondary">
              {kycCompletionPercentage > 0
                ? `${kycCompletionPercentage}% Complete`
                : `Step ${currentStep} of ${steps.length}`
              }
            </Badge>
          </div>
          {/* Show actual KYC completion percentage if available, otherwise show step progress */}
          <Progress value={kycCompletionPercentage > 0 ? kycCompletionPercentage : progressPercentage} className="h-2 mb-4" />

          {/* Upload Progress */}
          {isLoading && uploadProgress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Uploading documents...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step.id
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
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
              {React.createElement(steps[currentStep - 1].icon, {
                className: "h-5 w-5",
              })}
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 &&
                "Help us verify your identity with basic information"}
              {currentStep === 2 && "Select your identity document type"}
              {currentStep === 3 && "Upload clear photos of your documents"}
              {currentStep === 4 && "Tell us about your financial background"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullNameEnglish">
                    Full Name (English) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullNameEnglish"
                    value={formData.fullNameEnglish}
                    onChange={(e) =>
                      handleInputChange("fullNameEnglish", e.target.value)
                    }
                    placeholder="Ahmed Mohammed Al-Rashid"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullNameArabic">Full Name (Arabic)</Label>
                  <Input
                    id="fullNameArabic"
                    value={formData.fullNameArabic}
                    onChange={(e) =>
                      handleInputChange("fullNameArabic", e.target.value)
                    }
                    placeholder="أحمد محمد الراشد"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">
                    Date of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">
                    Occupation <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) =>
                      handleInputChange("occupation", e.target.value)
                    }
                    placeholder="Software Engineer"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange("phoneNumber", e.target.value)
                    }
                    placeholder="+966 50 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Riyadh"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) =>
                      handleInputChange("street", e.target.value)
                    }
                    placeholder="Street address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) =>
                      handleInputChange("region", e.target.value)
                    }
                    placeholder="Region"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) =>
                      handleInputChange("postalCode", e.target.value)
                    }
                    placeholder="12345"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Identity Verification */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>
                    Select Document Type <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["National ID", "Passport", "Driving License"].map(
                      (type) => (
                        <div
                          key={type}
                          onClick={() =>
                            handleInputChange("documentType", type)
                          }
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.documentType === type
                              ? "border-emerald-600 bg-emerald-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <CreditCard className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                          <p className="text-center font-medium">{type}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {formData.documentType && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="documentNumber">Document Number</Label>
                      <Input
                        id="documentNumber"
                        value={formData.documentNumber}
                        onChange={(e) =>
                          handleInputChange("documentNumber", e.target.value)
                        }
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
                  <FileUploadBox
                    fileType="nationalId"
                    label="National ID"
                    required={true}
                  />
                  <FileUploadBox
                    fileType="selfie"
                    label="Selfie Photo"
                    required={true}
                  />
                  <FileUploadBox
                    fileType="proofOfIncome"
                    label="Proof of Income"
                  />
                  <FileUploadBox
                    fileType="addressProof"
                    label="Address Proof"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Income Document Type</Label>
                    <Select
                      value={formData.incomeDocType}
                      onValueChange={(value) =>
                        handleInputChange("incomeDocType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salary_certificate">
                          Salary Certificate
                        </SelectItem>
                        <SelectItem value="bank_statement">
                          Bank Statement
                        </SelectItem>
                        <SelectItem value="employment_contract">
                          Employment Contract
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Address Document Type</Label>
                    <Select
                      value={formData.addressDocType}
                      onValueChange={(value) =>
                        handleInputChange("addressDocType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utility_bill">
                          Utility Bill
                        </SelectItem>
                        <SelectItem value="bank_statement">
                          Bank Statement
                        </SelectItem>
                        <SelectItem value="lease_agreement">
                          Lease Agreement
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Tips for best results:
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Ensure good lighting and clear image quality</li>
                    <li>• All corners of the document should be visible</li>
                    <li>• Avoid shadows, glare, or blurry images</li>
                    <li>• File size should be less than 10MB</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 4: Financial Profile */}
            {currentStep === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Monthly Income</Label>
                  <Select
                    value={formData.monthlyIncome}
                    onValueChange={(value) =>
                      handleInputChange("monthlyIncome", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5000">Below SAR 5,000</SelectItem>
                      <SelectItem value="10000">SAR 5,000 - 15,000</SelectItem>
                      <SelectItem value="25000">SAR 15,000 - 30,000</SelectItem>
                      <SelectItem value="40000">SAR 30,000 - 50,000</SelectItem>
                      <SelectItem value="75000">Above SAR 50,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Investment Experience</Label>
                  <Select
                    value={formData.investmentExperience}
                    onValueChange={(value) =>
                      handleInputChange("investmentExperience", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">
                        Beginner (0-1 years)
                      </SelectItem>
                      <SelectItem value="intermediate">
                        Intermediate (1-3 years)
                      </SelectItem>
                      <SelectItem value="experienced">
                        Experienced (3+ years)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && !isLoading && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}

              <div className="ml-auto">
                {currentStep < steps.length ? (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-emerald-600 to-blue-600"
                    disabled={isLoading}
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleComplete}
                    className="bg-gradient-to-r from-emerald-600 to-blue-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        Complete Verification
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </>
                    )}
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
                <h3 className="font-semibold text-emerald-900 mb-2">
                  Your data is secure
                </h3>
                <p className="text-emerald-800 text-sm leading-relaxed">
                  All information is encrypted and stored securely. We use
                  bank-grade security measures and never share your personal
                  information with third parties. This verification is required
                  by Saudi financial regulations to protect investors.
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