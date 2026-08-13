import type { Language } from "@/components/language-provider"

/**
 * Backend documents may carry machine translations of their admin-entered text,
 * cached per language by the API:
 *
 *   { translations: { ar: { title: "...", description: "..." }, ... } }
 *
 * `localized` reads the active language's version of a field and falls back to
 * the source field whenever the language, the field, or the whole translations
 * object is missing — so untranslated content still renders, just in the
 * language it was entered in.
 */
export type Translatable<T> = T & {
  translations?: Partial<Record<Language, Record<string, string | undefined>>> | null
}

export function localized<T extends Record<string, any>>(
  entity: Translatable<T> | null | undefined,
  field: string,
  language: Language
): string {
  if (!entity) return ""

  const fallback = typeof entity[field] === "string" ? (entity[field] as string) : ""
  if (language === "en") return fallback

  const translated = entity.translations?.[language]?.[field]
  return typeof translated === "string" && translated.trim() ? translated : fallback
}

/**
 * Hook-friendly wrapper: `const l = useLocalized(); l(property, "title")`.
 * Import `useLanguage` at the call site to supply the language.
 */
export function makeLocalizer(language: Language) {
  return <T extends Record<string, any>>(entity: Translatable<T> | null | undefined, field: string) =>
    localized(entity, field, language)
}
