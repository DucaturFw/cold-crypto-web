import React from 'react'
import { defaultProps } from 'recompact'
import { Form } from 'react-powerplug'
import { navigate } from 'fuse-react'
import Web3 from 'web3'

import { Column, Row, Centered } from '../shared/layout'
import { TextInput } from '../shared/inputs'
import { ButtonBase } from '../shared/buttons'
import { RTCHelper } from '../../services/webrtc';
import { IWallet } from '../../model';
import { ITransaction } from '../../reducers/Wallet';

interface ITxFormProps {
  blockChainPrice?: string
  blockChainData?: {
    avgWait: string,
  }
  address: string
  value: any
  set: (data: any) => void,
  webrtc: RTCHelper,
  wallet: IWallet
}

const TxForm = ({ address, blockChainPrice, blockChainData, value, set, webrtc, wallet }: ITxFormProps) => (
  <Form initial={value} >
    {({ input, values }) => (
      <form onSubmit={(e) => {
        e.preventDefault()
        const tx: ITransaction = {
          nonce: wallet.nonce,
          gasPrice: Web3.utils.toWei(values.gasPrice.toString(), 'wei'),
          to: values.to,
          value: parseInt(Web3.utils.toWei(values.amount)),
        }
      
        const sendData = `signTransferTx|3|${JSON.stringify([tx, wallet])}`

        if(webrtc.connected) {
          webrtc.dataChannel.send(sendData)
          return
        }

        set(values)
        navigate('/txCreation/eth/sign')
      }}>
        <Column>
          <TextInput placeholder={address || 'Address'} {...input('to').bind} />
          <Row>
            <TextInput required={true} placeholder='Amount' {...input('amount').bind} />
            <Centered style={{display: 'flex'}}>
              <span>~{(Number(values.amount) * Number(blockChainPrice)).toFixed(2)}$</span>
            </Centered>
          </Row>
          <Row>
            <span>Gas price</span>
            <TextInput type='range' {...input('gasPrice').bind} min='1' max='100' />
            <span> {`< ${(Number(blockChainData.avgWait) * Number(values.gasPrice)).toFixed(2)} min`}</span>
          </Row>
          <ButtonBase type='submit'>Sign</ButtonBase>
        </Column>
      </form>
    )}
  </Form>
)

export default defaultProps({ blockChainPrice: 0, blockChainData: { avgWait: 1 } })(TxForm)
