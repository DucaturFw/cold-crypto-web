import React from 'react'
import styled from 'react-emotion'
import { Link } from '../atoms'

const Root = styled('aside')({
  background: '#fff',
  borderRight: '1px solid rgb(234, 234, 234)',
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
  padding: '.5rem 0',
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
    <MainMenu />
  </Root>
)
