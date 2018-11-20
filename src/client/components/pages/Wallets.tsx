import React from 'react'
import { connect } from 'react-redux'

import Layout from '../layouts/Dashboard'
import H1 from '../atoms/H1'
import Hr from '../atoms/Hr'
import Column from '../atoms/Column'
import WalletList from '../moleculas/WalletList'

import { IState, IWallet } from '../../reducers/walletReducer'

const Wallets = ({ wallets }: { wallets: IWallet[]}) =>
  <Layout>
    <Column>
      <H1>Choose a wallet</H1>
      <Hr />
      <WalletList list={ wallets || [] } />
    </Column>
  </Layout>

const withConnect = connect(({ wallet: { wallets } }: { wallet: IState }) => ({ wallets }))

export default withConnect(Wallets)
