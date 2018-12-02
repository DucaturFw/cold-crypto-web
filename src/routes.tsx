import * as React from 'react'
import { Switch, Redirect, Route, RouteProps } from 'react-router-dom'
import { connect } from 'react-redux'

import { IApplicationState } from './store'

// import { DefaultLayout, MainLayout, ModalLayout } from './components/layouts'
import { DefaultLayout, MainLayout } from './components/layouts'
// import { Login, Home, Wallet, CreateTx, Sign } from './pages'
import { Login, Home, Wallet } from './pages'

interface IFromDispatch {
  isAuth?: boolean
}

const Routes: React.SFC<IFromDispatch> = ({ isAuth }) => {
  return (
    <Switch>
      <DefaultLayout exact path="/" component={Home} />>
      <DefaultLayout path="/login" component={Login} />
      <PrivateRoute
        exact
        path="/wallets/:id"
        component={Wallet}
        layout={MainLayout}
        isAuth={isAuth}
      />
      {/* <MainLayout exact path="/wallets/:id" component={Wallet} />
      <ModalLayout exact path="/wallets/:id/tx/create" component={CreateTx} />
      <ModalLayout exact path="/sign" component={Sign} /> */}
      {/* <DefaultLayout path="/create/tx/:address" component={CreateTransaction} /> */}
      {/* <DefaultLayout path="/create/contract/:address" component={CreateContract} /> */}
      <Redirect to="/" />
    </Switch>
  )
}

interface IPrivateRoute {
  component: any
  layout: React.SFC<any>
  isAuth?: boolean
}

const PrivateRoute: React.SFC<IPrivateRoute & RouteProps> = ({
  component: Component,
  layout: Layout,
  isAuth,
  ...rest
}: IPrivateRoute) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuth ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to="/" push />
        )
      }
    />
  )
}

export default connect(({ auth: { isAuth } }: IApplicationState) => ({
  isAuth,
}))(Routes)
