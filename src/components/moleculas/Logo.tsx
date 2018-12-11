import React from 'react'
import styled from 'react-emotion'
import { Link, H1 } from '../atoms'

const Logo = styled(H1)(({ reverseColor }: { reverseColor?: boolean }) => ({
  color: reverseColor ? '#171933' : '#fff',
  padding: '2rem 1.6rem',
  fontSize: '1.3rem',
  lineHeight: '1.3rem',
  width: 'inherit',
}))

const Sup = styled('sup')({
  color: '#f2494d',
  fontSize: '0.5rem',
  textTransform: 'lowercase',
  verticalAlign: 'super',
})

export default ({ to, reverseColor }: { to?: string, reverseColor?: boolean }) =>
  <Link to={to || '/'}>
    <Logo reverseColor={reverseColor}>
      Cold Crypto
      <Sup>beta mode</Sup>
    </Logo>
  </Link>
