import { createStore, applyMiddleware, compose } from 'redux'
import { injectGlobal } from 'emotion'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Switch, Route } from 'fuse-react'
import createSagaMiddleware from 'redux-saga'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import reducers from './reducers'
import sagas from './sagas'

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import TxCreation from './components/txCreation'
import Wallet from './components/Wallet'
import Wallets from './components/pages/Wallets'
import Webrtc from './components/Webrtc/WebrtcServer'
import TxView from './components/TxView'
import Pay from './components/Pay'
import PayToAddress from './components/PayToAddress'

import globalCss from './normalize'

injectGlobal(globalCss, {
  'html,body,button,input,select': {
    fontFamily: '"Lato", Arial, sans-serif',
  },
})

const prefix = 'cold-crypto-web'

class Root extends Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path={`${prefix}/`} exact component={Home} />
            <Route path={`${prefix}/login`} component={Login} />
            <Route path={`${prefix}/wallets`} component={Wallets} />
            <Route path={`${prefix}/wallet/:symbol/:address`} component={Wallet} />
            <Route path={`${prefix}/txCreation/:blockchain/:address`} component={TxCreation} />
            <Route path={`${prefix}/webrtc`} component={Webrtc}/>
            <Route path={`${prefix}/tx`} component={TxView}/>
            <Route path={`${prefix}/pay/:address`} component={Pay}/>
            <Route path={`${prefix}/paytoaddress/:address`} component={PayToAddress}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(sagas)

ReactDOM.render(<Root />, document.querySelector('#root'))
