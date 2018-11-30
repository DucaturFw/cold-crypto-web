export interface IWalletBase {
  blockchain: string
  address: string
  chainId: string | number
  balance?: string
}

export interface IWalletEth extends IWalletBase {
  nonce: number
}

export interface IWalletEos extends IWalletBase {}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const enum WalletsActionTypes {
  FETCH_REQUEST = '@@wallets/FETCH_DATA_REQUEST',
  FETCH_SUCCESS = '@@wallets/FETCH_DATA_SUCCESS',
  FETCH_ERROR = '@@wallets/FETCH_DATA_ERROR',
  ADD = '@@wallets/ADD',
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface IWalletsState {
  item: IWalletEth | IWalletEos
  items: IWalletEth[] | IWalletEos[]
  errors?: string
  loading: boolean
  // readonly loading: boolean
  // readonly data: Hero[]
  // readonly errors?: string
}

export interface IWalletsState {
  item: IWalletEth | IWalletEos
  items: IWalletEth[] | IWalletEos[]
}

export enum WalletsActionType {
  ADD_WALLET,
  REMOVE_WALLET,
}
