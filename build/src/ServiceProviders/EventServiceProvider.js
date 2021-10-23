"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceProvider_1 = require("../Application/ServiceProvider");
const Events_1 = require("../Events");
/**
 * @name EventServiceProvider
 * @author Robin Panta
 */
class EventServiceProvider extends ServiceProvider_1.default {
    /**
     * Registers Service Provider
     */
    register() {
        this.app.singleton({
            provider: {
                name: 'Haluka/Core/Events',
                alias: 'Events'
            },
            content: function (app) {
                return new Events_1.Emitter(app.get('Haluka/Core/Config').get('events'));
            }
        });
    }
}
exports.default = EventServiceProvider;
//# sourceMappingURL=EventServiceProvider.js.map