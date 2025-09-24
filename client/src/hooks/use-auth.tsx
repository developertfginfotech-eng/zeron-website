import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;
  kycStatus?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('zaron_token') // Match your token key
        const userData = localStorage.getItem('zaron_user') // Match your user key
        
        if (token && userData && isMounted) {
          const parsedUser = JSON.parse(userData)
          const formattedUser = {
            id: parsedUser.id || parsedUser._id,
            name: `${parsedUser.firstName} ${parsedUser.lastName}`,
            email: parsedUser.email,
            firstName: parsedUser.firstName,
            lastName: parsedUser.lastName,
            kycStatus: parsedUser.kycStatus,
            avatar: parsedUser.avatar
          }
          setUser(formattedUser)
        }
      } catch (error) {
        console.error('Error parsing auth data:', error)
        localStorage.removeItem('zaron_token')
        localStorage.removeItem('zaron_user')
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    initializeAuth()

    return () => {
      isMounted = false
    }
  }, [])

  const login = (userData: User, token: string) => {
    localStorage.setItem('zaron_token', token)
    localStorage.setItem('authToken', token) // For WebsiteLayout compatibility
    localStorage.setItem('userData', JSON.stringify(userData)) // For WebsiteLayout compatibility
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('zaron_token')
    localStorage.removeItem('zaron_user')
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    setUser(null)
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}