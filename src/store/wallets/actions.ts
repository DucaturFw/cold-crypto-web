import { action } from 'typesafe-actions'
import {
  WalletsActionTypes,
  IWalletEth,
  IWalletEos,
  IWalletBase,
} from './types'

export const fetchRequest = () => action(WalletsActionTypes.FETCH_REQUEST)
export const fetchSuccess = (item: IWalletEth | IWalletEos) =>
  action(WalletsActionTypes.FETCH_SUCCESS, item)
export const fetchError = (message: string) =>
  action(WalletsActionTypes.FETCH_ERROR, message)

export const addWallet = (wallet: IWalletBase) =>
  action(WalletsActionTypes.ADD_WALLET, wallet)

export const setSignTx = (data: string) =>
  action(WalletsActionTypes.SET_SIGN_TX, data)
