import { createReducer } from 'redux-act'
import { setLoaderState } from '../actions'

const defaultState = false
const errorsReducer = createReducer({}, defaultState)

errorsReducer.on(setLoaderState, (_, payload) => payload)

export default errorsReducer
export type IState = typeof defaultState
