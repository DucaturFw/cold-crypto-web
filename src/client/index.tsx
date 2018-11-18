import { ConnectedRouter } from 'connected-react-router'
import { injectGlobal } from 'emotion'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { Switch, Route } from 'react-router-dom'
import React from 'react'

import globalCss from './normalize'
import store, { history } from './configureStore'

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Pay from './components/Pay'
import PayToAddress from './components/PayToAddress'
import TxCreation from './components/pages/TxCreation'
import TxView from './components/TxView'
import Wallet from './components/pages/Wallets'
import Wallets from './components/pages/Wallets'
import Webrtc from './components/Webrtc/WebrtcServer'

injectGlobal(globalCss, {
  'html,body,button,input,select': {
    fontFamily: '"Lato", Arial, sans-serif',
  },
})

render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/wallets' component={Wallets} />
        <Route path='/wallet/:blockchain/:address' component={Wallet} />
        <Route path='/txCreation/:blockchain/:address' component={TxCreation} />
        <Route path='/webrtc' component={Webrtc}/>
        <Route path='/tx' component={TxView}/>
        <Route exact path='/pay/:address' component={Pay}/>
        <Route exact path='/paytoaddress/:address' component={PayToAddress}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
, document.querySelector('#root'))
