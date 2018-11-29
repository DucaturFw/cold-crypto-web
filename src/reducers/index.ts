import { combineReducers } from 'redux'
import { IWallet } from '../model'
import * as wallet from './wallet'
import * as auth from './auth'
import { RouterState, connectRouter } from 'connected-react-router'

export interface IRootState {
  wallet: IWallet
  router: RouterState
}

const rootReducer = (history: any) =>
  combineReducers({
    ...wallet,
    ...auth,
    router: connectRouter(history),
  })

export default rootReducer
