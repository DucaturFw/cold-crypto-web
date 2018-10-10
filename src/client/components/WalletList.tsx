import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Container, Column } from './layout'

export default class WalletList extends Component {
  state = {
    list: []
  }

  componentWillMount() {
    const list = [
      { symbol: 'eth', address: '0x00', balance: 1500 },
      { symbol: 'eth', address: '0x01', balance: 12500 }
    ]

    localStorage.setItem('walletsList', JSON.stringify(list))
    this.setState({ list })
  }

  render() {
    return (
      <Container>
        <Column>
          { this.state.list.map(v => (
            <Link to={`/wallet/${v.symbol}/${v.address}`} key={v.address}>{ `${v.symbol}: ${v.address} | ${v.balance}` }</Link>
          )) }
        </Column>
      </Container>
    )
  }
}