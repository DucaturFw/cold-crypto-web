import React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { Link } from 'fuse-react'
import { compose } from 'recompact'
import fetch from 'fetch-hoc'

import { Container, Column, Row, Header } from './shared/layout'
import { H1 } from './shared/typography'

import { IWalletDefaultState, IWallet } from '../reducers/wallet'

const WalletList = ({ wallets }: { wallets: IWallet[] }) =>
  <>
    <Header to='/' />
    <Container>
      <Column style={{ maxWidth: '32rem' }}>
        <Row>
          <H1>Choose a wallet</H1>
        </Row>
        {wallets.map((v) => (
          <LinkUndecorated
            to={`/wallet/${v.blockchain}/${v.address}`}
            key={v.address} >
            <WalletLinkContainer>
              <strong>{v.blockchain}</strong>
              <span>{v.address} <mark>{v.balance}</mark></span>
            </WalletLinkContainer>
          </LinkUndecorated>
        ))}
      </Column>
    </Container>
  </>

const LinkUndecorated = styled(Link)({
  color: '#457b9d',
  textDecoration: 'none',
})

const WalletLinkContainer = styled(Row)({
  ':hover': {
    cursor: 'pointer',
    span: {
      background: '#a8dadc',
      color: '#457b9d',
    },
    strong: {
      background: '#59c9d3',
    },
  },
  span: {
    alignItems: 'center',
    background: '#457b9d',
    color: '#f1faee',
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '-2rem',
    mark: {
      background: 'transparent',
      textAlign: 'right',
    },
    padding: '1rem 1rem 1rem 3rem',
    position: 'relative',
    width: '100%',
    zIndex: 1,
  },
  strong: {
    alignItems: 'center',
    background: '#1d3557',
    borderRadius: '100%',
    color: '#f1faee',
    display: 'flex',
    height: '3.3rem',
    justifyContent: 'center',
    textTransform: 'uppercase',
    width: '4rem',
    zIndex: 2,
  },
})

interface IProps {
  wallet: IWalletDefaultState
}

const withFetch = fetch('http://localhost:4443/addresses')
const withConnect = connect(({ wallet: { wallets } }: IProps) => ({ wallets }))

export default compose(withFetch, withConnect)(WalletList)
