import { createAction } from 'redux-act'
import { match } from 'react-router'
import { IStateGasEth, IStateTicker } from '../reducers/blockchainsReducer'
import { IWallet } from '../reducers/walletReducer'


export interface ITxSignFormData {
  to: string
  amount: string
  gasPrice: string
  data: string
}

export const setQr = createAction<{ key: string; value: string }>('set qr')
export const generateQr = createAction<{ key: string; value: string }>('generate qr')
export const setQrScanned = createAction<string | Error>('set qr scanned')
export const setQrCode = createAction<string>('set qr code')
export const addWallets = createAction<any[] | Error>('add wallets')
export const scanWallets = createAction<any[] | Error>('scan wallets')
export const scanTransaction = createAction<any | Error>('scan transaction')
export const startSendingTx = createAction<boolean>('start transaction')

export const scanAnswer = createAction<RTCSessionDescriptionInit | Error>('scan answer')
export const initWebrtcConnaction = createAction('success rtc connection')
export const webrtcMessageReceived = createAction<string>('message received')
export const setLastTransaction = createAction<any | Error>('set last transaction')

export const setPayData = createAction<any>('set pay data')

export const setBlockchainGasInfo = createAction<{ key: string, value: IStateGasEth }>('set blockchain gas info')
export const setBlockchainTicker = createAction<{ key: string, value: IStateTicker }>('set blockchain ticker')
export const signTxRequest = createAction<{ data: ITxSignFormData, wallet: IWallet }>('sign tx request')
export const setSignedData = createAction<string>('set signed request data')
export const setScanResult = createAction<string | Error>('set scan result from mobile client')
export const setTransactionError = createAction<Error>('set transaction error')

export const setRoutePath = createAction<match>('set route path match')
