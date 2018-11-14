import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { Link } from 'fuse-react'

import Layout from '../layouts/Dashboard'
import H1 from '../atoms/H1'
import Hr from '../atoms/Hr'
import Column from '../atoms/Column'
import WalletList from '../moleculas/WalletList'

import { IWalletDefaultState, IWallet } from '../../reducers/wallet'

const Wallets = ({ wallets }: { wallets: IWallet[]}) =>
  <Layout>
    <Column>
      <H1>Choose a wallet</H1>
      <Hr />
      <WalletList list={ wallets } />
    </Column>
  </Layout>

interface IProps {
  wallet: IWalletDefaultState
}

const withConnect = connect(({ wallet: { wallets } }: IProps) => ({ wallets }))

export default withConnect(Wallets)
