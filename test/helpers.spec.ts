import 'mocha'
import { expect } from 'chai'
import Application from '../src/Application/Application'

describe('Helpers', function () {

	describe('core', function () {

        describe('#app', function () {

            it('should return app', function () {
                
                var application = new Application('./test/')

                expect(application).to.be.instanceOf(Application)
                expect(app()).to.be.instanceOf(Application)
                expect(Application.getInstance()).to.eql(application)
                expect(Application.getInstance()).to.eql(app())

                application.save({name :'APP1', alias: 'APPL1'}, { a: 'b' })
                app().save({name :'APP2', alias: 'APPL2'}, { b: 'c' })

                expect(app()).to.deep.equal(application)
                
                expect(() => app('config', null)).to.throw(Error)

                application.terminate()
            })

        })

        describe('#base64_encode & base64_decode', function () {
            it('should encode plaintext to base64 and decode base64 to plaintext', function () {
                expect(base64_decode(base64_encode('My Value'))).to.eq('My Value')
            })
        })
        
	})

})
