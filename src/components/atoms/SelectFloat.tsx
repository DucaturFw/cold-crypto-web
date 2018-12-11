import styled from 'react-emotion'

export const SelectFloat = styled('select')(
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
    boxSizing: 'border-box',
    margin: '.25rem 0',
    position: 'absolute',
    marginLeft: '15.25rem',
    padding: '.82rem 1rem',
  })
)
