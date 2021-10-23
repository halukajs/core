/**
 * @name Throwable
 * @author Robin Panta
 */
export declare class Throwable extends Error {
    code: string;
    type: string;
    constructor(message: string, code: string);
    getPrevious(): Throwable | null;
    toString(): string;
}
