const getOrdinal = (day: number): string => {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
};

export const formatDateWithLocale = (date: Date, locale: string): string => {
  const day = date.getDate();

  const formatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  });

  const formatted = formatter.format(date);

  if (locale.startsWith("en")) {
    return `${getOrdinal(day)}, ${formatted}`;
  } else {
    // Ej: "22 de diciembre de 2024"
    return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }
};
