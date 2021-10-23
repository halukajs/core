'use strict'

import { Exception } from '../Exceptions'
import Application from '../Application/Application'

/**
 * @name Console
 * @author Robin Panta <hacktivistic@gmail.com>
 */

/**
 * @class Console
 * Handles console routes
 * 
 * @binding Haluka/Core/Console
 * @alias Console
 */
export class Console {

	protected commands: Array<ConsoleController> = []

	protected haluka: Application
	/**
     * @constructor
     */
	constructor (haluka: Application) {
		this.haluka = haluka
	}

	/**
     * Register a command
     * @param {string} cmd Command name
     * @param {ConsoleController} method Command handler method
     */
	command (cmd: string, method: ConsoleController): void {
		this.commands[cmd] = method
	}

	/**
     * Returns the command handler method
     * @param cmd Command name
     */
	getCommandMethod (cmd: string): ConsoleController {
		return this.commands[cmd]
	}

	/**
     * Returns all registered commands
     */
	getAllCommands (): Array<ConsoleController> {
		return this.commands
	}


	/**
     * Executes the console command
     * @param cmd Command name
     * @param args Command line arguments
     */
	execute (cmd: string, args: KeyValue, params: Array<string>) {
		const method = this.getCommandMethod(cmd)
		if (!method) {
			throw new CommandException(`Command '${cmd}' not found.`)
		}

		const response = Promise.resolve(method(this.haluka, params, args))
		response.then((code) => {
			/* istanbul ignore next */ 
			if (this.haluka.registered('Events')) {
				this.haluka.resolve<any>('Events').fire('Console.Executed', code, cmd, args, params)
			}
		})
        
	}

}

export class CommandException extends Exception {}

export interface ConsoleController extends Function {
    (_haluka: Application, _params: Array<string>, _argv: KeyValue)
}