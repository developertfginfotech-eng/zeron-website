import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Shield, 
  UserCog, 
  Settings, 
  Key,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import { AdminUser } from "@shared/schema"

export default function Admin() {
  // todo: remove mock functionality
  const [selectedRole, setSelectedRole] = useState("all")

  const mockAdminUsers: AdminUser[] = [
    {
      id: '1',
      name: 'Omar Al-Mahmoud',
      email: 'omar.mahmoud@zaron.com',
      role: 'super_admin',
      avatar: null,
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@zaron.com',
      role: 'kyc_officer',
      avatar: null,
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '3',
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@zaron.com',
      role: 'property_manager',
      avatar: null,
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '4',
      name: 'Fatima Al-Zahra',
      email: 'fatima.zahra@zaron.com',
      role: 'financial_analyst',
      avatar: null,
      createdAt: new Date('2024-02-10'),
    },
    {
      id: '5',
      name: 'Mohammad Hassan',
      email: 'mohammad.hassan@zaron.com',
      role: 'compliance_officer',
      avatar: null,
      createdAt: new Date('2024-02-15'),
    },
  ]

  const rolePermissions = {
    super_admin: {
      name: 'Super Administrator',
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      permissions: ['All platform access', 'User management', 'System configuration', 'Financial operations', 'Security settings'],
      count: mockAdminUsers.filter(u => u.role === 'super_admin').length
    },
    kyc_officer: {
      name: 'KYC Officer',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      permissions: ['Review KYC documents', 'Approve/reject verifications', 'User compliance', 'Document management'],
      count: mockAdminUsers.filter(u => u.role === 'kyc_officer').length
    },
    property_manager: {
      name: 'Property Manager',
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      permissions: ['Property listings', 'Investment tracking', 'Performance monitoring', 'Tenant management'],
      count: mockAdminUsers.filter(u => u.role === 'property_manager').length
    },
    financial_analyst: {
      name: 'Financial Analyst',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      permissions: ['Financial reporting', 'Analytics access', 'Revenue tracking', 'Performance analysis'],
      count: mockAdminUsers.filter(u => u.role === 'financial_analyst').length
    },
    compliance_officer: {
      name: 'Compliance Officer',
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      permissions: ['Regulatory compliance', 'Audit trails', 'Risk assessment', 'Legal documentation'],
      count: mockAdminUsers.filter(u => u.role === 'compliance_officer').length
    }
  }

  const systemActivities = [
    { action: 'User login', user: 'Sarah Johnson', timestamp: '2 minutes ago', status: 'success' },
    { action: 'KYC approval', user: 'Ahmed Al-Rashid', timestamp: '15 minutes ago', status: 'success' },
    { action: 'Property added', user: 'Mohammad Hassan', timestamp: '1 hour ago', status: 'success' },
    { action: 'Failed login attempt', user: 'Unknown', timestamp: '2 hours ago', status: 'warning' },
    { action: 'System backup', user: 'System', timestamp: '6 hours ago', status: 'success' },
  ]

  const filteredUsers = selectedRole === "all" 
    ? mockAdminUsers 
    : mockAdminUsers.filter(user => user.role === selectedRole)

  const handleRoleChange = (userId: string, newRole: string) => {
    console.log('Change role for user:', userId, 'to:', newRole)
    // In real app, this would update the user's role
  }

  const handleDeactivateUser = (userId: string) => {
    console.log('Deactivate user:', userId)
    // In real app, this would deactivate the admin user
  }

  return (
    <div className="p-6 space-y-6" data-testid="page-admin">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-admin-title">Admin Role Management</h1>
          <p className="text-muted-foreground">Manage administrator access and permissions</p>
        </div>
        <Button data-testid="button-add-admin">
          <UserCog className="h-4 w-4 mr-2" />
          Add Administrator
        </Button>
      </div>

      {/* Role Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(rolePermissions).map(([roleKey, role]) => (
          <Card 
            key={roleKey} 
            className={`cursor-pointer hover-elevate ${selectedRole === roleKey ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedRole(roleKey)}
            data-testid={`card-role-${roleKey}`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base">{role.name}</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <Badge className={role.color}>
                  {role.count} user{role.count !== 1 ? 's' : ''}
                </Badge>
              </div>
              <div className="space-y-1">
                {role.permissions.slice(0, 3).map((permission, index) => (
                  <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    {permission}
                  </div>
                ))}
                {role.permissions.length > 3 && (
                  <div className="text-xs text-muted-foreground">
                    +{role.permissions.length - 3} more permissions
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Admin Users List */}
        <Card data-testid="card-admin-users">
          <CardHeader>
            <CardTitle>
              Administrator Accounts
              {selectedRole !== "all" && (
                <Badge className="ml-2">
                  {rolePermissions[selectedRole as keyof typeof rolePermissions]?.name}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              {selectedRole === "all" 
                ? "All administrative users and their roles"
                : `Users with ${rolePermissions[selectedRole as keyof typeof rolePermissions]?.name} role`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`admin-user-${user.id}`}>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={rolePermissions[user.role as keyof typeof rolePermissions]?.color}>
                      {rolePermissions[user.role as keyof typeof rolePermissions]?.name}
                    </Badge>
                    <Button variant="ghost" size="sm" data-testid={`button-manage-${user.id}`}>
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {selectedRole !== "all" && (
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedRole("all")}
                  className="w-full"
                  data-testid="button-show-all-roles"
                >
                  Show All Roles
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card data-testid="card-system-activities">
          <CardHeader>
            <CardTitle>System Activities</CardTitle>
            <CardDescription>Recent administrative actions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between" data-testid={`activity-${index}`}>
                  <div className="flex items-center gap-3">
                    {activity.status === 'success' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    )}
                    <div>
                      <div className="font-medium text-sm">{activity.action}</div>
                      <div className="text-xs text-muted-foreground">{activity.user}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {activity.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Security Settings */}
      <Card data-testid="card-security-settings">
        <CardHeader>
          <CardTitle>Security & Access Control</CardTitle>
          <CardDescription>System-wide security configurations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Key className="h-4 w-4" />
                Authentication Settings
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Two-factor Authentication</span>
                  <Badge variant="outline" className="text-green-600">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Session Timeout</span>
                  <Badge variant="outline">8 hours</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Password Policy</span>
                  <Badge variant="outline" className="text-green-600">Strong</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Login Attempts Limit</span>
                  <Badge variant="outline">5 attempts</Badge>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Access Control
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>API Rate Limiting</span>
                  <Badge variant="outline" className="text-green-600">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>IP Allowlist</span>
                  <Badge variant="outline">12 addresses</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audit Logging</span>
                  <Badge variant="outline" className="text-green-600">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Encryption</span>
                  <Badge variant="outline" className="text-green-600">AES-256</Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t">
            <Button variant="outline" data-testid="button-security-settings">
              <Settings className="h-4 w-4 mr-2" />
              Configure Security Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}