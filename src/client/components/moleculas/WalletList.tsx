import React from 'react'
import styled from 'react-emotion'

import Item from './WalletItem'
import { IWallet } from '../../reducers/walletReducer'

interface IProps {
  list: IWallet[]
}

const Container = styled('div')({
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
})

export default ({ list }: IProps) =>
  <Container>
    { list.map((v) => <Item key={v.nonce} item={v} />) }
  </Container>
