import 'mocha'
import { expect } from 'chai'
import { Config } from '../src/Config'

describe('Config', function () {

    expect(() => {
        new Config("")
    }).to.throw("Unknown config path.")

	const config = new Config(require('path').resolve('./test/config'))

	it('should preload config files from config path', function () {
        
		var expectedConfigPath = require('path').resolve('./test/config')
		expect(config.getConfigPath()).to.equal(expectedConfigPath)

	})

	describe('get()', function () {

		it('should fetch the config\'s setting', function () {

			var expectedValue = {
				foo : 'bar'
			}
			expect(config.get('test')).to.deep.equal(expectedValue)
			expect(config.get('test.foo')).to.equal('bar')

		})

		it('should return default value when config is not found', function () {
			expect(config.get('test.baz', 'tutti')).to.equal('tutti')
		})

	})

})
