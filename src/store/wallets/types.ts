import { IHostCommand } from '../../helpers/webrtc/hostproto'
import { IAbiEntry } from '../../helpers/eth/eth-contracts';

export interface IWalletBase extends ApiResponse {
  blockchain: string
  address: string
  chainId: string | number
  balance?: string
}

export interface IWalletEth extends IWalletBase {
  nonce: number
  txs?: IEthTx[]
}

// TODO: autogenrate, validate this !!!!
export interface IEthTx {
  blockHash: string
  blockNumber: string
  confirmations: string
  contractAddress: string
  cumulativeGasUsed: string
  from: string
  gas: string
  gasPrice: string
  gasUsed: string
  hash: string
  input: string
  isError: string
  nonce: string
  timeStamp: number
  to: string
  transactionIndex: string
  txreceipt_status: string
  value: string
}

export interface IEosTx {
  act: any
  createdAt: string
}

export interface IWalletEos extends IWalletBase {}

export type IWallet = IWalletBase | IWalletEos | IWalletEth
export type ApiResponse = Record<string, any>

export enum WalletsActionTypes {
  FETCH_REQUEST = '@@wallets/FETCH_DATA_REQUEST',
  FETCH_SUCCESS = '@@wallets/FETCH_DATA_SUCCESS',
  FETCH_ERROR = '@@wallets/FETCH_DATA_ERROR',
  ADD_WALLET = '@@wallets/ADD_WALLET',
  SET_SENDING_TX_DATA = '@@wallets/SET_SENDING_TX_DATA',
}

export interface IWalletsState {
  readonly item: IWalletEth | IWalletEos
  readonly items: IWalletEth[] | IWalletEos[]
  readonly sendingTxData: ISendingTxData
  readonly errors?: string
  readonly loading: boolean
}

export interface ISendingTxData {
  command?: IHostCommand<unknown[], unknown>
  hash?: string
  formData?: IEthTxFormValues | IEosTxFormValues | IEthContractFormValues
  error?: string
}

export type FormValues = IEthTxFormValues | IEosTxFormValues | IEthContractFormValues

export interface IEthTxFormValues {
  to: string
  gasPrice: number
  data: string
  amount: number
}

export interface IEthContractFormValues {
  to: string
  abi: IAbiEntry[]
  method: string
  gasPrice: string
  args: string[]
  gasLimit: string
}

export interface IEosTxFormValues {
  to: string
  memo: string
  amount: number
}
