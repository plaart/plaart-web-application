/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import IntlContext from "../../context/intl/IntlContext";
import Translations, { LANGUAGES } from "../../shared/locales";

type IntlProps = {
  children: React.ReactNode;
};

const IntlProvider = ({ children }: IntlProps) => {
  const [locale, setLocale] = useState<string>(LANGUAGES.en);
  const [messages, setMessages] = useState(Translations[LANGUAGES.en]);

  useEffect(() => {
    const selectedMessages = Translations[locale as keyof typeof Translations];
    if (selectedMessages) {
      setMessages(selectedMessages);
    } else {
      console.warn(`Translations for locale "${locale}" not found`);
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
    <IntlContext.Provider value={{ t, setLocale }}>
      {children}
    </IntlContext.Provider>
  );
};

export default IntlProvider;
