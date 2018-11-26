import React from 'react'
import { connect } from 'react-redux'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import { Table } from '../shared/table'

import Layout from '../layouts/Dashboard'
import ButtonBase from '../atoms/ButtonBase'
import H1 from '../atoms/H1'
import H2 from '../atoms/H2'
import Hr from '../atoms/Hr'
import Column from '../atoms/Column'
import Row from '../atoms/Row'

import { IState } from '../../reducers'

interface IProps {
  blockchain: string,
  address: string,
  txs: Array<{
    hash: string
    value: string,
    timeStamp: number,
    from: string,
  }>
}

const OverflowTd = styled('td')({
  maxWidth: '20vw',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const Address = styled('div')({
  fontSize: '.8rem',
  lineHeight: '1.5rem',
})

const Wallet = ({ txs, blockchain, address }: IProps) =>
  <Layout>
    <Column>
      <Row>
        <Column style={{ flexBasis: '15rem', marginRight: '2rem' }}>
          <Link to={`/txCreation/${blockchain}/${address}`}>
            <ButtonBase>Create New Tx</ButtonBase>
          </Link>
          <Link to={`/contract/${blockchain}/${address}/call`}>
            <ButtonBase>Call Contract</ButtonBase>
          </Link>
        </Column>
        <Column>
          <H1>{blockchain} Wallet</H1>
          <H2><Address>{address}</Address></H2>
        </Column>
      </Row>
      <Hr />
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
          { txs.map((v, index) => (
            <tr key={index}>
              <td>{new Date(v.timeStamp * 1000).toLocaleString()}</td>
              <OverflowTd>
                <a target='_blank' href={`https://rinkeby.etherscan.io/tx/${v.hash}`}>
                  {v.hash}
                </a>
              </OverflowTd>
              <OverflowTd>{v.from}</OverflowTd>
              <td>{v.value}</td>
            </tr>
          )) }
        </tbody>
      </Table>
    </Column>
  </Layout>

const withConnect = connect(
  ({ txs }: IState, { match: { params: { blockchain, address } } }: any) =>
    ({ txs: txs[blockchain][address] || [], blockchain, address }))

export default withConnect(Wallet)
