import { createReducer } from 'redux-act'
import RTC, { RTCHelper } from '../services/webrtc'
import { setLastTransaction } from '../actions'

export interface ITransaction {
  nonce: number
  gasPrice: string
  to: number
  value: string
}

export interface IWebrtcDefaultState {
  webrtc: RTCHelper
  lastTransaction: ITransaction | Error
  error: any,
}

const webrtcDefaultState: IWebrtcDefaultState = {
  webrtc: RTC,
  lastTransaction: null,
  error: ''
}

const webrtcReducer = createReducer<typeof webrtcDefaultState>({}, webrtcDefaultState)

webrtcReducer.on(setLastTransaction, (_, payload) => {
  const isErr = payload instanceof Error
  return {..._,
    error: isErr ? (payload as Error).message : null,
    lastTransaction: isErr ? null : payload,
  }
})

export default webrtcReducer
