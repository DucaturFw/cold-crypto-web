import "jest-extended"

import { start, getNode, uploadFile, downloadFile } from "./"

describe.skip('basic IPFS functionality', () =>
{
	it('should start a node', async () =>
	{
		await start()
		expect(getNode()).toBeTruthy()
	}, 15000)
	it('should upload a file', async () =>
	{
		await start()
		expect(getNode()).toBeTruthy()
		let content = "hello world " + Math.random()
		// console.log(content)
		let hash = await uploadFile(content)
		// console.log(hash)
		expect(hash).toStartWith('Qm')
	}, 15000)
	it('should download a file', async () =>
	{
		await start()
		expect(getNode()).toBeTruthy()
		let hash = 'QmNz1UBzpdd4HfZ3qir3aPiRdX5a93XwTuDNyXRc6PKhWW'
		let content = await downloadFile(hash)
		// console.log(content)
		expect(content).toEqual('ABC')
		// expect(file.hash.toString()).toEqual(hash)
		// expect(file.size).toEqual(3)
		// expect(file.content).toBeTruthy()
		// expect(file.content.toString()).toEqual('ABC')
	}, 15000)
})