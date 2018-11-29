import { ActionType, IAction, IWallet } from '../model'
import createReducer from './createReducer'

export const wallet = createReducer([], {
  [ActionType.ADD_WALLET](state: IWallet, action: IAction<IWallet>) {
    return action.payload
  },
})
