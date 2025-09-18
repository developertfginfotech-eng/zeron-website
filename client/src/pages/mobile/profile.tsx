import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { User, Phone, Mail, MapPin, FileText, Shield, Camera, Edit2, CheckCircle, AlertCircle, Clock, Upload } from "lucide-react"

const mockInvestor = {
  id: "inv_001",
  name: "Ahmed Al-Rashid",
  email: "ahmed.alrashid@email.com",
  phone: "+966 55 123 4567",
  nationalId: "123456789",
  dateOfBirth: "1985-03-15",
  nationality: "Saudi Arabian",
  address: "Riyadh, Saudi Arabia",
  kycStatus: "verified",
  memberSince: "2024-01-15",
  totalInvested: 125000,
  activeInvestments: 3,
  documents: [
    {
      id: "doc_001",
      type: "National ID",
      status: "verified",
      uploadDate: "2024-01-15",
      expiryDate: "2030-03-15"
    },
    {
      id: "doc_002", 
      type: "Bank Statement",
      status: "verified",
      uploadDate: "2024-01-15",
      expiryDate: null
    },
    {
      id: "doc_003",
      type: "Income Certificate",
      status: "pending",
      uploadDate: "2024-11-15",
      expiryDate: null
    }
  ]
}

export default function MobileProfile() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState(mockInvestor)
  
  // Modal states
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showNotificationDialog, setShowNotificationDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  
  // Form states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const handleSaveProfile = () => {
    // In real app, this would save to backend
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "New password and confirmation password don't match.",
      })
      return
    }
    
    if (passwordForm.newPassword.length < 8) {
      toast({
        variant: "destructive",
        title: "Invalid Password",
        description: "Password must be at least 8 characters long.",
      })
      return
    }

    // In real app, this would call backend
    setShowPasswordDialog(false)
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    })
  }

  const handleNotificationSave = () => {
    // In real app, this would save to backend
    setShowNotificationDialog(false)
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated.",
    })
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In real app, this would upload to backend
      toast({
        title: "Document Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      })
    }
  }

  const handleDeleteAccount = () => {
    // In real app, this would call backend
    setShowDeleteDialog(false)
    toast({
      variant: "destructive",
      title: "Account Deletion Requested",
      description: "Your account deletion request has been submitted.",
    })
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account and KYC information</p>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16">
                <AvatarImage src="" alt={profileData.name} />
                <AvatarFallback className="text-lg">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="icon" 
                variant="outline" 
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full"
                data-testid="button-change-avatar"
              >
                <Camera className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{profileData.name}</h2>
              <p className="text-muted-foreground">{profileData.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={`text-xs ${getStatusColor(profileData.kycStatus)}`}>
                  {getStatusIcon(profileData.kycStatus)}
                  <span className="ml-1 capitalize">{profileData.kycStatus}</span>
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Member since {new Date(profileData.memberSince).toLocaleDateString()}
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(!isEditing)}
              data-testid="button-edit-profile"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Investment Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Investment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold">SAR {profileData.totalInvested.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Invested</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold">{profileData.activeInvestments}</p>
              <p className="text-sm text-muted-foreground">Active Investments</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Personal Information</CardTitle>
          {!isEditing && (
            <CardDescription>Your personal details and contact information</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  data-testid="input-profile-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  data-testid="input-profile-email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  data-testid="input-profile-phone"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  data-testid="input-profile-address"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveProfile} data-testid="button-save-profile">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{profileData.name}</p>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{profileData.email}</p>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{profileData.phone}</p>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{profileData.address}</p>
                  <p className="text-sm text-muted-foreground">Address</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* KYC Documents */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            KYC Documents
          </CardTitle>
          <CardDescription>Your verification documents and status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {profileData.documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">{doc.type}</p>
                  <p className="text-xs text-muted-foreground">
                    Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getStatusColor(doc.status)}`}
                >
                  {getStatusIcon(doc.status)}
                  <span className="ml-1 capitalize">{doc.status}</span>
                </Badge>
              </div>
            </div>
          ))}
          
          <Separator />
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleFileUpload}
            data-testid="button-upload-document"
          >
            <FileText className="h-4 w-4 mr-2" />
            Upload New Document
          </Button>
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            data-testid="input-file-upload"
          />
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => setShowPasswordDialog(true)}
            data-testid="button-change-password"
          >
            <Shield className="h-4 w-4 mr-2" />
            Change Password
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => setShowNotificationDialog(true)}
            data-testid="button-notification-settings"
          >
            <Mail className="h-4 w-4 mr-2" />
            Notification Settings
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 hover:text-red-700" 
            onClick={() => setShowDeleteDialog(true)}
            data-testid="button-delete-account"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                data-testid="input-current-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                data-testid="input-new-password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                data-testid="input-confirm-password"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordChange} data-testid="button-save-password">
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notification Settings Dialog */}
      <Dialog open={showNotificationDialog} onOpenChange={setShowNotificationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notification Settings</DialogTitle>
            <DialogDescription>
              Choose how you want to receive notifications.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive important updates via email</p>
              </div>
              <Switch
                checked={notificationSettings.emailNotifications}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, emailNotifications: checked})
                }
                data-testid="switch-email-notifications"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Get alerts via text message</p>
              </div>
              <Switch
                checked={notificationSettings.smsNotifications}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, smsNotifications: checked})
                }
                data-testid="switch-sms-notifications"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Browser push notifications</p>
              </div>
              <Switch
                checked={notificationSettings.pushNotifications}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, pushNotifications: checked})
                }
                data-testid="switch-push-notifications"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive promotional content</p>
              </div>
              <Switch
                checked={notificationSettings.marketingEmails}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, marketingEmails: checked})
                }
                data-testid="switch-marketing-emails"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotificationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleNotificationSave} data-testid="button-save-notifications">
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete your account? This action cannot be undone. 
              All your investments and data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700"
              data-testid="button-confirm-delete"
            >
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}