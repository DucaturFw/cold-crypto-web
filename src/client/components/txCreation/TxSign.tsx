/* TODO: Rewrite it to sagas */
import React from 'react'
import { connect } from 'react-redux'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'

import { requestPushTx } from '../../actions'

import { Column, Row } from '../shared/layout'
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
  <Row style={{ minWidth: '80vw' }}>
    <Column style={{ width: '45%', marginRight: '5%' }}>
      <H2>1. Scan this request</H2>
      <QRCode
        value={JSON.stringify(props.value)}
        renderAs='svg'
        size='100%'
      />
    </Column>
    <Column style={{ width: '45%', marginLeft: '5%' }}>
      <H2>2. Show response here</H2>
      <QrReader
        delay={300}
        onScan={(sign) => sign && props.requestPushTx(sign)}
        onError={(err) => props.requestPushTx(Error(err))}
        style={{ width: '100%' }}
      />
    </Column>
  </Row>

export default connect(null, { requestPushTx })(TxSign)
