import { createReducer } from 'redux-act'
import { addWallets, setPayData } from '../actions'

export interface IWallet {
  blockchain: string
  address: string
  balance?: string
  nonce: number
  chainId: string | number
}

export interface IWalletDefaultState {
  error: any
  wallets: IWallet[] | Error
  payData: any
}

const walletDefaultState: IWalletDefaultState = {
  error: null,
  wallets: [],
  payData: {},
}

const walletReducer = createReducer<typeof walletDefaultState>({}, walletDefaultState)

walletReducer.on(addWallets, (_, payload) => {
  const isErr = payload instanceof Error
  return {..._,
    error: isErr ? (payload as Error).message : null,
    wallets: isErr ? null : payload,
  }
})

walletReducer.on(setPayData, (_, payload) => {
  return {..._,
    payData: payload
  }
})

export default walletReducer
