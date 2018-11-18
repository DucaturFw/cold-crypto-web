import React from 'react'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'
import { connect } from 'react-redux'

import ModalLayout from '../layouts/Modal'
import Column from '../atoms/Column'
import Row from '../atoms/Row'
import H2 from '../atoms/H2'
import H3 from '../atoms/H3'
import Hr from '../atoms/Hr'
import ButtonClose from '../atoms/ButtonClose'
import Centered from '../atoms/Centered'

import { setScanResult } from '../../actions'
import { IState } from '../../reducers'

interface IProps {
  signedData: string
  setScanResult: typeof setScanResult
}

const TxCreationSign = ({ signedData, setScanResult: handleResult }: IProps) =>
  <ModalLayout>
    <Row>
      <Column>
        <H2>Sign Transaction By Mobile</H2>
        <H3>Follow these steps to sign your transaction using your mobile device</H3>
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
            value={signedData || ''}
            renderAs='svg'
            style={{width: '30vh', height: '30vh'}}
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
            onScan={(result) => result && handleResult(result)}
            onError={(error) => handleResult(Error(error))}
            style={{ width: '30vh' }}
          />
        </Centered>
      </Column>
    </Row>
  </ModalLayout>

const mapStateToProps = ({ wallet: { signedData } }: IState) => ({ signedData })
const withConnect = connect(mapStateToProps, { setScanResult })

export default withConnect(TxCreationSign)
