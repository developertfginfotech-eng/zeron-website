import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useTranslation } from "@/hooks/use-translation"
import { Eye, EyeOff, Lock, Mail, User, Phone } from "lucide-react"

interface AuthDialogProps {
  children: React.ReactNode
  defaultTab?: "login" | "register"
}

export function AuthDialog({ children, defaultTab = "login" }: AuthDialogProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleSubmit = (e: React.FormEvent, type: "login" | "register") => {
    e.preventDefault()
    alert(`${type === "login" ? "Login" : "Registration"} functionality coming soon! This will integrate with the backend authentication system.`)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            {t("welcome_to_zaron")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {t("join_thousands_investors")}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" data-testid="tab-login">{t("login")}</TabsTrigger>
            <TabsTrigger value="register" data-testid="tab-register">{t("register")}</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">{t("email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="login-email"
                    type="email"
                    placeholder="investor@example.com"
                    className="pl-10"
                    required
                    data-testid="input-login-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">{t("password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("enter_password")}
                    className="pl-10 pr-10"
                    required
                    data-testid="input-login-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" data-testid="checkbox-remember" />
                  <Label htmlFor="remember" className="text-sm">{t("remember_me")}</Label>
                </div>
                <Button variant="ghost" className="p-0 h-auto text-sm" data-testid="link-forgot-password">
                  {t("forgot_password")}
                </Button>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-blue-600" data-testid="button-login-submit">
                {t("login")}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form onSubmit={(e) => handleSubmit(e, "register")} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">{t("first_name")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="first-name"
                      placeholder={t("first_name")}
                      className="pl-10"
                      required
                      data-testid="input-first-name"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">{t("last_name")}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="last-name"
                      placeholder={t("last_name")}
                      className="pl-10"
                      required
                      data-testid="input-last-name"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">{t("email")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="register-email"
                    type="email"
                    placeholder="investor@example.com"
                    className="pl-10"
                    required
                    data-testid="input-register-email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t("phone_number")}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="phone"
                    type="tel"
                    placeholder="+966 50 123 4567"
                    className="pl-10"
                    required
                    data-testid="input-phone"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">{t("password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("create_password")}
                    className="pl-10 pr-10"
                    required
                    data-testid="input-register-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="button-toggle-register-password"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t("confirm_password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t("confirm_password")}
                    className="pl-10 pr-10"
                    required
                    data-testid="input-confirm-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    data-testid="button-toggle-confirm-password"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" required data-testid="checkbox-terms" className="mt-0.5" />
                  <Label htmlFor="terms" className="text-sm leading-5">
                    {t("agree_to")} <Button variant="ghost" className="p-0 h-auto text-sm underline" data-testid="link-terms">{t("terms_conditions")}</Button> {t("and")} <Button variant="ghost" className="p-0 h-auto text-sm underline" data-testid="link-privacy">{t("privacy_policy")}</Button>
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="shariah" data-testid="checkbox-shariah" className="mt-0.5" />
                  <Label htmlFor="shariah" className="text-sm leading-5">
                    {t("confirm_shariah_compliant")}
                  </Label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-blue-600" data-testid="button-register-submit">
                {t("create_account")}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2 justify-center">
            <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs">
              {t("shariah_compliant")}
            </span>
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs">
              {t("sama_regulated")}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}