import { ActionType, IAction, IAuth } from '../model'
import createReducer from './createReducer'

export const wallet = createReducer([], {
  [ActionType.SUCCESS_AUTH](state: IAuth, action: IAction<IAuth>) {
    return action.payload
  },
})
