"use strict";
/**
 * @name VersionRetrievalError
 * @author Robin Panta
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionRetrievalError = void 0;
class VersionRetrievalError extends Error {
    constructor() {
        super('Cannot retrieve version from package.json');
    }
}
exports.VersionRetrievalError = VersionRetrievalError;
//# sourceMappingURL=Exceptions.js.map