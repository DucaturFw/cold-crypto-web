export interface IAbiArgument
{
	name: string
	type: 'string' | 'address' | 'bytes32' | 'uint256'
}
export interface IAbiEventInput extends IAbiArgument
{
	indexed: boolean
}
export interface IAbiFunctionEntry
{
	type: 'function'
	constant: boolean
	inputs: IAbiArgument[]
	name: string
	outputs: IAbiArgument[]
	payable: boolean
	stateMutability: string
}
export interface IAbiEventEntry
{
	type: 'event'
	anonymous: boolean
	inputs: IAbiEventInput[]
	name: string
}
export type ABI = (IAbiFunctionEntry | IAbiEventEntry)[]

function isFunction(abiEntry: IAbiFunctionEntry | IAbiEventEntry): abiEntry is IAbiFunctionEntry
{
	return abiEntry.type == 'function'
}

export function methodSignature(abiEntry: IAbiFunctionEntry): string
{
	return `${abiEntry.name}(${abiEntry.inputs.map(x => x.type).join(',')})`
}

export function getPublicMethodNames(abi: ABI): string[]
{
	// console.log(abi.filter(isFunction))
	return abi.filter(isFunction).map(methodSignature)
}
export function isPayable(abi: ABI, methodName: string): boolean
{
	let f = abi.filter(isFunction).find(x => methodSignature(x) == methodName)
	if (!f)
		throw "function not found"
	return f.payable
}
export function getArguments(abi: ABI, methodName: string): IAbiArgument[]
{
	return abi.filter(isFunction).find(x => methodSignature(x) == methodName).inputs
}