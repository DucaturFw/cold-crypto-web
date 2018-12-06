import React from 'react'
import styled from 'react-emotion'

export const Select = styled('select')({
  appearance: 'none',
  background: '#F3F2F4',
  border: 0,
  borderRadius: '6rem',
  color: 'rgba(22, 10, 46, 0.6)',
  padding: '.8rem 1.2rem',
  boxSizing: 'border-box',
  margin: '.25rem 0',
  outline: 'none',
  position: 'relative',
  width: '100%',
})

const Wrapper = styled('div')({
  ':after': {
    content: '""',
    position: 'absolute',
    background: 'url("/icon-select-down.svg")',
    width: '1.5rem',
    height: '1.5rem',
    right: '.85rem',
    top: '.85rem',
  },
  width: '100%',
  position: 'relative',
})

export const SelectOptions = ({ children, onChange }: any) => (
  <Wrapper>
    <Select onChange={onChange}>{ children }</Select>
  </Wrapper>
)