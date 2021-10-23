import ServiceProvider from '../Application/ServiceProvider';
import { IServiceProvider } from '../Application/ServiceProvider';
/**
 * @name EnvServiceProvider
 * @author Robin Panta
 */
export default class EnvServiceProvider extends ServiceProvider implements IServiceProvider {
    /**
     * Registers Service Provider
     */
    register(): void;
}
