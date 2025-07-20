import React from "react";
import LogContext from "../../context/log/LogContext";
import type { Logger } from "../../types/log/Logger";

export const LogProvider: React.FC<{
  children: React.ReactNode;
  logger: Logger;
}> = ({ children, logger }) => {
  return <LogContext.Provider value={logger}>{children}</LogContext.Provider>;
};
