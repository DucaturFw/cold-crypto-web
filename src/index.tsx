import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { ThemeProvider } from 'emotion-theming'
import { createBrowserHistory } from 'history'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { theme } from './config/emotion'
import rootReducer from './reducers'
import Routes from './routes'

const history = createBrowserHistory()

const enhancers = [applyMiddleware(routerMiddleware(history))]
const composeEnhancer: typeof compose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer(history), composeEnhancer(...enhancers))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
