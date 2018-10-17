import React, { Component, Fragment } from 'react'
import { Link } from 'fuse-react'

import { Container, Column, Row, Centered } from './shared/layout'
import { ButtonBase } from './shared/buttons'
import { H1, H2 } from './shared/typography'
import { Table } from './shared/table'

interface IProps {
  match: {
    params: {
      symbol: string
      address: string,
    },
  }
}

interface IState {
  address: string
  blockchain: string
  txs: Array<{
    hash: string
    value: string,
  }>
}

export default class Wallet extends Component<IProps, IState> {
  public state = {
    address: null,
    blockchain: null,
    txs: [],
  } as IState

  public componentWillMount = () => {
    const { match: { params: { symbol, address } } } = this.props
    fetch(`http://localhost:4443/${symbol}/${address}/txs`)
      .then((res) => res.json())
      .then((json) => this.setState(json))
  }

  public render() {
    return (
      <Container>
        <Column>
          <Row>
            <Column>
              <Centered>
                <H2>{this.state.blockchain}</H2>
                <H1>{this.state.address}</H1>
              </Centered>
            </Column>
            <Link to={`/txCreation/${this.state.blockchain}/${this.state.address}`}>
              <ButtonBase>Create New Tx</ButtonBase>
            </Link>
          </Row>
          <Table>
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
          </Table>
        </Column>
      </Container>
    )
  }
}

