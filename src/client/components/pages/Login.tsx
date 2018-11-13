import React from 'react'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'
import { connect } from 'react-redux'

import { scanWallets } from '../../actions'
import { parseJsonString } from '../../helpers/json'
import { getWalletList } from './../../helpers/webrtc'

import ModalLayout from '../layouts/Modal'
import H2 from '../atoms/H2'
import H3 from '../atoms/H3'
import Hr from '../atoms/Hr'
import ButtonClose from '../atoms/ButtonClose'
import Row from '../atoms/Row'
import Column from '../atoms/Column'
import Centered from '../atoms/Centered'

export interface IProps {
  scanWallets: typeof scanWallets
}

const Login = (props: IProps) => (
  <ModalLayout>
    <Row>
      <Column>
        <H2>Mobile Login</H2>
        <H3>Follow these steps to log into your web wallet using your mobile device</H3>
      </Column>
      <ButtonClose />
    </Row>
    <Hr/>
    <Row>
      <Column style={{ width: '50%' }}>
        <Centered>
          <H2>Scan QR Code</H2>
        </Centered>
        <Centered style={{display: 'flex'}}>
          <QRCode
            value={ getWalletList() }
            renderAs='svg'
            style={{width: '25vh', height: '25vh'}}
          />
        </Centered>
      </Column>
      <Column style={{ width: '50%' }}>
        <Centered>
          <H2>Show QR Code</H2>
        </Centered>
        <Centered style={{display: 'flex'}}>
          <QrReader
            delay={300}
            onScan={(result: string) => result && props.scanWallets(parseJsonString(result.substr(3)))}
            onError={(error: string) => props.scanWallets(Error(error))}
            style={{ width: '25vh' }}
          />
        </Centered>
      </Column>
    </Row>
  </ModalLayout>
)

export default connect(null, { scanWallets })(Login)
