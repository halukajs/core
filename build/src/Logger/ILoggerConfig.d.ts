export default interface ILoggerConfig {
    /**
        |--------------------------------------------------------------------------
        | Uses
        |--------------------------------------------------------------------------
        |
        | Transport(s) to use for logging. Multiple transports can be used.
        |
        | @example:
        | 	uses: 'file'
        |   or,
        |   uses: ['file', 'console']
        |
        */
    uses: string | string[];
    transports: object;
}
