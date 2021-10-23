import 'mocha'
import { expect } from 'chai'
import { Emitter } from '../src/Events'
import { EventEmitter2 } from 'eventemitter2'

describe('Emitter', function () {

	it('should be instance of EventEmitter2', function () {
		var emitter = new Emitter({})
		expect(emitter).to.be.instanceof(EventEmitter2)
	})

	var emitter = new Emitter({})

	describe('on()', function () {

		it('should register event with event as string', function () {

			// String Event
			expect(function () {
				emitter.on('boot', function (event) {
					expect(event).to.equal('boot')
				})
			}).to.not.throw()

		})

		it('should register event with array of events', function () {

			// Array Event
			var turns = 0;
			expect(function () {
				emitter.on(['shut', 'off'], (event, booter) => {
					turns = turns+1
					if (event === 'shut')
						expect(turns).to.equal(1)
					if (event === 'off')
						expect(turns).to.equal(2)

					expect(booter).to.equal('Robin')
				})
			}).to.not.throw()

		})

		it ('should register event with wildcard string', function () {

			// Wildcard Event
			var turns = 0;
			expect(function () {
				emitter.on('foo.*', (event, booter) => {

					turns = turns + 1

					if (event === 'foo.bar')
						expect(turns).to.equal(1)

					if (event === 'foo.baz')
						expect(turns).to.equal(2)

					expect(booter).to.equal('Hacktivistic')
				})
			}).to.not.throw()

		})

	})

	describe('fire()', function () {

		it('should fire registered events', function () {

			emitter.fire('boot')
			emitter.fire('shut', 'Robin')
			emitter.fire('off', 'Robin')

			emitter.fire('foo', 'Hacktivistic')
			emitter.fire('foo.bar', 'Hacktivistic')
			emitter.fire('foo.baz', 'Hacktivistic')

		})

	})

})
