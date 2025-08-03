import enTranslations from "../locales/en/common.json";
import esTranslations from "../locales/es/common.json";

export const LANGUAGES = {
  en: "en",
  es: "es",
} as const;

const Translations = {
  [LANGUAGES.en]: enTranslations,
  [LANGUAGES.es]: esTranslations,
};

export type TranslationsSchema = typeof enTranslations;

export default Translations;
