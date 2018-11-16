import React from 'react'
import styled from 'react-emotion'

import Header from '../organisms/Header'

const Root = styled('div')({
  background: 'rgb(0, 74, 124)',
  minHeight: '100vh',
})

const Main = styled('main')({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 4rem)',
})

const Modal = styled('div')({
  background: '#fff',
  maxWidth: '50rem',
  minWidth: '30rem',
  padding: '2rem',
})

export default ({ children }) => (
  <Root>
    <Header to='/' />
    <Main>
      <Modal>
        { children }
      </Modal>
    </Main>
  </Root>
)
