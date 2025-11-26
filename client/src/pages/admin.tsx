import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  UserCog,
  Settings,
  Users,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  X
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

// Types
interface Permission {
  resource: string
  actions: string[]
}

interface Role {
  _id: string
  name: string
  displayName: string
  description?: string
  permissions: Permission[]
  isSystemRole: boolean
  isActive: boolean
  userCount?: number
}

interface Group {
  _id: string
  name: string
  displayName: string
  description?: string
  permissions: Permission[]
  memberCount?: number
  isActive: boolean
}

interface User {
  _id: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  position?: string
  department?: string
  assignedRole?: Role
  groups?: Group[]
  groupCount: number
}

const RESOURCES = [
  { value: 'kyc', label: 'KYC Management' },
  { value: 'properties', label: 'Properties' },
  { value: 'investments', label: 'Investments' },
  { value: 'users', label: 'Users' },
  { value: 'transactions', label: 'Transactions' },
  { value: 'documents', label: 'Documents' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'settings', label: 'Settings' },
  { value: 'admin', label: 'Admin Panel' }
]

const ACTIONS = ['view', 'create', 'edit', 'delete', 'approve', 'reject', 'manage', 'export']

export default function Admin() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("roles")
  const [roles, setRoles] = useState<Role[]>([])
  const [groups, setGroups] = useState<Group[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

  // Dialog states
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [groupDialogOpen, setGroupDialogOpen] = useState(false)
  const [userAssignDialogOpen, setUserAssignDialogOpen] = useState(false)

  // Form states
  const [roleForm, setRoleForm] = useState({
    name: '',
    displayName: '',
    description: '',
    permissions: [] as Permission[]
  })
  const [groupForm, setGroupForm] = useState({
    name: '',
    displayName: '',
    description: '',
    permissions: [] as Permission[]
  })
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRoleId, setSelectedRoleId] = useState<string>('')
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([])

  // Fetch data
  useEffect(() => {
    if (activeTab === 'roles') fetchRoles()
    if (activeTab === 'groups') fetchGroups()
    if (activeTab === 'users') fetchUsers()
  }, [activeTab])

  const fetchRoles = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/roles', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        setRoles(data.data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch roles",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchGroups = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/groups', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        setGroups(data.data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch groups",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/rbac/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      if (data.success) {
        setUsers(data.data)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const createRole = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/roles', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(roleForm)
      })
      const data = await response.json()

      if (data.success) {
        toast({ title: "Success", description: "Role created successfully" })
        setRoleDialogOpen(false)
        fetchRoles()
        setRoleForm({ name: '', displayName: '', description: '', permissions: [] })
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create role",
        variant: "destructive"
      })
    }
  }

  const createGroup = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/groups', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupForm)
      })
      const data = await response.json()

      if (data.success) {
        toast({ title: "Success", description: "Group created successfully" })
        setGroupDialogOpen(false)
        fetchGroups()
        setGroupForm({ name: '', displayName: '', description: '', permissions: [] })
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create group",
        variant: "destructive"
      })
    }
  }

  const assignRoleToUser = async () => {
    if (!selectedUser || !selectedRoleId) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/users/${selectedUser._id}/assign-role`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ roleId: selectedRoleId })
      })
      const data = await response.json()

      if (data.success) {
        toast({ title: "Success", description: "Role assigned successfully" })
        setUserAssignDialogOpen(false)
        fetchUsers()
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to assign role",
        variant: "destructive"
      })
    }
  }

  const addUserToGroup = async (groupId: string) => {
    if (!selectedUser) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/groups/${groupId}/add-member`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: selectedUser._id })
      })
      const data = await response.json()

      if (data.success) {
        toast({ title: "Success", description: "User added to group" })
        fetchUsers()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add user to group",
        variant: "destructive"
      })
    }
  }

  const deleteRole = async (roleId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/roles/${roleId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()

      if (data.success) {
        toast({ title: "Success", description: "Role deleted successfully" })
        fetchRoles()
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete role",
        variant: "destructive"
      })
    }
  }

  const deleteGroup = async (groupId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/groups/${groupId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()

      if (data.success) {
        toast({ title: "Success", description: "Group deleted successfully" })
        fetchGroups()
      } else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete group",
        variant: "destructive"
      })
    }
  }

  const initializeDefaultRoles = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/rbac/initialize', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()

      if (data.success) {
        toast({ title: "Success", description: "Default roles initialized" })
        fetchRoles()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initialize roles",
        variant: "destructive"
      })
    }
  }

  const addPermissionToForm = (formType: 'role' | 'group', resource: string, action: string, checked: boolean) => {
    const form = formType === 'role' ? roleForm : groupForm
    const setForm = formType === 'role' ? setRoleForm : setGroupForm

    const updatedPermissions = [...form.permissions]
    const permIndex = updatedPermissions.findIndex(p => p.resource === resource)

    if (permIndex === -1 && checked) {
      updatedPermissions.push({ resource, actions: [action] })
    } else if (permIndex !== -1) {
      if (checked) {
        if (!updatedPermissions[permIndex].actions.includes(action)) {
          updatedPermissions[permIndex].actions.push(action)
        }
      } else {
        updatedPermissions[permIndex].actions = updatedPermissions[permIndex].actions.filter(a => a !== action)
        if (updatedPermissions[permIndex].actions.length === 0) {
          updatedPermissions.splice(permIndex, 1)
        }
      }
    }

    setForm({ ...form, permissions: updatedPermissions })
  }

  return (
    <div className="p-6 space-y-6" data-testid="page-admin">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">RBAC Management</h1>
          <p className="text-muted-foreground">Manage roles, groups, and user permissions</p>
        </div>
        <Button onClick={initializeDefaultRoles} variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Initialize Default Roles
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="roles">
            <Shield className="h-4 w-4 mr-2" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="groups">
            <Users className="h-4 w-4 mr-2" />
            Groups
          </TabsTrigger>
          <TabsTrigger value="users">
            <UserCog className="h-4 w-4 mr-2" />
            User Assignment
          </TabsTrigger>
        </TabsList>

        {/* Roles Tab */}
        <TabsContent value="roles" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Role
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                  <DialogDescription>Define a new role with specific permissions</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="role-name">Role Name</Label>
                    <Input
                      id="role-name"
                      value={roleForm.name}
                      onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
                      placeholder="e.g., kyc_officer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role-display">Display Name</Label>
                    <Input
                      id="role-display"
                      value={roleForm.displayName}
                      onChange={(e) => setRoleForm({ ...roleForm, displayName: e.target.value })}
                      placeholder="e.g., KYC Officer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role-desc">Description</Label>
                    <Textarea
                      id="role-desc"
                      value={roleForm.description}
                      onChange={(e) => setRoleForm({ ...roleForm, description: e.target.value })}
                      placeholder="Describe the role's responsibilities"
                    />
                  </div>
                  <div>
                    <Label>Permissions</Label>
                    <div className="border rounded-lg p-4 space-y-4 max-h-64 overflow-y-auto">
                      {RESOURCES.map(resource => (
                        <div key={resource.value} className="space-y-2">
                          <div className="font-medium text-sm">{resource.label}</div>
                          <div className="grid grid-cols-4 gap-2">
                            {ACTIONS.map(action => (
                              <div key={action} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`role-${resource.value}-${action}`}
                                  checked={roleForm.permissions.some(p =>
                                    p.resource === resource.value && p.actions.includes(action)
                                  )}
                                  onCheckedChange={(checked) =>
                                    addPermissionToForm('role', resource.value, action, checked as boolean)
                                  }
                                />
                                <label
                                  htmlFor={`role-${resource.value}-${action}`}
                                  className="text-xs cursor-pointer"
                                >
                                  {action}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setRoleDialogOpen(false)}>Cancel</Button>
                  <Button onClick={createRole}>Create Role</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map(role => (
              <Card key={role._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{role.displayName}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    {!role.isSystemRole && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteRole(role._id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Users:</span>
                      <Badge>{role.userCount || 0}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">System Role:</span>
                      <Badge variant={role.isSystemRole ? "default" : "outline"}>
                        {role.isSystemRole ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      <div className="font-medium mb-1">Permissions:</div>
                      {role.permissions.slice(0, 3).map((perm, idx) => (
                        <div key={idx}>• {perm.resource}: {perm.actions.join(', ')}</div>
                      ))}
                      {role.permissions.length > 3 && (
                        <div>+{role.permissions.length - 3} more...</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Groups Tab */}
        <TabsContent value="groups" className="space-y-4">
          <div className="flex justify-end">
            <Dialog open={groupDialogOpen} onOpenChange={setGroupDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Group
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Group</DialogTitle>
                  <DialogDescription>Create a team or department with specific permissions</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="group-name">Group Name</Label>
                    <Input
                      id="group-name"
                      value={groupForm.name}
                      onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                      placeholder="e.g., kyc_team"
                    />
                  </div>
                  <div>
                    <Label htmlFor="group-display">Display Name</Label>
                    <Input
                      id="group-display"
                      value={groupForm.displayName}
                      onChange={(e) => setGroupForm({ ...groupForm, displayName: e.target.value })}
                      placeholder="e.g., KYC Team"
                    />
                  </div>
                  <div>
                    <Label htmlFor="group-desc">Description</Label>
                    <Textarea
                      id="group-desc"
                      value={groupForm.description}
                      onChange={(e) => setGroupForm({ ...groupForm, description: e.target.value })}
                      placeholder="Describe the group's purpose"
                    />
                  </div>
                  <div>
                    <Label>Group Permissions</Label>
                    <div className="border rounded-lg p-4 space-y-4 max-h-64 overflow-y-auto">
                      {RESOURCES.map(resource => (
                        <div key={resource.value} className="space-y-2">
                          <div className="font-medium text-sm">{resource.label}</div>
                          <div className="grid grid-cols-4 gap-2">
                            {ACTIONS.map(action => (
                              <div key={action} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`group-${resource.value}-${action}`}
                                  checked={groupForm.permissions.some(p =>
                                    p.resource === resource.value && p.actions.includes(action)
                                  )}
                                  onCheckedChange={(checked) =>
                                    addPermissionToForm('group', resource.value, action, checked as boolean)
                                  }
                                />
                                <label
                                  htmlFor={`group-${resource.value}-${action}`}
                                  className="text-xs cursor-pointer"
                                >
                                  {action}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setGroupDialogOpen(false)}>Cancel</Button>
                  <Button onClick={createGroup}>Create Group</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map(group => (
              <Card key={group._id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{group.displayName}</CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteGroup(group._id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Members:</span>
                      <Badge>{group.memberCount || 0}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      <div className="font-medium mb-1">Permissions:</div>
                      {group.permissions.slice(0, 3).map((perm, idx) => (
                        <div key={idx}>• {perm.resource}: {perm.actions.join(', ')}</div>
                      ))}
                      {group.permissions.length > 3 && (
                        <div>+{group.permissions.length - 3} more...</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Role & Group Assignment</CardTitle>
              <CardDescription>Assign roles and add users to groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map(user => (
                  <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.fullName}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        {user.position && (
                          <div className="text-xs text-muted-foreground">{user.position}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {user.assignedRole && (
                        <Badge variant="outline">{user.assignedRole.displayName}</Badge>
                      )}
                      {user.groupCount > 0 && (
                        <Badge variant="secondary">{user.groupCount} group(s)</Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user)
                          setSelectedRoleId(user.assignedRole?._id || '')
                          setUserAssignDialogOpen(true)
                        }}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Assignment Dialog */}
      <Dialog open={userAssignDialogOpen} onOpenChange={setUserAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Role & Groups</DialogTitle>
            <DialogDescription>
              Manage role and group assignments for {selectedUser?.fullName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Assign Role</Label>
              <Select value={selectedRoleId} onValueChange={setSelectedRoleId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role._id} value={role._id}>
                      {role.displayName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Add to Groups</Label>
              <div className="space-y-2 mt-2">
                {groups.map(group => (
                  <div key={group._id} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{group.displayName}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => addUserToGroup(group._id)}
                    >
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserAssignDialogOpen(false)}>Cancel</Button>
            <Button onClick={assignRoleToUser}>Assign Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
