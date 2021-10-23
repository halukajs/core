/**
 * @name Logger
 * @author Robin Panta <hacktivistic@gmail.com>
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston = require("winston");
const Exceptions_1 = require("./Exceptions");
const SlackHook = require("winston-slack-webhook-transport");
const _ = require("lodash");
/**
 * Logger Class
 */
class Logger {
    /**
     * Constructor
     * @param {ILoggerConfig} config Configurations for the logger
     */
    constructor(config) {
        /**
         * Logs the data using winston
         *
         * @param  {...any} args
         */
        this.log = winston.log;
        config.uses = _.castArray(config.uses);
        this.config = config;
        config.uses.forEach(transport => {
            if (config.transports[transport]) {
                const tconf = config.transports[transport];
                if (tconf.driver === undefined)
                    throw new Exceptions_1.DriverNotFoundException(`Driver config key not found for transport '${transport}'.`);
                if (typeof (this[tconf.driver + 'Transport']) === 'function')
                    this[transport + 'Transport'](tconf);
                else
                    throw new Exceptions_1.DriverNotFoundException(`Driver '${tconf.driver}' not available for transport '${transport}'.`);
            }
            else {
                throw new Exceptions_1.TransportNotFoundException(`Transport '${transport}' not found.`);
            }
        });
    }
    /**
     * Registers Console Transport to winston
     *
     * @protected
     */
    consoleTransport(config) {
        winston.add(new winston.transports.Console(config));
    }
    /**
     * Registers File Transport to winston
     *
     * @protected
     */
    fileTransport(config) {
        winston.add(new winston.transports.File(config));
    }
    httpTransport(config) {
        winston.add(new winston.transports.Http(config));
    }
    /* istanbul ignore next */
    slackTransport(config) {
        winston.add(new SlackHook(config));
    }
}
exports.Logger = Logger;
//# sourceMappingURL=index.js.map