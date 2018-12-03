import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'

import walletsSaga from './wallets/sagas'
import { walletsReducer } from './wallets/reducer'
import { IWalletsState } from './wallets/types'

import { authReducer } from './auth/reducer'
import { IAuthState } from './auth/types'

import transportSaga from './transport/sagas'
import { transportReducer } from './transport/reducer'
import { ITransportState } from './transport/types'

import webrtcSaga from './webrtc/sagas'
import { webrtcReducer } from './webrtc/reducer'
import { IWebrtcState } from './webrtc/types'

// top-level state
export interface IApplicationState {
  wallets: IWalletsState
  auth: IAuthState
  transport: ITransportState
  webrtc: IWebrtcState
  router: RouterState
}

export interface IConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const rootReducer = (history: any) =>
  combineReducers<IApplicationState>({
    wallets: walletsReducer,
    auth: authReducer,
    transport: transportReducer,
    webrtc: webrtcReducer,
    router: connectRouter(history),
  })

export function* rootSaga() {
  yield all([fork(walletsSaga), fork(transportSaga), fork(webrtcSaga)])
}