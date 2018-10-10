import styled from 'react-emotion'

export const Container = styled('main')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh'
})

export const Centered = styled('div')({
  textAlign: 'center',
  justifyContent: 'center'
})

export const FlowRow = styled('div')({
  display: 'flex',
  justifyContent: 'space-around'
})

export const Column = styled('div')({
  display: 'flex',
  flexFlow: 'column nowrap'
})
