import { createContext, useContext, useEffect, useState } from "react"

/**
 * Single source of truth for the languages the site offers.
 *
 * To add a language: add an entry here and a matching block in
 * `client/src/lib/translations.ts`. Both language switchers, the `<html lang>`
 * attribute and RTL handling pick it up automatically. Any string not yet
 * translated falls back to English, so a partial block is safe to ship.
 */
export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸", rtl: false },
  { code: "ar", name: "العربية", flag: "🇸🇦", rtl: true },
  { code: "ur", name: "اردو", flag: "🇵🇰", rtl: true },
  { code: "hi", name: "हिंदी", flag: "🇮🇳", rtl: false },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳", rtl: false },
  { code: "bn", name: "বাংলা", flag: "🇧🇩", rtl: false },
  { code: "ml", name: "മലയാളം", flag: "🇮🇳", rtl: false },
] as const

export type Language = (typeof SUPPORTED_LANGUAGES)[number]["code"]

const LANGUAGE_CODES = SUPPORTED_LANGUAGES.map((l) => l.code) as readonly string[]
const RTL_LANGUAGES = SUPPORTED_LANGUAGES.filter((l) => l.rtl).map((l) => l.code) as readonly string[]

const isSupported = (value: string | null): value is Language =>
  !!value && LANGUAGE_CODES.includes(value)

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  isRTL: boolean
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  isRTL: false,
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "zaron-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLang] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      // A stale/unknown code (e.g. a language that was removed) must not leave
      // the app stuck on a dictionary that no longer exists.
      return isSupported(stored) ? stored : defaultLanguage
    } catch {
      return defaultLanguage
    }
  })

  const isRTL = RTL_LANGUAGES.includes(language)

  useEffect(() => {
    const root = window.document.documentElement

    // Remove existing language and direction classes
    root.classList.remove(...LANGUAGE_CODES, "rtl", "ltr")

    // Add current language class
    root.classList.add(language)

    // Add direction class
    root.classList.add(isRTL ? "rtl" : "ltr")

    // Set dir attribute for proper RTL support
    root.setAttribute("dir", isRTL ? "rtl" : "ltr")

    // Set lang attribute for accessibility
    root.setAttribute("lang", language)
  }, [language, isRTL])

  const value = {
    language,
    isRTL,
    setLanguage: (newLanguage: Language) => {
      try {
        localStorage.setItem(storageKey, newLanguage)
      } catch {
        // Private browsing / storage disabled — keep the in-memory switch working.
      }
      setLang(newLanguage)
    },
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (context === undefined)
    throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}
