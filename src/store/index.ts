import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork } from 'redux-saga/effects'

import walletsSaga from './wallets/sagas'
import { walletsReducer } from './wallets/reducer'
import { IWalletsState } from './wallets/types'
import { connectRouter, RouterState } from 'connected-react-router'

// top-level state
export interface ApplicationState {
  wallets: IWalletsState
  router: RouterState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const rootReducer = (history: any) =>
  combineReducers<ApplicationState>({
    wallets: walletsReducer,
    router: connectRouter(history),
  })

export function* rootSaga() {
  yield all([fork(walletsSaga)])
}
