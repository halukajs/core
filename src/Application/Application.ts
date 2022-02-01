/**
 * @module Application
 * @author Robin Panta
 * 
 * (c) Robin Panta <hacktivistic@gmail.com>
 */

import * as path from 'path'
import * as _ from 'lodash'
import { Container } from '@haluka/box'
import { Exception, FatalException } from '../Exceptions'
import { IServiceProvider } from './ServiceProvider'
 
// Core Service Providers
import EventServiceProvider from '../ServiceProviders/EventServiceProvider'
import LogServiceProvider from '../ServiceProviders/LogServiceProvider'
import EnvServiceProvider from '../ServiceProviders/EnvServiceProvider'
import ConfigServiceProvider from '../ServiceProviders/ConfigServiceProvider'
 
// Global Functions (Nasty Hack)
import '../../types/modules'
import '../Helpers/others'
import ApplicationData from './ApplicationData'
import { Emitter } from '../Events'
 
export default class Application extends Container {
    

	/**
	 * The current globally available container (if any).
	 */
	protected static instance: Application

	/**
      * Holds the base path of the application
      */
	private basePath = ''
 
	/**
      * Core Service Providers required by the application
      */
	protected coreProviders: Array<IServiceProvider> = [
		new EnvServiceProvider(this),
		new ConfigServiceProvider(this),
		new EventServiceProvider(this),
		new LogServiceProvider(this),
	]
 
	/**
      * The array of terminating callbacks
      */
	protected terminatingCallbacks: Array<CallableFunction> = []
 
	/**
      * Autload Definitions
      */
	protected autoLoaders: KeyValue = {}
 
	/**
      * @constructor
      * 
      * @param basePath The base path of the application
      */
	constructor (basePath = '') {
		super()
 
		this.registerPaths(basePath)
		Application.setInstance(this)
         
		require('../Helpers/core')
 
		this.registerCoreProviders()
		this.setupApplication()
 
	}
 
	/**
      * Returns the version of the application from package.json
      */
	public version (): string {
		try {
			// eslint-disable-next-line
			return require(this.path('package.json')).version
		} catch (error) {
			throw new VersionRetrievalError
		}
	}
 
	/**
      * Registers the basepath of the Haluka Application
      * @param basePath Base path of Haluka Application
      */
	private registerPaths (basePath: string): void {
		this.basePath = path.resolve(_.trimEnd(basePath, '/'))
	}
 
	/**
      * Registers Core Service Providers
      */
	private registerCoreProviders (): void {
		for (const provider of this.coreProviders) {
			provider.register()
		}
 
		this.resolve<Emitter>('Haluka/Core/Events').fire('Application.CoreProvidersResolved')
 
	}
 
	/**
      * Set up the Haluka Application
      */
	private setupApplication (): void {
		this.save({ name: 'Haluka/Application', alias: 'app' }, this)
		this.save({ name: 'Environment', alias: 'env' }, this.environment())
 
		this.registerContainerAliases()
		this.getAutoLoaders()
         
	}
 
	/**
      * Gets autoload definitions from package file
      */
	private getAutoLoaders (): void {
		// Load Auto-Load Definition from Package File, if exists
		try {
			// eslint-disable-next-line
			this.autoLoaders = require(this.path('package.json')).autoLoad
		} catch (error) {
			//throw new AutoLoadDefinitionError
		}
	}
 
 
	/**
      * Returns the current application environment
      */
	public environment (arg?: string): string | boolean {
		const appEnv = process.env.APP_ENV || env('APP_ENV', config('app.env', 'production'))
		if (arg) {
			return appEnv == arg
		}
		return appEnv
	}
 
	/**
      * Checks if application is running on local environment
      */
	public isLocal (): boolean {
		return process.env.APP_ENV === 'dev' || process.env.APP_ENV === 'develop' || process.env.NODE_ENV === 'dev'
	}
 
	/**
      * Checks if application is running on production environment
      */
	public isProduction (): boolean {
		return process.env.APP_ENV === 'production'
	}
 
	/**
      * Checks if application is running test
      */
	public isTesting (): boolean {
		return process.env.NODE_ENV === 'test'
	}
 
	/**
      * Checks if application has debug environment
      */
	public isDebugging (): boolean {
		return process.env.NODE_ENV === 'debug'
	}

	/**
      * Checks if application is in CLI
      */
	public isCLI (): boolean {
		return process.env.NODE_ENV === 'cli'
	}
 
	/**
      * Returns path string relative to base path
      */
	public path (...args: Array<string>): string {
		return path.join(this.basePath, ...args)
	}
 
	/**
      * Returns path string relative to app path
      */
	public appPath (...args: Array<string>): string {
		return this.path('app', ...args)
	}
 
	/**
      * Returns path string relative to config path
      */
	public configPath (...args: Array<string>): string {
		return this.path('config', ...args)
	}
 
