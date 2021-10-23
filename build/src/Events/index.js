'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
const eventemitter2_1 = require("eventemitter2");
/**
 * @name Emitter
 * @author Robin Panta
 */
class Emitter extends eventemitter2_1.EventEmitter2 {
    /**
     * @constructor
     */
    constructor(config) {
        super(config);
        this.config = config;
    }
    /**
     * Registers event listener
     * @param event Event name to listen to
     * @param listener Callback to execute on event
     */
    on(event, listener) {
        super.on(event, function (...args) {
            listener(event, ...args);
        });
        return this;
    }
    /**
     * Fires the event
     * @param event Event name to fire
     * @param args Objects to send to listener callback
     */
    fire(event, ...args) {
        return this.dispatch(event, ...args);
    }
    /**
     * Alias of [fire](#fire)
     */
    dispatch(event, ...args) {
        return super.emit(event, ...args);
    }
}
exports.Emitter = Emitter;
//# sourceMappingURL=index.js.map