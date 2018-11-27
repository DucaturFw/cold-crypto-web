import { createReducer } from 'redux-act'
import RTC from '../services/webrtc'
import { setLastTransaction, setWebRtcConnectionSid } from '../actions'

export interface ITransaction {
  nonce: number
  gasPrice?: string
  to: string
  value: string
}

export interface IContract {
  nonce: number
  gasPrice: string
  gasLimit?: string
  to: string
  data: string
}

const webrtcDefaultState = {
  error: '',
  isSending: false,
  lastTransaction: {} as ITransaction | Error,
  sid: null as string,
  webrtc: RTC(),
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

webrtcReducer.on(setWebRtcConnectionSid, (state, payload) => ({
  ...state,
  sid: payload,
}))

export default webrtcReducer
export type IState = typeof webrtcDefaultState
