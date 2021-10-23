
import { Config } from '../Config'
import Application from '../Application/Application'
import ServiceProvider from '../Application/ServiceProvider'
import { IServiceProvider } from '../Application/ServiceProvider'
import { Emitter } from '../Events'

/**
 * @name EventServiceProvider
 * @author Robin Panta
 */

export default class EventServiceProvider extends ServiceProvider implements IServiceProvider {

	/**
	 * Registers Service Provider
	 */
	public register (): void {
		this.app.singleton({
			provider: {
				name: 'Haluka/Core/Events',
				alias: 'Events'
			}, 
			content: function (app: Application) {
				return new Emitter(app.get<Config>('Haluka/Core/Config').get('events'))
			}
		})
	}

}
