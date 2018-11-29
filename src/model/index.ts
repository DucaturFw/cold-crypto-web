export interface IWallet {
  id: number
}

export enum ActionType {
  ADD_WALLET,
}

export interface IAction<T> {
  type: ActionType
  payload: T
}
