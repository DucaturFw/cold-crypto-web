import React from 'react'
import styled from 'react-emotion'
import { Route } from 'react-router-dom'

import { Header } from './Header'
import { Sidebar } from './Sidebar'

const Container = styled('div')({
  background: '#fff',
  display: 'grid',
  gridTemplateAreas: `
      "header header header header"
      "sidebar main main main"
    `,
  gridTemplateColumns: '16rem auto auto auto',
  gridTemplateRows: '4rem auto',
  minHeight: '100vh',
})

const Main = styled('main')({
  display: 'flex',
  gridArea: 'main',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 4rem)',
  padding: '2rem',
})

interface IDefaultProps {
  component: any
  path?: string
  exact?: boolean
}

export const MainLayout: React.SFC<IDefaultProps> = props => {
  const { component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Container>
          <Header to="/" />
          <Main>
            <Component {...matchProps} />
          </Main>
          <Sidebar />
        </Container>
      )}
    />
  )
}
