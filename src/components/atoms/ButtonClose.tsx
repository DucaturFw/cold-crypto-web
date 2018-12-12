import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

const Root = styled(Link)({
  alignSelf: 'center',
  marginLeft: '1rem',
  textDecoration: 'none',
  color: 'black',
  fontSize: '2rem',
})

const XSpan = styled('span')({
  textDecoration: "none !important"
})

export const ButtonClose = () => (
  <Root to="/">
    <XSpan>×</XSpan>
  </Root>
)
