"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceProvider_1 = require("../Application/ServiceProvider");
const Encryption_1 = require("../Encryption");
const Exceptions_1 = require("../Exceptions");
/**
 * @name EncryptionServiceProvider
 * @author Robin Panta
 */
class EncryptionServiceProvider extends ServiceProvider_1.default {
    /**
     * Registers Service Provider
     */
    register() {
        this.app.singleton('Haluka/Core/Encryptor', function () {
            const key = config('app.key');
            if (!key)
                throw new Exceptions_1.FatalException('No Application Key Found in .env file');
            return new Encryption_1.Encryptor(key, config('app.cipher'));
        });
    }
}
exports.default = EncryptionServiceProvider;
//# sourceMappingURL=EncryptionServiceProvider.js.map