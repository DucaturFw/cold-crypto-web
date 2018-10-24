import { combineReducers } from 'redux'

import wallet from './wallet'
import webrtc from './webrtc'

export default combineReducers({ wallet, webrtc })
