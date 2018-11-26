import IPFS from "ipfs"

let node: IPFS

export function getNode()
{
	return node
}

export async function start()
{
	if (node)
		return node.isOnline() ? Promise.resolve() : new Promise((res, rej) => node.on('start', res))
	
	node = new IPFS({})
	return new Promise((res, rej) => node.on('start', res))
}

export async function uploadFile(data: string | Buffer): Promise<string>
{
	await start()

	if (typeof data === "string")
		data = node.types.Buffer.from(data)
	
	let results = await node.files.add(data)
	// console.log(results)
	return results[0].hash
}

export async function downloadFile(hash: string): Promise<string>
{
	await start()
	
	let results = await node.files.get(hash)
	// console.log(results)
	return results[0].content.toString()
}