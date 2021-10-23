"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidDecryptionPayloadException = exports.Encryptor = void 0;
const randomstring = require("randomstring");
const crypto = require("crypto");
const Exceptions_1 = require("../Exceptions");
const util_1 = require("util");
/**
 * @name Encryptor
 * @author Robin Panta
 */
class Encryptor {
    constructor(encKey, algorithm = 'AES-128-CBC') {
        if (!encKey) {
            throw new Exceptions_1.RuntimeException('Application key is necessary for encryption.');
        }
        if (!Encryptor.supported(encKey, algorithm)) {
            throw new Exceptions_1.RuntimeException(`The encryption algorithm '${algorithm}' is not supported or the encryption key used doesn't match the required length.`, 'E_UNSUPPORTED_ALGORITHM');
        }
        this.encKey = encKey;
        this.algorithm = algorithm.toLowerCase();
    }
    static supported(encKey, algorithm) {
        return algorithm.toLowerCase() in Encryptor.supportedAlgos && encKey.length === Encryptor.supportedAlgos[algorithm.toLowerCase()];
    }
    static generateKey(algorithm) {
        return randomstring.generate(Encryptor.supportedAlgos[algorithm]);
    }
    encrypt(value, encoding = 'utf8') {
        if (!value) {
            throw new Exceptions_1.InvalidArgumentException('Missing argument to encrypt.', 'E_MISSING_PARAMETER');
        }
        const iv = crypto.randomBytes(Encryptor.supportedAlgos[this.algorithm]);
        const cipher = crypto.createCipheriv(this.algorithm, this.encKey, iv);
        value = cipher.update(value, encoding, 'base64');
        value += cipher.final('base64');
        // Once we have the encrypted value we will go ahead base64 encode the input
        // vector and create the MAC for the encrypted value so we can verify its
        // authenticity. Then, we'll JSON encode the data in a "payload" array.
        const ivStr = Encryptor.base64Encode(iv);
        const mac = this.hash(ivStr, value);
        const json = JSON.stringify({ iv: ivStr, value: value, mac: mac });
        return Encryptor.base64Encode(json);
    }
    decrypt(value, encoding = 'utf8') {
        let payload;
        try {
            payload = JSON.parse(Encryptor.base64Decode(value).toString());
        }
        catch (error) {
            throw new InvalidDecryptionPayloadException('Could not parse payload object.');
        }
        const ret = ['iv', 'value', 'mac'].every((a) => {
            return Object.keys(payload).includes(a);
        });
        if (!(0, util_1.isObject)(payload) || !ret || Encryptor.base64Decode(payload['iv'], true).length != Encryptor.supportedAlgos[this.algorithm]) {
            throw new InvalidDecryptionPayloadException('The payload is not valid.');
        }
        // check MAC from the payload
        const mac_key = Encryptor.generateKey(this.algorithm);
        const calculated = crypto.createHmac('sha256', mac_key).update(this.hash(payload.iv, payload.value)).digest();
        if (!crypto.timingSafeEqual(crypto.createHmac('sha256', mac_key).update(payload.mac).digest(), calculated)) {
            throw new InvalidDecryptionPayloadException('The MAC is invalid.');
        }
        const iv = Encryptor.base64Decode(payload.iv, true);
        const decipher = crypto.createDecipheriv(this.algorithm, this.encKey, iv);
        let decrypted = decipher.update(payload.value, 'base64', encoding);
        decrypted += decipher.final(encoding);
        return decrypted;
    }
    hash(iv, value) {
        return crypto.createHmac('sha256', this.encKey).update(iv + value).digest('hex');
    }
    static base64Encode(unencoded) {
        return Buffer.from(unencoded).toString('base64');
    }
    static base64Decode(encoded, raw) {
        if (raw) {
            return Buffer.from(encoded, 'base64');
        }
        return Buffer.from(encoded, 'base64').toString('utf8');
    }
}
exports.Encryptor = Encryptor;
Encryptor.supportedAlgos = { 'aes-128-cbc': 16, 'aes-256-cbc': 32 };
class InvalidDecryptionPayloadException extends Exceptions_1.Exception {
}
exports.InvalidDecryptionPayloadException = InvalidDecryptionPayloadException;
//# sourceMappingURL=index.js.map