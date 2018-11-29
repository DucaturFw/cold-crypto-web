import React from 'react'
import styled from 'react-emotion'

// import Header from '../organisms/Header'
// import Sidebar from '../organisms/Sidebar'

const Container = styled('div')`
  background: #fff;
  display: grid;
  grid-template-areas:
    'header header header header'
    'sidebar main main main';
  grid-template-columns: 16rem auto auto auto;
  grid-template-rows: 4rem auto;
  min-height: 100vh;
`

const Main = styled('main')`
  display: flex;
  grid-area: main;
  justify-content: center;
  min-height: calc(100vh - 4rem);
  padding: 2rem;
`
interface IMainLayout {
  children: React.ReactNode
}

export const MainLayout: React.SFC<IMainLayout> = ({ children }) => (
  <Container>
    <Main>{children}</Main>
  </Container>
)
