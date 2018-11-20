import { createReducer } from 'redux-act'
import { addWallets, setPayData, setSignedData } from '../actions'

export interface IWallet {
  address: string
  balance?: string
  blockchain: string
  chainId: string | number
  nonce: number
}

const walletDefaultState = {
  error: null as any,
  payData: {},
  signedData: null as string,
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

walletReducer.on(setSignedData, (state, payload) => ({
  ...state,
  signedData: payload,
}))

export default walletReducer
export type IState = typeof walletDefaultState
