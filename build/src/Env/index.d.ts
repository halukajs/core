/**
 * @class Env
 * Load and access Environment Variables
 *
 * @binding Haluka/Core/Env
 * @alias Env
 */
export declare class Env {
    /**
     * Path for loaded environment file
     */
    protected envFilePath: string;
    /**
     * @constructor
     *
     * @param {string} envFilePath
     */
    constructor(envFilePath: string);
    /**
     * Return environment value from environment file
     *
     * @param {string} key
     * @param {any} defaultValue
     *
     * @return {any}
     *
     * @example
     * Env.get('APP_NAME')
     * Env.get('CACHE_ROUTES', true)
     *
     * @public
     */
    get(key: string, defaultValue?: any): any;
}
