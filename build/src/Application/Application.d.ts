/**
 * @module Application
 * @author Robin Panta
 *
 * (c) Robin Panta <hacktivistic@gmail.com>
 */
import { Container } from '@haluka/box';
import { Exception } from '../Exceptions';
import { IServiceProvider } from './ServiceProvider';
import '../../types/modules';
import '../Helpers/others';
import ApplicationData from './ApplicationData';
export default class Application extends Container {
    /**
     * The current globally available container (if any).
     */
    protected static instance: Application;
    /**
      * Holds the base path of the application
      */
    private basePath;
    /**
      * Core Service Providers required by the application
      */
    protected coreProviders: Array<IServiceProvider>;
    /**
      * The array of terminating callbacks
      */
    protected terminatingCallbacks: Array<CallableFunction>;
    /**
      * Autload Definitions
      */
    protected autoLoaders: KeyValue;
    /**
      * @constructor
      *
      * @param basePath The base path of the application
      */
    constructor(basePath?: string);
    /**
      * Returns the version of the application from package.json
      */
    version(): string;
    /**
      * Registers the basepath of the Haluka Application
      * @param basePath Base path of Haluka Application
      */
    private registerPaths;
    /**
     * Bind all of the application paths in the container.
     */
    protected bindPaths(): void;
    /**
      * Registers Core Service Providers
      */
    private registerCoreProviders;
    /**
      * Set up the Haluka Application
      */
    private setupApplication;
    /**
      * Gets autoload definitions from package file
      */
    private getAutoLoaders;
    /**
      * Returns the current application environment
      */
    environment(arg?: string): string | boolean;
    /**
      * Checks if application is running on local environment
      */
    isLocal(): boolean;
    /**
      * Checks if application is running on production environment
      */
    isProduction(): boolean;
    /**
      * Checks if application is running test
      */
    isTesting(): boolean;
    /**
      * Checks if application has debug environment
      */
    isDebugging(): boolean;
    /**
      * Checks if application is in CLI
      */
    isCLI(): boolean;
    /**
      * Returns path string relative to base path
      */
    path(...args: Array<string>): string;
    /**
      * Returns path string relative to app path
      */
    appPath(...args: Array<string>): string;
    /**
      * Returns path string relative to config path
      */
    configPath(...args: Array<string>): string;
    /**
      * Returns path string relative to resources path
      */
    resourcesPath(...args: Array<string>): string;
    /**
      * Returns path string relative to routes path
      */
    routesPath(...args: Array<string>): string;
    /**
      * Returns path string relative to storage path
      */
    storagePath(...args: Array<string>): string;
    /**
      * Returns path string relative to system path
      */
    systemPath(...args: Array<string>): string;
    /**
      * Returns path string relative to test path
      */
    testPath(...args: Array<string>): string;
    /**
      * Returns path string relative to Commands path
      */
    commandsPath(...args: Array<string>): string;
    /**
      * Returns path string relative to Controllers path
      */
    controllersPath(...args: Array<string>): string;
    /**
      * Returns path string relative to Events path
      */
    eventsPath(...args: Array<string>): string;
    /**
      * Returns path string relative to Exceptions path
      */
    exceptionsPath(...args: Array<string>): string;
    /**
      * Returns path string relative to Middleware path
      */
    middlewarePath(...args: Array<string>): string;
    /**
      * Returns path string relative to Model path
      */
    modelPath(...args: Array<string>): string;
    /**
      * Returns path string relative to Providers path
      */
    providersPath(...args: Array<string>): string;
    /**
      * Terminates application
      */
    terminate(): void;
    /**
      * Register a terminating callback
      *
      * @param {Function} callback
      * @return {this} this
      */
    terminating(callback: CallableFunction): ThisType<Application>;
    /**
      * Boots the Application with application data.
      * @param {ApplicationData} appData
      */
    boot(appData: ApplicationData, callback?: CallableFunction): void;
    /**
      * Registers aliases for providers
      */
    protected registerContainerAliases(): void;
    /**
     * Sets the global container instance
     * @param instance Container instance
     */
    static setInstance(instance: Application): Application;
    /**
     * Gets the currently globally set container instance
     */
    static getInstance(opts?: string): Application;
}
/**
  * @name VersionRetrievalError
  * @author Robin Panta
  */
export declare class VersionRetrievalError extends Exception {
    constructor();
}
