/**
 * @name Logger
 * @author Robin Panta <hacktivistic@gmail.com>
 */
import * as winston from 'winston';
import ILoggerConfig from './ILoggerConfig';
/**
 * Logger Class
 */
export declare class Logger {
    /**
     * Configurations for the logger
     */
    protected config: ILoggerConfig;
    /**
     * Constructor
     * @param {ILoggerConfig} config Configurations for the logger
     */
    constructor(config: ILoggerConfig);
    /**
     * Registers Console Transport to winston
     *
     * @protected
     */
    protected consoleTransport(config: any): void;
    /**
     * Registers File Transport to winston
     *
     * @protected
     */
    protected fileTransport(config: any): void;
    protected httpTransport(config: any): void;
    protected slackTransport(config: any): void;
    /**
     * Logs the data using winston
     *
     * @param  {...any} args
     */
    log: winston.LogMethod;
}
