'use strict'

module.exports = {

	/**
	 * Whether the application fires and listens to Wildcard events.
	 * @default false
	 */
	wildcard: true,

	/**
	 * The delimiter used to segment namespaces.
	 * @default "."
	 */
	delimiter: ".",

	/**
	 * Set this to "true" if you want to emit the newListener event.
	 * @default true
	 */
	newListener: true,

	/**
	 * The maximum amount of listeners that can be assigned to an event.
	 * @default 10
	 */
	maxListeners: 10,

	/**
	 * Show event name in memory leak message when more than maximum amount of listeners are assigned.
	 * @default false
	 */
	verboseMemoryLeak: false

}
