import * as React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Store } from 'redux'
import { History } from 'history'
import { ThemeProvider } from 'emotion-theming'

import { Routes } from './routes'
import { IApplicationState } from './store'
import { theme } from './styles/theme'
import './styles'

interface IPropsFromDispatch {
  [key: string]: any
}

interface IOwnProps {
  store: Store<IApplicationState>
  history: History
}

type AllProps = IPropsFromDispatch & IOwnProps

export class App extends React.Component<AllProps> {
  public render() {
    const { store, history } = this.props

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={theme}>
            <Routes />
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    )
  }
}
