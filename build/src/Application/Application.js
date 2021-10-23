"use strict";
/**
 * @module Application
 * @author Robin Panta
 *
 * (c) Robin Panta <hacktivistic@gmail.com>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionRetrievalError = void 0;
const path = require("path");
const _ = require("lodash");
const box_1 = require("@haluka/box");
const Exceptions_1 = require("../Exceptions");
// Core Service Providers
const EventServiceProvider_1 = require("../ServiceProviders/EventServiceProvider");
const LogServiceProvider_1 = require("../ServiceProviders/LogServiceProvider");
const EnvServiceProvider_1 = require("../ServiceProviders/EnvServiceProvider");
const ConfigServiceProvider_1 = require("../ServiceProviders/ConfigServiceProvider");
// Global Functions (Nasty Hack)
require("../../types/modules");
const ServiceProvider_1 = require("./ServiceProvider");
class Application extends box_1.Container {
    /**
      * @constructor
      *
      * @param basePath The base path of the application
      */
    constructor(basePath = '') {
        super();
        /**
          * Holds the base path of the application
          */
        this.basePath = '';
        /**
          * Core Service Providers required by the application
          */
        this.coreProviders = [
            new EnvServiceProvider_1.default(this),
            new ConfigServiceProvider_1.default(this),
            new EventServiceProvider_1.default(this),
            new LogServiceProvider_1.default(this),
        ];
        /**
          * The array of terminating callbacks
          */
        this.terminatingCallbacks = [];
        /**
          * Autload Definitions
          */
        this.autoLoaders = {};
        this.registerPaths(basePath);
        Application.setInstance(this);
        require('../Helpers/core');
        this.registerCoreProviders();
        this.setupApplication();
    }
    /**
      * Returns the version of the application from package.json
      */
    version() {
        try {
            // eslint-disable-next-line
            return require(this.path('package.json')).version;
        }
        catch (error) {
            throw new VersionRetrievalError;
        }
    }
    /**
      * Registers the basepath of the Haluka Application
      * @param basePath Base path of Haluka Application
      */
    registerPaths(basePath) {
        this.basePath = path.resolve(_.trimEnd(basePath, '/'));
    }
    /**
      * Registers Core Service Providers
      */
    registerCoreProviders() {
        for (const provider of this.coreProviders) {
            provider.register();
        }
        this.resolve('Haluka/Core/Events').fire('CoreProviders.Resolved');
    }
    /**
      * Set up the Haluka Application
      */
    setupApplication() {
        this.save({ name: 'Haluka/Application', alias: 'app' }, this);
        this.save({ name: 'Environment', alias: 'env' }, this.environment());
        this.registerContainerAliases();
        this.getAutoLoaders();
    }
    /**
      * Gets autoload definitions from package file
      */
    getAutoLoaders() {
        // Load Auto-Load Definition from Package File, if exists
        try {
            // eslint-disable-next-line
            this.autoLoaders = require(this.path('package.json')).autoLoad;
        }
        catch (error) {
            //throw new AutoLoadDefinitionError
        }
    }
    /**
      * Returns the current application environment
      */
    environment(arg) {
        const appEnv = process.env.APP_ENV || env('APP_ENV', config('app.env', 'production'));
        if (arg) {
            return appEnv == arg;
        }
        return appEnv;
    }
    /**
      * Checks if application is running on local environment
      */
    isLocal() {
        return process.env.APP_ENV === 'dev' || process.env.APP_ENV === 'develop' || process.env.NODE_ENV === 'dev';
    }
    /**
      * Checks if application is running on production environment
      */
    isProduction() {
        return process.env.APP_ENV === 'production';
    }
    /**
      * Checks if application is running test
      */
    isTesting() {
        return process.env.NODE_ENV === 'test';
    }
    /**
      * Checks if application has debug environment
      */
    isDebugging() {
        return process.env.NODE_ENV === 'debug';
    }
    /**
      * Returns path string relative to base path
      */
    path(...args) {
        return path.join(this.basePath, ...args);
    }
    /**
      * Returns path string relative to app path
      */
    appPath(...args) {
        return this.path('app', ...args);
    }
    /**
      * Returns path string relative to config path
      */
    configPath(...args) {
        return this.path('config', ...args);
    }
    /**
      * Returns path string relative to database path
      */
    databasePath(...args) {
        return this.path('database', ...args);
    }
    /**
      * Returns path string relative to resources path
      */
    resourcesPath(...args) {
        return this.path('resources', ...args);
    }
    /**
      * Returns path string relative to routes path
      */
    routesPath(...args) {
        return this.path('routes', ...args);
    }
    /**
      * Returns path string relative to storage path
      */
    storagePath(...args) {
        return this.path('storage', ...args);
    }
    /**
      * Returns path string relative to system path
      */
    systemPath(...args) {
        return this.path('system', ...args);
    }
    /**
      * Returns path string relative to test path
      */
    testPath(...args) {
        return this.path('test', ...args);
    }
    /**
      * Returns path string relative to Commands path
      */
    commandsPath(...args) {
        return this.appPath('Commands', ...args);
    }
    /**
      * Returns path string relative to Controllers path
      */
    controllersPath(...args) {
        return this.appPath('Controllers', ...args);
    }
    /**
      * Returns path string relative to Events path
      */
    eventsPath(...args) {
        return this.appPath('Events', ...args);
    }
    /**
      * Returns path string relative to Exceptions path
      */
    exceptionsPath(...args) {
        return this.appPath('Exceptions', ...args);
    }
    /**
      * Returns path string relative to Middleware path
      */
    middlewarePath(...args) {
        return this.appPath('Middleware', ...args);
    }
    /**
      * Returns path string relative to Model path
      */
    modelPath(...args) {
        return this.appPath('Model', ...args);
    }
    /**
      * Returns path string relative to Providers path
      */
    providersPath(...args) {
        return this.appPath('Providers', ...args);
    }
    /**
      * Terminates application
      */
    terminate() {
        this.terminatingCallbacks.forEach(callback => {
            callback(this);
        });
    }
    /**
      * Register a terminating callback
      *
      * @param {Function} callback
      * @return {this} this
      */
    terminating(callback) {
        this.terminatingCallbacks.push(callback);
        return this;
    }
    /**
      * Boots the Application with application data.
      * @param {ApplicationData} appData
      */
    boot(appData) {
        // Providers
        /* istanbul ignore next */
        for (let providerPath of appData.providers) {
            if (providerPath.startsWith('$')) {
                const loadvar = providerPath.substr(1, providerPath.indexOf('/') - 1);
                providerPath = `${this.autoLoaders[loadvar]}${providerPath.replace('$' + loadvar, '')}`;
            }
            // eslint-disable-next-line
            const providerClass = require(providerPath).default;
            if (!(providerClass instanceof Function)) {
                throw new Exceptions_1.FatalException(`Invalid Provider in '${providerPath}' specified in Application Data file.`);
            }
            const provider = new providerClass(this);
            if (!(provider instanceof ServiceProvider_1.default))
                throw new Exceptions_1.FatalException(`Service Provider in '${providerPath}' is not a valid Service Provider Class.`);
            provider.register();
        }
        // Aliases
        for (const alias in appData.aliases) {
            this.alias(alias, appData.aliases[alias]);
        }
        this.resolve('Haluka/Core/Events').fire('AppProviders.Resolved');
    }
    /**
      * Registers aliases for providers
      */
    registerContainerAliases() {
        const aliases = {
            Haluka: 'app',
            Container: 'app',
            Console: 'Haluka/Core/Console',
        };
        for (const alias in aliases) {
            this.alias(alias, aliases[alias]);
        }
    }
    /**
     * Sets the global container instance
     * @param instance Container instance
     */
    static setInstance(instance) {
        Application.instance = instance;
        return instance;
    }
    /**
     * Gets the currently globally set container instance
     */
    static getInstance(opts) {
        if (Application.instance !== undefined) {
            return Application.instance;
        }
        return Application.instance = new Application(opts);
    }
}
exports.default = Application;
/**
  * @name VersionRetrievalError
  * @author Robin Panta
  */
class VersionRetrievalError extends Exceptions_1.Exception {
    constructor() {
        super('Cannot retrieve version from package.json');
    }
}
exports.VersionRetrievalError = VersionRetrievalError;
//# sourceMappingURL=Application.js.map