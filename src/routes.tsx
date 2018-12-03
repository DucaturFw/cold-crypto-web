import * as React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import { DefaultLayout, MainLayout, ModalLayout } from './components/layouts'
import { Login, Home, Wallet, CreateTx, Sign, Status } from './pages'

export const Routes: React.SFC = () => {
  return (
    <Switch>
      <DefaultLayout exact path="/" component={Home} />>
      <DefaultLayout path="/login" component={Login} />
      <MainLayout exact path="/wallets/:id" component={Wallet} />
      <ModalLayout exact path="/wallets/:id/tx/create" component={CreateTx} />
      <ModalLayout exact path="/sign" component={Sign} />
      <ModalLayout exact path="/status" component={Status} />
      {/* <DefaultLayout path="/create/tx/:address" component={CreateTransaction} /> */}
      {/* <DefaultLayout path="/create/contract/:address" component={CreateContract} /> */}
      <Redirect to="/" />
    </Switch>
  )
}
