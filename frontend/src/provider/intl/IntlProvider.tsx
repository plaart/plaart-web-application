/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import IntlContext from "../../context/intl/IntlContext";
import Translations, {
  LANGUAGES,
  type TranslationsSchema,
} from "../../shared/locales";

type IntlProps = {
  children: React.ReactNode;
};

const IntlProvider = ({ children }: IntlProps) => {
  const [locale, setLocale] = useState<string>(LANGUAGES.en);
  const [messages, setMessages] = useState<TranslationsSchema>(
    Translations[LANGUAGES.en]
  );

  useEffect(() => {
    const selectedMessages = Translations[locale as keyof typeof Translations];
    if (selectedMessages) {
      setMessages(selectedMessages);
    } else {
      console.warn(`Translations for locale "${locale}" not found`);
    }
  }, [locale]);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const enKeys = JSON.stringify(Object.keys(Translations[LANGUAGES.en]));
      const currentKeys = JSON.stringify(Object.keys(Translations[locale]));
      if (enKeys !== currentKeys) {
        console.warn(
          "⚠️ Missing or mismatched translation keys for locale:",
          locale
        );
      }
    }
  }, [locale]);

  const t = (key: string, values?: Record<string, any>) => {
    if (!key) return key;
    if (!messages) return key;

    const keys = key.split(".");
    let result: any = messages;

    for (const k of keys) {
      result = result ? result[k] : undefined;
      if (result === undefined) return key;
    }

    if (values && typeof result === "string") {
      Object.keys(values).forEach((key) => {
        result = result.replace(new RegExp(`{${key}}`, "g"), values[key]);
      });
    }

    return result;
  };

  return (
    <IntlContext.Provider value={{ t, setLocale, getLocale: () => locale }}>
      {children}
    </IntlContext.Provider>
  );
};

export default IntlProvider;
