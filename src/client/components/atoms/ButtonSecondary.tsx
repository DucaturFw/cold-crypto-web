import styled from 'react-emotion'

import Button from './Button'

export default styled(Button)({
  ':hover': {
    background: 'rgb(200, 220, 225)',
  },
  background: 'transparent',
  color: 'rgb(84, 84, 86)',
  transition: '.2s ease-in-out all',
})
