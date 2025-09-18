import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useTranslation } from "@/hooks/use-translation"

const languages = [
  { code: "en", flag: "🇺🇸", name: "english" },
  { code: "ar", flag: "🇸🇦", name: "arabic" },
  { code: "hi", flag: "🇮🇳", name: "hindi" }
] as const

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9"
          data-testid="button-language-switcher"
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 ${language === lang.code ? 'bg-accent' : ''}`}
            data-testid={`language-option-${lang.code}`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="flex-1">{t(lang.name as keyof typeof import("@/lib/translations").translations.en)}</span>
            {language === lang.code && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}