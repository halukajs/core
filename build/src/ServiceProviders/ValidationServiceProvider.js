"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceProvider_1 = require("../Application/ServiceProvider");
const Validation_1 = require("../Validation");
/**
 * @name ValidationServiceProvider
 * @author Robin Panta
 */
class ValidationServiceProvider extends ServiceProvider_1.default {
    /**
     * Registers Service Provider
     */
    register() {
        this.app.register({
            provider: {
                name: 'Haluka/Core/Validator',
                alias: 'Validator'
            },
            content: function (app) {
                return Validation_1.default;
            }
        });
    }
}
exports.default = ValidationServiceProvider;
//# sourceMappingURL=ValidationServiceProvider.js.map