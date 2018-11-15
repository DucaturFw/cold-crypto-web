import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import wallet from './wallet'
import webrtc from './webrtc'

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    wallet,
    webrtc,
  })
