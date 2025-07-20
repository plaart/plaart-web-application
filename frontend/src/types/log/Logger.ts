import type { LogEntry } from "./LogEntry";

export interface Logger {
  debug: (message: string, context?: Record<string, string | number>) => void;
  info: (message: string, context?: Record<string, string | number>) => void;
  warn: (message: string, context?: Record<string, string | number>) => void;
  error: (message: string, context?: Record<string, string | number>) => void;
  getLogs: () => LogEntry[];
  clearLogs: () => void;
}
