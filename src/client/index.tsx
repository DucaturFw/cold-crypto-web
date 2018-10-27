import { createStore, applyMiddleware, compose } from 'redux'
import { injectGlobal } from 'emotion'
import { Provider } from 'react-redux'
import { Switch, Route, Query } from 'fuse-react'
import createSagaMiddleware from 'redux-saga'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import reducers from './reducers'
import sagas from './sagas'

import Home from './components/Home'
import Login from './components/Login'
import TxCreation from './components/txCreation'
import Wallet from './components/Wallet'
import WalletList from './components/WalletList'
import Webrtc from './components/Webrtc/WebrtcServer'
import TxView from './components/TxView'
import Pay from './components/Pay'
import PayToAddress from './components/PayToAddress'

injectGlobal({
  'html,body,button,input,select': {
    fontFamily: '"Lato", Arial, sans-serif',
    margin: 0,
  }
})

class Root extends Component {
  public render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/wallets' component={WalletList} />
          <Route path='/wallet/:symbol/:address' component={Wallet} />
          <Route
            path='/txCreation/:blockchain/:address'
            component={TxCreation}
          />
          <Route path='/webrtc' component={Webrtc}/>
          <Route path='/tx' component={TxView}/>
          <Route exact path='/pay/:address' component={Pay}/>
          <Route exact path='/paytoaddress/:address' component={PayToAddress}/>
        </Switch>
      </Provider>
    )
  }
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(sagas)

ReactDOM.render(<Root />, document.querySelector('#root'))
