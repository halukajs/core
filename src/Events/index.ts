'use strict'
import { EventEmitter2 as EventEmitter, Listener, ConstructorOptions } from 'eventemitter2'

/**
 * @name Emitter
 * @author Robin Panta
 */

export class Emitter extends EventEmitter{

	/**
	 * Holds EventEmitter2 config
	 */
	protected config: ConstructorOptions

	/**
	 * @constructor
	 */
	constructor (config: ConstructorOptions) {
		super(config)

		this.config = config
	}

	/**
	 * Registers event listener
	 * @param event Event name to listen to
	 * @param listener Callback to execute on event
	 */
	public on (event: string | Array<string>, listener: Listener): this {
		super.on(event, function(...args) {
			listener(event, ...args)
		})
		return this
	}

	/**
	 * Fires the event
	 * @param event Event name to fire
	 * @param args Objects to send to listener callback
	 */
	public fire (event: string | string[], ...args: Array<any>): boolean {
		return this.dispatch(event, ...args)
	}

	/**
	 * Alias of [fire](#fire)
	 */
	public dispatch (event: string | string[], ...args: Array<any>): boolean {
		return super.emit(event, ...args)
	}


}
