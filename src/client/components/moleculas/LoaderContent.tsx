import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'

import { IState } from '../../reducers'

const Container = styled('strong')({
  position: 'relative',
})

type PropFunc = (a: { isLoaded: boolean }) => JSX.Element | JSX.Element[]

interface IProps {
  loaderState: boolean
  children: JSX.Element | JSX.Element[] | PropFunc
}

const LoaderContent = ({ loaderState, children }: IProps) => (
  <Container>
    { typeof children === 'function' ?
      children({ isLoaded: !loaderState }) :
      (loaderState ? 'Loading...' : children)
    }
  </Container>
)

const withConnect = connect(({ loaderState }: IState) => ({ loaderState }))

export default withConnect(LoaderContent)
