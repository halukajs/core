import ServiceProvider from '../Application/ServiceProvider'
import { IServiceProvider } from '../Application/ServiceProvider'
import Validator from '../Validation'

/**
 * @name ValidationServiceProvider
 * @author Robin Panta
 */

export default class ValidationServiceProvider extends ServiceProvider implements IServiceProvider {

	/**
	 * Registers Service Provider
	 */
	public register (): void {
		this.app.register({
			provider: {
				name: 'Haluka/Core/Validator',
				alias: 'Validator'
			}, 
			content: function () {
				return Validator
			}
		})
	}
}