import ServiceProvider from '../Application/ServiceProvider';
import { IServiceProvider } from '../Application/ServiceProvider';
/**
 * @name LogServiceProvider
 * @author Robin Panta
 */
export default class LogServiceProvider extends ServiceProvider implements IServiceProvider {
    /**
     * Registers Service Provider
     */
    register(): void;
}
