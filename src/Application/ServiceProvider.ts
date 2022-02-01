'use strict'

/**
 * @name ServiceProvider
 * @author Robin Panta
 */

import Application from './Application'

export default class ServiceProvider implements IServiceProvider{

	protected app: Application

	constructor (app: Application) {
		this.app = app
	}

	/* istanbul ignore next */
	public register ():void {
		throw new TypeError('Method not implemented.')
	}

}

export interface IServiceProvider {

	register (): void
	unregister? (): void

}
