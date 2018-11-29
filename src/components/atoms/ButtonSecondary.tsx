import styled from 'react-emotion'

import { Button } from './Button'

export const ButtonSecondary = styled(Button)({
  ':hover': {
    background: 'rgb(230, 247, 253)',
  },
  background: 'transparent',
  border: '1px solid rgb(0,74,124)',
  color: 'rgb(84, 84, 86)',
  transition: '.2s ease-in-out all',
})
