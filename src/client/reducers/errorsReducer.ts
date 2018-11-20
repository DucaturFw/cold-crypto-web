import { createReducer } from 'redux-act'
import { setTransactionError } from '../actions'

const defaultState = {
  transactionError: null as Error,
}

const errorsReducer = createReducer({}, defaultState)

errorsReducer.on(setTransactionError, (state, transactionError) =>
  ({ ...state, transactionError }))

export default errorsReducer
export type IState = typeof defaultState
