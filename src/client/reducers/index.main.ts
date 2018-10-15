import { combineReducers } from 'redux'
import { IWallet } from '../model'
import * as walletReducder from './Wallet'

export interface IRootState {
  WalletList: IWallet[]
}

export default combineReducers<IRootState>({
  ...walletReducder,
})
