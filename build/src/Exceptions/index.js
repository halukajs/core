"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingException = exports.UnexpectedValueException = exports.HttpException = exports.RuntimeException = exports.RangeException = exports.InvalidArgumentException = exports.DomainException = exports.LogicalException = exports.Notice = exports.Warning = exports.FatalException = exports.Exception = void 0;
const Throwable_1 = require("./Throwable");
/**
 * @name Exception
 * @author Robin Panta
 */
class Exception extends Throwable_1.Throwable {
    constructor(message = '', code = 'EUNC') {
        super(message, code);
        Error.captureStackTrace(this, Exception);
    }
}
exports.Exception = Exception;
/**
 * @name FatalException
 * @author Robin Panta
 */
/* istanbul ignore next */
class FatalException extends Throwable_1.Throwable {
    constructor(message = '', code = 'EUNC') {
        super(message, code);
        Error.captureStackTrace(this, FatalException);
        this.type = 'FatalException';
    }
    toString() {
        return `Haluka Fatal Exception: \n\t ${super.toString()}`;
    }
}
exports.FatalException = FatalException;
/**
 * @name Warning
 * @author Robin Panta
 */
/* istanbul ignore next */
class Warning extends Throwable_1.Throwable {
    constructor(message = '', code = 'EUNC') {
        super(message, code);
        Error.captureStackTrace(this, Warning);
        this.type = 'Warning';
    }
    toString() {
        return `Haluka Warning: \n\t ${this.constructor.name} [${this.code}]: ${this.message}`;
    }
}
exports.Warning = Warning;
/**
 * @name Notice
 * @author Robin Panta
 */
/* istanbul ignore next */
class Notice extends Throwable_1.Throwable {
    constructor(message = '', code = 'EUNC') {
        super(message, code);
        Error.captureStackTrace(this, Notice);
        this.type = 'Notice';
    }
    toString() {
        return `Haluka Notice: \n\t ${this.constructor.name} [${this.code}]: ${this.message}`;
    }
}
exports.Notice = Notice;
// MORE EXCEPTIONS 
class LogicalException extends Exception {
}
exports.LogicalException = LogicalException;
class DomainException extends Exception {
}
exports.DomainException = DomainException;
class InvalidArgumentException extends Exception {
}
exports.InvalidArgumentException = InvalidArgumentException;
class RangeException extends Exception {
}
exports.RangeException = RangeException;
class RuntimeException extends Exception {
}
exports.RuntimeException = RuntimeException;
class HttpException extends Exception {
}
exports.HttpException = HttpException;
class UnexpectedValueException extends Exception {
}
exports.UnexpectedValueException = UnexpectedValueException;
class RoutingException extends Exception {
}
exports.RoutingException = RoutingException;
//# sourceMappingURL=index.js.map