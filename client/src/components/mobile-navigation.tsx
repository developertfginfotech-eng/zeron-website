import { useState, useEffect } from "react"
import { Link, useLocation } from "wouter"
import { Home, Building2, TrendingUp, User, MessageSquare, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"

const navigationItems = [
  {
    href: "/mobile",
    labelKey: "home" as const,
    icon: Home,
    testId: "nav-mobile-home"
  },
  {
    href: "/mobile/properties",
    labelKey: "properties" as const,
    icon: Building2,
    testId: "nav-mobile-properties"
  },
  {
    href: "/mobile/chat",
    labelKey: "chat" as const,
    icon: MessageSquare,
    testId: "nav-mobile-chat"
  },
  {
    href: "/mobile/ai-advisor",
    labelKey: "ai_advisor" as const,
    icon: Bot,
    testId: "nav-mobile-ai-advisor"
  },
  {
    href: "/mobile/profile",
    labelKey: "profile" as const,
    icon: User,
    testId: "nav-mobile-profile"
  }
]

export function MobileNavigation() {
  const [location] = useLocation()
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Auto-hide navigation on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Hide when scrolling down
      } else {
        setIsVisible(true) // Show when scrolling up
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Update active index based on location
  useEffect(() => {
    const currentIndex = navigationItems.findIndex(item => 
      location === item.href || (item.href !== "/mobile" && location.startsWith(item.href))
    )
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex)
    }
  }, [location])

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
      isVisible ? "translate-y-0" : "translate-y-full"
    )}>
      {/* Premium glassmorphism background */}
      <div className="bg-background/95 backdrop-blur-xl border-t border-border/50 shadow-2xl">
        {/* Active indicator line */}
        <div 
          className="absolute top-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full transition-all duration-300 ease-out shadow-lg"
          style={{
            left: `${(activeIndex * 100) / navigationItems.length}%`,
            width: `${100 / navigationItems.length}%`,
            transform: 'translateX(25%) scaleX(0.5)'
          }}
        />
        
        <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
          {navigationItems.map((item, index) => {
            const Icon = item.icon
            const isActive = location === item.href || (item.href !== "/mobile" && location.startsWith(item.href))
            
            return (
              <Link key={item.href} href={item.href}>
                <button
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 min-w-[70px] relative overflow-hidden group",
                    "hover:scale-105 active:scale-95",
                    isActive 
                      ? "text-primary bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 shadow-lg border border-primary/20" 
                      : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-br hover:from-muted/80 hover:to-muted/40 hover:shadow-md"
                  )}
                  data-testid={item.testId}
                  onTouchStart={() => {
                    // Haptic feedback simulation with visual feedback
                    const button = document.querySelector(`[data-testid="${item.testId}"]`) as HTMLElement
                    if (button) {
                      button.style.transform = 'scale(0.95)'
                      setTimeout(() => {
                        button.style.transform = ''
                      }, 150)
                    }
                  }}
                >
                  {/* Ripple effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-200 rounded-2xl" />
                  
                  {/* Icon with enhanced styling */}
                  <div className={cn(
                    "relative z-10 p-1 rounded-lg transition-all duration-300",
                    isActive && "bg-primary/10 shadow-sm"
                  )}>
                    <Icon className={cn(
                      "h-6 w-6 transition-all duration-300", 
                      isActive ? "text-primary drop-shadow-sm" : "group-hover:scale-110"
                    )} />
                  </div>
                  
                  {/* Label with enhanced typography */}
                  <span className={cn(
                    "text-xs font-semibold transition-all duration-300 relative z-10", 
                    isActive ? "text-primary drop-shadow-sm" : "group-hover:font-bold"
                  )}>
                    {t(item.labelKey)}
                  </span>
                  
                  {/* Active indicator dot */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-lg animate-pulse" />
                  )}
                </button>
              </Link>
            )
          })}
        </div>
        
        {/* Premium bottom safe area */}
        <div className="h-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      </div>
    </div>
  )
}