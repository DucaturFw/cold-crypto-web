import React from 'react'
import styled from 'react-emotion'

import Link from '../atoms/Link'
import { IWallet } from '../../reducers/walletReducer'
import Column from '../atoms/Column'
import Row from '../atoms/Row'
import ButtonAdd from '../atoms/ButtonAdd'

interface IProps {
  item: IWallet
}

const WalletRow = styled(Row)({
  ':hover': {
    background: 'rgb(230, 247, 253)',
    borderColor: 'rgb(149, 222, 248)',
    small: {
      color: 'rgb(16, 173, 228)',
    },
    strong: {
      color: 'rgb(16, 173, 228)',
    },
  },
  border: '1px solid transparent',
  borderBottom: '1px solid rgb(234, 234, 234)',
  padding: '0 .5rem',
  small: {
    display: 'block',
    height: '1.2em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transition: 'all .3s ease-in-out',
    whiteSpace: 'nowrap',
    width: '50vw',
  },
  strong: {
    display: 'block',
    fontSize: '1.1rem',
    transition: 'all .3s ease-in-out',
  },
  transition: 'all .3s ease-in-out',
} as any)

const UndecoratedLink = styled(Link)({
  color: 'rgb(84, 84, 86)',
})

const Balance = styled('div')({
  color: 'rgb(202, 58, 60)',
})

const Centered = styled('div')({
  justifyContent: 'center',
  padding: '1rem 1rem 1rem 0',
})

export default ({ item }: IProps) =>
  <WalletRow>
    <Column style={{ width: '70%' }}>
      <UndecoratedLink
        to={`/wallet/${item.blockchain}/${item.address}`}
        key={item.address} >
        <Centered>
          <strong>{item.blockchain}</strong>
          <small>{item.address}</small>
        </Centered>
      </UndecoratedLink>
    </Column>
    <Column style={{ width: '20%', justifyContent: 'center' }}>
      <Centered>
        <Balance>${item.balance || 0}</Balance>
      </Centered>
    </Column>
    <Column style={{ width: '10%', justifyContent: 'center' }}>
      <Centered>
        <ButtonAdd
          to={`/txCreation/${item.blockchain}/${item.address}`}
          title='Make a new transaction' />
      </Centered>
    </Column>
  </WalletRow>
