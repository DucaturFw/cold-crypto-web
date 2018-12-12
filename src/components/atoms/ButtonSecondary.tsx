import styled from 'react-emotion'

import { Button } from './Button'

export const ButtonSecondary = styled(Button)({
  // ':hover': {
  //   background: 'rgb(230, 247, 253)',
  // },
  borderRadius: '6rem',
  background: 'transparent',
  border: '3px solid #00BCF9',
  color: '#00BCF9',
  transition: '.2s ease-in-out all',
  fontSize: '1rem',
})
