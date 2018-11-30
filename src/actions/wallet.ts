import { Action } from 'redux'
import { WalletsActionType, IWalletEth, IWalletEos } from '../model/wallets'

export interface AddWallet extends Action {
  type: WalletsActionType.ADD_WALLET
  payload: IWalletEth | IWalletEos
}

type IWalletsActionType = AddWallet
