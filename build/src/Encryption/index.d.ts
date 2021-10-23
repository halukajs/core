/// <reference types="node" />
import { Exception } from '../Exceptions';
/**
 * @name Encryptor
 * @author Robin Panta
 */
export declare class Encryptor {
    protected encKey: string;
    protected algorithm: string;
    protected static supportedAlgos: {
        [index: string]: number;
    };
    constructor(encKey: string, algorithm?: string);
    static supported(encKey: string, algorithm: string): boolean;
    static generateKey(algorithm: string): string;
    encrypt(value: any, encoding?: 'utf8' | 'ascii' | 'binary'): string;
    decrypt(value: string, encoding?: 'utf8' | 'ascii' | 'binary'): string;
    protected hash(iv: string, value: string): string;
    static base64Encode(unencoded: any): string;
    static base64Decode(encoded: string, raw?: boolean): string | Buffer;
}
export declare class InvalidDecryptionPayloadException extends Exception {
}
