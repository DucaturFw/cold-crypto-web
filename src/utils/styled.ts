import styled, { CreateStyled } from 'react-emotion'

export interface ITheme {
  colors: {
    background: string
    body: string
    black: string
    white: string
  }
  fontSizes: {
    h1: string
    h2: string
    h3: string
    h4: string
  }
  breakpoints: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  widths: {
    md: string
    lg: string
    xl: string
  }
}

export default styled as CreateStyled<ITheme>
