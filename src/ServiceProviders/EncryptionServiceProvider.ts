
import ServiceProvider from '../Application/ServiceProvider'
import { IServiceProvider } from '../Application/ServiceProvider'
import { Encryptor } from '../Encryption'
import { FatalException } from '../Exceptions'

/**
 * @name EncryptionServiceProvider
 * @author Robin Panta
 */

export default class EncryptionServiceProvider extends ServiceProvider implements IServiceProvider {

	/**
	 * Registers Service Provider
	 */
	public register (): void {
		this.app.singleton('Haluka/Core/Encryptor', function () {
			const key = config('app.key')
			if (!key) throw new FatalException('No Application Key Found in .env file')
			return new Encryptor(key, config('app.cipher'))
		})
	}

}
