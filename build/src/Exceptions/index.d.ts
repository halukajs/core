import { Throwable } from './Throwable';
/**
 * @name Exception
 * @author Robin Panta
 */
export declare class Exception extends Throwable {
    constructor(message?: string, code?: string);
}
/**
 * @name FatalException
 * @author Robin Panta
 */
export declare class FatalException extends Throwable {
    constructor(message?: string, code?: string);
    toString(): string;
}
/**
 * @name Warning
 * @author Robin Panta
 */
export declare class Warning extends Throwable {
    constructor(message?: string, code?: string);
    toString(): string;
}
/**
 * @name Notice
 * @author Robin Panta
 */
export declare class Notice extends Throwable {
    constructor(message?: string, code?: string);
    toString(): string;
}
export declare class LogicalException extends Exception {
}
export declare class DomainException extends Exception {
}
export declare class InvalidArgumentException extends Exception {
}
export declare class RangeException extends Exception {
}
export declare class RuntimeException extends Exception {
}
export declare class HttpException extends Exception {
}
export declare class UnexpectedValueException extends Exception {
}
export declare class RoutingException extends Exception {
}
