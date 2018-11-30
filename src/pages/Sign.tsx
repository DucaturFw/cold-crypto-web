import * as React from 'react'
import {
  Row,
  Hr,
  ButtonClose,
  Column,
  H2,
  H3,
  Centered,
} from '../components/atoms'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { IApplicationState, IConnectedReduxProps } from '../store'
import { sendTransaction } from '../store/qrcode/actions'

interface IPropsFromState {
  signData: string
}

interface IPropsFromDispatch {
  sendTx: typeof sendTransaction
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

const SignPage: React.SFC<AllProps> = ({ signData, sendTx }) => (
  <React.Fragment>
    <Row>
      <Column>
        <H2>Sign Transaction By Mobile</H2>
        <H3>
          Follow these steps to sign your transaction using your mobile device
        </H3>
      </Column>
      <ButtonClose />
    </Row>
    <Hr />
    <Row>
      <Column style={{ width: '50%' }}>
        <Centered>
          <H2>Scan QR Code</H2>
        </Centered>
        <Centered style={{ display: 'flex' }}>
          <QRCode value={signData || ''} renderAs="svg" />
        </Centered>
      </Column>
      <Column style={{ width: '50%' }}>
        <Centered>
          <H2>Show QR Code</H2>
        </Centered>
        <Centered style={{ display: 'flex' }}>
          <QrReader
            delay={300}
            onScan={result => result && sendTx(result)}
            onError={error => console.log(error)}
            style={{ width: '30vh' }}
          />
        </Centered>
      </Column>
    </Row>
  </React.Fragment>
)

const mapStateToProps = ({ qrcode }: IApplicationState) => ({
  signData: qrcode.signData,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendTx: (data: any) => dispatch(sendTransaction(data)),
})

export const Sign = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignPage)
