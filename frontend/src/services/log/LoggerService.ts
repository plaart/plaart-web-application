import type { LogEntry } from "../../types/log/LogEntry";
import type { Logger } from "../../types/log/Logger";

export class LoggerService implements Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000;

  private addLog(
    level: LogEntry["level"],
    message: string,
    context?: Record<string, string | number>
  ) {
    // Crear entrada de Log
    const logEntry: LogEntry = {
      level,
      message,
      timestamp: Date.now(),
      context,
    };

    // Agregar al array
    this.logs.push(logEntry);

    // Mantener solo los últimos 1000 logs (gestión de memoria)
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // También logear en la consola del navegador
    const consoleMethod = console[level] || console.log;
    consoleMethod(`[${new Date().toISOString()}] ${message}`, context || "");
  }

  // Métodos públicos para cada nivel
  debug(message: string, context?: Record<string, string | number>) {
    this.addLog("debug", message, context);
  }

  info(message: string, context?: Record<string, string | number>) {
    this.addLog("info", message, context);
  }

  warn(message: string, context?: Record<string, string | number>) {
    this.addLog("warn", message, context);
  }

  error(message: string, context?: Record<string, string | number>) {
    this.addLog("error", message, context);
  }

  // Métodos de utilidad
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}
