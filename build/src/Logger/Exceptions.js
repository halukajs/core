'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverNotFoundException = exports.TransportNotFoundException = void 0;
const Exceptions_1 = require("../Exceptions");
/**
 * @name TransportNotFoundException
 * @author Robin Panta
 */
class TransportNotFoundException extends Exceptions_1.Exception {
}
exports.TransportNotFoundException = TransportNotFoundException;
/**
 * @name DriverNotFoundException
 * @author Robin Panta
 */
class DriverNotFoundException extends Exceptions_1.Exception {
}
exports.DriverNotFoundException = DriverNotFoundException;
//# sourceMappingURL=Exceptions.js.map