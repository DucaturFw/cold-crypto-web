/* TODO: Rewrite it to sagas */
import React from 'react'
import { connect } from 'react-redux'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'

import { requestPushTx } from '../../actions'

import { Column, Row, Centered } from '../shared/layout'
import { H2 } from '../shared/typography'

interface IProps {
  address: string
  blockChainData: object
  blockChainPrice: string
  value: {
    to: string;
    amount: string;
    gasPrice: string;
  }
  requestPushTx: typeof requestPushTx
}

const TxSign = (props: IProps) =>
  <Row style={{ width: '100vw' }}>
    <Column style={{ width: '40%', margin: '0 5%' }}>
      <Centered>
        <H2>1. Scan this request</H2>
      </Centered>
      <Centered style={{display: 'flex'}}>
        <QRCode
          value={JSON.stringify(props.value)}
          renderAs='svg'
          size='100%'
        />
      </Centered>
    </Column>
    <Column style={{ width: '40%', margin: '0 5%' }}>
      <Centered>
        <H2>2. Show response here</H2>
      </Centered>
      <Centered style={{display: 'flex'}}>
        <QrReader
          delay={300}
          onScan={(sign) => sign && props.requestPushTx(sign)}
          onError={(err) => props.requestPushTx(Error(err))}
          style={{ width: '100%' }}
        />
      </Centered>
    </Column>
  </Row>

export default connect(null, { requestPushTx })(TxSign)
