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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = location === item.href || (item.href !== "/mobile" && location.startsWith(item.href))
          
          return (
            <Link key={item.href} href={item.href}>
              <button
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[60px] hover-elevate",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                data-testid={item.testId}
              >
                <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                <span className={cn("text-xs font-medium", isActive && "text-primary")}>
                  {t(item.labelKey)}
                </span>
              </button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}