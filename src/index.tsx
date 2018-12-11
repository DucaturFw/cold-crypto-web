import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'

import { App } from './App'
import * as serviceWorker from './serviceWorker'
import configureStore, { subscriber } from './configureStore'

let basename
if (location.pathname.includes('/cold-crypto-web'))
  basename = '/cold-crypto-web'
else if (location.pathname.includes('/cold'))
  basename = '/cold'
else
  basename = '/'

console.log(`using basename ${basename}`)
const history = createBrowserHistory({ basename })

const store = configureStore(history)
store.subscribe(subscriber(store))

const rootEl = document.getElementById('root')

ReactDOM.render(
  <App store={store} history={history}/>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}

// unregister() or register()
serviceWorker.unregister()
