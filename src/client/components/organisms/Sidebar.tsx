import React from 'react'
import styled from 'react-emotion'

import MainMenu from '../moleculas/MainMenu'

const Sidebar = styled('aside')({
  background: 'rgb(245, 247, 249)',
  borderRight: '1px solid rgb(234, 234, 234)',
  gridArea: 'sidebar',
})

export default () => (
  <Sidebar>
    <MainMenu />
  </Sidebar>
)
