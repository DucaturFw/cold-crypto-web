import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

const Root = styled(Link)({
  alignSelf: 'center',
  marginLeft: '1rem',
})

const Img = styled('img')({
  height: '1.5rem',
  width: '1.5rem',
})

export const ButtonClose = () => (
  <Root to="/">
    <Img src="./x-mark-thin.svg" />
  </Root>
)
