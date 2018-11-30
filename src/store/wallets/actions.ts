import { action } from 'typesafe-actions'
import { WalletsActionTypes, IWalletEth, IWalletEos } from './types'

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = () => action(WalletsActionTypes.FETCH_REQUEST)

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (item: IWalletEth | IWalletEos) =>
  action(WalletsActionTypes.FETCH_SUCCESS, item)
export const fetchError = (message: string) =>
  action(WalletsActionTypes.FETCH_ERROR, message)
