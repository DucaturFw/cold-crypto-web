import React from 'react'
import fetch from 'fetch-hoc'
import { compose, mapProps } from 'recompact'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import { Table } from '../shared/table'

import Layout from '../layouts/Dashboard'
import ButtonBase from '../atoms/ButtonBase'
import H1 from '../atoms/H1'
import H2 from '../atoms/H2'
import Hr from '../atoms/Hr'
import Column from '../atoms/column'
import Row from '../atoms/Row'

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

const withFetch = fetch(({ match: { params: { address } } }) =>
  /* tslint:disable:max-line-length */
  `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken`)

const withMapProps = mapProps(({ data, match: { params: { blockchain, address } } }) => ({
  address,
  blockchain,
  txs: (data && data.result) ? data.result : [],
}))

export default compose(withFetch, withMapProps)(Wallet)
