import { createAction } from 'redux-act'

export const setWebRtcQrRequest = createAction<string>('set webrtc qr request')
export const setWebRtcQrAnswer = createAction<string>('set webrtc qr answer')
