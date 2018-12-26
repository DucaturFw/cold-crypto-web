import React from 'react'
import styled from 'react-emotion'
import { A } from '../atoms'
import Logo from '../moleculas/Logo'

const Root = styled('header')({
  gridArea: 'header',
  height: '4rem',
  display: 'flex',
  justifyContent: 'space-between',
})

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

export const Header = ({ to, logoColorReverse }: { to?: string, logoColorReverse?: boolean }) => (
  <Root>
    <Logo reverseColor={false} to={to} />
    <MainMenu>
      {/* <Link to="#">About</Link> */}
      {/* <Link to="#">Blog</Link> */}
      <A href="https://github.com/DucaturFw/cold-crypto-web/issues" target="blank">Support</A>
      <A href="https://duxi.io/cold/COLDCRYPTO_PRIVACY_POLICY.pdf" target="blank">Privacy policy</A>
      <A href="https://duxi.io/cold/COLDCRYPTO_TERMS_OF_USE.pdf" target="blank">Terms of use</A>
      {/* <Link to="#">Sign up</Link> */}
    </MainMenu>
  </Root>
)
