export interface IWalletBase extends ApiResponse {
  blockchain: string
  address: string
  chainId: string | number
  balance?: string
}

export interface IWalletEth extends IWalletBase {
  nonce: number
}

export interface IWalletEos extends IWalletBase {}

export type ApiResponse = Record<string, any>

export enum WalletsActionTypes {
  FETCH_REQUEST = '@@wallets/FETCH_DATA_REQUEST',
  FETCH_SUCCESS = '@@wallets/FETCH_DATA_SUCCESS',
  FETCH_ERROR = '@@wallets/FETCH_DATA_ERROR',
  ADD_WALLET = '@@wallets/ADD_WALLET',
  UPDATE_WALLET = '@@wallets/UPDATE_WALLET',
}

// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface IWalletsState {
  readonly item: IWalletEth | IWalletEos
  readonly items: IWalletEth[] | IWalletEos[]
  readonly errors?: string
  readonly loading: boolean
}
