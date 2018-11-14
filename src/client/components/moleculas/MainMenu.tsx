import React from 'react'
import styled from 'react-emotion'

import Link from '../atoms/Link'

const items = [
  { id: 'wallets', title: 'Wallets' },
]

const MenuLink = styled(Link)(({ active }: { active: boolean }) => ({
  borderLeft: `4px solid ${active ? 'rgb(53, 88, 168)' : 'transparent'}`,
  color: active ? 'rgb(53, 88, 168)' : 'rgb(84, 84, 86)',
  fontWeight: active ? 'bold' : 'normal',
  padding: '.75rem 1.5rem',
}))

const Container = styled('menu')({
  padding: '.5rem 0',
})

export default () => (
  <Container>
    { items.map(({ id, title}) => (
      <MenuLink to={ `/${id}` } key={ id } active={ true }>{ title }</MenuLink>
    )) }
  </Container>
)
