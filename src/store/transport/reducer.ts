import { Reducer } from 'redux'
import { ITransportState } from './types'

const initialState: ITransportState = {}

const reducer: Reducer<ITransportState> = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}

export { reducer as transportReducer }
