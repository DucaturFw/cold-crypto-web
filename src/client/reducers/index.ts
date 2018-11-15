import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import blockchains, { IState as IStateBlockchains } from './blockchainsReducer'
import wallet, { IState as IStateWallet } from './walletReducer'
import webrtc, { IState as IStateWebrtc } from './webrtcReducer'

export default (history: History) =>
  combineReducers({
    blockchains,
    router: connectRouter(history),
    wallet,
    webrtc,
  })

export interface IState {
  blockchains: IStateBlockchains
  router: RouterState
  wallet: IStateWallet
  webrtc: IStateWebrtc
}
