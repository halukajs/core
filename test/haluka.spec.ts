import 'mocha'
import { expect } from 'chai'
import Application, { VersionRetrievalError } from '../src/Application/Application'
import { Logger } from '../src/Logger'
import * as path from 'path'
// import * as haluka from "../src/index";

describe('Haluka', function () {

	it('shall be instantiable', function () {
		Application.getInstance()
		
		// haluka
		var app = new Application()
		var app1 = new Application('./test/support')
		
		expect(Application.getInstance()).to.equal(app1)
		process.env.APP_ENV = 'test'

		expect(app.environment('test')).to.equal(true)

		expect(() => app1.version()).to.throw(VersionRetrievalError)
		app.terminate()
		app1.terminate()
	})

	it('shall work', function () {
		var app = new Application(__dirname + '/example')

		expect(app.version()).to.eq(require('./example/package.json').version)
		expect(app.isLocal()).to.eq(false)
		expect(app.isProduction()).to.eq(false)
		expect(app.isTesting()).to.eq(true)
		expect(app.isDebugging()).to.eq(false)
		expect(app.isCLI()).to.eq(false)


		app.boot({
			providers: [],
			aliases: { DB: 'Haluka/Database'},
			globalMiddlewares: [],
			namedMiddlewares: {}
		}, () => 0)

		app.terminate()

	})

	it('shall terminate', function () {
		var app = new Application('./test')
		
		app.boot({
			providers: [],
			aliases: { DB: 'Haluka/Database'},
			globalMiddlewares: [],
			namedMiddlewares: {}
		})

		app.terminating(() => {
			var log: Logger = app.resolve<Logger>('Log')
			log.log('warn', 'Application is terminating.')
		})

		app.terminate()
	})

	describe('#path methods', function () {

		it('should return respective path', function () {

			var app = new Application('./test')

			expect(app.appPath()).to.eq(path.join(__dirname, 'app'))
			expect(app.resourcesPath()).to.eq(path.join(__dirname, 'resources'))
			expect(app.routesPath()).to.eq(path.join(__dirname, 'routes'))
			expect(app.storagePath()).to.eq(path.join(__dirname, 'storage'))
			expect(app.systemPath()).to.eq(path.join(__dirname, 'system'))
			expect(app.testPath()).to.eq(path.join(__dirname, 'test'))
			expect(app.commandsPath()).to.eq(path.join(__dirname, 'app', 'Commands'))
			expect(app.controllersPath()).to.eq(path.join(__dirname, 'app', 'Controllers'))
			expect(app.eventsPath()).to.eq(path.join(__dirname, 'app', 'Events'))
			expect(app.exceptionsPath()).to.eq(path.join(__dirname, 'app', 'Exceptions'))
			expect(app.middlewarePath()).to.eq(path.join(__dirname, 'app', 'Middleware'))
			expect(app.modelPath()).to.eq(path.join(__dirname, 'app', 'Model'))
			expect(app.providersPath()).to.eq(path.join(__dirname, 'app', 'Providers'))

			app.terminate()

		})

	})

})
