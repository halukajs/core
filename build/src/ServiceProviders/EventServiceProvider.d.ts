import ServiceProvider from '../Application/ServiceProvider';
import { IServiceProvider } from '../Application/ServiceProvider';
/**
 * @name EventServiceProvider
 * @author Robin Panta
 */
export default class EventServiceProvider extends ServiceProvider implements IServiceProvider {
    /**
     * Registers Service Provider
     */
    register(): void;
}
