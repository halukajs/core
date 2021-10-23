import 'mocha'
import { expect } from 'chai'
import { Container } from '../src/Container'

describe('Container', function () {

	it('can be initialized', function () {
		var container = new Container()
		expect(container).to.be.instanceOf(Container)
	})

	it('can should have a single instance', function () {
		var theContainer = Container.getInstance()
		var container = Container.setInstance(theContainer)
		expect(container).to.equal(Container.getInstance())
	})

	var container = new Container()
	describe('#register', function () {

		it('can register provider', function () {

			// string provider
			container.register('Foo', (container, bar) => {
				return { name: bar }
			})

			// IBindingProvider provider
			container.bind({
				provider: 'Bar',
				alias: 'Baz'
			}, (container) => {
				return { foo: container.resolve('Foo', ['Candy']) }
			})
		})

	})

	describe('#singleton', function () {

		it('should register provider as singleton', function () {
			container.singleton({
				provider: 'Single',
				alias: 'Mingle'
			}, function (container) {
				return { data: container.resolve('Baz') }
			})

			expect(container.isSingleton('Mingle')).to.equal(true)
		})

	})

	describe('#addResolvingEvent', function () {

		it('should add a resolution event', function () {
			container.addResolvingEvent('object', (provider, object) => {
				expect(container.isRegistered(provider)).to.equal(true)
				expect(container.get('Foo').prototype).to.equal(object.prototype)
			})

			container.addResolvingEvent('Single', (provider, object) => {
				expect(container.get(provider)).to.haveOwnProperty('data')
			})
		})

	})



	describe('#resolve', function () {

		it('can resolve string providers', function () {
			var duck = container.resolve('Foo', ['Fooing'], false)
			expect(duck.name).to.equal('Fooing')
		})

		it('can resolve IBindingProvider providers', function () {

			var bar1 = container.resolve('Bar')
			var bar2 = container.resolve('Baz')
			var bar3 = container.resolve('Bar')

			expect(bar1).to.not.equal(bar2).to.not.equal(bar3)
			expect(bar1.foo.name).to.equal(bar2.foo.name).to.equal('Candy')


			var single1 = container.resolve('Single')
			var single2 = container.resolve('Mingle')
			var single3 = container.resolve('Single')

			expect(single1).to.equal(single2).to.equal(single3)

			container.unregister('Foo')
			container.unregister('Bar')
			container.unregister('Single')

		})

		it('should throw BindingResolutionException when provider is not registered', function () {

			// TODO:
			expect(() => {
				container.resolve('Foo')
			}).to.throw('Provider [Foo] is not registered.')

		})

	})

	describe('#save', function () {

		it('can save instances for subsequent resolution', function () {

			// string provider
			container.save('Ramailo', { version: '1.0.1' })
			expect(container.use('Ramailo')).to.deep.equal({ version: '1.0.1' })

			// IBindingProvider provider
			container.save({
				provider: 'Ramailo',
				alias: 'Dhamailo'
			}, { marK: 'down' })
			expect(container.use('Ramailo')).to.deep.equal({ marK: 'down' })
		})

	})

	describe('#isSingleton', function () {

		it('should return false for unregistered provider', function () {
			expect(container.isSingleton('Muk')).to.equal(false)
		})

	})

})
