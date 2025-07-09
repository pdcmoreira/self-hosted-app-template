import { db } from '@/db';
import { logs } from '@/db/schema';

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEBUG = 'debug',
}

interface LogOptions {
  source?: string;
  meta?: Record<string, unknown>;
}

class Logger {
  private log(level: LogLevel, message: string, options?: LogOptions) {
    const timestamp = new Date().toISOString();

    const logLine = `${timestamp} [${(level as string).toUpperCase()}] ${message}`;

    // Write to console
    console.log(logLine);

    // Write to database
    try {
      db.insert(logs)
        .values({
          level,
          message,
          source: options?.source,
          meta: options?.meta ? JSON.stringify(options.meta) : null,
        })
        .run();
    } catch (error) {
      // If database write fails, at least log to console
      console.error('Failed to write log to database:', error);
    }
  }

  info(message: string, options?: LogOptions) {
    this.log(LogLevel.INFO, message, options);
  }

  warn(message: string, options?: LogOptions) {
    this.log(LogLevel.WARN, message, options);
  }

  error(message: string, options?: LogOptions) {
    this.log(LogLevel.ERROR, message, options);
  }

  debug(message: string, options?: LogOptions) {
    this.log(LogLevel.DEBUG, message, options);
  }
}

export const logger = new Logger();
