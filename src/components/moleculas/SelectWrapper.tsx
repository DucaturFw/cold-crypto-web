import styled from 'react-emotion'

export const Select = styled('select')(
  ({ flipToRight }: { flipToRight: boolean }) => ({
    ':after': {
      border: 'solid white',
      borderWidth: '0 3px 3px 0',
      content: '""',
      position: 'absolute',
    },
    appearance: 'none',
    background: '#00BCF9',
    border: 0,
    borderRadius: flipToRight ? '0 .2rem .2rem 0' : '.2rem',
    color: '#f1faee',
    padding: '0 1rem',
    boxSizing: 'border-box',
    position: 'absolute',
    margin: '.25rem 0',
    height: '2rem',
    right: 0,
  })
)
