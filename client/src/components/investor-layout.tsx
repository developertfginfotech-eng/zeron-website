import { ReactNode } from "react"
import { Link, useLocation } from "wouter"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import Logo from "@/components/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  LayoutDashboard, 
  Building, 
  PieChart, 
  User, 
  Wallet,
  Bell,
  Settings,
  LogOut,
  Shield,
  Menu,
  X,
  BookOpen
} from "lucide-react"
import { useState } from "react"

interface InvestorLayoutProps {
  children: ReactNode
}

export function InvestorLayout({ children }: InvestorLayoutProps) {
  const { user, logout } = useAuth()
  const [location, setLocation] = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setLocation('/')
  }

  const navigationItems = [
    { href: "/investor", icon: LayoutDashboard, label: "Dashboard", exact: true },
    { href: "/website/properties", icon: Building, label: "Properties" },
    { href: "/investor/portfolio", icon: PieChart, label: "Portfolio" },
    { href: "/investor/wallet", icon: Wallet, label: "Wallet" },
    { href: "/investor/investment-guide", icon: BookOpen, label: "Investment Guide" },
    { href: "/investor/profile", icon: User, label: "Profile" },
  ]

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return location === href
    }
    return location.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-blue-950" data-testid="investor-layout">
      {/* Enhanced Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm">
        <Logo size="small" showTagline={false} className="scale-75 -mx-3" />

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
            className="w-10 h-10 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b bg-card p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive(item.href, item.exact) ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex">
        {/* Enhanced Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 dark:lg:border-gray-700 lg:bg-white/80 dark:lg:bg-slate-900/80 lg:backdrop-blur-sm lg:shadow-xl">
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Logo */}
            <div className="flex justify-center px-6 py-6">
              <Logo size="medium" showTagline={false} />
            </div>

            {/* Enhanced User Info */}
            <div className="px-6 py-6">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-600 text-white font-semibold">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif font-semibold text-gray-900 dark:text-white truncate" data-testid="text-user-name">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user?.kycStatus === 'approved' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
                      }`}>
                        {user?.kycStatus === 'approved' ? '✓ Verified' : '⏳ Pending'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Navigation */}
            <nav className="flex-1 px-6 py-4 space-y-3">
              {navigationItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className={`group relative overflow-hidden rounded-xl transition-all duration-200 ${
                    isActive(item.href, item.exact) 
                      ? "bg-gradient-to-r from-emerald-500 to-blue-600 p-0.5 shadow-lg" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}>
                    <div className={`relative rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                      isActive(item.href, item.exact)
                        ? "bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isActive(item.href, item.exact)
                          ? "bg-gradient-to-br from-emerald-500 to-blue-600 text-white shadow-md"
                          : "bg-gray-100 dark:bg-gray-700 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/20"
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <span className={`font-medium transition-all duration-200 ${
                          isActive(item.href, item.exact) ? "font-semibold" : ""
                        }`} data-testid={`nav-${item.label.toLowerCase()}`}>
                          {item.label}
                        </span>
                      </div>
                      
                      {item.href === "/investor/profile" && user?.kycStatus !== 'approved' && (
                        <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/20 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                          !
                        </div>
                      )}
                      
                      {isActive(item.href, item.exact) && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Enhanced Bottom Actions */}
            <div className="p-6 space-y-3 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200" 
                  data-testid="button-notifications"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-3">
                    <Bell className="w-4 h-4 text-blue-600" />
                  </div>
                  Notifications
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 mt-2" 
                      data-testid="button-user-menu"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center mr-3">
                        <Settings className="w-4 h-4 text-emerald-600" />
                      </div>
                      Settings
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                    <DropdownMenuLabel className="font-serif font-semibold">Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      <Shield className="mr-2 h-4 w-4" />
                      Security
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-purple-50 dark:hover:bg-purple-900/20">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      data-testid="button-logout"
                      className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex-1">
          <div className="hidden lg:flex items-center justify-between px-8 py-6 border-b bg-card/50">
            <div>
              <h2 className="text-2xl font-bold capitalize">
                {location === '/investor' ? 'Dashboard' : location.split('/').pop()?.replace('-', ' ')}
              </h2>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setLocation('/investor/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <main className="p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}