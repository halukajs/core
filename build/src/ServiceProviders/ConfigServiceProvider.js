"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceProvider_1 = require("../Application/ServiceProvider");
const Config_1 = require("../Config");
/**
 * @name ConfigServiceProvider
 * @author Robin Panta
 */
class ConfigServiceProvider extends ServiceProvider_1.default {
    /**
     * Registers Service Provider
     */
    register() {
        this.app.singleton({
            provider: {
                name: 'Haluka/Core/Config',
                alias: 'Config'
            },
            content: function (app) {
                return new Config_1.Config(app.configPath());
            }
        });
    }
}
exports.default = ConfigServiceProvider;
//# sourceMappingURL=ConfigServiceProvider.js.map