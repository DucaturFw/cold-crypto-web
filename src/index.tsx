import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'

import { App } from './App'
import * as serviceWorker from './serviceWorker'
import configureStore from './configureStore'

const history = createBrowserHistory()

const initialState = window.initialReduxState
const store = configureStore(history, initialState)

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root')
)

// unregister() or register()
serviceWorker.unregister()
