import styled from 'react-emotion'

export const H1 = styled('h1')({
  color: '#59c9d3',
  fontSize: '2.6rem',
  fontWeight: 'normal',
  margin: '.25rem 0',
})

export const H2 = styled('h2')({
  color: '#469ea6',
  fontSize: '1.2em',
  fontWeight: 'normal',
  margin: '.5rem 0',
})

export const JustSeparator = styled('div')({
  background: '#babec1',
  height: 2,
  margin: '1rem 0',
  width: '100%',
})

export const Separator = styled('div')({
  ':after': {
    background: '#babec1',
    content: '""',
    display: 'block',
    height: 2,
    position: 'absolute',
    right: 0,
    top: '.8rem',
    width: '35%',
  },
  ':before': {
    background: '#babec1',
    content: '""',
    display: 'block',
    height: 2,
    left: 0,
    position: 'absolute',
    top: '.8rem',
    width: '35%',
  },
  color: '#1a3640',
  fontSize: '1.2rem',
  margin: '1rem 0',
  position: 'relative',
  width: '100%',
})
