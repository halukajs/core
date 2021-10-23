import 'mocha'
import { expect } from 'chai'
import { Encryptor, InvalidDecryptionPayloadException } from '../src/Encryption'
import { RuntimeException, InvalidArgumentException } from '../src/Exceptions'

describe('Encryption', function () {

	it('should throw error without key', function () {
		// @ts-ignore
		expect (() => new Encryptor()).to.throw(RuntimeException)
		expect (() => new Encryptor(Encryptor.generateKey('aes-128-cbc'), 'random')).to.throw(RuntimeException)
	})
	var enc = new Encryptor(Encryptor.generateKey('aes-128-cbc')) // 16 chars

	it('should encrypt & decrypt', function () {

		// @ts-ignore
		expect (() => enc.encrypt()).to.throw(InvalidArgumentException)

		var cipher = enc.encrypt('My Secret Value')
		expect(cipher).to.not.eq(null)

		// @ts-ignore
		expect (() => enc.decrypt()).to.throw(InvalidDecryptionPayloadException, 'Could not parse payload object.')
		expect (() => enc.decrypt(Encryptor.base64Encode(JSON.stringify([])))).to.throw(InvalidDecryptionPayloadException, 'The payload is not valid.')

		var tmp_payload = JSON.parse(Encryptor.base64Decode(cipher).toString())
		tmp_payload.mac = 'random_string'
		var tmpc = Encryptor.base64Encode(JSON.stringify(tmp_payload))

		expect(() => enc.decrypt(tmpc)).to.throw(InvalidDecryptionPayloadException, 'The MAC is invalid.')

		expect(enc.decrypt(cipher)).to.eq('My Secret Value')
	
	})

})
