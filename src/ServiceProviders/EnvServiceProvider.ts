import Application from '../Application/Application'
import ServiceProvider from '../Application/ServiceProvider'
import { IServiceProvider } from '../Application/ServiceProvider'
import { Env } from '../Env'

/**
 * @name EnvServiceProvider
 * @author Robin Panta
 */

export default class EnvServiceProvider extends ServiceProvider implements IServiceProvider {

	/**
	 * Registers Service Provider
	 */
	public register (): void {
		this.app.singleton({
			provider: {
				name: 'Haluka/Core/Env',
				alias: 'Env'
			},
			content: function (app: Application) {
				return new Env(app.path('.env'))
			}
		})
	}

}
