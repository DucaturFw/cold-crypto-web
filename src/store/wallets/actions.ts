import { action } from 'typesafe-actions'
import { WalletsActionTypes, IWalletEth, IWalletEos } from './types'

export const fetchRequest = () => action(WalletsActionTypes.FETCH_REQUEST)

export const fetchSuccess = (item: IWalletEth | IWalletEos) =>
  action(WalletsActionTypes.FETCH_SUCCESS, item)
export const fetchError = (message: string) =>
  action(WalletsActionTypes.FETCH_ERROR, message)
