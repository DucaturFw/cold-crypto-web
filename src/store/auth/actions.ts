import { action } from 'typesafe-actions'
import { AuthActionTypes } from './types'

export const fetchSuccess = () => action(AuthActionTypes.AUTH_SUCCESS)
export const fetchError = () => action(AuthActionTypes.AUTH_ERROR)
