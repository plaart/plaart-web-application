import { useEffect, type ReactNode } from "react";
import { useConfig } from "../hooks/useConfig";

interface ApplicationRootProps {
  children: ReactNode;
}

export const ApplicationRoot: React.FC<ApplicationRootProps> = ({
  children,
}) => {
  const config = useConfig();

  useEffect(() => {
    // Configurar título de la aplicación
    document.title = config.appName;
  }, [config]);

  const getBorderColor = () => {
    switch (config.environment) {
      case "PRE":
        return "border-t-4 border-green-500";
      case "LOCAL":
        return "border-t-4 border-orange-500";
      case "PROD":
        return "border-t-4 border-blue-500";
      default:
        return "";
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 ${getBorderColor()}`}
      data-environment={config.environment}>
      {children}
    </div>
  );
};
