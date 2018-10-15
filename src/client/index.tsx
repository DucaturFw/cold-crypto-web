import React, { Component } from "react";
import ReactDOM from "react-dom";
import { injectGlobal } from "emotion";
import { Switch, Route } from "fuse-react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducers from "./reducers/index.main";

import Home from "./components/Home";
import Login from "./components/Login";
import WalletList from "./components/WalletList";
import Wallet from "./components/Wallet";
import TxCreation from "./components/txCreation";

injectGlobal({
  "html,body": {
    margin: 0
  }
});

class Root extends Component {
  public render() {
    return (
      <Provider store={store}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/wallets" component={WalletList} />
          <Route path="/wallet/:symbol/:address" component={Wallet} />
          <Route
            path="/txCreation/:blockchain/:address"
            component={TxCreation}
          />
        </Switch>
      </Provider>
    );
  }
}

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(<Root />, document.querySelector("#root"));
