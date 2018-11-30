import { action } from 'typesafe-actions'
import {
  WalletsActionTypes,
  IWalletEth,
  IWalletEos,
  IWalletBase,
  IEthTxFormValues,
} from './types'

export const fetchRequest = () => action(WalletsActionTypes.FETCH_REQUEST)
export const fetchSuccess = (item: IWalletEth | IWalletEos) =>
  action(WalletsActionTypes.FETCH_SUCCESS, item)
export const fetchError = (message: string) =>
  action(WalletsActionTypes.FETCH_ERROR, message)

export const addWallet = (wallet: IWalletBase) =>
  action(WalletsActionTypes.ADD_WALLET, wallet)

export const createWalletTx = (data: IEthTxFormValues) =>
  action(WalletsActionTypes.CREATE_WALLET_TX, data)
// TODO: add types for form data
// export const createWalletTx = (data: any) => {
//   action(WalletsActionTypes.CREATE_WALLET_TX, data)
// }
