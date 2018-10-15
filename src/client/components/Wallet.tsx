import React, { Component } from 'react'
import { Link } from 'fuse-react'

import { Container, Centered } from './layout'

interface Props {
  match: {
    params: {
      symbol: string
      address: string,
    },
  }
}

interface State {
  address: string
  blockchain: string
  txs: Array<{
    hash: string
    value: string,
  }>
}

export default class Wallet extends Component<Props, State> {
  public state = {
    address: null,
    blockchain: null,
    txs: [],
  } as State

  public componentWillMount = () => {
    const { match: { params: { symbol, address } } } = this.props
    fetch(`http://localhost:4443/${symbol}/${address}/txs`)
      .then((res) => res.json())
      .then((json) => this.setState(json))
  }

  public render() {
    return (
      <Container>
        <Centered>
          <h2>{this.state.blockchain}</h2>
          <h1>{this.state.address}</h1>
          <Link to={`/txCreation/${this.state.blockchain}/${this.state.address}`}><button>Create New Tx</button></Link>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>TxHash</th>
                <th>Address</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              { this.state.txs.map((v) => (
                <tr key={v.hash}>
                  <td>date</td>
                  <td>{v.hash}</td>
                  <td>address</td>
                  <td>{v.value}</td>
                </tr>
              )) }
            </tbody>
          </table>
        </Centered>
      </Container>
    )
  }
}

