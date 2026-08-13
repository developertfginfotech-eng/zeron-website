import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation"
import type { TranslationKey } from "@/lib/translations"
import { useLocation } from "wouter"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/use-auth"
import { useKYC } from "@/hooks/use-kyc"
import { useUserProfile } from "@/hooks/use-user-profile"
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
  Loader2,
  Target
} from "lucide-react"
import { ProfileCompletionWizard } from "@/components/profile-completion-wizard"

export default function InvestorProfile() {
  const { t } = useTranslation();
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
    return doc && doc.uploaded ? t("prof_completed") : t("prof_pending")
  }

  const docsCompleted = kycData?.documents
    ? Object.values(kycData.documents).filter((doc: any) => doc?.uploaded).length
    : 0
  const docsTotal = kycData?.documents ? Object.keys(kycData.documents).length : 0

  // Profile completion calculation
  const profileSections = [
    {
      id: 'basic',
      title: t("ps_basic_title"),
      description: t("ps_basic_desc"),
      icon: <User className="w-5 h-5 text-current" />,
      completed: !!(userProfile?.firstName && userProfile?.lastName && userProfile?.email && userProfile?.phone),
      items: [
        `${t("ps_label_full_name")}: ${kycData?.personalInfo?.fullNameEnglish || `${userProfile?.firstName} ${userProfile?.lastName}` || t("ps_not_provided")}`,
        `${t("ps_label_email")}: ${userProfile?.email || t("ps_not_provided")}`,
        `${t("ps_label_phone")}: ${userProfile?.phone || t("ps_not_provided")}`,
        `${t("ps_label_dob")}: ${
          (userProfile?.dateOfBirth || kycData?.personalInfo?.dateOfBirth)
            ? new Date(userProfile?.dateOfBirth || kycData?.personalInfo?.dateOfBirth || '').toLocaleDateString()
            : t("ps_not_provided")
        }`
      ]
    },
    {
      id: 'kyc',
      title: t("ps_kyc_title"),
      description: t("ps_kyc_desc"),
      icon: <Shield className="w-5 h-5 text-current" />,
      completed: kycData?.status === 'approved',
      items: [
        `${t("ps_label_gov_id")}: ${getDocumentStatus(kycData?.documents?.nationalId)}`,
        `${t("ps_label_address_proof")}: ${getDocumentStatus(kycData?.documents?.addressProof)}`,
        `${t("ps_label_selfie")}: ${getDocumentStatus(kycData?.documents?.selfie)}`,
        `${t("ps_label_income_doc")}: ${getDocumentStatus(kycData?.documents?.proofOfIncome)}`
      ]
    },
    {
      id: 'investment',
      title: t("ps_investment_title"),
      description: t("ps_investment_desc"),
      icon: <Wallet className="w-5 h-5 text-current" />,
      completed:
        userProfile?.profileData?.investmentProfile?.completed ||
        (userProfile?.profileData?.investmentProfile?.experience &&
         userProfile?.profileData?.investmentProfile?.riskTolerance &&
         userProfile?.profileData?.investmentProfile?.investmentGoals) ||
        false,
      items: [
        t("ps_investment_experience"),
        t("ps_risk_tolerance"),
        t("ps_investment_goals"),
        t("ps_preferred_property_types")
      ]
    },
    {
      id: 'banking',
      title: t("ps_banking_title"),
      description: t("ps_banking_desc"),
      icon: <Wallet className="w-5 h-5 text-current" />,
      completed:
        userProfile?.profileData?.bankingDetails?.completed ||
        (userProfile?.profileData?.bankingDetails?.bankName &&
         userProfile?.profileData?.bankingDetails?.iban &&
         userProfile?.profileData?.bankingDetails?.accountHolder) ||
        false,
      items: [
        t("ps_bank_account"),
        t("ps_iban_verification"),
        t("ps_payout_preferences"),
        t("ps_tax_information")
      ]
    },
    {
      id: 'preferences',
      title: t("ps_preferences_title"),
      description: t("ps_preferences_desc"),
      icon: <Bell className="w-5 h-5 text-current" />,
      completed:
        userProfile?.profileData?.communicationPreferences?.completed ||
        (userProfile?.profileData?.communicationPreferences?.emailNotifications !== undefined &&
         userProfile?.profileData?.communicationPreferences?.languagePreference) ||
        false,
      items: [
        t("ps_email_notifications"),
        t("ps_sms_alerts"),
        t("ps_language_preference"),
        t("ps_timezone_settings")
      ]
    },
    {
      id: 'documents',
      title: t("ps_documents_title"),
      description: t("ps_documents_desc"),
      icon: <FileText className="w-5 h-5 text-current" />,
      completed:
        userProfile?.profileData?.employmentPortfolio?.completed ||
        (userProfile?.profileData?.employmentPortfolio?.employmentStatus &&
         userProfile?.profileData?.employmentPortfolio?.employer &&
         userProfile?.profileData?.employmentPortfolio?.jobTitle) ||
        false,
      items: [
        t("ps_employment_letter"),
        t("ps_salary_certificate"),
        t("ps_bank_statements"),
        t("ps_investment_portfolio")
      ]
    }
  ]

  const completedSections = profileSections.filter(section => section.completed).length
  const totalSections = profileSections.length
  const profileCompletion = Math.round((completedSections / totalSections) * 100)

  if (showWizard) {
    return <ProfileCompletionWizard onClose={() => setShowWizard(false)} />
  }

  // Show loading state
  if (userProfileLoading || kycLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto" />
          <p className="text-muted-foreground">{t("prof_loading")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-800 p-6 space-y-8" data-testid="investor-profile">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 p-8 text-white shadow-2xl border border-teal-200 dark:border-teal-700/50">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-24 translate-x-24" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-2xl translate-y-24 -translate-x-24" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-start gap-6">
            <Avatar className="w-20 h-20 border-2 border-teal-600/50">
              <AvatarImage src={userProfile?.profilePicture} />
              <AvatarFallback className="text-xl font-semibold bg-teal-700/50 text-white">
                {(kycData?.personalInfo?.fullNameEnglish?.[0] || userProfile?.firstName?.[0])}
                {(userProfile?.lastName?.[0])}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-serif font-bold tracking-tight text-white" data-testid="text-profile-name">
                  {kycData?.personalInfo?.fullNameEnglish ||
                   (userProfile?.firstName && userProfile?.lastName ? `${userProfile.firstName} ${userProfile.lastName}` :
                    user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` :
                    'Guest User')}
                </h1>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold" size="sm" data-testid="button-edit-profile">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
              <p className="text-emerald-100 text-lg mb-3">{userProfile?.email || user?.email}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-teal-700/50 backdrop-blur-sm rounded-full px-4 py-2 border border-green-400/30">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="font-semibold text-green-200">{t("prof_active_investor")}</span>
                </div>
                {kycData?.status === 'approved' && (
                  <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-4 py-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="font-semibold text-green-200">{t("prof_verified")}</span>
                  </div>
                )}
                {kycData?.status === 'pending' && (
                  <div className="flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-4 py-2">
                    <Clock className="w-4 h-4 text-green-300" />
                    <span className="font-semibold text-green-200">{t("prof_verification_pending")}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-right bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-emerald-100 text-sm font-medium uppercase tracking-wide">{t("prof_completion")}</p>
            <p className="text-3xl font-mono font-bold text-white">{profileCompletion}%</p>
            {profileCompletion < 100 && (
              <Button
                onClick={() => setShowWizard(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-6 py-2 mt-3 rounded-full uppercase"
                data-testid="button-complete-profile-wizard"
              >
                Complete Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Completion Overview */}
      {profileCompletion < 100 && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-1 shadow-xl">
          <div className="bg-gradient-to-br from-teal-800/90 to-emerald-900/90 backdrop-blur-sm rounded-2xl p-6 relative border border-teal-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">
                    Complete Your Investor Profile
                  </h3>
                  <p className="text-teal-200 font-medium">
                    Unlock premium features and higher investment limits
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-mono font-bold text-white" data-testid="text-completion-percentage">
                    {profileCompletion}%
                  </p>
                  <p className="text-sm text-teal-200">{t("prof_complete")}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 relative">
              <div className="w-full bg-teal-700/30 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-500 relative"
                  style={{ width: `${profileCompletion}%` }}
                >
                  <div className="absolute right-0 top-0 w-2 h-3 bg-white rounded-full shadow-sm animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-teal-200 mt-3">
                <span>{completedSections} of {totalSections} sections completed</span>
                <span className="flex items-center gap-1">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  {totalSections - completedSections} sections remaining
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Sections */}
      <div className="grid gap-6">
        <h2 className="text-2xl font-semibold text-white uppercase tracking-wide">{t("prof_sections")}</h2>

        <div className="grid gap-4">
          {profileSections.map((section) => (
            <div
              key={section.id}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 backdrop-blur-sm border border-teal-700/50 p-6 shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer"
              data-testid={`section-${section.id}`}
              onClick={() => handleSectionClick(section.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    section.completed
                      ? 'bg-green-500/20 border-green-400/30 text-green-400'
                      : 'bg-teal-700/50 border-teal-600/30 text-green-400'
                  }`}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">{section.title}</h3>
                    <p className="text-teal-200 text-sm">{section.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {section.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Clock className="w-5 h-5 text-green-400" />
                  )}
                  <div className={`px-3 py-1.5 rounded-lg border ${
                    section.completed
                      ? 'bg-green-500/20 border-green-400/30 text-green-300'
                      : 'bg-green-500/20 border-green-400/30 text-green-300'
                  }`}>
                    <span className="text-sm font-bold uppercase">
                      {section.completed ? t("prof_completed") : t("prof_pending")}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-green-400" />
                </div>
              </div>

              {/* Section Items Preview */}
              <div className="mt-4 pt-4 border-t border-teal-700/50">
                <div className="grid grid-cols-2 gap-2">
                  {section.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        section.completed ? 'bg-green-400' : 'bg-teal-400'
                      }`} />
                      <span className={section.completed ? 'text-green-300' : 'text-teal-200'}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KYC Details Section */}
      {kycData && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 backdrop-blur-sm border border-teal-700/50 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-700/50 flex items-center justify-center border border-teal-600/30">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">{t("prof_kyc_information")}</h3>
                <p className="text-teal-200">{t("prof_personal_desc")}</p>
              </div>
            </div>
            <div className="text-right bg-teal-700/50 backdrop-blur-sm rounded-xl p-4 border border-teal-600/30">
              <p className="text-sm font-medium text-teal-200 uppercase">
                {kycData.completionPercentage}{t("ps_percent_complete")}
              </p>
              <p className="text-xs text-teal-200 capitalize">
                {t("ps_status")} {t(`ps_status_${kycData.status}` as TranslationKey)}
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-teal-900/70 rounded-xl p-4 border border-teal-700/50">
              <h4 className="font-semibold mb-3 text-sm text-white uppercase tracking-wide">{t("prof_personal_information")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-teal-200">Full Name (English)</p>
                  <p className="font-medium text-white">{kycData.personalInfo?.fullNameEnglish || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-teal-200">Full Name (Arabic)</p>
                  <p className="font-medium text-white">{kycData.personalInfo?.fullNameArabic || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-teal-200">{t("prof_date_of_birth")}</p>
                  <p className="font-medium text-white">
                    {kycData.personalInfo?.dateOfBirth
                      ? new Date(kycData.personalInfo.dateOfBirth).toLocaleDateString()
                      : 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-teal-200">{t("prof_nationality")}</p>
                  <p className="font-medium text-white capitalize">{kycData.personalInfo?.nationality || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-teal-200">{t("prof_occupation")}</p>
                  <p className="font-medium text-white">{kycData.personalInfo?.occupation || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-teal-200">{t("prof_monthly_income")}</p>
                  <p className="font-medium text-white">
                    SAR {(kycData.personalInfo?.monthlyIncome || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-teal-900/70 rounded-xl p-4 border border-teal-700/50">
              <h4 className="font-semibold mb-3 text-sm text-white uppercase tracking-wide">{t("prof_address")}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-teal-200">{t("prof_country")}</p>
                  <p className="font-medium text-white">{kycData.address?.country || 'Not provided'}</p>
                </div>
                <div>
                  <p className="text-xs text-teal-200">{t("prof_city")}</p>
                  <p className="font-medium text-white">{kycData.address?.city || 'Not provided'}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-teal-200">{t("prof_address")}</p>
                  <p className="font-medium text-white">{kycData.address?.address || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Document Uploads */}
            <div className="bg-teal-900/70 rounded-xl p-4 border border-teal-700/50">
              <h4 className="font-semibold mb-3 text-sm text-white uppercase tracking-wide">{t("prof_document_uploads")}</h4>
              <div className="space-y-2">
                {kycData.documents?.nationalId && (
                  <div className="flex items-center justify-between p-3 bg-teal-800/50 rounded-lg border border-teal-700/30">
                    <span className="text-white">{t("prof_national_id")}</span>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                      kycData.documents.nationalId.uploaded
                        ? 'bg-green-500/20 border-green-400/30'
                        : 'bg-green-500/20 border-green-400/30'
                    }`}>
                      {kycData.documents.nationalId.uploaded ? (
                        <><CheckCircle className="w-3 h-3 text-green-600 dark:text-green-300" /><span className="text-sm font-semibold text-green-600 dark:text-green-300">{t("prof_uploaded")}</span></>
                      ) : (
                        <><Clock className="w-3 h-3 text-green-600 dark:text-green-300" /><span className="text-sm font-semibold text-green-600 dark:text-green-300">{t("prof_pending")}</span></>
                      )}
                    </div>
                  </div>
                )}
                {kycData.documents?.addressProof && (
                  <div className="flex items-center justify-between p-3 bg-teal-800/50 rounded-lg border border-teal-700/30">
                    <span className="text-white">{t("prof_address_proof")}</span>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                      kycData.documents.addressProof.uploaded
                        ? 'bg-green-500/20 border-green-400/30'
                        : 'bg-green-500/20 border-green-400/30'
                    }`}>
                      {kycData.documents.addressProof.uploaded ? (
                        <><CheckCircle className="w-3 h-3 text-green-600 dark:text-green-300" /><span className="text-sm font-semibold text-green-600 dark:text-green-300">{t("prof_uploaded")}</span></>
                      ) : (
                        <><Clock className="w-3 h-3 text-green-600 dark:text-green-300" /><span className="text-sm font-semibold text-green-600 dark:text-green-300">{t("prof_pending")}</span></>
                      )}
                    </div>
                  </div>
                )}
                {kycData.documents?.selfie && (
                  <div className="flex items-center justify-between p-3 bg-teal-800/50 rounded-lg border border-teal-700/30">
                    <span className="text-white">{t("prof_selfie_verification")}</span>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                      kycData.documents.selfie.uploaded
                        ? 'bg-green-500/20 border-green-400/30'
                        : 'bg-green-500/20 border-green-400/30'
                    }`}>
                      {kycData.documents.selfie.uploaded ? (
                        <><CheckCircle className="w-3 h-3 text-green-600 dark:text-green-300" /><span className="text-sm font-semibold text-green-600 dark:text-green-300">{t("prof_uploaded")}</span></>
                      ) : (
                        <><Clock className="w-3 h-3 text-green-600 dark:text-green-300" /><span className="text-sm font-semibold text-green-600 dark:text-green-300">{t("prof_pending")}</span></>
                      )}
                    </div>
                  </div>
                )}
                {kycData.documents?.proofOfIncome && (
                  <div className="flex items-center justify-between p-3 bg-teal-800/50 rounded-lg border border-teal-700/30">
                    <span className="text-white">{t("prof_proof_of_income")}</span>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                      kycData.documents.proofOfIncome.uploaded
                        ? 'bg-green-500/20 border-green-400/30'
                        : 'bg-green-500/20 border-green-400/30'
                    }`}>
                      {kycData.documents.proofOfIncome.uploaded ? (
                        <><CheckCircle className="w-3 h-3 text-green-600 dark:text-green-300" /><span className="text-sm font-semibold text-green-600 dark:text-green-300">{t("prof_uploaded")}</span></>
                      ) : (
                        <><Clock className="w-3 h-3 text-green-600 dark:text-green-300" /><span className="text-sm font-semibold text-green-600 dark:text-green-300">{t("prof_pending")}</span></>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800/90 to-emerald-900/90 backdrop-blur-sm border border-teal-700/50 shadow-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-teal-700/50 flex items-center justify-center border border-teal-600/30">
            <FileText className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">{t("prof_quick_actions")}</h3>
            <p className="text-teal-200">{t("prof_manage_account")}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            className="justify-start h-auto p-4 bg-teal-700/50 border border-teal-600/50 text-white hover:bg-yellow-400 hover:text-gray-900 hover:border-yellow-500"
            data-testid="button-update-password"
          >
            <div className="text-left">
              <div className="font-medium">{t("prof_update_password")}</div>
              <div className="text-sm opacity-80">{t("prof_change_password_desc")}</div>
            </div>
          </Button>
          <Button
            className="justify-start h-auto p-4 bg-teal-700/50 border border-teal-600/50 text-white hover:bg-yellow-400 hover:text-gray-900 hover:border-yellow-500"
            data-testid="button-notification-settings"
          >
            <div className="text-left">
              <div className="font-medium">{t("prof_notification_settings")}</div>
              <div className="text-sm opacity-80">{t("prof_manage_preferences")}</div>
            </div>
          </Button>
          <Button
            className="justify-start h-auto p-4 bg-teal-700/50 border border-teal-600/50 text-white hover:bg-yellow-400 hover:text-gray-900 hover:border-yellow-500"
            data-testid="button-download-data"
          >
            <div className="text-left">
              <div className="font-medium">{t("prof_download_data")}</div>
              <div className="text-sm opacity-80">{t("prof_export_info")}</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}