import { createStore, applyMiddleware, compose } from 'redux'
import { injectGlobal } from 'emotion'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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

class Root extends Component {
  public render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename='/cold-crypto-web' >
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
