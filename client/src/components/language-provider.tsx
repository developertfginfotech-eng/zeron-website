import { createContext, useContext, useEffect, useState } from "react"

type Language = "en" | "ar" | "hi"

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
  const [language, setLang] = useState<Language>(
    () => (localStorage.getItem(storageKey) as Language) || defaultLanguage
  )

  const isRTL = language === "ar"

  useEffect(() => {
    const root = window.document.documentElement

    // Remove existing language and direction classes
    root.classList.remove("en", "ar", "hi", "rtl", "ltr")
    
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
      localStorage.setItem(storageKey, newLanguage)
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