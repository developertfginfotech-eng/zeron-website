import { useLanguage } from "@/components/language-provider"
import { translations, type TranslationKey } from "@/lib/translations"

type TranslationParams = Record<string, string | number>

// Every language other than `en` is allowed to be partially translated; anything
// missing falls back to English so the UI never renders a raw key.
type Dictionary = Partial<Record<TranslationKey, string>>

const interpolate = (template: string, params?: TranslationParams): string => {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    name in params ? String(params[name]) : match
  )
}

export function useTranslation() {
  const { language, isRTL } = useLanguage()

  const dictionaries = translations as Record<string, Dictionary>

  const t = (key: TranslationKey, params?: TranslationParams): string => {
    const value = dictionaries[language]?.[key] ?? translations.en[key] ?? key
    return interpolate(value, params)
  }

  return { t, language, isRTL }
}
