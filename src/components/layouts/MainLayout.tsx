import React from 'react'
import styled from 'react-emotion'
// import { Route } from 'react-router-dom'

import { Header } from '../organisms/Header'
import { Sidebar } from '../organisms/Sidebar'

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
  background: '#FAFAFB',
})

export const MainLayout: React.SFC = props => {
  const { children } = props
  return (
    <Container>
      <Header to="/" logoColorReverse={true} />
      <Main>{children}</Main>
      <Sidebar />
    </Container>
  )
}
