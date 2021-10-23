
import { Config } from '../Config'
import Application from '../Application/Application'
import ServiceProvider from '../Application/ServiceProvider'
import { IServiceProvider } from '../Application/ServiceProvider'
import { Logger } from '../Logger'

/**
 * @name LogServiceProvider
 * @author Robin Panta
 */

export default class LogServiceProvider extends ServiceProvider implements IServiceProvider {

	/**
	 * Registers Service Provider
	 */
	public register (): void {
		this.app.bind({
			provider: {
				name: 'Haluka/Core/Logger',
				alias: 'Log'
			}, 
			content: function (app: Application, config?) {
				return new Logger(config || app.get<Config>('Haluka/Core/Config').get('log'))
			}
		})
	}

}
