export interface IWallet {
  blockchain: string
  address: string
  nonce: number
}

export enum ActionType {
  ADD_Wallet,
}

export interface IAction<T> {
  type: ActionType
  payload: T
}
