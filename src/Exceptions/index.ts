import { Throwable } from './Throwable'

/**
 * @name Exception
 * @author Robin Panta
 */

export class Exception extends Throwable {

	constructor (message = '', code = 'EUNC') {
		super(message, code)
		Error.captureStackTrace(this, Exception)
	}

}

/**
 * @name FatalException
 * @author Robin Panta
 */
/* istanbul ignore next */
export class FatalException extends Throwable {

	constructor (message = '', code = 'EUNC') {
		super(message, code)
		Error.captureStackTrace(this, FatalException)
		this.type = 'FatalException'
	}

	public toString (): string {
		return `Haluka Fatal Exception: \n\t ${super.toString()}`
	}

}


/**
 * @name Warning
 * @author Robin Panta
 */
/* istanbul ignore next */
export class Warning extends Throwable {

	constructor (message = '', code = 'EUNC') {
		super(message, code)
		Error.captureStackTrace(this, Warning)
		this.type = 'Warning'
	}

	public toString (): string {
		return `Haluka Warning: \n\t ${this.constructor.name} [${this.code}]: ${this.message}`
	}

}

/**
 * @name Notice
 * @author Robin Panta
 */
/* istanbul ignore next */
export class Notice extends Throwable {

	constructor (message = '', code = 'EUNC') {
		super(message, code)
		Error.captureStackTrace(this, Notice)
		this.type = 'Notice'
	}

	public toString (): string {
		return `Haluka Notice: \n\t ${this.constructor.name} [${this.code}]: ${this.message}`
	}

}


// MORE EXCEPTIONS 
export class LogicalException extends Exception {}
export class DomainException extends Exception {}
export class InvalidArgumentException extends Exception {}
export class RangeException extends Exception {}
export class RuntimeException extends Exception {}
export class HttpException extends Exception {}
export class UnexpectedValueException extends Exception {}
export class RoutingException extends Exception {}