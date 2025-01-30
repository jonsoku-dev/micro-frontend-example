export type LogLevel = 'info' | 'error';
export interface LogEvent {
    timestamp: string;
    level: LogLevel;
    message: string;
    data?: unknown;
}
declare const logger: {
    logInfo: (message: string, data?: unknown) => void;
    logError: (message: string, error?: Error | unknown) => void;
    subscribe: (callback: (event: LogEvent) => void) => () => void;
};
export { logger };
