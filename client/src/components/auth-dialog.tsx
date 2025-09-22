import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useTranslation } from "@/hooks/use-translation"
import { Eye, EyeOff, Lock, Mail, User, Phone } from "lucide-react"

// Zod schemas for form validation
const createLoginSchema = (t: (key: string) => string) => z.object({
  email: z.string().min(1, t("email_required")).email(t("email_invalid")),
  password: z.string().min(6, t("password_min_length")),
  remember: z.boolean().optional(),
})

const createRegisterSchema = (t: (key: string) => string) => z.object({
  firstName: z.string().min(2, t("first_name_min_length")),
  lastName: z.string().min(2, t("last_name_min_length")),
  email: z.string().min(1, t("email_required")).email(t("email_invalid")),
  phone: z.string().min(10, t("phone_min_length")).regex(/^\+?[1-9]\d{1,14}$/, t("phone_invalid")),
  password: z.string().min(8, t("password_min_length_register")).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, t("password_complexity")),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, t("terms_required")),
  shariah: z.boolean().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: t("password_mismatch"),
  path: ["confirmPassword"],
})

type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>
type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>

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

  const loginSchema = createLoginSchema(t)
  const registerSchema = createRegisterSchema(t)

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
      shariah: false,
    },
  })

  const handleLogin = (data: LoginFormData) => {
    console.log("Login data:", data)
    alert(`Login functionality coming soon! Email: ${data.email}`)
    setOpen(false)
  }

  const handleRegister = (data: RegisterFormData) => {
    console.log("Register data:", data)
    alert(`Registration functionality coming soon! Email: ${data.email}`)
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
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="investor@example.com"
                            className="pl-10"
                            data-testid="input-login-email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("password")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder={t("enter_password")}
                            className="pl-10 pr-10"
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <FormField
                    control={loginForm.control}
                    name="remember"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-remember"
                        />
                        <Label htmlFor="remember" className="text-sm">
                          {t("remember_me")}
                        </Label>
                      </div>
                    )}
                  />
                  <Button variant="ghost" className="p-0 h-auto text-sm" data-testid="link-forgot-password">
                    {t("forgot_password")}
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600"
                  disabled={loginForm.formState.isSubmitting}
                  data-testid="button-login-submit"
                >
                  {loginForm.formState.isSubmitting ? t("logging_in") + "..." : t("login")}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={registerForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("first_name")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder={t("first_name")}
                            className="pl-10"
                            data-testid="input-first-name"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("last_name")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            placeholder={t("last_name")}
                            className="pl-10"
                            data-testid="input-last-name"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={registerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="investor@example.com"
                          className="pl-10"
                          data-testid="input-register-email"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone_number")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type="tel"
                          placeholder="+966 50 123 4567"
                          className="pl-10"
                          data-testid="input-phone"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder={t("create_password")}
                          className="pl-10 pr-10"
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={registerForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("confirm_password")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={t("confirm_password")}
                          className="pl-10 pr-10"
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <FormField
                  control={registerForm.control}
                  name="terms"
                  render={({ field }) => (
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-terms"
                        className="mt-0.5"
                      />
                      <Label htmlFor="terms" className="text-sm leading-5">
                        {t("agree_to")} <Button variant="ghost" className="p-0 h-auto text-sm underline" data-testid="link-terms">{t("terms_conditions")}</Button> {t("and")} <Button variant="ghost" className="p-0 h-auto text-sm underline" data-testid="link-privacy">{t("privacy_policy")}</Button>
                      </Label>
                    </div>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="shariah"
                  render={({ field }) => (
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="shariah"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-shariah"
                        className="mt-0.5"
                      />
                      <Label htmlFor="shariah" className="text-sm leading-5">
                        {t("confirm_shariah_compliant")}
                      </Label>
                    </div>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600"
                disabled={registerForm.formState.isSubmitting}
                data-testid="button-register-submit"
              >
                {registerForm.formState.isSubmitting ? t("creating_account") + "..." : t("create_account")}
              </Button>
            </form>
          </Form>
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