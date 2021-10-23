"use strict";
/**
 * @name Throwable
 * @author Robin Panta
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Throwable = void 0;
class Throwable extends Error {
    constructor(message, code) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.code = code;
        this.type = 'Exception';
        // Tracking Pevious Errors on `process` variable.
        if (!process.__haluka_last_throwable) {
            process.__haluka_last_throwable = this;
        }
    }
    getPrevious() {
        return process.__haluka_last_throwable;
    }
    toString() {
        return `Uncaught ${this.constructor.name} [${this.code}]: ${this.message}`;
    }
}
exports.Throwable = Throwable;
//# sourceMappingURL=Throwable.js.map