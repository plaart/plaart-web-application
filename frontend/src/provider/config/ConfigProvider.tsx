import React, { type ReactNode } from "react";
import type { ConfigContextType } from "../../context/config/ConfigContext";
import ConfigContext from "../../context/config/ConfigContext";

const defaultConfig: ConfigContextType = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3001",
  appName: "Mi Aplicación",
  version: "1.0.0",
  environment:
    (process.env.NODE_ENV as ConfigContextType["environment"]) || "LOCAL",
};

interface ConfigProviderProps {
  children: ReactNode | ((config: ConfigContextType) => ReactNode);
  config?: Partial<ConfigContextType>;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({
  children,
  config = {},
}) => {
  const mergedConfig = { ...defaultConfig, ...config };

  return (
    <ConfigContext.Provider value={mergedConfig}>
      {typeof children === "function" ? children(mergedConfig) : children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
