import "jest-extended"
import { getPublicMethodNames } from "./eth-contracts"

describe('contract ABI processing', () =>
{
	it('should parse ABI', () =>
	{
		const abi1 = require("./__tests__/abi1.json")
		let methods = getPublicMethodNames(abi1)
		const expectedMethods = [
			'transferOwnership(address)',
			'getCert(string,string,string)',
			'getCertById(bytes32)',
			'setCertById(bytes32,string,string,string)',
			'issuedCertificates(bytes32)',
			'owner()'
		]
		expect(methods).toIncludeSameMembers(expectedMethods)
	})
})