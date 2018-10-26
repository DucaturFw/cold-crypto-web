import styled from 'react-emotion'
import { Link } from 'fuse-react'
import logo from '../../public/logo.png'

export const Container = styled('main')({
  alignItems: 'center',
  background: '#f1faee',
  display: 'flex',
  justifyContent: 'center',
  minHeight: 'calc(100vh - 8rem - 4vh)',
  width: '100vw',
})

export const Centered = styled('div')({
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
})

export const Row = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
  margin: '1rem 0',
  width: '100%',
})

export const Column = styled('div')({
  display: 'flex',
  flexFlow: 'column nowrap',
  width: '100%',
})

export const Header = styled(Link)({
  ':after': {
    background: `url(${logo}) center center no-repeat`,
    content: '""',
    display: 'block',
    height: '8rem',
    width: '100vw',
  },
  background: 'linear-gradient(60deg, #abcedb 0%, #abcedb 49%, #c5dee7 49%, #c5dee7 54%, #d7e9ef 54%, #d7e9ef 100%)',
  display: 'block',
  padding: '2vh 0',
})
