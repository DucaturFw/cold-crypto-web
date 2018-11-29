import { IAction, ActionType } from '../model'

export default function createReducer(initialState: {}, handlers: any) {
  return function reducer(
    state: {} = initialState,
    action: IAction<ActionType>
  ) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
