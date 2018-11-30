import * as React from 'react'
import QRCode from 'qrcode.react'
import QrReader from 'react-qr-reader'
import { getWalletListCommand } from '../helpers/jsonrps'
import {
  Row,
  H2,
  H3,
  Column,
  ButtonClose,
  Centered,
  Hr,
} from '../components/atoms'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { scanLoginSuccess } from '../store/qrcode/actions'
import { IConnectedReduxProps } from '../store'

// TODO: map errorfrom qrcode state and show if we will have it
interface IPropsFromState {}

interface IPropsFromDispatch {
  scanLoginData: typeof scanLoginSuccess
}

type AllProps = IPropsFromState & IPropsFromDispatch & IConnectedReduxProps

const LoginPage: React.SFC<AllProps> = ({ scanLoginData }) => {
  return (
    <React.Fragment>
      <Row>
        <Column>
          <H2>Mobile Login</H2>
          <H3>
            Follow these steps to log into your web wallet using your mobile
            device
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
            <div style={{ height: '30vh', width: '30vh' }}>
              <QRCode value={getWalletListCommand()} renderAs="svg" />
            </div>
          </Centered>
        </Column>
        <Column style={{ width: '50%' }}>
          <Centered>
            <H2>Show QR Code</H2>
          </Centered>
          <Centered style={{ display: 'flex' }}>
            <QrReader
              delay={300}
              onScan={(result: string | null) =>
                result && scanLoginData(result)
              }
              // TODO: use scanLoginError
              onError={(error: string) => console.log(error)}
              style={{ width: '30vh' }}
            />
          </Centered>
        </Column>
      </Row>
    </React.Fragment>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  scanLoginData: (data: string) => dispatch(scanLoginSuccess(data)),
})

export const Login = connect(
  null,
  mapDispatchToProps
)(LoginPage)
