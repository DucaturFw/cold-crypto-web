import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'

import createRootReducer from './reducers'
import sagas from './sagas'

const history = createBrowserHistory({ basename: '/cold-crypto-web' })
const reducers = createRootReducer(history)
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    ),
  ),
)

sagaMiddleware.run(sagas)

export default store
export { history }
