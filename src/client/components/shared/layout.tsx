import styled from 'react-emotion'

export const Container = styled('main')({
  alignItems: 'center',
  background: '#f1faee',
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
  width: '100vw',
})

export const Centered = styled('div')({
  justifyContent: 'center',
  textAlign: 'center',
})

export const Row = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
  margin: '1rem 0',
})

export const Column = styled('div')({
  display: 'flex',
  flexFlow: 'column nowrap',
})
