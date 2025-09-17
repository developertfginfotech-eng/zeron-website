import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Search, Filter, Download, Plus, MoreHorizontal, Edit, Trash2, Shield, ShieldCheck, UserX, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AdminUser } from "@shared/schema"

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // Mock admin users data with all required fields
  const mockAdminUsers: AdminUser[] = [
    {
      id: '1',
      name: 'Sarah Al-Mahmoud',
      email: 'sarah.mahmoud@zaron.com',
      role: 'super_admin',
      accessLevel: 'full',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5b0c8d1?w=150&h=150&fit=crop&crop=face',
      phone: '+966 50 123 4567',
      department: 'Operations',
      lastLogin: new Date('2024-01-20T10:30:00Z'),
      status: 'active',
      permissions: ['manage_users', 'manage_kyc', 'manage_properties', 'view_analytics', 'system_admin'],
      createdAt: new Date('2023-06-15'),
      updatedAt: new Date('2024-01-20'),
    },
    {
      id: '2',
      name: 'Ahmed Al-Rashid',
      email: 'ahmed.rashid@zaron.com',
      role: 'admin',
      accessLevel: 'full',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      phone: '+966 55 987 6543',
      department: 'KYC Operations',
      lastLogin: new Date('2024-01-19T14:22:00Z'),
      status: 'active',
      permissions: ['manage_kyc', 'view_users', 'manage_documents'],
      createdAt: new Date('2023-08-10'),
      updatedAt: new Date('2024-01-19'),
    },
    {
      id: '3',
      name: 'Fatima Al-Qasimi',
      email: 'fatima.qasimi@zaron.com',
      role: 'manager',
      accessLevel: 'limited',
      avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
      phone: '+966 56 456 7890',
      department: 'Customer Support',
      lastLogin: new Date('2024-01-18T09:15:00Z'),
      status: 'active',
      permissions: ['view_kyc', 'manage_support_tickets'],
      createdAt: new Date('2023-09-22'),
      updatedAt: new Date('2024-01-18'),
    },
    {
      id: '4',
      name: 'Omar Hassan',
      email: 'omar.hassan@zaron.com',
      role: 'viewer',
      accessLevel: 'read_only',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      phone: '+966 53 345 6789',
      department: 'Analytics',
      lastLogin: new Date('2024-01-17T16:45:00Z'),
      status: 'active',
      permissions: ['view_analytics', 'view_reports'],
      createdAt: new Date('2023-11-05'),
      updatedAt: new Date('2024-01-17'),
    },
    {
      id: '5',
      name: 'Layla Al-Zahra',
      email: 'layla.zahra@zaron.com',
      role: 'admin',
      accessLevel: 'full',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      phone: '+966 54 789 0123',
      department: 'Compliance',
      lastLogin: new Date('2024-01-15T08:30:00Z'),
      status: 'suspended',
      permissions: ['manage_compliance', 'view_kyc', 'manage_documents'],
      createdAt: new Date('2023-07-30'),
      updatedAt: new Date('2024-01-15'),
    },
    {
      id: '6',
      name: 'Khalid Al-Mutairi',
      email: 'khalid.mutairi@zaron.com',
      role: 'manager',
      accessLevel: 'limited',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      phone: '+966 52 234 5678',
      department: 'Risk Management',
      lastLogin: new Date('2024-01-19T11:20:00Z'),
      status: 'active',
      permissions: ['view_analytics', 'manage_risk_assessment'],
      createdAt: new Date('2023-10-12'),
      updatedAt: new Date('2024-01-19'),
    },
  ]

  const filteredUsers = mockAdminUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'super_admin': return 'default'
      case 'admin': return 'secondary'
      case 'manager': return 'outline'
      case 'viewer': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'inactive': return 'secondary'
      case 'suspended': return 'destructive'
      default: return 'outline'
    }
  }

  const formatLastLogin = (date: Date | null) => {
    if (!date) return 'Never'
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    
    if (diffDays > 0) return `${diffDays}d ago`
    if (diffHours > 0) return `${diffHours}h ago`
    if (diffMinutes > 0) return `${diffMinutes}m ago`
    return 'Just now'
  }

  const handleCreateUser = () => {
    console.log('Create new admin user')
    setIsCreateModalOpen(false)
  }

  const handleEditUser = (user: AdminUser) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleDeleteUser = (userId: string) => {
    console.log('Delete user:', userId)
    // In real app, this would delete the user
  }

  const handleToggleStatus = (userId: string) => {
    console.log('Toggle user status:', userId)
    // In real app, this would update the user status
  }

  const handleExport = () => {
    console.log('Export admin users data')
    // In real app, this would export the data
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 modern-scrollbar">
      <div className="p-6 space-y-8" data-testid="page-users">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-primary/70 bg-clip-text text-transparent animate-float" data-testid="text-users-title">
              Admin Panel Users
            </h1>
            <p className="text-lg text-muted-foreground/80">
              Manage admin users, roles, and access control permissions
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {mockAdminUsers.length} total users • {mockAdminUsers.filter(u => u.status === 'active').length} active
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="neon-glow hover:scale-105 transition-transform duration-300"
              data-testid="button-add-user"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Admin User
            </Button>
            <Button onClick={handleExport} variant="outline" data-testid="button-export-users">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="glass-morphism" data-testid="card-total-users">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAdminUsers.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Admin panel access
              </p>
            </CardContent>
          </Card>

          <Card className="glass-morphism" data-testid="card-active-users">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Users
              </CardTitle>
              <ShieldCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockAdminUsers.filter(u => u.status === 'active').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently active
              </p>
            </CardContent>
          </Card>

          <Card className="glass-morphism" data-testid="card-super-admins">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Super Admins
              </CardTitle>
              <Settings className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {mockAdminUsers.filter(u => u.role === 'super_admin').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Full system access
              </p>
            </CardContent>
          </Card>

          <Card className="glass-morphism" data-testid="card-suspended-users">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Suspended
              </CardTitle>
              <UserX className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {mockAdminUsers.filter(u => u.status === 'suspended').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Access revoked
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>Find admin users by name, email, role, or status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-users"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-48" data-testid="select-role-filter">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48" data-testid="select-status-filter">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle>
              Admin Users ({filteredUsers.length} users)
            </CardTitle>
            <CardDescription>
              Manage administrative access and permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover-elevate"
                  data-testid={`user-row-${user.id}`}
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar || undefined} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{user.department}</span>
                        <span>•</span>
                        <span>Last login: {formatLastLogin(user.lastLogin)}</span>
                        <span>•</span>
                        <span>Access: {user.accessLevel.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {user.permissions?.slice(0, 2).map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                      {user.permissions && user.permissions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{user.permissions.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          data-testid={`button-actions-${user.id}`}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEditUser(user)}
                          data-testid={`button-edit-${user.id}`}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(user.id)}
                          data-testid={`button-toggle-status-${user.id}`}
                        >
                          {user.status === 'active' ? <UserX className="h-4 w-4 mr-2" /> : <ShieldCheck className="h-4 w-4 mr-2" />}
                          {user.status === 'active' ? 'Suspend User' : 'Activate User'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-destructive"
                          data-testid={`button-delete-${user.id}`}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No users found matching your criteria</p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("")
                  setRoleFilter("all")
                  setStatusFilter("all")
                }} data-testid="button-clear-filters">
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create User Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Admin User</DialogTitle>
              <DialogDescription>
                Create a new admin user with specific role and permissions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@zaron.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="Operations" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+966 50 123 4567" />
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {['manage_users', 'manage_kyc', 'manage_properties', 'view_analytics', 'system_admin'].map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Switch />
                      <Label className="text-sm">{permission.replace('_', ' ')}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateUser}>Create User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Admin User</DialogTitle>
              <DialogDescription>
                Update user information, role, and permissions.
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Full Name</Label>
                    <Input id="edit-name" defaultValue={selectedUser.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">Role</Label>
                    <Select defaultValue={selectedUser.role}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-department">Department</Label>
                    <Input id="edit-department" defaultValue={selectedUser.department || ''} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input id="edit-phone" defaultValue={selectedUser.phone || ''} />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue={selectedUser.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}