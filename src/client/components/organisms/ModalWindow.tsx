import React from 'react'
import styled from 'react-emotion'
import { withRouter } from 'react-router'
import { History } from 'history'

const Root = styled('header')({
  alignItems: 'center',
  background: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  left: 0,
  position: 'fixed',
  top: 0,
  width: '100vw',
})

const Main = styled('main')({
  background: '#fff',
  borderRadius: '.25rem',
  boxShadow: 'rgba(0, 0, 0, 0.5) 0px .25rem 1.5rem',
  maxHeight: '95vh',
  maxWidth: '95vw',
  minHeight: '50vh',
  minWidth: '60vw',
})

const ModalWindow = ({ children, history }: { children?: any, history: History }) => (
  <Root onClick={() => history.goBack()}>
    <Main onClick={(e) => e.stopPropagation()}>
      { children }
    </Main>
  </Root>
)

export default withRouter(ModalWindow)
