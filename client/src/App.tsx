import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileLayout } from "@/components/mobile-layout";

// Admin Pages
import Dashboard from "@/pages/dashboard";
import Investors from "@/pages/investors";
import Properties from "@/pages/properties";
import Transactions from "@/pages/transactions";
import Documents from "@/pages/documents";
import Analytics from "@/pages/analytics";
import Notifications from "@/pages/notifications";
import Admin from "@/pages/admin";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

// Mobile Pages
import MobileDashboard from "@/pages/mobile/dashboard";
import MobileProperties from "@/pages/mobile/properties";
import MobilePortfolio from "@/pages/mobile/portfolio";
import MobileProfile from "@/pages/mobile/profile";

// Website Pages
import WebsiteHome from "@/pages/website/home";
import WebsiteInvest from "@/pages/website/invest";
import WebsiteAbout from "@/pages/website/about";
import WebsiteBusiness from "@/pages/website/business";
import WebsiteContact from "@/pages/website/contact";
import WebsiteLayout from "@/components/website-layout";

function AdminRouter() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/investors" component={Investors} />
      <Route path="/properties" component={Properties} />
      <Route path="/transactions" component={Transactions} />
      <Route path="/documents" component={Documents} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/admin" component={Admin} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function MobileRouter() {
  return (
    <Switch>
      <Route path="/mobile" component={MobileDashboard} />
      <Route path="/mobile/properties" component={MobileProperties} />
      <Route path="/mobile/portfolio" component={MobilePortfolio} />
      <Route path="/mobile/profile" component={MobileProfile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function WebsiteRouter() {
  return (
    <WebsiteLayout>
      <Switch>
        <Route path="/website" component={WebsiteHome} />
        <Route path="/website/invest" component={WebsiteInvest} />
        <Route path="/website/about" component={WebsiteAbout} />
        <Route path="/website/business" component={WebsiteBusiness} />
        <Route path="/website/contact" component={WebsiteContact} />
        <Route path="/" component={WebsiteHome} />
        <Route component={NotFound} />
      </Switch>
    </WebsiteLayout>
  );
}

export default function App() {
  const [location] = useLocation()
  const isMobile = location.startsWith('/mobile')
  const isWebsite = location === '/' || location.startsWith('/website')
  const isAdmin = !isMobile && !isWebsite

  // Custom sidebar width for better content display
  const style = {
    "--sidebar-width": "20rem",       // 320px for better navigation
    "--sidebar-width-icon": "4rem",   // default icon width
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="zaron-theme">
        <LanguageProvider defaultLanguage="en" storageKey="zaron-language">
          <TooltipProvider>
          {isMobile ? (
            // Mobile Layout for Investors
            <MobileLayout>
              <MobileRouter />
            </MobileLayout>
          ) : isWebsite ? (
            // Website Layout for Public
            <WebsiteRouter />
          ) : (
            // Admin Panel Layout
            <SidebarProvider style={style as React.CSSProperties}>
              <div className="flex h-screen w-full">
                <AppSidebar />
                <div className="flex flex-col flex-1">
                  <header className="flex items-center justify-between p-4 border-b border-sidebar-border/50 glass-card backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                      <SidebarTrigger 
                        className="hover:bg-primary/10 transition-colors duration-300" 
                        data-testid="button-sidebar-toggle" 
                      />
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <div className="text-sm font-medium bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent">
                          Zaron Admin Panel
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-muted-foreground/60">
                        {new Date().toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <ThemeToggle />
                    </div>
                  </header>
                  <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-primary/3 modern-scrollbar">
                    <AdminRouter />
                  </main>
                </div>
              </div>
            </SidebarProvider>
          )}
          <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}