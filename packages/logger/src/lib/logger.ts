export type LogLevel = 'info' | 'error';

export interface LogEvent {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
}

const logger = (function () {
  const LOG_EVENT = 'app:log';

  function createLogEvent(level: LogLevel, message: string, data?: unknown): LogEvent {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    };
  }

  function dispatchLogEvent(logEvent: LogEvent): void {
    const event = new CustomEvent(LOG_EVENT, {
      detail: logEvent,
      bubbles: true,
    });
    window.dispatchEvent(event);
  }

  // Public API
  function logInfo(message: string, data?: unknown): void {
    const logEvent = createLogEvent('info', message, data);
    dispatchLogEvent(logEvent);
    console.info(`[INFO] ${logEvent.timestamp}: ${message}`, data ?? '');
  }

  function logError(message: string, error?: Error | unknown): void {
    const logEvent = createLogEvent('error', message, error);
    dispatchLogEvent(logEvent);
    console.error(`[ERROR] ${logEvent.timestamp}: ${message}`, error ?? '');
  }

  function subscribe(callback: (event: LogEvent) => void): () => void {
    const handler = (event: CustomEvent<LogEvent>) => {
      callback(event.detail);
    };

    window.addEventListener(LOG_EVENT, handler as EventListener);

    return () => {
      window.removeEventListener(LOG_EVENT, handler as EventListener);
    };
  }

  // Reveal public API
  return {
    logInfo,
    logError,
    subscribe
  };
})();

export { logger };