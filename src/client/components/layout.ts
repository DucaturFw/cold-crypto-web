import styled from 'react-emotion'

export const Container = styled('main')({
  alignItems: 'center',
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  width: '100vw',
  background: '#f1faee',
})

export const Centered = styled('div')({
  justifyContent: 'center',
  textAlign: 'center',
})

export const Row = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
})

export const Column = styled('div')({
  display: 'flex',
  flexFlow: 'column nowrap',
})
