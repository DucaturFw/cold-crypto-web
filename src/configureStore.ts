import { Store, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

import { History } from 'history'

import { IApplicationState, rootReducer, rootSaga } from './store'

export default function configureStore(
  history: History
): Store<IApplicationState> {
  const composeEnhancers = composeWithDevTools({})
  const sagaMiddleware = createSagaMiddleware()
  const initialState = JSON.parse(window.localStorage.getItem('state') as string) || {}

  if (initialState.webrtc) {
    delete initialState.webrtc;
  }

  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  )

  sagaMiddleware.run(rootSaga)
  return store
}

export const subscriber = (store) => () => {
  window.localStorage.setItem('state', JSON.stringify(store.getState()))
};