'use strict'
const debug = require('debug')('haluka:framework')
import { FatalException } from '../Exceptions'
import requireAll = require('require-all')
import * as _ from'lodash'

/**
 * @name Config
 * @author Robin Panta <hacktivistic@gmail.com>
 */

/**
 * @class Config
 * Loads all configs recursively from config path.
 * 
 * @binding Haluka/Core/Config
 * @alias Config
 */
export class Config {

	/**
	 * Stores loaded configurations
	 */
	protected config: any

	/**
	 * Path for config directory 
	 */
	protected configPath = ''


	/**
	 * @constructor
     *
     * @param {string} configPath path of config directory
	 */
	public constructor (configPath: string) {
		if (!configPath) {
			throw new FatalException('Unknown config path.')
		}
		
		try {
			this.configPath = configPath
			this.config = requireAll({
				dirname: this.configPath,
				filter: /(.*)\.js$/
			})
			debug('loaded configs from %s', configPath)
		} catch (error)  /* istanbul ignore next */ {
			if (error.code !== 'ENOENT') throw error // error in case of invalid path
		}
	}

	/**
	 * Returns the config files' path
	 * 
	 * @return {string}
	 * 
	 * @public
	 */
	public getConfigPath () {
		return this.configPath
	}

	/**
	 * Fetch config key from config file
	 *
	 * @param {string} key
	 * @param {any} defaultValue
	 *
	 * @return {any}
	 *
	 * @example
	 * Config.get('session.cookie')
	 *
	 * @public
	 */
	get(key: string, defaultValue?: any) {
		return _.get(this.config, key, defaultValue)
	}

}
