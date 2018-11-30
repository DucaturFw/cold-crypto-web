import * as React from 'react'
import { Switch } from 'react-router-dom'
import { DefaultLayout, MainLayout } from './components/layouts'
import { Login, Home, Wallet } from './pages'

const Routes: React.StatelessComponent<{}> = () => {
  return (
    <Switch>
      <DefaultLayout exact path="/" component={Home} />>
      <DefaultLayout path="/login" component={Login} />
      <MainLayout path="/wallet" component={Wallet} />
    </Switch>
  )
}

export default Routes
