import styled from 'react-emotion'

export const TextInput = styled('input')({
  '::placeholder': {
    color: 'rgba(22, 10, 46, 0.6)',
  },
  background: '#F3F2F4',
  border: '2px solid #736C82',
  borderRadius: '6rem',
  boxSizing: 'border-box',
  color: 'rgba(22, 10, 46, 0.6)',
  fontSize: '.9rem',
  margin: '.25rem 0',
  outline: 'none',
  padding: '.75rem 1rem',
  width: '100%',
})
