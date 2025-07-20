import { useContext } from "react";
import type { Logger } from "../types/log/Logger";
import LogContext from "../context/log/LogContext";

export const useLogger = (): Logger => {
  const context = useContext(LogContext);
  if (!context) {
    throw new Error("useLogger must be used within a LogProvider");
  }
  return context;
};
