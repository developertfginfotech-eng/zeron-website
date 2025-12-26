import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/hooks/use-translation"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/hooks/use-auth"
import { AuthDialog } from "@/components/auth-dialog"
import Logo from "@/components/logo"
import { Languages, Globe, Flag, User, LogOut, BarChart3, Wallet } from "lucide-react"
import { Link, useLocation } from "wouter"

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "ur", name: "اردو" },
  { code: "hi", name: "हिंदी" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "bn", name: "বাংলা" },
  { code: "ml", name: "മലയാളം" },
] as const

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const { language, setLanguage } = useLanguage()
  const { user, logout, isAuthenticated } = useAuth()
  const [location] = useLocation()

  const navigation = [
    { name: "Invest", href: "/" },
    { name: t("about_us"), href: "/website/about" },
  ]

  const authenticatedNavigation = [
    { name: "Dashboard", href: "/investor/dashboard", icon: BarChart3 },
    { name: "Properties", href: "/website/properties", icon: Globe },
    { name: "Portfolio", href: "/investor/portfolio", icon: BarChart3 },
    { name: "Wallet", href: "/investor/wallet", icon: Wallet },
  ]

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return location === href
    }
    return location.startsWith(href)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-gray-200 dark:border-gray-700">
        <div className="w-full px-2">
          <div className="flex h-auto py-4 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center" data-testid="link-home">
              <img
                src="/images/Logo.png"
                alt="Zaron - Build Wealth Investment Platform"
                className="h-16 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-semibold transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${
                    isActive(item.href)
                      ? "text-teal-600 dark:text-teal-400"
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

              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* Authenticated Navigation */}
                  <div className="hidden lg:flex items-center space-x-4">
                    {authenticatedNavigation.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-base font-semibold text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1"
                          data-testid={`link-${item.name.toLowerCase()}`}
                        >
                          <Icon className="h-4 w-4" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>
                  
                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" data-testid="button-user-menu">
                        <User className="h-4 w-4" />
                        <span className="ml-2 hidden sm:inline">
                          {user?.firstName} {user?.lastName}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/investor/profile" data-testid="link-profile">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/investor/dashboard" data-testid="link-dashboard">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={logout}
                        className="text-red-600 dark:text-red-400"
                        data-testid="button-logout"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
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
      <footer className="relative border-t" style={{ backgroundColor: '#004743', borderColor: '#004743' }}>
        <div className="relative"  style={{ backgroundColor: '#004743' }}>
          <div className="w-full px-2 py-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

            {/* Quick Links */}
            <div className="md:col-span-2">
              <h3 className="font-bold mb-4 text-white text-lg">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/website/invest" className="transition-colors hover:opacity-80" style={{ color: '#efefef' }} data-testid="footer-link-invest">Start Investing</Link></li>
                <li><Link href="/website/about" className="transition-colors hover:opacity-80" style={{ color: '#efefef' }} data-testid="footer-link-about">{t("about_us")}</Link></li>
                <li><Link href="/website/business" className="transition-colors hover:opacity-80" style={{ color: '#efefef' }} data-testid="footer-link-business">{t("business_model")}</Link></li>
                <li><Link href="/website/properties" className="transition-colors hover:opacity-80" style={{ color: '#efefef' }} data-testid="footer-link-properties">Properties</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="md:col-span-2 md:ml-12">
              <h3 className="font-bold mb-4 text-white text-lg">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/website/contact" className="transition-colors hover:opacity-80" style={{ color: '#efefef' }} data-testid="footer-link-contact">Contact Us</Link></li>
                <li><a href="#" className="transition-colors hover:opacity-80" style={{ color: '#efefef' }} data-testid="footer-link-help">Help Center</a></li>
                <li><a href="#" className="transition-colors hover:opacity-80" style={{ color: '#efefef' }} data-testid="footer-link-faq">FAQ</a></li>
                <li><a href="#" className="transition-colors hover:opacity-80" style={{ color: '#efefef' }} data-testid="footer-link-terms">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Phone Mockup Center */}
            <div className="md:col-span-4 flex justify-center items-center">
              <div className="relative w-48 mx-auto">
                <div className="bg-gradient-to-b rounded-[2.5rem] p-1 shadow-2xl" style={{ borderColor: '#efefef', borderWidth: '3px', borderStyle: 'solid' }}>
                  <div className="rounded-[2rem] h-80 flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#004743' }}>
                    {/* Logo circular variant */}
                    <Logo variant="circular" showTagline={false} />
                    {/* Decorative gold arrow */}
                    <div className="absolute bottom-20 right-8">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <path d="M10 30L30 10M30 10H15M30 10V25" stroke="#d0ac00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 rounded-b-2xl" style={{ backgroundColor: '#1a1a1a' }}></div>
              </div>
            </div>

            {/* Download App */}
            <div className="md:col-span-4">
              <h3 className="font-bold mb-4 text-white text-lg">Download App</h3>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: '#efefef' }}>
                Get the Zaron mobile app for the best investment experience.
              </p>
              <div className="flex gap-6 mb-6">
                {/* Google Play Store */}
                <a href="#" className="transition-transform hover:scale-110">
                  <svg width="65" height="65" viewBox="0 0 65 65" fill="none">
                    <path d="M5 5.5C5 3.29 6.79 1.5 9 1.5C9.65 1.5 10.3 1.67 10.86 1.98L50.86 25.98C52.37 26.85 52.37 29.15 50.86 30.02L48 31.8L5 5.5Z" fill="#d0ac00"/>
                    <path d="M5 59.5V5.5L48 35.5L5 59.5Z" fill="#d0ac00"/>
                    <path d="M5 59.5L48 35.5L50.86 37.28C52.37 38.15 52.37 40.45 50.86 41.32L10.86 63.32C9.39 64.19 7.5 63.17 7.15 61.48C7.05 61.01 5 60.51 5 59.5Z" fill="#d0ac00"/>
                    <path d="M48 35.5L50.86 37.28L10.86 59.28C10.3 59.59 9.65 59.76 9 59.76C7.79 59.76 6.67 59.09 6 58.04L48 35.5Z" fill="#d0ac00"/>
                  </svg>
                </a>
                {/* Apple App Store */}
                <a href="#" className="transition-transform hover:scale-110">
                  <svg width="65" height="65" viewBox="0 0 65 65" fill="none">
                    <path d="M39.5 8C41.76 8 43.9 7.12 45.39 5.45C46.75 3.93 47.74 1.8 47.51 0C45.48 0.075 43.19 1.17 41.75 2.85C40.43 4.39 39.29 6.57 39.54 8.71C39.78 8.73 40.08 8.73 40.5 8.73C40.83 8.73 41.17 8.62 41.5 8.54C40.94 8.36 40.25 8.18 39.5 8ZM50.41 31.65C50.38 27.71 52.52 24.84 54.93 23.27C53.44 21.23 51.19 19.89 48.46 19.42C45.91 18.97 43.06 20.73 41.72 20.73C40.34 20.73 37.73 19.47 35.47 19.52C32.54 19.57 29.8 21.13 28.42 23.58C25.58 28.64 27.75 36.17 30.64 40.51C32.08 42.65 33.78 45.05 35.97 44.96C38.11 44.87 38.9 43.66 41.52 43.66C44.12 43.66 44.84 44.96 47.15 44.91C49.54 44.87 50.99 42.75 52.36 40.59C54.05 38.11 54.7 35.7 54.74 35.58C54.68 35.56 50.44 33.92 50.41 31.65Z" fill="#d0ac00"/>
                  </svg>
                </a>
              </div>
              <div className="flex gap-4">
                {/* Facebook */}
                <a href="#" className="transition-transform hover:scale-110">
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <circle cx="25" cy="25" r="25" fill="#efefef"/>
                    <path d="M28 26.5H30.5L31.5 22H28V19.5C28 18.47 28 17.5 30 17.5H31.5V13.74C31.174 13.696 29.943 13.5 28.643 13.5C25.928 13.5 24 15.243 24 18.6V22H20.5V26.5H24V36.5H28V26.5Z" fill="#004743"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="transition-transform hover:scale-110">
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <circle cx="25" cy="25" r="25" fill="#efefef"/>
                    <path d="M25 18C21.134 18 18 21.134 18 25C18 28.866 21.134 32 25 32C28.866 32 32 28.866 32 25C32 21.134 28.866 18 25 18ZM25 29.5C22.519 29.5 20.5 27.481 20.5 25C20.5 22.519 22.519 20.5 25 20.5C27.481 20.5 29.5 22.519 29.5 25C29.5 27.481 27.481 29.5 25 29.5ZM32.2 16.3C31.4 16.3 30.8 16.9 30.8 17.7C30.8 18.5 31.4 19.1 32.2 19.1C33 19.1 33.6 18.5 33.6 17.7C33.6 16.9 33 16.3 32.2 16.3ZM36.9 19.1C36.8 17.4 36.4 15.9 35.2 14.7C34 13.5 32.5 13.1 30.8 13C29.1 12.9 20.9 12.9 19.2 13C17.5 13.1 16 13.5 14.8 14.7C13.6 15.9 13.2 17.4 13.1 19.1C13 20.8 13 29 13.1 30.7C13.2 32.4 13.6 33.9 14.8 35.1C16 36.3 17.5 36.7 19.2 36.8C20.9 36.9 29.1 36.9 30.8 36.8C32.5 36.7 34 36.3 35.2 35.1C36.4 33.9 36.8 32.4 36.9 30.7C37 29 37 20.8 36.9 19.1ZM34.4 32.6C34 33.7 33.2 34.5 32.1 34.9C30.7 35.2 27.5 35.1 25 35.1C22.5 35.1 19.3 35.2 17.9 34.9C16.8 34.5 16 33.7 15.6 32.6C15.3 31.2 15.4 28 15.4 25.5C15.4 23 15.3 19.8 15.6 18.4C16 17.3 16.8 16.5 17.9 16.1C19.3 15.8 22.5 15.9 25 15.9C27.5 15.9 30.7 15.8 32.1 16.1C33.2 16.5 34 17.3 34.4 18.4C34.7 19.8 34.6 23 34.6 25.5C34.6 28 34.7 31.2 34.4 32.6Z" fill="#004743"/>
                  </svg>
                </a>
              </div>
            </div>
            </div>

            <div className="mt-10 pt-8 text-center text-sm" style={{ borderTop: '1px solid #18605c', color: '#efefef' }}>
              <p>© 2025 Zaron. All rights reserved. Licensed and regulated in Saudi Arabia.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}