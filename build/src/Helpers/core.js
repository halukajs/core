"use strict";
// eslint-disable
var c = global;
var Application = require('../Application/Application').default;
/* istanbul ignore else */
c.use = function (provider, params) {
    return Application.getInstance().use(provider, params);
};
/* istanbul ignore else */
c.app = function (provider = null, params = []) {
    if (provider) {
        if (!Array.isArray(params)) {
            throw new Error('Binding Resolution parameter shall be array.');
        }
        return c.use(provider, params);
    }
    return Application.instance;
};
/* istanbul ignore else */
if (!c.env) {
    c.env = function (key, fallback) {
        return app('Env').get(key, fallback);
    };
}
/* istanbul ignore else */
if (!c.config) {
    c.config = function (key, fallback) {
        return app('Config').get(key, fallback);
    };
}
/* istanbul ignore else */
if (!c.base64_encode) {
    c.base64_encode = require('../Encryption/index').Encryptor.base64Encode;
}
/* istanbul ignore else */
if (!c.base64_decode) {
    c.base64_decode = require('../Encryption/index').Encryptor.base64Decode;
}
//# sourceMappingURL=core.js.map