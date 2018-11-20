import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'

import { IState } from '../../reducers'

const Container = styled('strong')({
  position: 'relative',
})

interface IProps {
  loaderState: boolean
  children: JSX.Element | JSX.Element[]
}

const LoaderContent = ({ loaderState, children }: IProps) => (
  <Container>
    { loaderState ? 'Loading...' : children }
  </Container>
)

const withConnect = connect(({ loaderState }: IState) => ({ loaderState }))

export default withConnect(LoaderContent)
