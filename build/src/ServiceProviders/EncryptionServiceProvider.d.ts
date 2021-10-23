import ServiceProvider from '../Application/ServiceProvider';
import { IServiceProvider } from '../Application/ServiceProvider';
/**
 * @name EncryptionServiceProvider
 * @author Robin Panta
 */
export default class EncryptionServiceProvider extends ServiceProvider implements IServiceProvider {
    /**
     * Registers Service Provider
     */
    register(): void;
}
