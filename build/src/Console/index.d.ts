import { Exception } from '../Exceptions';
import Application from '../Application/Application';
/**
 * @name Console
 * @author Robin Panta <hacktivistic@gmail.com>
 */
/**
 * @class Console
 * Handles console routes
 *
 * @binding Haluka/Core/Console
 * @alias Console
 */
export declare class Console {
    protected commands: Array<ConsoleController>;
    protected haluka: Application;
    /**
     * @constructor
     */
    constructor(haluka: Application);
    /**
     * Register a command
     * @param {string} cmd Command name
     * @param {ConsoleController} method Command handler method
     */
    command(cmd: string, method: ConsoleController): void;
    /**
     * Returns the command handler method
     * @param cmd Command name
     */
    getCommandMethod(cmd: string): ConsoleController;
    /**
     * Returns all registered commands
     */
    getAllCommands(): Array<ConsoleController>;
    /**
     * Executes the console command
     * @param cmd Command name
     * @param args Command line arguments
     */
    execute(cmd: string, args: KeyValue, params: Array<string>): void;
}
export declare class CommandException extends Exception {
}
export interface ConsoleController extends Function {
    (_haluka: Application, _params: Array<string>, _argv: KeyValue): any;
}
