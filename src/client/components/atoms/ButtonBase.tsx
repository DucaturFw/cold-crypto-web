import styled from 'react-emotion'

import Button from './Button'

export default styled(Button)({
  ':hover': {
    background: 'rgb(13, 137, 180)',
  },
  background: 'rgb(16, 173, 228)',
  color: '#fff',
  transition: '.2s ease-in-out all',
})
