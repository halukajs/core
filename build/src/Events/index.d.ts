import { EventEmitter2 as EventEmitter, ListenerFn, ConstructorOptions } from 'eventemitter2';
/**
 * @name Emitter
 * @author Robin Panta
 */
export declare class Emitter extends EventEmitter {
    /**
     * Holds EventEmitter2 config
     */
    protected config: ConstructorOptions;
    /**
     * @constructor
     */
    constructor(config: ConstructorOptions);
    /**
     * Registers event listener
     * @param event Event name to listen to
     * @param listener Callback to execute on event
     */
    on(event: string | Array<string>, listener: ListenerFn): this;
    /**
     * Fires the event
     * @param event Event name to fire
     * @param args Objects to send to listener callback
     */
    fire(event: string | string[], ...args: Array<any>): boolean;
    /**
     * Alias of [fire](#fire)
     */
    dispatch(event: string | string[], ...args: Array<any>): boolean;
    /**
     * Fires the event async
     * @param event Event name to fire
     * @param args Objects to send to listener callback
     */
    fireAsync(event: string | string[], ...args: Array<any>): Promise<any>;
    /**
     * Alias of [fireaAsync](#fireAsync)
     */
    dispatchAsync(event: string | string[], ...args: Array<any>): Promise<any>;
}
