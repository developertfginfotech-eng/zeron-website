import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  kycStatus: 'not_started' | 'in_progress' | 'pending_review' | 'approved' | 'rejected';
  kycCurrentStep?: number;
  kycCompletedSteps?: number[];
  applicationProgress?: number;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('zaron_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Listen for user data updates
  useEffect(() => {
    const handleUserDataUpdate = (event: any) => {
      const updatedUser = event.detail;
      if (updatedUser) {
        setUser(updatedUser);
      }
    };

    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('zaron_user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    // Listen to custom user data update events
    window.addEventListener('userDataUpdated', handleUserDataUpdate);
    // Listen to storage events (from other tabs)
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zaron_user');
    localStorage.removeItem('zaron_token');
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
  };

  const setUserAndStore = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('zaron_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('zaron_user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser: setUserAndStore,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}