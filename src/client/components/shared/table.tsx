import styled from 'react-emotion'

export const Table = styled('table')({
  borderCollapse: 'collapse',
  borderSpacing: 0,
  td: {
    color: '#2e3d3f',
    padding: '1rem .5rem',
  },
  th: {
    color: '#457b9d',
    padding: '.5rem',
  },
  tr: {
    borderBottom: '1px solid #b2bcb9',
  },
  width: '100%',
})
