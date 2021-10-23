"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceProvider_1 = require("../Application/ServiceProvider");
const Logger_1 = require("../Logger");
/**
 * @name LogServiceProvider
 * @author Robin Panta
 */
class LogServiceProvider extends ServiceProvider_1.default {
    /**
     * Registers Service Provider
     */
    register() {
        this.app.register({
            provider: {
                name: 'Haluka/Core/Logger',
                alias: 'Log'
            },
            content: function (app) {
                return new Logger_1.Logger(app.get('Haluka/Core/Config').get('log'));
            }
        });
    }
}
exports.default = LogServiceProvider;
//# sourceMappingURL=LogServiceProvider.js.map