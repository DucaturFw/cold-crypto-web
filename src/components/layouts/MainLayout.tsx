import React from 'react'
import styled from 'react-emotion'

import { Sidebar } from '../organisms/Sidebar'

const Container = styled('div')({
  background: '#fff',
  display: 'grid',
  gridTemplateAreas: `
    "sidebar main main main"
    "sidebar footer footer footer"
  `,
  gridTemplateColumns: '16rem auto auto auto',
  gridTemplateRows: 'auto auto',
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
      <Main>{children}</Main>
      <Sidebar />
    </Container>
  )
}
