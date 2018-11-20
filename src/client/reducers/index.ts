import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import blockchains, { IState as IStateBlockchains } from './blockchainsReducer'
import wallet, { IState as IStateWallet } from './walletReducer'
import webrtc, { IState as IStateWebrtc } from './webrtcReducer'
import errors, { IState as IStateErrors } from './errorsReducer'

export default (history: History) =>
  combineReducers({
    blockchains,
    errors,
    router: connectRouter(history),
    wallet,
    webrtc,
  })

export interface IState {
  blockchains: IStateBlockchains
  errors: IStateErrors
  router: RouterState
  wallet: IStateWallet
  webrtc: IStateWebrtc
}
