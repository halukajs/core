'use strict'

module.exports = {

	/**
	|--------------------------------------------------------------------------
	| Uses
	|--------------------------------------------------------------------------
	|
	| Transport(s) to use for logging. Multiple transports can be used.
	| 
	| @example:
	| 	uses: ['file', 'console']
	|
	*/
	uses: ['file', 'console'],


	/*
	|--------------------------------------------------------------------------
	| Transports
	|--------------------------------------------------------------------------
	|
	| List of available transports for logging. Winston is used for logging.
	| Any config you wish to send to the winston transport can be passed inside
	| the respective transport.
	| Available Drivers: console, file, http, slack
	|
	*/
	transports: {

		// Configs for Console Transport
		console: {
			driver: 'console',
			level: 'error',
			stderrLevels: [],
			consoleWarnLevels: [],
		},

		// Configs for File Transport
		file: {
			driver: 'file',
			level: 'info',
			filename: 'haluka.log',
			maxsize: '',
		},

		// Configs for HTTP Transport
		http: {
			driver: 'http',
			host: 'localhost',
			port: '80',
			path: '/',
			auth: null,
			ssl: false,
		},

		// Configs for Slack Transport
		slack: {
			driver: 'slack',
			level: '',
			webhookUrl: '',
			channel: '',
			username: 'Haluka Log',
			iconEmoji: ':boom:',
		}

	}

}
