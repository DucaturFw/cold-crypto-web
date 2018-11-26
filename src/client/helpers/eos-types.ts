export interface ITxHeaders
{
	expiration: string
	ref_block_num: number
	ref_block_prefix: number
}

export interface IEosAction<TData extends {}>
{
	account: string
	name: string
	authorization: [
		{
			actor: string
			permission: "active"
		}
	],
	data: TData
}

export interface IEosRemoteTxRequestTransaction<TData extends {}> extends ITxHeaders
{
	actions: IEosAction<TData>[]
}
export interface IEosRemoteTxRequest<TData extends {}>
{
	method: string
	transaction: IEosRemoteTxRequestTransaction<TData>
}

export type IContractCall = IEosRemoteTxRequest<unknown & {}>

export type ITransferTx = IEosRemoteTxRequest<{
	from: string
	to: string
	quantity: string
	memo: string
}>
