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

export interface IEosRemoteTxRequest<TData extends {}> extends ITxHeaders
{
	actions: IEosAction<TData>[]
}

export type ITransferTx = IEosRemoteTxRequest<{
	from: string
	to: string
	quantity: string
	memo: string
}>
