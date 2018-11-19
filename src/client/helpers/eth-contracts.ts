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
export interface IAbiConstructorEntry
{
	type: "constructor"
	// TODO: incomplete
}
export interface IAbiFallbackEntry
{
	type: "fallback"
	// TODO: incomplete
}
export type IAbiEntry = IAbiFallbackEntry | IAbiFunctionEntry | IAbiEventEntry | IAbiConstructorEntry
export type ABI = IAbiEntry[]

function isFunction(abiEntry: IAbiEntry): abiEntry is IAbiFunctionEntry
{
	return abiEntry.type == 'function'
}
function isEvent(abiEntry: IAbiEntry): abiEntry is IAbiEventEntry
{
	return abiEntry.type == 'event'
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

const erc20: ABI = require("./erc20abi.json")

export function isErc20(abi: ABI): boolean
{
	return implementsInterface(abi, erc20)
}
export function implementsInterface(abi: ABI, intrfc: ABI): boolean
{
	for (let i = 0; i < intrfc.length; i++)
	{
		let entry = intrfc[i]
		let exists = abi.some(x => entryEquals(entry, x))
		// console.log(`[${entry.type}]${(entry as any).name || ''}: ${exists}`)
		if (!exists)
			return false
	}
	return true
}
export function entryEquals(e1: IAbiEntry, e2: IAbiEntry): boolean
{
	if (e1.type != e2.type)
		return false
	switch(e1.type)
	{
		case "event":
			return eventEquals(e1, e2 as IAbiEventEntry)
		case "function":
			return functionEquals(e1, e2 as IAbiFunctionEntry)
	}
}
export function functionEquals(f1: IAbiFunctionEntry, f2: IAbiFunctionEntry): boolean
{
	let str = (f: IAbiFunctionEntry) => `${f.name}(${f.inputs.map(x => x.type)}):${f.outputs.map(x => x.type)}${
		f.payable ? ' payable' : ''
	}`
	// console.log(`comparing ${str(f1)} with ${str(f2)}`)
	if (f1.name != f2.name)
		return false
	
	if (f1.payable && !f2.payable) // if reference function is payable, second should also
		return false               // be payable. doesn't matter otherwise.
	
	if (!tupleEquivalent(f1.inputs, f2.inputs))
		return false
	if (!tupleEquivalent(f1.outputs, f2.outputs))
		return false
	
	return true
}
export function eventEquals(e1: IAbiEventEntry, e2: IAbiEventEntry): boolean
{
	if (e1.name != e2.name)
		return false
	if (!tupleEquivalent(e1.inputs, e2.inputs))
		return false
	
	return true
}
export function tupleEquivalent(inputs1: {type: string}[], inputs2: {type: string}[]): boolean
{
	if (inputs1.length != inputs2.length)
		return false
	
	for (let i = 0; i < inputs1.length; i++)
	{
		if (inputs1[i].type != inputs2[i].type)
			return false
	}
	return true
}