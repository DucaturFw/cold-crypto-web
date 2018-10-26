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
    timeStamp: number,
    from: string,
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
    fetch(`http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`)
      .then((res) => res.json())
      .then((json) => this.setState({txs: json.result}))
  }

  public render() {
    const { match: { params: { symbol, address } } } = this.props
    return (
      <Container>
        <Column>
          <Row>
            <Column>
              <Centered>
                <H2>{symbol}</H2>
                <H1>{address}</H1>
              </Centered>
            </Column>
            <Link to={`/txCreation/${symbol}/${address}`}>
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
              { this.state.txs.map((v, index) => (
                <tr key={index}>
                  <td>{new Date(v.timeStamp * 1000).toLocaleString()}</td>
                  <td>
                    <a target="_blank" href={`https://rinkeby.etherscan.io/tx/${v.hash}`}>
                      {v.hash}
                    </a>
                  </td>
                  <td>{v.from}</td>
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

