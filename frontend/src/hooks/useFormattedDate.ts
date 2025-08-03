import { format } from "date-fns";
import type { Locale } from "date-fns";
import { enUS, es } from "date-fns/locale";
import useIntl from "./useIntl";

const localeMap: Record<string, Locale> = {
  en: enUS,
  es: es,
};

export const useFormattedDate = () => {
  const { getLocale } = useIntl();

  const formatDate = (date: Date): string => {
    const localeKey = getLocale();
    const locale = localeMap[localeKey] || enUS;
    return format(date, "MMMM do, yyyy", { locale });
  };

  return { formatDate };
};
