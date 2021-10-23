'use strict'

/**
 * @name Controller
 * @author Robin Panta <hacktivistic@gmail.com>
 */

export default class Controller {

	constructor () {

	}
    
	public middlewares: Array<string | Function> = []

	public middleware(middleware: string | Function) {
		this.middlewares.push(middleware)
	}

}