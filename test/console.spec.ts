import 'mocha'
import { expect } from 'chai'
import Application from '../src/Haluka/Application'
import { Console, CommandException } from '../src/Console'
import { Container } from '../src/Container'

describe('Console', function () {

    var new_app, console

    this.beforeAll(() => {
        new_app = new Application(__dirname)
        console = new Console(new_app)
    })

    describe('#command', function () {

        it('should register a new command', function () {
            console.command('haluka@make', function (app, params, args) {
                expect(params[0]).to.equal('folder')
                // done()
                return 0
            })

            console.execute('haluka@make', {}, ['folder'])
        })

    })

    describe('#getAllCommands', function () {
        it('should return all registered commands', function () {
            expect(console.getAllCommands()).to.be.instanceOf(Array)
        })
    })

    describe('#execute', function () {
        it('should throw if command not registered', function () {
            expect(() => console.execute('doesntexist', process.argv, [])).throw(CommandException, `Command 'doesntexist' not found.`)
        })
    })

    this.afterAll(() => {
        new_app.terminate()
        //@ts-ignore
        delete(Container.instance)
    })

})
