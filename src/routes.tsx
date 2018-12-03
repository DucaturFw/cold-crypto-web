import * as React from 'react'
import { Switch, Route } from 'react-router-dom'

import { DefaultLayout, MainLayout, ModalLayout } from './components/layouts'
import { Login, Home, Wallet, CreateTx, Sign, Status, TxView } from './pages'

export const Routes: React.SFC = () => {
  return (
    <div>
      <Switch>
        <DefaultLayout exact path="/" component={Home} />>
        <DefaultLayout path="/login" component={Login} />
        <MainLayout>
          <Route exact path="/wallets/:id" component={Wallet} />
          <ModalLayout path="/wallets/:id/tx/create" component={CreateTx} />
          <ModalLayout path="/tx/:id" component={TxView} />
          <ModalLayout path="/sign" component={Sign} />
          <ModalLayout path="/status" component={Status} />
        </MainLayout>
      </Switch>
    </div>
  )
}
