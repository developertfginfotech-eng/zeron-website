import { ReactNode } from "react"
import { MobileNavigation } from "./mobile-navigation"
import { ThemeToggle } from "./theme-toggle"

interface MobileLayoutProps {
  children: ReactNode
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div className="text-lg font-bold bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent">
              Zaron
            </div>
          </div>
          <ThemeToggle />
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