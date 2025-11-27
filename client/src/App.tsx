import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { AuthProvider } from "@/hooks/use-auth";

// Website Pages
import WebsiteInvest from "@/pages/website/invest";
import WebsiteProperties from "@/pages/website/properties";
import WebsiteAbout from "@/pages/website/about";
import WebsiteBusiness from "@/pages/website/business";
import WebsiteContact from "@/pages/website/contact";
import WebsiteLayout from "@/components/website-layout";
import KYCVerificationPage from "@/pages/kyc-verification";
import UserDashboard from "@/pages/user-dashboard";
import UserNotificationPage from "@/pages/user-notifications";

// Investor Dashboard Pages
import InvestorDashboard from "@/pages/investor/dashboard";
import InvestorPortfolio from "@/pages/investor/portfolio";
import InvestorProfile from "@/pages/investor/profile";
import InvestorWallet from "@/pages/investor/wallet";
import InvestmentGuide from "@/pages/investor/investment-guide";
import InvestorProperties from "@/pages/investor/properties";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="zaron-theme">
        <LanguageProvider defaultLanguage="en" storageKey="zaron-language">
          <AuthProvider>
            <TooltipProvider>
              <WebsiteLayout>
                <Switch>
                  <Route path="/invest" component={WebsiteInvest} />
                  <Route path="/website" component={WebsiteInvest} />
                  <Route path="/website/invest" component={WebsiteInvest} />
                  <Route path="/website/properties" component={WebsiteProperties} />
                  <Route path="/website/about" component={WebsiteAbout} />
                  <Route path="/website/business" component={WebsiteBusiness} />
                  <Route path="/website/contact" component={WebsiteContact} />
                  <Route path="/kyc-verification" component={KYCVerificationPage} />
                  <Route path="/kyc" component={KYCVerificationPage} />
                  <Route path="/user-dashboard" component={UserDashboard} />
                  <Route path="/investor/dashboard" component={InvestorDashboard} />
                  <Route path="/investor/portfolio" component={InvestorPortfolio} />
                  <Route path="/investor/properties" component={InvestorProperties} />
                  <Route path="/investor/profile" component={InvestorProfile} />
                  <Route path="/investor/wallet" component={InvestorWallet} />
                  <Route path="/investor/guide" component={InvestmentGuide} />
                  <Route path="/user-notifications" component={UserNotificationPage} />
                  <Route path="/" component={WebsiteInvest} />
                  <Route component={NotFound} />
                </Switch>
              </WebsiteLayout>
              <Toaster />
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
