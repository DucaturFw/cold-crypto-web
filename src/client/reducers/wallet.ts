import { createReducer } from 'redux-act'
import { addWallets } from '../actions'

export interface IWallet {
  blockchain: string
  address: string
  balance?: string
  nonce: number
  chainId: string | number
}

//TODO: Move to types
export interface ITransaction {
  nonce: number
  gasPrice: string
  to: number
  value: string
}

export interface IWalletDefaultState {
  error: any
  wallets: IWallet[] | Error
}

const walletDefaultState: IWalletDefaultState = {
  error: null,
  wallets: [],
}

const walletReducer = createReducer<typeof walletDefaultState>({}, walletDefaultState)

walletReducer.on(addWallets, (_, payload) => {
  const isErr = payload instanceof Error
  return {
    error: isErr ? (payload as Error).message : null,
    wallets: isErr ? null : payload,
  }
})

export default walletReducer
