import styled from 'react-emotion'

import { Button } from './Button'

export const ButtonBase = styled(Button)({
  // ':hover': {
  //   background: 'rgb(13, 137, 180)',
  // },
  borderRadius: '6rem',
  background: '#00BCF9',
  color: '#fff',
  transition: '.2s ease-in-out all',
  fontSize: '1rem',
})
