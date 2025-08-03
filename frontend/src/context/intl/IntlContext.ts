/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

type IntlContextType = {
  t: (key: string, value?: Record<string, any>) => string;
  setLocale: (locale: string) => void;
  getLocale: () => string;
};
const IntlContext = createContext<IntlContextType | undefined>(undefined);

export default IntlContext;
