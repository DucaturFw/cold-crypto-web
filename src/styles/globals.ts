import { css } from 'react-emotion'

export default css`
  @font-face {
    font-family: 'GothamPro';
    src: url(GothamPro.woff);
  }
  html,
  body {
    font-family: 'GothamPro', 'Lato', 'Arial', sans-serif;
    margin: 0;
  }
  #root {
    height: 100%;
  }
  input[type=range] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: none;
    background: #736C82;
    border-radius: 1.3px;
    border: 0;
  }
  input[type=range]::-webkit-slider-thumb {
    box-shadow: none;
    border: 0;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #00BCF9;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -6px;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #736C82;
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: none;
    background: #736C82;
    border-radius: 1.3px;
    border: 0;
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: none;
    border: 0;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #00BCF9;
    cursor: pointer;
  }
`
