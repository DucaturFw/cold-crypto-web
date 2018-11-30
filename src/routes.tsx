import * as React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { DefaultLayout, MainLayout } from './components/layouts'
import { Login, Home, Wallet } from './pages'

const Routes: React.SFC = () => {
  return (
    <Switch>
      <DefaultLayout exact path="/" component={Home} />>
      <DefaultLayout path="/login" component={Login} />
      <MainLayout path="/wallet" component={Wallet} />
      {/* <DefaultLayout path="/create/tx/:address" component={CreateTransaction} /> */}
      {/* <DefaultLayout path="/create/contract/:address" component={CreateContract} /> */}
      <Redirect to="/" />
    </Switch>
  )
}

export default Routes
