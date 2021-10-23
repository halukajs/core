
import Application from '../Application/Application'
import ServiceProvider from '../Application/ServiceProvider'
import { IServiceProvider } from '../Application/ServiceProvider'
import { Config } from '../Config'

/**
 * @name ConfigServiceProvider
 * @author Robin Panta
 */

export default class ConfigServiceProvider extends ServiceProvider implements IServiceProvider {

	/**
	 * Registers Service Provider
	 */
	public register (): void {
		this.app.singleton({
			provider: {
				name: 'Haluka/Core/Config',
				alias: 'Config'
			},
			content: function (app: Application) {
				return new Config(app.configPath())
			}
		})
	}

}
