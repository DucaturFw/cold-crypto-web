import React from 'react'
import styled from 'react-emotion'

import { Link } from 'react-router-dom'
import icon from '../../images/plus-circle-thin.svg'

const Root = styled('div')({
  alignSelf: 'center',
  marginLeft: '1rem',
})

const Img = styled('img')({
  height: '1.5rem',
  width: '1.5rem',
})

export const ButtonAdd = ({ to, title }: { to: string; title?: string }) => (
  <Root>
    <Link to={to}>
      <Img src={icon} title={title} />
    </Link>
  </Root>
)
