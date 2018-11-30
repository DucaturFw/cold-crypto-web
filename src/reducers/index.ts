import { combineReducers } from 'redux'
import * as wallet from './wallet'
import * as auth from './auth'
import { RouterState, connectRouter } from 'connected-react-router'
import { IWalletsState } from '../model/wallets'

export interface IRootState {
  wallet: IWalletsState
  router: RouterState
}

const rootReducer = (history: any) =>
  combineReducers({
    ...wallet,
    ...auth,
    router: connectRouter(history),
  })

export default rootReducer
