'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
// eslint-disable-next-line
const debug = require('debug')('haluka:framework');
const Exceptions_1 = require("../Exceptions");
const requireAll = require("require-all");
const _ = require("lodash");
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
class Config {
    /**
     * @constructor
     *
     * @param {string} configPath path of config directory
     */
    constructor(configPath) {
        /**
         * Path for config directory
         */
        this.configPath = '';
        if (!configPath) {
            throw new Exceptions_1.FatalException('Unknown config path.');
        }
        try {
            this.configPath = configPath;
            this.config = requireAll({
                dirname: this.configPath,
                filter: /(.*)\.js$/
            });
            debug('loaded configs from %s', configPath);
        }
        catch (error) /* istanbul ignore next */ {
            if (error.code !== 'ENOENT')
                throw error; // error in case of invalid path
        }
    }
    /**
     * Returns the config files' path
     *
     * @return {string}
     *
     * @public
     */
    getConfigPath() {
        return this.configPath;
    }
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
    get(key, defaultValue) {
        return _.get(this.config, key, defaultValue);
    }
}
exports.Config = Config;
//# sourceMappingURL=index.js.map