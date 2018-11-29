import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { MainLayout } from './components/layouts'
import { Login } from './pages'

const Routes: React.StatelessComponent<{}> = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </MainLayout>
  )
}

export default Routes
