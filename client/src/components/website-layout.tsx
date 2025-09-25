import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/hooks/use-translation"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/hooks/use-auth" // Add this import
import { AuthDialog } from "@/components/auth-dialog"
import { Languages, Globe, Flag, User, LogOut, Settings, BarChart3 } from "lucide-react"
import { Link, useLocation } from "wouter"

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "ur", name: "اردو" },
  { code: "hi", name: "हिंदी" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "bn", name: "বাংলা" },
  { code: "ml", name: "മলയাളം" },
] as const

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()
  const [location] = useLocation()
  
  // Use the auth hook instead of local state
  const { user, isLoading, logout, isAuthenticated } = useAuth()

  const navigation = [
    { name: "Invest", href: "/website/invest" },
    { name: t("about_us"), href: "/website/about" },
  ]

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return location === href
    }
    return location.startsWith(href)
  }

  const handleLogout = () => {
    logout()
    // Optional: redirect to home page with client-side routing
    window.location.href = '/website/invest'
  }

  // Show loading state if checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-6">
            <div className="flex h-16 items-center justify-between">
              <Link href="/website/invest">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    Zaron
                  </span>
                </div>
              </Link>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/website/invest" data-testid="link-home">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Zaron
                </span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.href) 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  }`}
                  data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" data-testid="button-language-switcher">
                    <Languages className="h-4 w-4" />
                    <span className="ml-2 hidden sm:inline">
                      {languages.find(l => l.code === language)?.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={language === lang.code ? "bg-accent" : ""}
                      data-testid={`option-language-${lang.code}`}
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Conditional Auth Buttons or User Menu */}
              {isAuthenticated && user ? (
                // User is logged in - show user menu
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2" data-testid="button-user-menu">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                          <User className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                      <span className="hidden sm:inline font-medium max-w-24 truncate">
                        {user.name}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/user-dashboard" data-testid="menu-dashboard">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/kyc-verification" data-testid="menu-kyc">
                        <User className="mr-2 h-4 w-4" />
                        KYC Verification
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/user-settings" data-testid="menu-settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                      data-testid="button-logout"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // User is not logged in - show auth buttons
                <div className="flex items-center space-x-2">
                  <AuthDialog defaultTab="login">
                    <Button variant="ghost" data-testid="button-login">
                      {t("login")}
                    </Button>
                  </AuthDialog>
                  <AuthDialog defaultTab="register">
                    <Button data-testid="button-register">
                      {t("register_now")}
                    </Button>
                  </AuthDialog>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 bg-gradient-to-r from-blue-600 to-emerald-600 rounded flex items-center justify-center">
                  <Globe className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold">Zaron</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The premier platform for real estate investment in Saudi Arabia's growing market.
              </p>
              <div className="flex space-x-4">
                <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                  {t("shariah_compliant")}
                </span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                  {t("vision_2030")}
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/website/invest" className="text-muted-foreground hover:text-primary" data-testid="footer-link-invest">Start Investing</Link></li>
                <li><Link href="/website/about" className="text-muted-foreground hover:text-primary" data-testid="footer-link-about">{t("about_us")}</Link></li>
                <li><Link href="/website/business" className="text-muted-foreground hover:text-primary" data-testid="footer-link-business">{t("business_model")}</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary" data-testid="footer-link-properties">Properties</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/website/contact" className="text-muted-foreground hover:text-primary" data-testid="footer-link-contact">{t("contact_us")}</Link></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary" data-testid="footer-link-help">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary" data-testid="footer-link-faq">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary" data-testid="footer-link-terms">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Download App */}
            <div>
              <h3 className="font-semibold mb-4">{t("download_app")}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the Zaron mobile app for the best investment experience.
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full" data-testid="button-download-ios">
                  Download for iOS
                </Button>
                <Button variant="outline" size="sm" className="w-full" data-testid="button-download-android">
                  Download for Android
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Zaron. All rights reserved. Licensed and regulated in Saudi Arabia.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}