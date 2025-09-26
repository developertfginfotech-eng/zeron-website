import { useState, useEffect } from 'react';
import { useAuth } from './use-auth';

interface Notification {
  id: string;
  type: 'registration_success' | 'kyc_submitted' | 'kyc_approved' | 'kyc_rejected' | 'investment' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  userId: string;
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
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

    const userNotifications = getUserNotifications();
    const unreadNotifications = userNotifications.filter(n => !n.isRead);

    setNotifications(userNotifications);
    setUnreadCount(unreadNotifications.length);
  }, [user]);

  return {
    notifications,
    unreadCount
  };
};