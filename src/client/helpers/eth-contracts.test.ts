import "jest-extended"
import { getPublicMethodNames } from "./eth-contracts"

describe('contract ABI processing', () =>
{
	it.each([
		['abi1', [
			'transferOwnership(address)',
			'getCert(string,string,string)',
			'getCertById(bytes32)',
			'setCertById(bytes32,string,string,string)',
			'issuedCertificates(bytes32)',
			'owner()'
		]],
		['abi2', [
			'owner()',
			'name()',
			'decimals()',
			'totalSupply()',
			'symbol()',
			'transferOwnership(address)',
			'balanceOf(address)',
			'transfer(address,uint256)',
			'allowance(address,address)',
			'transferFrom(address,address,uint256)',
			'approve(address,uint256)',
			'increaseApproval(address,uint256)',
			'decreaseApproval(address,uint256)',
			'cap()',
			'basePrice()',
			'tokensSold()',
			'tokenReserve()',
			'remainingTokens()',
			'startIco()',
			'finalizeIco()',
		]]
	])('should parse ABI', (fname: string, expectedMethods: string[]) =>
	{
		const abi1 = require(`./__tests__/${fname}.json`)
		let methods = getPublicMethodNames(abi1).sort()
		expect(methods).toIncludeSameMembers(expectedMethods.sort())
	})
})