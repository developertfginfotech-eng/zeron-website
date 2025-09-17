import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NotificationCard } from "@/components/notification-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Send, Bookmark } from "lucide-react"
import { Notification } from "@shared/schema"
import { useToast } from "@/hooks/use-toast"

export default function Notifications() {
  // todo: remove mock functionality
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info'
  })

  const { toast } = useToast()

  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'New Property Added',
      message: 'A new luxury apartment complex has been added to the platform and is now available for investment.',
      type: 'info',
      isRead: false,
      createdAt: new Date('2024-01-15T10:30:00'),
    },
    {
      id: '2',
      title: 'KYC Approved',
      message: 'Ahmed Al-Rashid\'s KYC verification has been successfully approved and they can now start investing.',
      type: 'success',
      isRead: false,
      createdAt: new Date('2024-01-14T15:45:00'),
    },
    {
      id: '3',
      title: 'Payment Failed',
      message: 'Investment payment for Property #2847 failed due to insufficient funds. Please review the transaction.',
      type: 'error',
      isRead: true,
      createdAt: new Date('2024-01-13T09:15:00'),
    },
    {
      id: '4',
      title: 'Document Review Required',
      message: 'Multiple KYC documents are pending review. Please check the Users & KYC section.',
      type: 'warning',
      isRead: false,
      createdAt: new Date('2024-01-12T14:20:00'),
    },
    {
      id: '5',
      title: 'Monthly Payout Processed',
      message: 'Monthly rental payouts have been successfully processed for all active investments.',
      type: 'success',
      isRead: true,
      createdAt: new Date('2024-01-11T11:00:00'),
    },
    {
      id: '6',
      title: 'New User Registration',
      message: 'Sarah Johnson has successfully registered and completed the onboarding process.',
      type: 'info',
      isRead: false,
      createdAt: new Date('2024-01-10T16:30:00'),
    },
  ]

  const unreadCount = mockNotifications.filter(n => !n.isRead).length

  const handleMarkAsRead = (id: string) => {
    console.log('Marked as read:', id)
    // In real app, this would update the notification status
  }

  const handleDelete = (id: string) => {
    console.log('Deleted notification:', id)
    // In real app, this would delete the notification
  }

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read triggered')
    toast({
      title: "All Notifications Marked as Read",
      description: "All notifications have been marked as read.",
    })
  }

  const handleCreateNotification = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Create notification:', newNotification)
    
    toast({
      title: "Notification Sent",
      description: "Your notification has been sent to all users.",
    })
    
    setNewNotification({ title: '', message: '', type: 'info' })
    setShowCreateForm(false)
  }

  return (
    <div className="p-6 space-y-6" data-testid="page-notifications">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-notifications-title">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} unread
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Manage system notifications and send announcements</p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead} data-testid="button-mark-all-read">
              <Bookmark className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
          <Button onClick={() => setShowCreateForm(!showCreateForm)} data-testid="button-create-notification">
            <Plus className="h-4 w-4 mr-2" />
            Create Notification
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card data-testid="card-total-notifications">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockNotifications.length}
            </div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-unread-notifications">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unread
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {unreadCount}
            </div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-system-alerts">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockNotifications.filter(n => n.type === 'error').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Critical issues
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-warnings">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockNotifications.filter(n => n.type === 'warning').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Need review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Create Notification Form */}
      {showCreateForm && (
        <Card data-testid="card-create-notification">
          <CardHeader>
            <CardTitle>Create New Notification</CardTitle>
            <CardDescription>Send a notification to all platform users</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateNotification} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input
                    id="title"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter notification title"
                    required
                    data-testid="input-notification-title"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium">Type</label>
                  <Select value={newNotification.type} onValueChange={(value) => setNewNotification(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger data-testid="select-notification-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <Textarea
                  id="message"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter notification message"
                  rows={3}
                  required
                  data-testid="textarea-notification-message"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" data-testid="button-send-notification">
                  <Send className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)} data-testid="button-cancel-notification">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Notifications</h2>
        {mockNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}