import { createContext } from "react";

export interface ConfigContextType {
  apiUrl: string;
  appName: string;
  version: string;
  environment: 'PRE' | 'PROD' | 'LOCAL';
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export default ConfigContext;
