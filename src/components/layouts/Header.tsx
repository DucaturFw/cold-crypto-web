import React from 'react'
import styled, { css } from 'react-emotion'
import { H1, Link } from '../atoms'

const Root = styled('header')({
  background: 'rgb(0, 74, 124)',
  gridArea: 'header',
  height: '4rem',
})

const Logo = styled(H1)`
  color: #fff;
  padding: 1rem;
`

export const Header = ({ to }: { to: string }) => (
  <Root>
    <Link to={to}>
      <Logo>
        Cold Crypto
        <sup
          className={css`
            color: #f2494d;
            font-size: 0.8rem;
            text-transform: lowercase;
            vertical-align: super;
          `}
        >
          beta mode
        </sup>
      </Logo>
    </Link>
  </Root>
)
