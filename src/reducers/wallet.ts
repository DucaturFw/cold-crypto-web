import { IAction } from '../model'
import createReducer from './createReducer'
import {
  IWalletsState,
  IWalletEth,
  IWalletEos,
  WalletsActionType,
} from '../model/wallets'

const initialState: IWalletsState = {
  item: {} as IWalletEth,
  items: [],
}

export const wallet = createReducer(initialState, {
  [WalletsActionType.ADD_WALLET](
    state: IWalletsState,
    action: IAction<{
      action: WalletsActionType
      payload: IWalletEth | IWalletEos
    }>
  ) {
    return { ...state, item: action.payload }
  },
  [WalletsActionType.REMOVE_WALLET](
    state: IWalletsState,
    action: IAction<{
      action: WalletsActionType
      payload: IWalletEth | IWalletEos
    }>
  ) {
    return { ...state, item: action.payload }
  },
})
