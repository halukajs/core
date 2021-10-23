'use strict'

export default interface ILoggerConfig {

/**
	|--------------------------------------------------------------------------
	| Uses
	|--------------------------------------------------------------------------
	|
	| Transport(s) to use for logging. Multiple transports can be used.
	| 
	| @example:
    | 	uses: 'file'
    |   or,
    |   uses: ['file', 'console']
	|
	*/
	uses: string | string[]


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
	transports: object

}