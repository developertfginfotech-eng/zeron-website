import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  CheckCircle,
  UserPlus,
  Shield,
  AlertCircle,
  Clock,
  Eye,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

interface Notification {
  id: string;
  type: 'registration_success' | 'kyc_submitted' | 'kyc_approved' | 'kyc_rejected' | 'investment' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  userId: string;
}

const UserNotificationPage = () => {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Get real user notifications based on their actions and status
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const getUserNotifications = (): Notification[] => {
      const userNotifications: Notification[] = [];
      const currentTime = new Date();

      // 1. Registration notification (always add for registered users)
      userNotifications.push({
        id: 'registration_' + user.id,
        type: 'registration_success',
        title: 'Welcome to Zaron!',
        message: 'Your account has been successfully created. Complete KYC verification to start investing.',
        timestamp: user.createdAt || new Date(currentTime.getTime() - 24 * 60 * 60 * 1000).toISOString(),
        isRead: false,
        userId: user.id
      });

      // 2. KYC related notifications based on user's KYC status
      const kycStatus = user.kycStatus || 'not_submitted';

      if (kycStatus === 'submitted' || kycStatus === 'under_review') {
        userNotifications.push({
          id: 'kyc_submitted_' + user.id,
          type: 'kyc_submitted',
          title: 'KYC Verification Submitted',
          message: 'Your KYC verification documents have been submitted for review. We will notify you once approved.',
          timestamp: user.kycSubmittedAt || new Date(currentTime.getTime() - 12 * 60 * 60 * 1000).toISOString(),
          isRead: true,
          userId: user.id
        });
      }

      if (kycStatus === 'approved' || kycStatus === 'completed') {
        userNotifications.push({
          id: 'kyc_approved_' + user.id,
          type: 'kyc_approved',
          title: 'KYC Verification Approved! 🎉',
          message: 'Congratulations! Your KYC verification has been approved. You can now start investing in properties.',
          timestamp: user.kycApprovedAt || new Date(currentTime.getTime() - 2 * 60 * 60 * 1000).toISOString(),
          isRead: false,
          userId: user.id
        });
      }

      if (kycStatus === 'rejected') {
        userNotifications.push({
          id: 'kyc_rejected_' + user.id,
          type: 'kyc_rejected',
          title: 'KYC Verification Needs Attention',
          message: 'Your KYC verification needs additional information. Please check your documents and resubmit.',
          timestamp: user.kycRejectedAt || new Date(currentTime.getTime() - 1 * 60 * 60 * 1000).toISOString(),
          isRead: false,
          userId: user.id
        });
      }

      // Sort by timestamp (newest first)
      return userNotifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    };

    setTimeout(() => {
      setNotifications(getUserNotifications());
      setLoading(false);
    }, 500);
  }, [user]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'registration_success':
        return <UserPlus className="w-5 h-5 text-blue-600" />;
      case 'kyc_submitted':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'kyc_approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'kyc_rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'investment':
        return <Shield className="w-5 h-5 text-emerald-600" />;
      case 'system':
        return <Bell className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'registration_success':
        return 'bg-blue-50 border-blue-200';
      case 'kyc_submitted':
        return 'bg-orange-50 border-orange-200';
      case 'kyc_approved':
        return 'bg-green-50 border-green-200';
      case 'kyc_rejected':
        return 'bg-red-50 border-red-200';
      case 'investment':
        return 'bg-emerald-50 border-emerald-200';
      case 'system':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAsUnread = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: false }
          : notification
      )
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/user-dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </h1>
              <p className="text-sm text-muted-foreground">
                Stay updated with platform activities
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {notifications.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                You're all caught up! New notifications will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-all duration-200 hover:shadow-md ${
                  notification.isRead ? 'opacity-75' : getNotificationColor(notification.type)
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(notification.timestamp)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => notification.isRead ? markAsUnread(notification.id) : markAsRead(notification.id)}
                        className="h-8 w-8 p-0"
                      >
                        {notification.isRead ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserNotificationPage;