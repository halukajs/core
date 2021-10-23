'use strict'

// eslint-disable-next-line
const debug = require('debug')('haluka:framework')
/**
 * @name Env
 * @author Robin Panta <hacktivistic@gmail.com>
 */

import * as dotenv from 'dotenv'

/**
 * @class Env
 * Load and access Environment Variables
 *
 * @binding Haluka/Core/Env
 * @alias Env
 */
export class Env{

	/**
	 * Path for loaded environment file
	 */
	protected envFilePath = ''

	/**
	 * @constructor
	 *
	 * @param {string} envFilePath
	 */
	constructor (envFilePath: string) {
		this.envFilePath =  process.env.ENV_PATH || envFilePath
		dotenv.config({
			path: this.envFilePath
		})
		debug('loaded .env file from %s', this.envFilePath)
	}

	/**
	 * Return environment value from environment file
	 *
	 * @param {string} key
	 * @param {any} defaultValue
	 *
	 * @return {any}
	 *
	 * @example
	 * Env.get('APP_NAME')
	 * Env.get('CACHE_ROUTES', true)
	 *
	 * @public
	 */
	get (key: string, defaultValue?: any) {
		const val = process.env[key] || defaultValue
		if (val === 'true' || val === '1') {
			return true
		}
		if (val === 'false' || val === '0') {
			return false
		}
		return val
	}

}