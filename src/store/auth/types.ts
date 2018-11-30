export enum AuthActionTypes {
  AUTH_SUCCESS = '@@auth/AUTH_SUCCESS',
  AUTH_ERROR = '@@auth/AUTH_ERROR',
}

export interface IAuthState {
  readonly isAuth: boolean
}
