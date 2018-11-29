import { combineReducers } from 'redux'
import { IWallet } from '../model'
import * as walletReducder from './wallet'
import { RouterState, connectRouter } from 'connected-react-router'

export interface IRootState {
  wallet: IWallet
  router: RouterState
}

const rootReducer = (history: any) =>
  combineReducers({
    ...walletReducder,
    router: connectRouter(history),
  })

export default rootReducer
