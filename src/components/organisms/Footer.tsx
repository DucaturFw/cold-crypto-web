import React from 'react'
import styled from 'react-emotion'

const Root = styled('header')({
  gridArea: 'footer',
  height: '4rem',
})


export const Footer = () => (
  <Root>
    <div style={{
      color: 'rgba(255, 255, 255, 0.2)',
      fontSize: '.85rem',
      paddingLeft: '2rem'
    }}>
      &copy; Cold Crypto 2018. All rights reserved.
    </div>
  </Root>
)
