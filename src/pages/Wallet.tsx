import * as React from 'react'
import styled from 'react-emotion'
import { Row, H2, Column, ButtonBase, H1, Hr } from '../components/atoms'
import { Link } from 'react-router-dom'

export const Wallet: React.SFC<{}> = () => (
  <React.Fragment>
    <Column>
      <Row>
        <Column style={{ flexBasis: '15rem', marginRight: '2rem' }}>
          <Link to={`/create/tx/0x000`}>
            <ButtonBase>Create New Tx</ButtonBase>
          </Link>
          <Link to={`/create/contract/0x0000000`}>
            <ButtonBase>Call Contract</ButtonBase>
          </Link>
        </Column>
        <Column>
          {/* <H1>{blockchain} Wallet</H1> */}
          <H1>Eth Wallet</H1>
          <H2>
            {/* <Address>{address}</Address> */}
            <Address>0x000000000000000000</Address>
          </H2>
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
          {/* {txs.map((v, index) => (
            <tr key={index}>
              <td>{new Date(v.timeStamp * 1000).toLocaleString()}</td>
              <OverflowTd>
                <a
                  target="_blank"
                  href={`https://rinkeby.etherscan.io/tx/${v.hash}`}
                >
                  {v.hash}
                </a>
              </OverflowTd>
              <OverflowTd>{v.from}</OverflowTd>
              <td>{v.value}</td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </Column>
  </React.Fragment>
)

export const Table = styled('table')({
  borderCollapse: 'collapse',
  borderSpacing: 0,
  td: {
    color: '#2e3d3f',
    padding: '1rem .5rem',
  },
  th: {
    color: '#457b9d',
    padding: '.5rem',
  },
  tr: {
    borderBottom: '1px solid #b2bcb9',
  },
  width: '100%',
})

// const OverflowTd = styled('td')({
//   maxWidth: '20vw',
//   overflow: 'hidden',
//   textOverflow: 'ellipsis',
// })

const Address = styled('div')({
  fontSize: '.8rem',
  lineHeight: '1.5rem',
})
