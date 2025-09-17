import { NotificationCard } from '../notification-card'
import { Notification } from '@shared/schema'

// todo: remove mock functionality
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
]

export default function NotificationCardExample() {
  const handleMarkAsRead = (id: string) => {
    console.log('Marked as read:', id)
  }

  const handleDelete = (id: string) => {
    console.log('Deleted notification:', id)
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Notifications</h3>
      <div className="space-y-3">
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