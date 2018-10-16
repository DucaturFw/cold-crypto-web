import styled from 'react-emotion'

export const Button = styled('button')({
  borderRadius: '.2rem',
  cursor: 'pointer',
  fontSize: '1.34rem',
  outline: 'none',
  padding: '1rem 2rem',
  width: '100%',
})

export const ButtonBase = styled(Button)({
  background: 'rgb(89, 201, 211)',
  borderBottom: '3px solid #52979d',
  color: '#f1faee',
})

export const ButtonSecondary = styled(Button)({
  background: 'transparent',
  border: '1px solid #52979d',
  color: '#52979d',
  fontSize: '1rem',
})

export const ButtonWarning = styled(ButtonSecondary)({
  borderColor: '#e63946',
  color: '#e63946',
})
