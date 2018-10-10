import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Container, Centered, FlowRow } from './layout'

interface Props {
  match: {
    params: {
      blockchain: string
      address: string
    }
  }
}

interface State {
  gas: {
    "average": 20.0,
    "fastestWait": 0.5,
    "fastWait": 0.6,
    "fast": 200.0,
    "safeLowWait": 4.3,
    "blockNum": 6471259,
    "avgWait": 2.4,
    "block_time": 14.26842105263158,
    "speed": 0.7856651476674678,
    "fastest": 630.0,
    "safeLow": 16.0
  }
  price: string
}

export default class Wallet extends Component<Props, State> {
  state = {
    gas: {},
    price: '',
  } as State

  componentWillMount = () => {
    const { match: { params: { blockchain, address } } } = this.props  
    fetch(`http://localhost:4443/${blockchain}/gas`) //'/eth/gas' // market/price/eth
      .then(res => res.json())
      .then(gas => this.setState({ gas }))

    fetch(`http://localhost:4443/market/price/${blockchain}`)
      .then(res => res.json())
      .then(json => this.setState({ price }))
  }

  render() {
    console.log(this.state)
    return (
      <Container>
        <Centered>
          <Link to='/txCreation'><button>Create New Tx</button></Link>
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
              { this.state.txs.map(v => (
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

