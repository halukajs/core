/**
 * @name Logger
 * @author Robin Panta <hacktivistic@gmail.com>
 */

'use strict'

import * as winston from 'winston'
import { DriverNotFoundException, TransportNotFoundException } from './Exceptions'
import ILoggerConfig from './ILoggerConfig'

import * as SlackHook from 'winston-slack-webhook-transport'

/**
 * Logger Class
 */
export class Logger {

	/**
	 * Configurations for the logger
	 */
	protected config: ILoggerConfig

	/**
	 * Constructor
	 * @param {ILoggerConfig} config Configurations for the logger
	 */
	constructor (config: ILoggerConfig) {
		this.config = config

		// convert to array if not already array
		if (typeof config.uses === 'string') {
			config.uses = [config.uses]
		}

		config.uses.forEach(transport => {
			if (config.transports[transport]) {
				const tconf = config.transports[transport]
				if (tconf.driver === undefined)
					throw new DriverNotFoundException(`Driver config key not found for transport '${transport}'.`)
				if (typeof this[tconf.driver + 'Transport'] === 'function')
					this[transport + 'Transport'](tconf)
				else
					throw new DriverNotFoundException(`Driver '${tconf.driver}' not available for transport '${transport}'.`)
			}else {
				throw new TransportNotFoundException(`Transport '${transport}' not found.`)
			}
			
		})
	}

	/**
	 * Registers Console Transport to winston
	 *
	 * @protected
	 */
	protected consoleTransport (config): void {
		winston.add(new winston.transports.Console(config))
	}

	/**
	 * Registers File Transport to winston
	 *
	 * @protected
	 */
	protected fileTransport (config) {
		winston.add(new winston.transports.File(config))
	}
	
	protected httpTransport (config) {
		winston.add(new winston.transports.Http(config))
	}

	/* istanbul ignore next */ 
	protected slackTransport (config) {
		winston.add(new SlackHook(config))
	}

	/**
	 * Logs the data using winston
	 *
	 * @param  {...any} args
	 */
	public log = winston.log

}