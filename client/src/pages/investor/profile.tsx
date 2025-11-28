import { useState } from "react"
import { useLocation } from "wouter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { useKYC } from "@/hooks/use-kyc"
import { useUserProfile } from "@/hooks/use-user-profile"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Shield,
  Wallet,
  Bell,
  FileText,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Edit,
  Loader2
} from "lucide-react"
import { ProfileCompletionWizard } from "@/components/profile-completion-wizard"

export default function InvestorProfile() {
  const [, navigate] = useLocation()
  const { user } = useAuth()
  const { data: userProfile, isLoading: userProfileLoading } = useUserProfile()
  const { data: kycData, isLoading: kycLoading } = useKYC()
  const [showWizard, setShowWizard] = useState(false)

  // Handle section click - KYC goes to verification page, others show wizard
  const handleSectionClick = (sectionId: string) => {
    if (sectionId === 'kyc') {
      navigate('/kyc-verification')
    } else {
      setShowWizard(true)
    }
  }

  // Check document upload status
  const getDocumentStatus = (doc: any) => {
    return doc && doc.uploaded ? 'Completed' : 'Pending'
  }

  const docsCompleted = kycData?.documents
    ? Object.values(kycData.documents).filter((doc: any) => doc?.uploaded).length
    : 0
  const docsTotal = kycData?.documents ? Object.keys(kycData.documents).length : 0

  // Profile completion calculation
  const profileSections = [
    {
      id: 'basic',
      title: 'Basic Information',
      description: 'Personal details and contact information',
      icon: <User className="w-5 h-5" />,
      completed: !!(userProfile?.firstName && userProfile?.lastName && userProfile?.email && userProfile?.phone),
      items: [
        `Full Name: ${kycData?.personalInfo?.fullNameEnglish || `${userProfile?.firstName} ${userProfile?.lastName}` || 'Not provided'}`,
        `Email Address: ${userProfile?.email || 'Not provided'}`,
        `Phone Number: ${userProfile?.phone || 'Not provided'}`,
        `Date of Birth: ${
          (userProfile?.dateOfBirth || kycData?.personalInfo?.dateOfBirth)
            ? new Date(userProfile?.dateOfBirth || kycData?.personalInfo?.dateOfBirth || '').toLocaleDateString()
            : 'Not provided'
        }`
      ]
    },
    {
      id: 'kyc',
      title: 'Identity Verification',
      description: 'KYC documentation and verification status',
      icon: <Shield className="w-5 h-5" />,
      completed: kycData?.status === 'approved',
      items: [
        `Government ID: ${getDocumentStatus(kycData?.documents?.nationalId)}`,
        `Address Proof: ${getDocumentStatus(kycData?.documents?.addressProof)}`,
        `Selfie Verification: ${getDocumentStatus(kycData?.documents?.selfie)}`,
        `Income Documentation: ${getDocumentStatus(kycData?.documents?.proofOfIncome)}`
      ]
    },
    {
      id: 'investment',
      title: 'Investment Profile',
      description: 'Investment experience and risk preferences',
      icon: <Wallet className="w-5 h-5" />,
      completed:
        userProfile?.profileData?.investmentProfile?.completed ||
        (userProfile?.profileData?.investmentProfile?.experience &&
         userProfile?.profileData?.investmentProfile?.riskTolerance &&
         userProfile?.profileData?.investmentProfile?.investmentGoals) ||
        false,
      items: [
        'Investment Experience',
        'Risk Tolerance',
        'Investment Goals',
        'Preferred Property Types'
      ]
    },
    {
      id: 'banking',
      title: 'Banking Details',
      description: 'Bank account verification for payouts',
      icon: <Wallet className="w-5 h-5" />,
      completed:
        userProfile?.profileData?.bankingDetails?.completed ||
        (userProfile?.profileData?.bankingDetails?.bankName &&
         userProfile?.profileData?.bankingDetails?.iban &&
         userProfile?.profileData?.bankingDetails?.accountHolder) ||
        false,
      items: [
        'Bank Account',
        'IBAN Verification',
        'Payout Preferences',
        'Tax Information'
      ]
    },
    {
      id: 'preferences',
      title: 'Communication Preferences',
      description: 'Notification and communication settings',
      icon: <Bell className="w-5 h-5" />,
      completed:
        userProfile?.profileData?.communicationPreferences?.completed ||
        (userProfile?.profileData?.communicationPreferences?.emailNotifications !== undefined &&
         userProfile?.profileData?.communicationPreferences?.languagePreference) ||
        false,
      items: [
        'Email Notifications',
        'SMS Alerts',
        'Language Preference',
        'Timezone Settings'
      ]
    },
    {
      id: 'documents',
      title: 'Additional Documents',
      description: 'Optional supporting documentation',
      icon: <FileText className="w-5 h-5" />,
      completed:
        userProfile?.profileData?.employmentPortfolio?.completed ||
        (userProfile?.profileData?.employmentPortfolio?.employmentStatus &&
         userProfile?.profileData?.employmentPortfolio?.employer &&
         userProfile?.profileData?.employmentPortfolio?.jobTitle) ||
        false,
      items: [
        'Employment Letter',
        'Salary Certificate',
        'Bank Statements',
        'Investment Portfolio'
      ]
    }
  ]

  const completedSections = profileSections.filter(section => section.completed).length
  const totalSections = profileSections.length
  const profileCompletion = Math.round((completedSections / totalSections) * 100)

  const getStatusIcon = (completed: boolean) => {
    if (completed) {
      return <CheckCircle className="w-5 h-5 text-green-600" />
    }
    return <Clock className="w-5 h-5 text-amber-500" />
  }

  const getStatusBadge = (completed: boolean) => {
    if (completed) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>
    }
    return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>
  }

  if (showWizard) {
    return <ProfileCompletionWizard onClose={() => setShowWizard(false)} />
  }

  // Show loading state
  if (userProfileLoading || kycLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8" data-testid="investor-profile">
      {/* Profile Header */}
      <div className="flex items-start gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src={userProfile?.profilePicture} />
          <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
            {(kycData?.personalInfo?.fullNameEnglish?.[0] || userProfile?.firstName?.[0])}
            {(userProfile?.lastName?.[0])}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight" data-testid="text-profile-name">
              {kycData?.personalInfo?.fullNameEnglish ||
               (userProfile?.firstName && userProfile?.lastName ? `${userProfile.firstName} ${userProfile.lastName}` :
                user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` :
                'Guest User')}
            </h1>
            <Button variant="outline" size="sm" data-testid="button-edit-profile">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
          <p className="text-muted-foreground mb-3">{userProfile?.email || user?.email}</p>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Active Investor
            </Badge>
            {kycData?.status === 'approved' && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-2">
                <Shield className="w-3 h-3" />
                Verified
              </Badge>
            )}
            {kycData?.status === 'pending' && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-2">
                <Clock className="w-3 h-3" />
                Verification Pending
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Profile Completion Overview */}
      <Card className={profileCompletion < 100 ? "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800" : ""}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className={profileCompletion < 100 ? "text-amber-800 dark:text-amber-200" : ""}>
                Profile Completion
              </CardTitle>
              <CardDescription>
                {profileCompletion === 100 
                  ? "Your profile is complete! You have access to all features."
                  : "Complete your profile to unlock all investment features and benefits"
                }
              </CardDescription>
            </div>
            {profileCompletion < 100 && (
              <Button 
                onClick={() => setShowWizard(true)}
                className="bg-amber-600 hover:bg-amber-700"
                data-testid="button-complete-profile-wizard"
              >
                Complete Profile
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Progress value={profileCompletion} className="flex-1" />
              <span className="text-lg font-bold" data-testid="text-completion-percentage">
                {profileCompletion}%
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>{completedSections} of {totalSections} sections completed</span>
              {profileCompletion < 100 && (
                <span className="flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  {totalSections - completedSections} sections remaining
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Sections */}
      <div className="grid gap-6">
        <h2 className="text-2xl font-semibold">Profile Sections</h2>
        
        <div className="grid gap-4">
          {profileSections.map((section) => (
            <Card
              key={section.id}
              className="hover-elevate transition-all duration-200 cursor-pointer hover:shadow-md"
              data-testid={`section-${section.id}`}
              onClick={() => handleSectionClick(section.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${section.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                      {section.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{section.title}</h3>
                      <p className="text-muted-foreground text-sm">{section.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(section.completed)}
                    {getStatusBadge(section.completed)}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
                
                {/* Section Items Preview */}
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-2">
                  {section.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${section.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className={section.completed ? 'text-green-700' : 'text-muted-foreground'}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* KYC Details Section */}
      {kycData && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-blue-800 dark:text-blue-200">KYC Information</CardTitle>
                <CardDescription>
                  Your identity verification and personal details
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {kycData.completionPercentage}% Complete
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 capitalize">
                  Status: {kycData.status}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal Information */}
            <div>
              <h4 className="font-semibold mb-3 text-sm">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Full Name (English)</p>
                  <p className="font-medium">{kycData.personalInfo?.fullNameEnglish || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Full Name (Arabic)</p>
                  <p className="font-medium">{kycData.personalInfo?.fullNameArabic || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">
                    {kycData.personalInfo?.dateOfBirth
                      ? new Date(kycData.personalInfo.dateOfBirth).toLocaleDateString()
                      : 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Nationality</p>
                  <p className="font-medium capitalize">{kycData.personalInfo?.nationality || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Occupation</p>
                  <p className="font-medium">{kycData.personalInfo?.occupation || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Income</p>
                  <p className="font-medium">
                    SAR {(kycData.personalInfo?.monthlyIncome || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Address Information */}
            <div>
              <h4 className="font-semibold mb-3 text-sm">Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Country</p>
                  <p className="font-medium">{kycData.address?.country || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">City</p>
                  <p className="font-medium">{kycData.address?.city || 'Not provided'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="font-medium">{kycData.address?.address || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Document Uploads */}
            <div>
              <h4 className="font-semibold mb-3 text-sm">Document Uploads</h4>
              <div className="space-y-2">
                {kycData.documents?.nationalId && (
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <span>National ID</span>
                    {kycData.documents.nationalId.uploaded ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Uploaded
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                )}
                {kycData.documents?.addressProof && (
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <span>Address Proof</span>
                    {kycData.documents.addressProof.uploaded ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Uploaded
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                )}
                {kycData.documents?.selfie && (
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <span>Selfie Verification</span>
                    {kycData.documents.selfie.uploaded ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Uploaded
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                )}
                {kycData.documents?.proofOfIncome && (
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg">
                    <span>Proof of Income</span>
                    {kycData.documents.proofOfIncome.uploaded ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Uploaded
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage your account and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4" data-testid="button-update-password">
              <div className="text-left">
                <div className="font-medium">Update Password</div>
                <div className="text-sm text-muted-foreground">Change your account password</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4" data-testid="button-notification-settings">
              <div className="text-left">
                <div className="font-medium">Notification Settings</div>
                <div className="text-sm text-muted-foreground">Manage your preferences</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4" data-testid="button-download-data">
              <div className="text-left">
                <div className="font-medium">Download Data</div>
                <div className="text-sm text-muted-foreground">Export your information</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}