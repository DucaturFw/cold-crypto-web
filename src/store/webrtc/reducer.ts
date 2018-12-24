import { createReducer } from 'redux-act'
import { setWebRtcQrRequest } from './actions'

const initialState = { qrRequest: null as string | null }
const reducer = createReducer({}, initialState)

reducer.on(setWebRtcQrRequest, (state, qrRequest) => ({ ...state, qrRequest }))

export default reducer
export type IState = typeof initialState
