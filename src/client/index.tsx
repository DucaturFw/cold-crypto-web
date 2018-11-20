import { ConnectedRouter } from 'connected-react-router'
import { injectGlobal } from 'emotion'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import React from 'react'

import globalCss from './normalize'
import store, { history } from './configureStore'
import routes from './routes'

injectGlobal(globalCss, {
  'html,body,button,input,select': {
    fontFamily: '"Lato", Arial, sans-serif',
  },
})

render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <Switch>
        { routes.map((route) => <Route {...route} key={route.path} />) }
      </Switch>
    </ConnectedRouter>
  </Provider>
, document.querySelector('#root'))
