import { action } from 'typesafe-actions'
import { AuthActionTypes } from './types'

export const authSuccess = () => action(AuthActionTypes.AUTH_SUCCESS)
export const authError = () => action(AuthActionTypes.AUTH_ERROR)
