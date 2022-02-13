/**
 * @module ApplicationData
 * @author Robin Panta
 * 
 * (c) Robin Panta <hacktivistic@gmail.com>
 */

export default interface ApplicationData {

    /**
     * Providers that the application will register for use
     */
    providers: Array<string>,

    /**
     * Aliases for Providers
     */
    aliases: {[key:string]: string},

    /**
     * Middlewares that are registered globally for all the routes. 
     */
    globalMiddlewares: Array<string>,

    /**
     * Middleware(s) with names which can be registered as per routes in group.
     */
    namedMiddlewares: {[key:string]: Array<string>}
    
}