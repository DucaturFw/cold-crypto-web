import React from 'react'
import styled from 'react-emotion'
import { Link } from 'fuse-react'

import H1 from '../atoms/h1'

const Root = styled('header')({
  height: '3rem',
})

export default ({ to }: { to: string }) => (
  <Root>
    <Link to={ to }>
      <H1 style={{ color: '#fff', padding: '2rem' }}>Cold Crypto</H1>
    </Link>
  </Root>
)
