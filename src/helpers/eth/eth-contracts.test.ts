import "jest-extended"
import { getPublicMethodNames, isErc20 } from "./eth-contracts"

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
	/* it('regression erc20 test with uint32 in decimals', () =>
	{
		const bigAbi = require(`./__tests__/abi2.json`)
		const tokenAbi = require(`./erc20abi.json`)
		const tokenAbi32 = require(`./erc20abi.decimals32.json`)
		expect(implementsInterface(bigAbi, tokenAbi)).toBeFalse()
		expect(implementsInterface(bigAbi, tokenAbi32)).toBeTrue()
		const bigAbiIncorrect = bigAbi.slice(1)
		expect(implementsInterface(bigAbiIncorrect, tokenAbi)).toBeFalse()
		expect(implementsInterface(bigAbiIncorrect, tokenAbi32)).toBeFalse()
	}) */
	it('should compare erc20 interfaces', () =>
	{
		const bigAbi = require(`./__tests__/abi2.json`)
		expect(isErc20(bigAbi)).toBeTrue()
		const bigAbiIncorrect = bigAbi.slice(1, 5)
		expect(isErc20(bigAbiIncorrect)).toBeFalse()
	})
})