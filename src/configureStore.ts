import { Store, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

import { History } from 'history'

import { IApplicationState, rootReducer, rootSaga } from './store'

export default function configureStore(
  history: History,
  initialState: IApplicationState
): Store<IApplicationState> {
  const composeEnhancers = composeWithDevTools({})

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  )

  sagaMiddleware.run(rootSaga)
  return store
}
