export interface IWallet {
  id: number
}

export interface IAuth {
  isAuth: boolean
}

export enum ActionType {
  ADD_WALLET,
  SUCCESS_AUTH,
}

export interface IAction<T> {
  type: ActionType
  payload: T
}
