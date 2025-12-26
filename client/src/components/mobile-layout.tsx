import { ReactNode } from "react"
import { MobileNavigation } from "./mobile-navigation"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"
import Logo from "./logo"
import { useTranslation } from "@/hooks/use-translation"

interface MobileLayoutProps {
  children: ReactNode
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between p-4">
          <Logo size="small" showTagline={false} />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Mobile Content */}
      <main className="p-4 pb-20">
        {children}
      </main>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  )
}