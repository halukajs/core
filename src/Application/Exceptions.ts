/**
 * @name VersionRetrievalError
 * @author Robin Panta
 */

export class VersionRetrievalError extends Error {

	constructor () {
		super('Cannot retrieve version from package.json')
	}
}
