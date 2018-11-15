import React from 'react'
import styled from 'react-emotion'

import { Link } from 'react-router-dom'
import icon from '../../images/x-mark-thin.svg'

const Root = styled('div')({
  alignSelf: 'center',
  marginLeft: '1rem',
})

const Img = styled('img')({
  height: '1.5rem',
  width: '1.5rem',
})

export default () => (
  <Root>
    <Link to='../'>
      <Img src={icon} />
    </Link>
  </Root>
)
