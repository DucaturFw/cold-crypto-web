import { createReducer } from 'redux-act'
import { addWallets, setPayData, setSignedData } from '../actions'

export interface IWallet {
  address: string
  balance?: string
  blockchain: string
  chainId: string | number
  nonce: number
}
export interface ITransaction {
  
}

const walletDefaultState = {
  error: null as any,
  payData: {},
  signedData: null as string,
  wallets: [
    {
      address: '0x3610131fbe089e110152076802e691001b62ff667dbf3de609b0a3eff2f56ca6',
      balance: '343322.13',
      blockchain: 'eth',
      chainId: 0,
      nonce: 0,
    },
    {
      address: '0xf34b5979e2362c1c416a55bee117f2f3ff6a904a10c3a56d0960f2885885cb00',
      balance: null,
      blockchain: 'eth',
      chainId: 0,
      nonce: 1,
    },
    {
      address: '0xf34b5979e2362c1c416a55bee117f2f3ff6a904a10c3a56d0960f2885885cb00',
      balance: '0.1',
      blockchain: 'btc',
      chainId: 0,
      nonce: 2,
    },
  ] as IWallet[] | Error,
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
