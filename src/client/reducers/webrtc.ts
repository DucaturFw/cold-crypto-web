import { createReducer } from 'redux-act'
import { initWebrtcConnaction } from '../actions'

export interface IWebrtcDefaultState {
  connected: boolean
}

const walletDefaultState: IWebrtcDefaultState = {
  connected: false,
}

const webrtcReducer = createReducer<typeof walletDefaultState>({}, walletDefaultState)

webrtcReducer.on(initWebrtcConnaction, () => {
  return {
    connected: true,
  }
})

export default webrtcReducer
