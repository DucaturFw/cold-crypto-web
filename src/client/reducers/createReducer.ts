import { IAction } from "../model";

export default function createReducer(initialState: {}, handlers: {}) {
  return function reducer(state: {} = initialState, action: IAction<any>) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
