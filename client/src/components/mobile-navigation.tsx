import { Link, useLocation } from "wouter"
import { Home, Building2, TrendingUp, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    href: "/mobile",
    label: "Home",
    icon: Home,
    testId: "nav-mobile-home"
  },
  {
    href: "/mobile/properties",
    label: "Properties",
    icon: Building2,
    testId: "nav-mobile-properties"
  },
  {
    href: "/mobile/portfolio",
    label: "Portfolio",
    icon: TrendingUp,
    testId: "nav-mobile-portfolio"
  },
  {
    href: "/mobile/profile",
    label: "Profile",
    icon: User,
    testId: "nav-mobile-profile"
  }
]

export function MobileNavigation() {
  const [location] = useLocation()

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
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[60px]",
                  isActive 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                data-testid={item.testId}
              >
                <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                <span className={cn("text-xs font-medium", isActive && "text-primary")}>
                  {item.label}
                </span>
              </button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}