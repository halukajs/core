/**
 * @name Throwable
 * @author Robin Panta
 */

export class Throwable extends Error{

	public code: string

	public type: string

	constructor (message: string, code: string) {
		super(message)

		this.name = this.constructor.name
		this.message = message
		this.code = code
		this.type = 'Exception'

		// Tracking Pevious Errors on `process` variable.
		if (!process.__haluka_last_throwable) {
			process.__haluka_last_throwable = this
		}
	}

	public getPrevious (): Throwable | null {
		return process.__haluka_last_throwable
	}

	public toString (): string {
		return `Uncaught ${this.constructor.name} [${this.code}]: ${this.message}`
	}

}

declare let process: {
	__haluka_last_throwable: Throwable
}
