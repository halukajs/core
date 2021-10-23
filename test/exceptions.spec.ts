import 'mocha'
import { expect } from 'chai'
import * as Exceptions from '../src/Exceptions'

describe('Exceptions', function () {

	it('should throw exception', function () {

		expect(() => {
			throw new Exceptions.HttpException()
		}).to.throw(Exceptions.HttpException)

		expect(() => {
			throw new Exceptions.Exception("Something failed")
		}).to.throw(Exceptions.Exception)

		try {
			throw new Exceptions.FatalException("Something failed again", 'ESFA')
		} catch (error) {
			expect(error.message).to.equal('Something failed again')
			expect(error.code).to.equal('ESFA')
			expect(error.type).to.equal('FatalException')	
			expect(error.getPrevious()).to.not.equal(undefined)
		}

	})

})
