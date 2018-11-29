import * as React from 'react'
import { Switch } from 'react-router-dom'
import { LoginLayout } from './components/layouts'
import { Login, Home } from './pages'

const Routes: React.StatelessComponent<{}> = () => {
  return (
    <Switch>
      <LoginLayout exact path="/" component={Home} />>
      <LoginLayout path="/login" component={Login} />
    </Switch>
  )
}

export default Routes
