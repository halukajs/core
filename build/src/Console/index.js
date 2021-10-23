'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandException = exports.Console = void 0;
const Exceptions_1 = require("../Exceptions");
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
class Console {
    /**
     * @constructor
     */
    constructor(haluka) {
        this.commands = [];
        this.haluka = haluka;
    }
    /**
     * Register a command
     * @param {string} cmd Command name
     * @param {ConsoleController} method Command handler method
     */
    command(cmd, method) {
        this.commands[cmd] = method;
    }
    /**
     * Returns the command handler method
     * @param cmd Command name
     */
    getCommandMethod(cmd) {
        return this.commands[cmd];
    }
    /**
     * Returns all registered commands
     */
    getAllCommands() {
        return this.commands;
    }
    /**
     * Executes the console command
     * @param cmd Command name
     * @param args Command line arguments
     */
    execute(cmd, args, params) {
        const method = this.getCommandMethod(cmd);
        if (!method) {
            throw new CommandException(`Command '${cmd}' not found.`);
        }
        const response = Promise.resolve(method(this.haluka, params, args));
        response.then((code) => {
            /* istanbul ignore next */
            if (this.haluka.registered('Events')) {
                this.haluka.resolve('Events').fire('Console.Executed', code, cmd, args, params);
            }
        });
    }
}
exports.Console = Console;
class CommandException extends Exceptions_1.Exception {
}
exports.CommandException = CommandException;
//# sourceMappingURL=index.js.map