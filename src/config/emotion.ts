import { injectGlobal } from 'emotion'
import styled, { CreateStyled } from 'react-emotion'

type Theme = {
  color: {
    primary: string
  }
}

export default styled as CreateStyled<Theme>

export const theme: Theme = {
  color: {
    primary: '#1888FE',
  },
}

injectGlobal`
  * {
    outline: none;
  }
  html,
  body {
    font-family: 'Lato', 'Arial', sans-serif;
    color: #000000;
    line-height: 1.3;
    min-height: 100vh;
    margin: 0;
    outline: none;
  }
  #root {
    height: 100%;
  }
  a {
    display: inline-block;
    text-decoration: none;
    transition: all 0.3s;
  }
`
