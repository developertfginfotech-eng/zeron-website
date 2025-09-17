import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

// Pages
import Dashboard from "@/pages/dashboard";
import Users from "@/pages/users";
import Properties from "@/pages/properties";
import Transactions from "@/pages/transactions";
import Documents from "@/pages/documents";
import Analytics from "@/pages/analytics";
import Notifications from "@/pages/notifications";
import Admin from "@/pages/admin";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/users" component={Users} />
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

export default function App() {
  // Custom sidebar width for better content display
  const style = {
    "--sidebar-width": "20rem",       // 320px for better navigation
    "--sidebar-width-icon": "4rem",   // default icon width
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="zaron-theme">
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1">
                <header className="flex items-center justify-between p-4 border-b border-sidebar-border bg-background">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger data-testid="button-sidebar-toggle" />
                    <div className="text-sm text-muted-foreground">
                      Zaron Admin Panel
                    </div>
                  </div>
                  <ThemeToggle />
                </header>
                <main className="flex-1 overflow-auto bg-background">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}