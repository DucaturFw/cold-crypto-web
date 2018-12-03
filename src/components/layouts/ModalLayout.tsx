import React from 'react'
import styled from 'react-emotion'
import { Route } from 'react-router-dom'
// import { History } from 'history'

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

const Container = styled('div')({
  boxSizing: 'border-box',
  padding: '2rem',
})

interface IDefaultProps {
  component: any
  path?: string
  exact?: boolean
}

export const ModalLayout: React.SFC<IDefaultProps> = props => {
  const { component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={matchProps => {
        return (
          <Root onClick={matchProps.history.goBack}>
            <Main onClick={e => e.stopPropagation()}>
              <Container>
                <Component {...matchProps} />
              </Container>
            </Main>
          </Root>
        )
      }}
    />
  )
}
