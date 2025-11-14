import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  User,
  FileText,
  Shield,
  CreditCard,
  Bell,
  Download,
  Lock,
  Settings,
  Clock,
  CheckCircle,
  ArrowRight,
  LogOut
} from 'lucide-react';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [kycStatus, setKycStatus] = useState('pending');
  const [profileData, setProfileData] = useState(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [completedSections, setCompletedSections] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Load initial data from localStorage
        const userData = localStorage.getItem('zaron_user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setKycStatus(parsedUser.kycStatus || 'pending');

          // Fetch latest KYC and profile data from backend
          const token = parsedUser.token || localStorage.getItem('zaron_token');
          if (token) {
            try {
              const response = await fetch('http://13.50.13.193:5000/api/kyc', {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              });

              if (response.ok) {
                const kycData = await response.json();
                console.log('Full KYC API Response:', kycData);
                console.log('KYC Data Keys:', kycData.data ? Object.keys(kycData.data) : 'No data');
                console.log('KYC Status:', kycData.data?.status);

                if (kycData.success && kycData.data) {
                  // Update KYC status from backend
                  setKycStatus(kycData.data.status || 'pending');
                  setProfileData(kycData.data);

                  // Calculate completion percentage based on KYC status and actual form data
                  let completed = 0;
                  const totalSections = 6; // Total sections we're tracking

                  // Check if basic personal info is filled (from personalInfo object)
                  if (kycData.data.personalInfo?.fullNameEnglish || kycData.data.personalInfo?.fullNameArabic ||
                      kycData.data.personalInfo?.nationality || kycData.data.personalInfo?.dateOfBirth) {
                    completed++;
                  }

                  // Check identity verification (documents.nationalId or documents.selfie)
                  if (kycData.data.documents?.nationalId?.url || kycData.data.documents?.selfie?.url) {
                    completed++;
                  }

                  // Check address proof (documents.addressProof)
                  if (kycData.data.documents?.addressProof?.url || kycData.data.address?.street) {
                    completed++;
                  }

                  // Check income verification (documents.proofOfIncome)
                  if (kycData.data.documents?.proofOfIncome?.url || kycData.data.personalInfo?.monthlyIncome) {
                    completed++;
                  }

                  // Check if all 4 document types are uploaded
                  const docsUploaded = Object.values(kycData.data.documents || {}).filter((doc: any) => doc?.url).length;
                  if (docsUploaded >= 3) {
                    completed++;
                  }

                  // If KYC is submitted/approved, consider it mostly complete
                  if (kycData.data.status === 'submitted' || kycData.data.status === 'approved' ||
                      kycData.data.status === 'under_review') {
                    completed = Math.max(completed, 5); // At least 5/6 sections if submitted
                  }

                  // If approved, all sections are complete
                  if (kycData.data.status === 'approved') {
                    completed = totalSections;
                  }

                  const percentage = Math.round((completed / totalSections) * 100);
                  setCompletionPercentage(percentage);
                  setCompletedSections(completed);

                  console.log('Calculated completion:', {
                    completed,
                    totalSections,
                    percentage,
                    status: kycData.data.status,
                    hasBasicInfo: !!(kycData.data.personalInfo?.fullNameEnglish || kycData.data.personalInfo?.fullNameArabic),
                    hasDocuments: docsUploaded,
                    documentDetails: kycData.data.documents,
                    hasAddress: !!(kycData.data.address?.street || kycData.data.address?.city)
                  });

                  // Update localStorage with fresh KYC status
                  const updatedUser = { ...parsedUser, kycStatus: kycData.data.status };
                  localStorage.setItem('zaron_user', JSON.stringify(updatedUser));
                  setUser(updatedUser);
                }
              } else {
                console.log('API Response status:', response.status);
                const errorText = await response.text();
                console.log('API Error response:', errorText);

                if (response.status === 404) {
                  // No KYC data found - user hasn't started KYC
                  setKycStatus('pending');
                  setCompletionPercentage(0);
                  setCompletedSections(0);
                } else {
                  // Other error - show current status but don't update
                  console.warn('Failed to fetch KYC data:', response.status);
                }
              }
            } catch (apiError) {
              console.error('API Error:', apiError);
              // Fallback to default values
              setKycStatus('pending');
              setCompletionPercentage(0);
              setCompletedSections(0);
            }
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Profile sections configuration based on actual API data
  const getProfileSections = () => {
    if (!profileData) {
      return [
        {
          id: 'basicInformation',
          title: 'Basic Information',
          description: 'Personal details and contact information',
          icon: User,
          fields: ['Full Name', 'Email Address', 'Phone Number', 'Date of Birth'],
          status: 'pending'
        },
        {
          id: 'identityVerification',
          title: 'Identity Verification',
          description: 'KYC documentation and verification status',
          icon: Shield,
          fields: ['Government ID', 'Address Proof', 'Selfie Verification', 'Income Documentation'],
          status: 'pending'
        },
        {
          id: 'investmentProfile',
          title: 'Investment Profile',
          description: 'Investment experience and risk preferences',
          icon: FileText,
          fields: ['Investment Experience', 'Risk Tolerance', 'Investment Goals', 'Preferred Property Types'],
          status: 'pending'
        },
        {
          id: 'bankingDetails',
          title: 'Banking Details',
          description: 'Bank account verification for payouts',
          icon: CreditCard,
          fields: ['Bank Account', 'IBAN Verification', 'Payout Preferences', 'Tax Information'],
          status: 'pending'
        },
        {
          id: 'communicationPreferences',
          title: 'Communication Preferences',
          description: 'Notification and communication settings',
          icon: Bell,
          fields: ['Email Notifications', 'SMS Alerts', 'Language Preference', 'Timezone Settings'],
          status: 'pending'
        },
        {
          id: 'additionalDocuments',
          title: 'Additional Documents',
          description: 'Optional supporting documentation',
          icon: FileText,
          fields: ['Employment Letter', 'Salary Certificate', 'Bank Statements', 'Investment Portfolio'],
          status: 'pending'
        }
      ];
    }

    return [
      {
        id: 'basicInformation',
        title: 'Basic Information',
        description: 'Personal details and contact information',
        icon: User,
        fields: ['Full Name', 'Email Address', 'Phone Number', 'Date of Birth'],
        status: (profileData.fullNameEnglish || profileData.fullNameArabic || profileData.email || profileData.phoneNumber) ? 'completed' : 'pending'
      },
      {
        id: 'identityVerification',
        title: 'Identity Verification',
        description: 'KYC documentation and verification status',
        icon: Shield,
        fields: ['Government ID', 'Address Proof', 'Selfie Verification', 'Income Documentation'],
        status: (profileData.nationalIdFront || profileData.nationalIdBack || profileData.passportPhoto || profileData.selfiePhoto) ? 'completed' : 'pending'
      },
      {
        id: 'investmentProfile',
        title: 'Investment Profile',
        description: 'Investment experience and risk preferences',
        icon: FileText,
        fields: ['Investment Experience', 'Risk Tolerance', 'Investment Goals', 'Preferred Property Types'],
        status: (profileData.investmentExperience || profileData.riskTolerance || profileData.investmentGoals) ? 'completed' : 'pending'
      },
      {
        id: 'bankingDetails',
        title: 'Banking Details',
        description: 'Bank account verification for payouts',
        icon: CreditCard,
        fields: ['Bank Account', 'IBAN Verification', 'Payout Preferences', 'Tax Information'],
        status: (profileData.bankName || profileData.iban || profileData.accountNumber) ? 'completed' : 'pending'
      },
      {
        id: 'communicationPreferences',
        title: 'Communication Preferences',
        description: 'Notification and communication settings',
        icon: Bell,
        fields: ['Email Notifications', 'SMS Alerts', 'Language Preference', 'Timezone Settings'],
        status: (profileData.monthlyIncome || profileData.employmentStatus || profileData.sourceOfFunds) ? 'completed' : 'pending'
      },
      {
        id: 'additionalDocuments',
        title: 'Additional Documents',
        description: 'Optional supporting documentation',
        icon: FileText,
        fields: ['Employment Letter', 'Salary Certificate', 'Bank Statements', 'Investment Portfolio'],
        status: (kycStatus === 'approved' || kycStatus === 'submitted' || kycStatus === 'under_review') ? 'completed' : 'pending'
      }
    ];
  };

  const profileSections = getProfileSections();

  const quickActions = [
    {
      title: 'Update Password',
      description: 'Change your account password',
      icon: Lock,
      action: () => console.log('Update password')
    },
    {
      title: 'Notification Settings',
      description: 'Manage your preferences',
      icon: Settings,
      action: () => console.log('Notification settings')
    },
    {
      title: 'Download Data',
      description: 'Export your information',
      icon: Download,
      action: () => console.log('Download data')
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('zaron_token');
    localStorage.removeItem('zaron_user');
    window.location.href = '/website/invest';
  };

  const getKYCStatusDisplay = () => {
    switch (kycStatus) {
      case 'approved': return { text: 'Approved', variant: 'default' };
      case 'submitted': return { text: 'Under Review', variant: 'secondary' };
      case 'under_review': return { text: 'Under Review', variant: 'secondary' };
      case 'rejected': return { text: 'Rejected', variant: 'destructive' };
      default: return { text: 'Pending', variant: 'secondary' };
    }
  };

  const statusDisplay = getKYCStatusDisplay();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                User Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user?.firstName || user?.fullNameEnglish || 'User'}!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* KYC Status Badge */}
            <Badge
              variant={statusDisplay.variant}
              className="capitalize"
            >
              KYC: {statusDisplay.text}
            </Badge>

            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KYC Warning for non-approved users */}
        {kycStatus !== 'approved' && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Clock className="h-8 w-8 text-yellow-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-yellow-900 mb-2">
                    {kycStatus === 'submitted' || kycStatus === 'under_review'
                      ? 'KYC Under Review'
                      : kycStatus === 'rejected'
                      ? 'KYC Verification Required'
                      : 'Complete Your KYC Verification'
                    }
                  </h3>
                  <p className="text-yellow-800 text-sm mb-4">
                    {kycStatus === 'submitted' || kycStatus === 'under_review'
                      ? 'Your KYC documents are being reviewed. You\'ll be notified once approved.'
                      : kycStatus === 'rejected'
                      ? 'Your KYC was rejected. Please resubmit with correct documents.'
                      : 'Your account has limited features. Complete KYC verification to unlock full investment capabilities.'
                    }
                  </p>

                  {/* Show completion progress if KYC is in progress */}
                  {completionPercentage > 0 && kycStatus === 'pending' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>KYC Progress</span>
                        <span>{completionPercentage}%</span>
                      </div>
                      <Progress value={completionPercentage} className="h-2" />
                    </div>
                  )}

                  <div className="flex gap-3">
                    {(kycStatus === 'pending' || kycStatus === 'rejected') && (
                      <Button
                        size="sm"
                        onClick={() => window.location.href = '/kyc-verification'}
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        {kycStatus === 'rejected' ? 'Resubmit KYC' : 'Complete KYC'}
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success message for approved KYC */}
        {kycStatus === 'approved' && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">KYC Verified</h3>
                  <p className="text-green-800 text-sm">Your account is fully verified. You can now access all investment features.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Profile Completion - Only show when KYC is not approved */}
        {kycStatus !== 'approved' && (
          <>
            {/* Profile Completion Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Profile Completion</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Complete your profile to unlock all investment features and benefits
              </p>
            </div>

            {/* Progress Overview */}
            <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-blue-600 mb-2">{completionPercentage}%</div>
                  <p className="text-lg text-muted-foreground">
                    {completedSections} of {profileSections.length} sections completed
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {profileSections.length - completedSections} sections remaining
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  <Progress value={completionPercentage} className="h-3 mb-4" />
                </div>
              </CardContent>
            </Card>

            {/* Profile Sections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                  Profile Sections
                </CardTitle>
                <CardDescription>
                  Complete all sections to unlock full platform access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profileSections.map((section) => {
                    const IconComponent = section.icon;
                    const isCompleted = section.status === 'completed';

                    return (
                      <div key={section.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${
                              isCompleted
                                ? 'bg-green-100 text-green-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{section.title}</h3>
                              <p className="text-sm text-muted-foreground mb-3">{section.description}</p>

                              <div className="mb-3">
                                <Badge
                                  variant={isCompleted ? 'default' : 'secondary'}
                                  className={isCompleted ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                                >
                                  {isCompleted ? (
                                    <><CheckCircle className="h-3 w-3 mr-1" />Completed</>
                                  ) : (
                                    <><Clock className="h-3 w-3 mr-1" />Pending</>
                                  )}
                                </Badge>
                              </div>

                              <div className="text-sm text-muted-foreground">
                                {section.fields.map((field, index) => (
                                  <span key={field}>
                                    {field}
                                    {index < section.fields.length - 1 && ' • '}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <Button
                            variant={isCompleted ? 'outline' : 'default'}
                            size="sm"
                            onClick={() => window.location.href = '/kyc-verification'}
                          >
                            {isCompleted ? 'View' : 'Complete'}
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Welcome Section for Approved Users */}
        {kycStatus === 'approved' && (
          <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to Zaron Platform!</h2>
                <p className="text-lg text-muted-foreground">
                  Your KYC is verified. You now have full access to all investment features.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <Shield className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Verified Account</h3>
                  <p className="text-sm text-muted-foreground">Full platform access</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Investment Ready</h3>
                  <p className="text-sm text-muted-foreground">Start investing now</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <CreditCard className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Secure Payments</h3>
                  <p className="text-sm text-muted-foreground">Protected transactions</p>
                </div>
              </div>

              <Button
                className="mt-6 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-lg"
                onClick={() => window.location.href = '/website/invest'}
              >
                Start Investing
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-emerald-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Manage your account and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <div
                    key={action.title}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    onClick={action.action}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Data Export Notice */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Download className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Data Export Available</h3>
                <p className="text-blue-800 text-sm mb-3">
                  All displayed data is fetched from real API endpoints. You can export your complete profile information anytime.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={() => console.log('Export data')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export My Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;