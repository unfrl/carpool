export enum LogLevel {
    Information = "INFO",
    Warning = "WARNING",
    Error = "ERROR",
}

export class Logger {
    private _source: string;

    public constructor(source: string) {
        this._source = source;
    }

    public log(logLevel: LogLevel, message: string, params?: any): void {
        const logMessage =
            logLevel === LogLevel.Error
                ? console.error
                : logLevel === LogLevel.Warning
                ? console.warn
                : console.log;

        logMessage(
            `${this.getNow()} [${this._source}] [${logLevel}] ${message}`,
            params !== undefined ? params : ""
        );
    }

    public info(message: string, params?: any) {
        this.log(LogLevel.Information, message, params);
    }

    public warn(message: string, params?: any) {
        this.log(LogLevel.Warning, message, params);
    }

    public error(message: string, error?: any) {
        this.log(LogLevel.Error, message, error);
    }

    private getNow(): string {
        const now = new Date();
        const mon = now.getMonth() + 1; // January == 0
        const day = now.getDate();
        const hrs = now.getHours();
        const min = now.getMinutes();
        const sec = now.getSeconds();
        const ms = now.getMilliseconds();

        return `${mon}-${day} ${hrs}:${min}:${sec}.${ms}`;
    }
}
