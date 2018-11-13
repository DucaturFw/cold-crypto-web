import { createReducer } from 'redux-act'
import RTC, { RTCHelper } from '../services/webrtc'
import { setLastTransaction, startSendingTx } from '../actions'

export interface ITransaction {
  nonce: number
  gasPrice: string
  to: number
  value: string
}

const webrtcDefaultState = {
  error: '',
  isSending: false,
  lastTransaction: {} as ITransaction | Error,
  webrtc: RTC as RTCHelper,
}

const webrtcReducer = createReducer({}, webrtcDefaultState)

webrtcReducer.on(setLastTransaction, (state, payload) => {
  const isErr = payload instanceof Error
  return {
    ...state,
    error: isErr ? (payload as Error).message : null,
    lastTransaction: isErr ? null : payload,
  }
})

webrtcReducer.on(startSendingTx, (state, payload) => ({
  ...state,
  isSending: payload,
}))

export default webrtcReducer
export type IWebrtcDefaultState = typeof webrtcDefaultState
