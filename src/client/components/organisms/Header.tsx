import React from 'react'
import styled from 'react-emotion'

import H1 from '../atoms/H1'
import Link from '../atoms/Link'

const Root = styled('header')({
  background: 'rgb(0, 74, 124)',
  gridArea: 'header',
  height: '4rem',
})

export default ({ to }: { to: string }) => (
  <Root>
    <Link to={ to }>
      <H1 style={{ color: '#fff', padding: '1rem' }}>Cold Crypto</H1>
    </Link>
  </Root>
)
