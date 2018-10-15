import { createReducer } from 'redux-act'
import { combineReducers } from 'redux'

import { setQr, setQrScanned } from '../actions'

const qrCodesDefaultState = {} as { [key: string]: string }
const qrCodes = createReducer<typeof qrCodesDefaultState>({}, qrCodesDefaultState)
qrCodes.on(setQr, (state, { key, value }) => ({ ...state, [key]: value }))

const qrScannedDefaultState = { error: null, res: null } as { error: any, res: any }
const qrScanned = createReducer<typeof qrScannedDefaultState>({}, qrScannedDefaultState)
qrScanned.on(setQrScanned, (_, payload) => {
  const isErr = payload instanceof Error
  return {
    error: isErr ? (payload as Error).message : null,
    res: isErr ? null : payload,
  }
})

export default combineReducers({ qrCodes, qrScanned })
