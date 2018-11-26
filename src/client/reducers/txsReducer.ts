import { createReducer } from 'redux-act'
import { setTxsOfWallet, ISetTxsOfWallet } from '../actions'

export interface ITxEth {
  id: any
}

export interface ITxEos {
  trace_count: number
  trace_list:	any[]
  trx_id: string
  timestamp: string
  receiver: string
  sender: string
  code: string
  quantity: string
  memo: string
  symbol: string
  status: string
}

const txsDefaultState = {
  eos: {},
  eth: {},
} as {
  eos: { [address: string]: ITxEos[] },
  eth: { [address: string]: ITxEth[] },
}

const tsxReducer = createReducer({}, txsDefaultState)

tsxReducer.on(setTxsOfWallet, (state, { blockchain, address, txs }: ISetTxsOfWallet): typeof txsDefaultState => ({
  ...state,
  [blockchain]: {
    ...state[blockchain],
    [address]: txs,
  },
}))

export default tsxReducer
export type IState = typeof tsxReducer
