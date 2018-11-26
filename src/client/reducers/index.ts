import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import blockchains, { IState as IStateBlockchains } from './blockchainsReducer'
import wallet, { IState as IStateWallet } from './walletReducer'
import webrtc, { IState as IStateWebrtc } from './webrtcReducer'
import errors, { IState as IStateErrors } from './errorsReducer'
import loaderState, { IState as IStateLoader } from './loaderReducer'

export default (history: History) =>
  combineReducers({
    blockchains,
    errors,
    loaderState,
    router: connectRouter(history),
    wallet,
    webrtc,
  })

export interface IState {
  blockchains: IStateBlockchains
  errors: IStateErrors
  loaderState: IStateLoader
  router: RouterState
  wallet: IStateWallet
  webrtc: IStateWebrtc
}
