import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'

import { App } from './App'
import * as serviceWorker from './serviceWorker'
import configureStore, { subscriber } from './configureStore'

const history = createBrowserHistory()

const store = configureStore(history)
store.subscribe(subscriber(store))

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root')
)

// unregister() or register()
serviceWorker.unregister()
