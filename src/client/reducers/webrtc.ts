import { createReducer } from 'redux-act'
import RTC from '../services/webrtc'

export interface IWebrtcDefaultState {
}

const webrtcDefaultState: IWebrtcDefaultState = RTC

const webrtcReducer = createReducer<typeof webrtcDefaultState>({}, webrtcDefaultState)

export default webrtcReducer
