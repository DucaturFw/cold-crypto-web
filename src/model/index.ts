export interface IAuth {
  isAuth: boolean
}

export enum ActionType {
  SUCCESS_AUTH,
}

export interface IAction<T> {
  type: ActionType
  payload: T
}
