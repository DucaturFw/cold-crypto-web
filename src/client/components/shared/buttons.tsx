import styled from 'react-emotion'

export const Button = styled('button')({
  cursor: 'pointer',
  fontSize: '1.34rem',
  outline: 'none',
  padding: '1rem 2rem',
})

export const ButtonBase = styled(Button)({
  background: '#59c9d3',
  borderBottom: '3px solid #52979d',
  color: '#f1faee',
})

export const ButtonSecondary = styled(Button)({
  background: 'transparent',
  border: '1px solid #52979d',
  color: '#52979d',
  fontSize: '1rem',
})
