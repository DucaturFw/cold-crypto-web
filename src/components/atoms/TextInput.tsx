import styled from 'react-emotion'

export const TextInput = styled('input')({
  '::placeholder': {
    color: '#93a7b3',
  },
  background: 'rgb(255, 255, 255)',
  border: '1px solid rgb(204, 204, 204)',
  boxSizing: 'border-box',
  color: 'rgb(84, 84, 86)',
  fontSize: '.9rem',
  margin: '.25rem 0',
  outline: 'none',
  padding: '.75rem 1rem',
  width: '100%',
})
