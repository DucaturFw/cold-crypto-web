import React from 'react'
import styled from 'react-emotion'

import Link from '../atoms/Link'

const items = [
  { id: 'wallets', title: 'Wallets' },
]

const MenuLink = styled(Link)(({ selected }: { selected: boolean }) => ({
  borderLeft: `4px solid ${selected ? 'rgb(53, 88, 168)' : 'transparent'}`,
  color: selected ? 'rgb(53, 88, 168)' : 'rgb(84, 84, 86)',
  fontWeight: selected ? 'bold' : 'normal',
  padding: '.75rem 1.5rem',
}))

const Container = styled('menu')({
  padding: '.5rem 0',
})

export default () => (
  <Container>
    { items.map(({ id, title}) => (
      <MenuLink to={ `/${id}` } key={ id } selected={ true }>{ title }</MenuLink>
    )) }
  </Container>
)