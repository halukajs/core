import 'mocha'
import { expect } from 'chai'
import { Env } from '../src/Env'

describe('Env', function () {

	var env = new Env("")
	env = new Env(require('path').resolve('./test/support/.env.test'))

	describe('get()', function () {

		it('should fetch the environment variable', function () {

			var expectedValue = 'Haluka Test'
			expect(env.get('APP_NAME')).to.equal(expectedValue)

		})

		it('should return default value when key is not found', function () {
			expect(env.get('APP_KEY', 'tutti')).to.equal('tutti')
		})

		it('should return boolean value for text true/false or 1/0 values in env file', function () {

			expect(env.get('CACHE_ROUTES')).to.equal(true)
			expect(env.get('CACHE_VIEWS')).to.equal(false)
			expect(env.get('HAS_LOGIN')).to.equal(true)
			expect(env.get('HAS_OAUTH')).to.equal(false)

		})

	})

})
