import * as React from 'react'
import { Row, Hr, ButtonClose, Column, H2, H3, Centered } from '.'
import QrReader from 'react-qr-reader'
import QRCode from 'qrcode.react'

interface IPropsFromDispatch {
  title: string
  value: string
  onScan: (data: string) => void
  onError?: (e: Error) => void
  readonly?: boolean
}

type AllProps = IPropsFromDispatch

export const QrLogin: React.SFC<AllProps> = ({
  title,
  value,
  onScan,
  onError,
  readonly,
}) => {
  const errorHandle = onError || ((error: Error) => console.error(error))

  return (
    <React.Fragment>
      <Row>
        <Column>
          <H2>{title}</H2>
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
            { value && <QRCode value={value} renderAs="svg" /> }
          </Centered>
        </Column>
        {!readonly && (
          <Column style={{ width: '50%' }}>
            <Centered>
              <H2>Show QR Code</H2>
            </Centered>
            <Centered style={{ display: 'flex' }}>
              <QrReader
                delay={300}
                onScan={result => result && onScan(result)}
                onError={error => errorHandle(error)}
                style={{ width: '30vh' }}
              />
            </Centered>
          </Column>
        )}
      </Row>
    </React.Fragment>
  )
}