	/**
      * Returns path string relative to database path
      */
	public databasePath (...args: Array<string>): string {
		return this.path('database', ...args)
	}
 
	/**
      * Returns path string relative to resources path
      */
	public resourcesPath (...args: Array<string>): string {
		return this.path('resources', ...args)
	}
 
	/**
      * Returns path string relative to routes path
      */
	public routesPath (...args: Array<string>): string {
		return this.path('routes', ...args)
	}
 
	/**
      * Returns path string relative to storage path
      */
	public storagePath (...args: Array<string>): string {
		return this.path('../storage', ...args)
	}
 
	/**
      * Returns path string relative to system path
      */
	public systemPath (...args: Array<string>): string {
		return this.path('../system', ...args)
	}
 
	/**
      * Returns path string relative to test path
      */
	public testPath (...args: Array<string>): string {
		return this.path('../test', ...args)
	}
 
	/**
      * Returns path string relative to Commands path
      */
	public commandsPath (...args: Array<string>): string {
		return this.appPath('Commands', ...args)
	}
 
	/**
      * Returns path string relative to Controllers path
      */
	public controllersPath (...args: Array<string>): string {
		return this.appPath('Controllers', ...args)
	}
 
	/**
      * Returns path string relative to Events path
      */
	public eventsPath (...args: Array<string>): string {
		return this.appPath('Events', ...args)
	}
 
	/**
      * Returns path string relative to Exceptions path
      */
	public exceptionsPath (...args: Array<string>): string {
		return this.appPath('Exceptions', ...args)
	}
 
	/**
      * Returns path string relative to Middleware path
      */
	public middlewarePath (...args: Array<string>): string {
		return this.appPath('Middleware', ...args)
	}
 
	/**
      * Returns path string relative to Model path
      */
	public modelPath (...args: Array<string>): string {
		return this.appPath('Model', ...args)
	}
 
	/**
      * Returns path string relative to Providers path
      */
	public providersPath (...args: Array<string>): string {
		return this.appPath('Providers', ...args)
	}
 
	/**
      * Terminates application
      */
	public terminate (): void {
		this.terminatingCallbacks.forEach(callback => {
			callback(this)
		})
	}
 
	/**
      * Register a terminating callback
      * 
      * @param {Function} callback
      * @return {this} this
      */
	public terminating(callback: CallableFunction): ThisType<Application> {
		this.terminatingCallbacks.push(callback)
		return this
	}
 
	/**
      * Boots the Application with application data.
      * @param {ApplicationData} appData
      */
	public boot (appData: ApplicationData, callback?: CallableFunction) {
		
		this.resolve<Emitter>('Haluka/Core/Events').fire('Application.BeginBooting')

		// Providers
		/* istanbul ignore next */
		if (appData.providers) {
			for (let providerPath of appData.providers) {
				if (providerPath.startsWith('$')) {
					const loadvar = providerPath.substring(1, providerPath.indexOf('/')) 
					providerPath = `${this.autoLoaders[loadvar]}${providerPath.replace('$' + loadvar, '')}`
				}

				// eslint-disable-next-line
				const providerClass = require(providerPath).default
				if (!(providerClass instanceof Function)) {
					throw new FatalException(`Invalid Provider in '${providerPath}' specified in Application Data file.`)
				}
				const provider = new providerClass(this)
				if (!(typeof provider.register === 'function'))
					throw new FatalException(`Service Provider in '${providerPath}' is not a valid Service Provider Class.`)
	
				provider.register()
			}
		}
 
		// Aliases
		/* istanbul ignore next */
		if (appData.aliases) {
			for (const alias in appData.aliases) {
				this.alias(alias, appData.aliases[alias])
			}
		}

		if (typeof (callback) === 'function') {
			callback()
		}
 
		this.resolve<Emitter>('Haluka/Core/Events').fire('Application.Booted')
         
	}
 
	/**
      * Registers aliases for providers
      */
	protected registerContainerAliases () {
 
		const aliases = {
			Haluka: 'app',
			Container: 'app',
			Console: 'Haluka/Core/Console',
		}
		for (const alias in aliases) {
			this.alias(alias, aliases[alias])
		}	
 
	}

	/**
	 * Sets the global container instance
	 * @param instance Container instance
	 */
	public static setInstance (instance: Application): Application {
		Application.instance = instance
		return instance
	}

	/**
	 * Gets the currently globally set container instance
	 */
	public static getInstance (opts?: string): Application {
		if (Application.instance !== undefined) {
			return Application.instance
		}
		return Application.instance = new Application(opts)
	}
 
}
 
 
/**
  * @name VersionRetrievalError
  * @author Robin Panta
  */
 
export class VersionRetrievalError extends Exception {
 
	constructor () {
		super('Cannot retrieve version from package.json')
	}
}