/**
 * @name Config
 * @author Robin Panta <hacktivistic@gmail.com>
 */
/**
 * @class Config
 * Loads all configs recursively from config path.
 *
 * @binding Haluka/Core/Config
 * @alias Config
 */
export declare class Config {
    /**
     * Stores loaded configurations
     */
    protected config: any;
    /**
     * Path for config directory
     */
    protected configPath: string;
    /**
     * @constructor
     *
     * @param {string} configPath path of config directory
     */
    constructor(configPath: string);
    /**
     * Returns the config files' path
     *
     * @return {string}
     *
     * @public
     */
    getConfigPath(): string;
    /**
     * Fetch config key from config file
     *
     * @param {string} key
     * @param {any} defaultValue
     *
     * @return {any}
     *
     * @example
     * Config.get('session.cookie')
     *
     * @public
     */
    get(key: string, defaultValue?: any): any;
}
