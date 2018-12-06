import React from 'react'
import styled from 'react-emotion'
import { Link } from '../atoms'
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

export const Header = ({ to, logoColorReverse }: { to: string, logoColorReverse?: boolean }) => (
  <Root>
    <Logo reverseColor={false} />
    <MainMenu>
      <Link to="#">About</Link>
      <Link to="#">Blog</Link>
      <Link to="#">Support</Link>
      <Link to="#">Sign up</Link>
    </MainMenu>
  </Root>
)
