import styled from 'react-emotion'

export const Select = styled('select')(
  ({ flipToRight }: { flipToRight?: boolean }) => ({
    ':after': {
      border: 'solid white',
      borderWidth: '0 3px 3px 0',
      content: '""',
      position: 'absolute',
    },
    appearance: 'none',
    background: '#00BCF9',
    border: 0,
    borderRadius: '6rem',
    color: '#f1faee',
    padding: '0 1rem',
    boxSizing: 'border-box',
    margin: '.25rem 0',
  })
)
