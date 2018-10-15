export interface IWallet {
  id: number;
}

export enum ActionType {
  ADD_Wallet
}

export interface IAction<T> {
  type: ActionType;
  payload: T;
}
