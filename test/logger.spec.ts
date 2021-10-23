import 'mocha'
import { expect } from 'chai'
import { Logger } from '../src/Logger'

describe('Logger', function () {

	var Config = {

		uses: ['console', 'file', 'http'],

		transports: {

			console: {
				driver: 'console',
				silent: true,
			},

			file: {
				driver: 'file',
				filename: 'test/Log/pico.log',
			},

			http: {
				driver: 'http',
				host: 'localhost',
				port: '80',
				path: '/',
			},
		}

	}

	var logger = new Logger(Config)

	it('should throw error if transport or driver not found', function () {

		expect(() => new Logger({ uses:'notransport', transports:{}})).to.throw("Transport 'notransport' not found.")

		expect(() => new Logger({uses:'nodriver', transports:{nodriver:{}}})).to.throw("Driver config key not found for transport 'nodriver'.")

		expect(() => new Logger({uses:'nodriver', transports:{nodriver:{driver:'lol'}}})).to.throw("Driver 'lol' not available for transport 'nodriver'.")

	})

	describe('log()', function () {

		it('should log a message', async function () {

			logger.log('info', 'Logging from Test')
			

		})
	})

})
