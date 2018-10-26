import styled from 'react-emotion'

export const TextInput = styled('input')({
  '::placeholder': {
    color: '#93a7b3',
  },
  background: '#eff9f9',
  border: '1px solid #457b9d',
  color: '#457b9d',
  fontSize: '.9rem',
  outline: 'none',
  padding: '1rem',
  width: '100%',
})

export const Select = styled('select')(({ flipToRight }: { flipToRight: boolean }) => ({
  '::after': {
    border: 'solid white',
    borderWidth: '0 3px 3px 0',
    content: '""',
    position: 'absolute',
    textTransform: 'uppercase',
  },
  appearance: 'none',
  background: '#457b9d',
  border: 0,
  borderRadius: flipToRight ? '0 .2rem .2rem 0' : '.2rem',
  color: '#f1faee',
  margin: flipToRight ? '0 0 0 -.2rem' : 0,
  padding: '0 1rem',
}))