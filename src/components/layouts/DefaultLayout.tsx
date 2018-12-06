import React from 'react'
import styled from 'react-emotion'
import { Route } from 'react-router-dom'

import { Header } from '../organisms/Header'
import { Footer } from '../organisms/Footer'

const Root = styled('div')({
  background: 'linear-gradient(57deg, #0D0D0D 0%, #160A2E 100%)',
  minHeight: '100vh',
})

const Main = styled('main')({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 4rem - 4rem)',
})

const Modal = styled('div')({
  background: '#fff',
  borderRadius: '.8rem',
  maxWidth: '50rem',
  minWidth: '30rem',
  padding: '2rem',
})

interface IDefaultProps {
  component: any
  path?: string
  exact?: boolean
}

export class DefaultLayout extends React.Component<IDefaultProps, any> {
  public render() {
    const { component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={matchProps => (
          <Root>
            <Header to="/" />
            <Main>
              <Modal>
                <Component {...matchProps} />
              </Modal>
            </Main>
            <Footer />
          </Root>
        )}
      />
    )
  }
}
