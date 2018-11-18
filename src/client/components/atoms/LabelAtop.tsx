import React from 'react'
import styled from 'react-emotion'

const Container = styled('strong')({
  position: 'relative',
})

const Label = styled('span')({
  color: 'rgb(117, 118, 121)',
  padding: '1rem',
  position: 'absolute',
  right: 0,
})

export default ({ label, children }: { label: string, children: JSX.Element }) => (
  <Container>
    {children}
    <Label>{label}</Label>
  </Container>
)