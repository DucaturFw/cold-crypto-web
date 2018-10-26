import { createReducer } from 'redux-act'
import RTC, { RTCHelper } from '../services/webrtc'
import { setLastTransaction, startSendingTx } from '../actions'

export interface ITransaction {
  nonce: number
  gasPrice: string
  to: number
  value: string
}

export interface IWebrtcDefaultState {
  webrtc: RTCHelper
  lastTransaction: ITransaction | Error | {}
  error: any
  isSending: boolean 
}

const webrtcDefaultState: IWebrtcDefaultState = {
  error: '',
  lastTransaction: {},
  webrtc: RTC,
  isSending: false
}

const webrtcReducer = createReducer<typeof webrtcDefaultState>({}, webrtcDefaultState)

webrtcReducer.on(setLastTransaction, (state, payload) => {
  const isErr = payload instanceof Error
  return {
    ...state,
    error: isErr ? (payload as Error).message : null,
    lastTransaction: isErr ? null : payload,
  }
})

webrtcReducer.on(startSendingTx, (_, payload) => {
  return {..._,
    isSending: payload,
  }
})

export default webrtcReducer
