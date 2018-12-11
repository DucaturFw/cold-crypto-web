import { Store, createStore, applyMiddleware, AnyAction, DeepPartial } from 'redux'
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
  const initialState = (JSON.parse(window.localStorage.getItem('state') || '{}') || {}) as DeepPartial<IApplicationState>

  delete initialState.webrtc
  delete initialState.transport

  const reducer = rootReducer(history)
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  )

  sagaMiddleware.run(rootSaga)

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./store', () => {
        store.replaceReducer(reducer);
      });
    }
  }

  return store
}

export const subscriber = (store: Store<IApplicationState, AnyAction>) => () => {
  window.localStorage.setItem('state', JSON.stringify(store.getState()))
};