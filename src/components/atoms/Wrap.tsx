import styled from 'react-emotion'

export const Wrap = styled('div')(
  ({ horizontal, vertical }: { horizontal?: number; vertical?: number }) => ({
    margin: `${vertical || 0}rem ${horizontal || 0}rem`,
  })
)
