import React from 'react'
import styled, { css } from 'react-emotion'
import { H1, Link } from '../atoms'

const Root = styled('header')({
  gridArea: 'header',
  height: '4rem',
  display: 'flex',
  justifyContent: 'space-between',
})

const Logo = styled(H1)(({ reverse }: { reverse: boolean }) => ({
  color: reverse ? '#171933' : '#fff',
  padding: '2rem',
  fontSize: '1.4rem',
}))

const MainMenu = styled('div')({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  fontSize: '.9rem',
  marginTop: '1rem',
  marginRight: '1rem',
  a: {
    color: '#fff',
    padding: '2rem',
  }
})

export const Header = ({ to, logoColorReverse }: { to: string, logoColorReverse?: boolean }) => (
  <Root>
    <Link to={to}>
      <Logo reverse={Boolean(logoColorReverse)}>
        Cold Crypto
        <sup
          className={css`
            color: #f2494d;
            font-size: 0.7rem;
            text-transform: lowercase;
            vertical-align: super;
          `}
        >
          beta mode
        </sup>
      </Logo>
    </Link>
    <MainMenu>
      <Link to="#">About</Link>
      <Link to="#">Blog</Link>
      <Link to="#">Support</Link>
      <Link to="#">Sign up</Link>
    </MainMenu>
  </Root>
)
