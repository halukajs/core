"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceProvider_1 = require("../Application/ServiceProvider");
const Env_1 = require("../Env");
/**
 * @name EnvServiceProvider
 * @author Robin Panta
 */
class EnvServiceProvider extends ServiceProvider_1.default {
    /**
     * Registers Service Provider
     */
    register() {
        this.app.singleton({
            provider: {
                name: 'Haluka/Core/Env',
                alias: 'Env'
            },
            content: function (app) {
                return new Env_1.Env(app.path('.env'));
            }
        });
    }
}
exports.default = EnvServiceProvider;
//# sourceMappingURL=EnvServiceProvider.js.map