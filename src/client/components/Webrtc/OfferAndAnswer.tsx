import React from 'react'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'
import { Container, Centered, Column, Row } from '../shared/layout'
import { H1 } from '../shared/typography'
import { parseJsonString } from '../../helpers/json';


const Offer = ({ scanAnswer, qrcodeValue }) => {

  return (
    <Container>
      <Row style={{ minWidth: '80vw' }}>
        <Column style={{ width: '45%', marginRight: '5%' }}>
          <H1>1. Scan this offer</H1>
          <QRCode
            value={ JSON.stringify(qrcodeValue) }
            renderAs='svg'
            size='100%'
          />
        </Column>
        <Column style={{ width: '45%', marginLeft: '5%' }}>
          <H1>2. Show your offer here</H1>
          <QrReader
            delay={300}
            onScan={(answer) => answer && scanAnswer(parseJsonString(answer))}
            onError={(error) => console.log(error)}
            style={{ width: '100%' }}
          />
        </Column>
      </Row>
    </Container>
  )
}

export default  Offer
