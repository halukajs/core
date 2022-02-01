/**
 * @name ServiceProvider
 * @author Robin Panta
 */
import Application from './Application';
export default class ServiceProvider implements IServiceProvider {
    protected app: Application;
    constructor(app: Application);
    register(): void;
}
export interface IServiceProvider {
    register(): void;
    unregister?(): void;
}
