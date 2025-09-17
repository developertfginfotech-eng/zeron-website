import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react"
import { Notification } from "@shared/schema"
import { format } from "date-fns"

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead?: (id: string) => void
  onDelete?: (id: string) => void
}

export function NotificationCard({ notification, onMarkAsRead, onDelete }: NotificationCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <X className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    }
  }

  const handleMarkAsRead = () => {
    console.log('Mark as read triggered:', notification.id)
    onMarkAsRead?.(notification.id)
  }

  const handleDelete = () => {
    console.log('Delete notification triggered:', notification.id)
    onDelete?.(notification.id)
  }

  return (
    <Card 
      className={`${notification.isRead ? 'opacity-70' : ''} hover-elevate`}
      data-testid={`card-notification-${notification.id}`}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {getTypeIcon(notification.type)}
          <h4 className="font-semibold" data-testid={`text-title-${notification.id}`}>
            {notification.title}
          </h4>
          {!notification.isRead && (
            <Badge variant="secondary" className="text-xs">New</Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Badge 
            className={`${getTypeColor(notification.type)} text-xs`}
            data-testid={`badge-type-${notification.id}`}
          >
            {notification.type}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            data-testid={`button-delete-${notification.id}`}
            className="h-6 w-6"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground" data-testid={`text-message-${notification.id}`}>
          {notification.message}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground" data-testid={`text-date-${notification.id}`}>
            {format(new Date(notification.createdAt!), 'MMM dd, yyyy HH:mm')}
          </span>
          {!notification.isRead && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAsRead}
              data-testid={`button-mark-read-${notification.id}`}
            >
              Mark as Read
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}