import styled from 'react-emotion'
import logo from '../../public/logo.png'

export const Container = styled('main')({
  alignItems: 'center',
  background: '#f1faee',
  display: 'flex',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 12rem)',
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

export const Header = styled('div')({
  ':after': {
    background: `url(${logo}) center center no-repeat`,
    content: '""',
    display: 'block',
    height: '8rem',
    width: '100vw',
  },
  background: 'linear-gradient(60deg, #abcedb 0%, #abcedb 49%, #c5dee7 49%, #c5dee7 54%, #d7e9ef 54%, #d7e9ef 100%)',
  padding: '2rem 0',
})
