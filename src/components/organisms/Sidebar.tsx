import React from 'react'
import styled from 'react-emotion'
import { Link } from '../atoms'
import Logo from '../moleculas/Logo'

const Root = styled('aside')({
  background: '#fff',
  boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.04)',
  gridArea: 'sidebar',
})

const items = [{ id: 'wallets', title: 'Wallets' }]

const MenuLink = styled(Link)(({ selected }: { selected: boolean }) => ({
  color: selected ? '#00BCF9' : '#171933',
  borderLeft: `3px solid ${selected ? '#00BCF9' : 'transparent'}`,
  fontWeight: selected ? 'bold' : 'normal',
  padding: '.75rem 1.5rem',
  background: selected ? 'rgba(179, 236, 254, 0.6)' : 'transparent'
}))

const Container = styled('menu')({
  padding: 0,
  margin: 0,
})

const MainMenu = () => (
  <Container>
    {items.map(({ id, title }) => (
      <MenuLink to={`/${id}`} key={id} selected={true}>
        {title}
      </MenuLink>
    ))}
  </Container>
)

export const Sidebar = () => (
  <Root>
    <Logo to='/' reverseColor={true} />
    <MainMenu />
  </Root>
)
