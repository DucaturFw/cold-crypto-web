import { createAction } from 'redux-act'

import { IWallet, ITransaction } from '../reducers/wallet'

export const setQr = createAction<{ key: string; value: string }>('set qr')
export const generateQr = createAction<{ key: string; value: string }>('generate qr')
export const setQrScanned = createAction<string | Error>('set qr scanned')
export const setQrCode = createAction<string>('set qr code')
export const addWallets = createAction<IWallet[] | Error>('add wallets')
export const scanWallets = createAction<IWallet[] | Error>('scan wallets')
export const scanTransaction = createAction<ITransaction | Error>('scan transaction')


export const scanAnswer = createAction<RTCSessionDescriptionInit | Error>('scan answer')
export const initWebrtcConnaction = createAction('success rtc connection')
export const webrtcMessageReceived = createAction<string>('message received')
export const setLastTransaction = createAction<ITransaction | Error>('set last transaction')
