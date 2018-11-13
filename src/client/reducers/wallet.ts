import { createReducer } from 'redux-act'
import { addWallets, setPayData } from '../actions'

export interface IWallet {
  blockchain: string
  address: string
  balance?: string
  nonce: number
  chainId: string | number
}

const walletDefaultState = {
  error: null as any,
  payData: {},
  wallets: [] as IWallet[] | Error,
}

const walletReducer = createReducer({}, walletDefaultState)

walletReducer.on(addWallets, (state, payload) => {
  const isErr = payload instanceof Error
  return {
    ...state,
    error: isErr ? (payload as Error).message : null,
    wallets: isErr ? null : payload,
  }
})

walletReducer.on(setPayData, (state, payload) => ({
  ...state,
  payData: payload,
}))

export default walletReducer
export type IWalletDefaultState = typeof walletDefaultState
