import React from 'react'
import styled from 'react-emotion'
import { H1, Link } from '../atoms'

const Root = styled('header')({
  background: 'rgb(0, 74, 124)',
  gridArea: 'header',
  height: '4rem',
})

const Logo = styled(H1)({
  color: '#fff',
  padding: '1rem',
  sup: {
    color: '#f2494d',
    fontSize: '.8rem',
    textTransform: 'lowercase',
    verticalAlign: 'super',
  },
} as any)

export const Header = ({ to }: { to: string }) => (
  <Root>
    <Link to={to}>
      <Logo>
        Cold Crypto
        <sup>beta mode</sup>
      </Logo>
    </Link>
  </Root>
)
